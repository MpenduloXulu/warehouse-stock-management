import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase/firebaseClient';
import { Item, CreateItemInput, UpdateItemInput, ItemSearchFilters } from '@/types';
import { COLLECTIONS } from '@/utils/constants';

export const itemsService = {
  // Get all items
  async getAllItems(): Promise<Item[]> {
    const itemsRef = collection(db, COLLECTIONS.ITEMS);
    const q = query(itemsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    })) as Item[];
  },

  // Get item by ID
  async getItemById(id: string): Promise<Item | null> {
    const docRef = doc(db, COLLECTIONS.ITEMS, id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) return null;
    
    return {
      id: docSnap.id,
      ...docSnap.data(),
      createdAt: docSnap.data().createdAt?.toDate(),
      updatedAt: docSnap.data().updatedAt?.toDate(),
    } as Item;
  },

  // Create item
  async createItem(data: CreateItemInput, userId: string): Promise<string> {
    const itemsRef = collection(db, COLLECTIONS.ITEMS);
    const docRef = await addDoc(itemsRef, {
      ...data,
      createdBy: userId,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      isActive: true,
    });
    
    return docRef.id;
  },

  // Update item
  async updateItem(id: string, data: UpdateItemInput): Promise<void> {
    const docRef = doc(db, COLLECTIONS.ITEMS, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now(),
    });
  },

  // Delete item
  async deleteItem(id: string): Promise<void> {
    const docRef = doc(db, COLLECTIONS.ITEMS, id);
    await deleteDoc(docRef);
  },

  // Search items
  async searchItems(filters: ItemSearchFilters): Promise<Item[]> {
    const itemsRef = collection(db, COLLECTIONS.ITEMS);
    let q = query(itemsRef);
    
    if (filters.category) {
      q = query(q, where('category', '==', filters.category));
    }
    
    if (filters.location) {
      q = query(q, where('location', '==', filters.location));
    }
    
    if (filters.isActive !== undefined) {
      q = query(q, where('isActive', '==', filters.isActive));
    }
    
    const snapshot = await getDocs(q);
    
    let items = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    })) as Item[];
    
    // Filter by query (search in name, SKU, description)
    if (filters.query) {
      const searchQuery = filters.query.toLowerCase();
      items = items.filter(item => 
        item.name.toLowerCase().includes(searchQuery) ||
        item.sku.toLowerCase().includes(searchQuery) ||
        item.description.toLowerCase().includes(searchQuery)
      );
    }
    
    return items;
  },

  // Get item by barcode
  async getItemByBarcode(barcode: string): Promise<Item | null> {
    const itemsRef = collection(db, COLLECTIONS.ITEMS);
    const q = query(itemsRef, where('barcodes', 'array-contains', barcode));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) return null;
    
    const doc = snapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    } as Item;
  },
};
