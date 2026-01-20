// App constants
export const APP_NAME = 'Warehouse Stock Simulation';
export const APP_VERSION = '1.0.0';

// User roles
export const USER_ROLES = {
  ADMIN: 'admin' as const,
  AUDITOR: 'auditor' as const,
};

// Task statuses
export const TASK_STATUS = {
  PENDING: 'pending',
  ASSIGNED: 'assigned',
  IN_PROGRESS: 'in_progress',
  SUBMITTED: 'submitted',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const;

// Item units
export const ITEM_UNITS = [
  'pieces',
  'boxes',
  'pallets',
  'kg',
  'liters',
  'meters',
] as const;

// Item categories
export const ITEM_CATEGORIES = [
  'Electronics',
  'Furniture',
  'Clothing',
  'Food & Beverages',
  'Tools & Equipment',
  'Office Supplies',
  'Raw Materials',
  'Other',
] as const;

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

// Date formats
export const DATE_FORMAT = 'MMM dd, yyyy';
export const DATETIME_FORMAT = 'MMM dd, yyyy HH:mm';
export const TIME_FORMAT = 'HH:mm';

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  
  // Admin routes
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_ITEMS: '/admin/items',
  ADMIN_TASKS: '/admin/tasks',
  ADMIN_AUDITORS: '/admin/auditors',
  ADMIN_REPORTS: '/admin/reports',
  ADMIN_SETTINGS: '/admin/settings',
  
  // Auditor routes
  AUDITOR_DASHBOARD: '/auditor/dashboard',
  AUDITOR_TASKS: '/auditor/tasks',
  AUDITOR_SCAN: '/auditor/scan',
  AUDITOR_HISTORY: '/auditor/history',
  AUDITOR_PROFILE: '/auditor/profile',
} as const;

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    ME: '/api/auth/me',
  },
  ITEMS: {
    BASE: '/api/items',
    SEARCH: '/api/items/search',
    BULK: '/api/items/bulk',
  },
  TASKS: {
    BASE: '/api/tasks',
    MY_TASKS: '/api/tasks/my-tasks',
  },
  REPORTS: {
    BASE: '/api/reports',
    ANALYTICS: '/api/reports/analytics',
    DISCREPANCIES: '/api/reports/discrepancies',
    EXPORT: '/api/reports/export',
  },
  UPLOAD: '/api/upload',
} as const;

// Firestore collections
export const COLLECTIONS = {
  USERS: 'users',
  ITEMS: 'items',
  TASKS: 'tasks',
  REPORTS: 'reports',
} as const;

// Toast durations
export const TOAST_DURATION = {
  SUCCESS: 3000,
  ERROR: 5000,
  WARNING: 4000,
  INFO: 3000,
} as const;
