export interface SelectOption {
  value: string;
  label: string;
}

export interface TableColumn<T = any> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
}

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

export interface FilterConfig {
  [key: string]: any;
}

export type StatusType = 'success' | 'error' | 'warning' | 'info';

export interface NotificationMessage {
  id: string;
  type: StatusType;
  title: string;
  message: string;
  duration?: number;
}

export interface DateRange {
  start: Date;
  end: Date;
}
