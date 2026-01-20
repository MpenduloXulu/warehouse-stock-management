export type TaskStatus = 'pending' | 'assigned' | 'in_progress' | 'submitted' | 'approved' | 'rejected';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  assignedTo?: string;
  assignedToName?: string;
  createdBy: string;
  createdByName: string;
  items: TaskItem[];
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
  submittedAt?: Date;
  approvedAt?: Date;
  rejectedAt?: Date;
  rejectionReason?: string;
}

export interface TaskItem {
  itemId: string;
  itemName: string;
  itemSku: string;
  expectedQuantity: number;
  countedQuantity?: number;
  unit: string;
  notes?: string;
}

export interface CreateTaskInput {
  title: string;
  description: string;
  assignedTo?: string;
  items: {
    itemId: string;
    expectedQuantity: number;
  }[];
  dueDate: Date;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  assignedTo?: string;
  status?: TaskStatus;
  dueDate?: Date;
}

export interface SubmitTaskInput {
  taskId: string;
  items: {
    itemId: string;
    countedQuantity: number;
    notes?: string;
  }[];
}

export interface ApprovalInput {
  taskId: string;
  approved: boolean;
  rejectionReason?: string;
}

export interface TaskFilters {
  status?: TaskStatus;
  assignedTo?: string;
  createdBy?: string;
  startDate?: Date;
  endDate?: Date;
}
