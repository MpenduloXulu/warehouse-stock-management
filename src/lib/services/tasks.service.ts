import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase/firebaseClient';
import { 
  Task, 
  CreateTaskInput, 
  UpdateTaskInput, 
  SubmitTaskInput, 
  ApprovalInput,
  TaskFilters 
} from '@/types';
import { COLLECTIONS } from '@/utils/constants';

export const tasksService = {
  // Get all tasks
  async getAllTasks(): Promise<Task[]> {
    const tasksRef = collection(db, COLLECTIONS.TASKS);
    const q = query(tasksRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
      dueDate: doc.data().dueDate?.toDate(),
      submittedAt: doc.data().submittedAt?.toDate(),
      approvedAt: doc.data().approvedAt?.toDate(),
      rejectedAt: doc.data().rejectedAt?.toDate(),
    })) as Task[];
  },

  // Get task by ID
  async getTaskById(id: string): Promise<Task | null> {
    const docRef = doc(db, COLLECTIONS.TASKS, id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) return null;
    
    return {
      id: docSnap.id,
      ...docSnap.data(),
      createdAt: docSnap.data().createdAt?.toDate(),
      updatedAt: docSnap.data().updatedAt?.toDate(),
      dueDate: docSnap.data().dueDate?.toDate(),
      submittedAt: docSnap.data().submittedAt?.toDate(),
      approvedAt: docSnap.data().approvedAt?.toDate(),
      rejectedAt: docSnap.data().rejectedAt?.toDate(),
    } as Task;
  },

  // Create task
  async createTask(data: CreateTaskInput, userId: string, userName: string): Promise<string> {
    const tasksRef = collection(db, COLLECTIONS.TASKS);
    const docRef = await addDoc(tasksRef, {
      ...data,
      dueDate: Timestamp.fromDate(data.dueDate),
      status: data.assignedTo ? 'assigned' : 'pending',
      createdBy: userId,
      createdByName: userName,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    
    return docRef.id;
  },

  // Update task
  async updateTask(id: string, data: UpdateTaskInput): Promise<void> {
    const docRef = doc(db, COLLECTIONS.TASKS, id);
    const updateData: any = {
      ...data,
      updatedAt: Timestamp.now(),
    };
    
    if (data.dueDate) {
      updateData.dueDate = Timestamp.fromDate(data.dueDate);
    }
    
    await updateDoc(docRef, updateData);
  },

  // Get tasks by auditor
  async getTasksByAuditor(auditorId: string): Promise<Task[]> {
    const tasksRef = collection(db, COLLECTIONS.TASKS);
    const q = query(
      tasksRef,
      where('assignedTo', '==', auditorId),
      orderBy('dueDate', 'asc')
    );
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
      dueDate: doc.data().dueDate?.toDate(),
      submittedAt: doc.data().submittedAt?.toDate(),
      approvedAt: doc.data().approvedAt?.toDate(),
      rejectedAt: doc.data().rejectedAt?.toDate(),
    })) as Task[];
  },

  // Submit task
  async submitTask(data: SubmitTaskInput): Promise<void> {
    const docRef = doc(db, COLLECTIONS.TASKS, data.taskId);
    
    // Get existing task to update items
    const taskSnap = await getDoc(docRef);
    const taskData = taskSnap.data();
    
    if (!taskData) throw new Error('Task not found');
    
    // Update items with counted quantities
    const updatedItems = taskData.items.map((item: any) => {
      const submittedItem = data.items.find(i => i.itemId === item.itemId);
      if (submittedItem) {
        return {
          ...item,
          countedQuantity: submittedItem.countedQuantity,
          notes: submittedItem.notes,
        };
      }
      return item;
    });
    
    await updateDoc(docRef, {
      items: updatedItems,
      status: 'submitted',
      submittedAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
  },

  // Approve or reject task
  async approveTask(data: ApprovalInput): Promise<void> {
    const docRef = doc(db, COLLECTIONS.TASKS, data.taskId);
    
    if (data.approved) {
      await updateDoc(docRef, {
        status: 'approved',
        approvedAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
    } else {
      await updateDoc(docRef, {
        status: 'rejected',
        rejectedAt: Timestamp.now(),
        rejectionReason: data.rejectionReason,
        updatedAt: Timestamp.now(),
      });
    }
  },

  // Search/Filter tasks
  async filterTasks(filters: TaskFilters): Promise<Task[]> {
    const tasksRef = collection(db, COLLECTIONS.TASKS);
    let q = query(tasksRef);
    
    if (filters.status) {
      q = query(q, where('status', '==', filters.status));
    }
    
    if (filters.assignedTo) {
      q = query(q, where('assignedTo', '==', filters.assignedTo));
    }
    
    if (filters.createdBy) {
      q = query(q, where('createdBy', '==', filters.createdBy));
    }
    
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
      dueDate: doc.data().dueDate?.toDate(),
      submittedAt: doc.data().submittedAt?.toDate(),
      approvedAt: doc.data().approvedAt?.toDate(),
      rejectedAt: doc.data().rejectedAt?.toDate(),
    })) as Task[];
  },
};
