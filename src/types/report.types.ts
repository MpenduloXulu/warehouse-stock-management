export interface Report {
  id: string;
  type: ReportType;
  generatedBy: string;
  generatedAt: Date;
  data: ReportData;
}

export type ReportType = 'discrepancies' | 'task_summary' | 'auditor_performance' | 'inventory_status';

export interface ReportData {
  title: string;
  dateRange: {
    start: Date;
    end: Date;
  };
  summary: Record<string, any>;
  details: any[];
}

export interface DiscrepancyReport {
  itemId: string;
  itemName: string;
  sku: string;
  expectedQuantity: number;
  countedQuantity: number;
  discrepancy: number;
  discrepancyPercentage: number;
  taskId: string;
  taskTitle: string;
  auditorName: string;
  countedAt: Date;
}

export interface TaskSummaryReport {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  rejectedTasks: number;
  averageCompletionTime: number;
  tasksByStatus: Record<string, number>;
}

export interface AuditorPerformanceReport {
  auditorId: string;
  auditorName: string;
  tasksCompleted: number;
  tasksRejected: number;
  averageAccuracy: number;
  averageCompletionTime: number;
  itemsCounted: number;
}

export interface InventoryStatusReport {
  totalItems: number;
  itemsCounted: number;
  itemsNotCounted: number;
  totalDiscrepancies: number;
  criticalDiscrepancies: number;
  categoryBreakdown: {
    category: string;
    totalItems: number;
    countedItems: number;
  }[];
}
