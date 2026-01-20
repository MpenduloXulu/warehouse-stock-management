import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { db } from '../firebase/firebaseClient';
import { COLLECTIONS } from '@/utils/constants';

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'auditor';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const usersService = {
  // Get all users
  async getAllUsers(): Promise<UserProfile[]> {
    const usersRef = collection(db, COLLECTIONS.USERS);
    const q = query(usersRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate?.() || new Date(),
    })) as UserProfile[];
  },

  // Get users by role
  async getUsersByRole(role: 'admin' | 'auditor'): Promise<UserProfile[]> {
    const usersRef = collection(db, COLLECTIONS.USERS);
    const q = query(usersRef, where('role', '==', role));
    const snapshot = await getDocs(q);
    
    const users = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate?.() || new Date(),
    })) as UserProfile[];
    
    // Sort in memory instead of Firestore to avoid index requirement
    return users.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  },

  // Get user by ID
  async getUserById(id: string): Promise<UserProfile | null> {
    const docRef = doc(db, COLLECTIONS.USERS, id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) return null;
    
    return {
      id: docSnap.id,
      ...docSnap.data(),
      createdAt: docSnap.data().createdAt?.toDate?.() || new Date(),
      updatedAt: docSnap.data().updatedAt?.toDate?.() || new Date(),
    } as UserProfile;
  },

  // Update user status
  async updateUserStatus(userId: string, isActive: boolean): Promise<void> {
    const docRef = doc(db, COLLECTIONS.USERS, userId);
    await updateDoc(docRef, {
      isActive,
      updatedAt: new Date(),
    });
  },

  // Update user role
  async updateUserRole(userId: string, role: 'admin' | 'auditor'): Promise<void> {
    const docRef = doc(db, COLLECTIONS.USERS, userId);
    await updateDoc(docRef, {
      role,
      updatedAt: new Date(),
    });
  },
};
