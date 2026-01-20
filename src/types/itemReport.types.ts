export interface ItemReport {
  id: string;
  itemId: string;
  itemName: string;
  itemDescription: string;
  category: string;
  location: string;
  barcode: string;
  countedQuantity: number;
  expiryDate?: string;
  comments?: string;
  auditorId: string;
  auditorName: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateItemReportInput {
  itemId: string;
  itemName: string;
  itemDescription: string;
  category: string;
  location: string;
  barcode: string;
  countedQuantity: number;
  expiryDate?: string;
  comments?: string;
  auditorId: string;
  auditorName: string;
}

export interface UpdateItemReportInput {
  status?: 'pending' | 'approved' | 'rejected';
  adminNotes?: string;
  reviewedBy?: string;
  reviewedAt?: Date;
}
