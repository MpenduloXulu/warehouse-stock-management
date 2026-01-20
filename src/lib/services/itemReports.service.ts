import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  query, 
  where, 
  getDocs,
  orderBy,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase/firebaseClient';
import { ItemReport, CreateItemReportInput, UpdateItemReportInput } from '@/types/itemReport.types';

const COLLECTION_NAME = 'itemReports';

export const itemReportsService = {
  // Create a new item report
  async createReport(input: CreateItemReportInput): Promise<string> {
    try {
      const reportData = {
        ...input,
        status: 'pending',
        submittedAt: serverTimestamp(),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, COLLECTION_NAME), reportData);
      console.log('Item report created with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error creating item report:', error);
      throw new Error('Failed to create item report');
    }
  },

  // Get reports by auditor
  async getReportsByAuditor(auditorId: string): Promise<ItemReport[]> {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where('auditorId', '==', auditorId),
        orderBy('submittedAt', 'desc')
      );

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        submittedAt: (doc.data().submittedAt as Timestamp)?.toDate() || new Date(),
        reviewedAt: doc.data().reviewedAt ? (doc.data().reviewedAt as Timestamp).toDate() : undefined,
        createdAt: (doc.data().createdAt as Timestamp)?.toDate() || new Date(),
        updatedAt: (doc.data().updatedAt as Timestamp)?.toDate() || new Date(),
      })) as ItemReport[];
    } catch (error) {
      console.error('Error fetching reports by auditor:', error);
      return [];
    }
  },

  // Get all reports (for admin)
  async getAllReports(): Promise<ItemReport[]> {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        orderBy('submittedAt', 'desc')
      );

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        submittedAt: (doc.data().submittedAt as Timestamp)?.toDate() || new Date(),
        reviewedAt: doc.data().reviewedAt ? (doc.data().reviewedAt as Timestamp).toDate() : undefined,
        createdAt: (doc.data().createdAt as Timestamp)?.toDate() || new Date(),
        updatedAt: (doc.data().updatedAt as Timestamp)?.toDate() || new Date(),
      })) as ItemReport[];
    } catch (error) {
      console.error('Error fetching all reports:', error);
      return [];
    }
  },

  // Update report status (for admin review)
  async updateReport(reportId: string, input: UpdateItemReportInput): Promise<void> {
    try {
      const reportRef = doc(db, COLLECTION_NAME, reportId);
      await updateDoc(reportRef, {
        ...input,
        updatedAt: serverTimestamp(),
      });
      console.log('Item report updated:', reportId);
    } catch (error) {
      console.error('Error updating item report:', error);
      throw new Error('Failed to update item report');
    }
  },

  // Get pending reports count
  async getPendingReportsCount(): Promise<number> {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where('status', '==', 'pending')
      );

      const snapshot = await getDocs(q);
      return snapshot.size;
    } catch (error) {
      console.error('Error fetching pending reports count:', error);
      return 0;
    }
  },
};
