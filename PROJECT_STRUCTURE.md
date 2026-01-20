# Warehouse Stock Simulation - Project Structure

```
warehouse-stock-app/
├─ .next/                                    # Next.js build output
├─ node_modules/                             # Dependencies
├─ public/                                   # Static assets
│  ├─ icons/                                 # App icons
│  ├─ images/                                # Images and logos
│  └─ favicon.ico
│
├─ src/
│  ├─ app/                                   # Next.js App Router
│  │  ├─ (auth)/                             # Auth layout group
│  │  │  ├─ login/
│  │  │  │  └─ page.tsx                      # Login page
│  │  │  ├─ register/
│  │  │  │  └─ page.tsx                      # Registration page
│  │  │  └─ layout.tsx                       # Auth layout wrapper
│  │  │
│  │  ├─ (admin)/                            # Admin layout group
│  │  │  ├─ admin/
│  │  │  │  ├─ dashboard/
│  │  │  │  │  └─ page.tsx                   # Admin dashboard
│  │  │  │  ├─ items/
│  │  │  │  │  ├─ page.tsx                   # Items list
│  │  │  │  │  ├─ new/
│  │  │  │  │  │  └─ page.tsx                # Create new item
│  │  │  │  │  └─ [id]/
│  │  │  │  │     ├─ page.tsx                # View/Edit item
│  │  │  │  │     └─ edit/
│  │  │  │  │        └─ page.tsx             # Edit item form
│  │  │  │  ├─ tasks/
│  │  │  │  │  ├─ page.tsx                   # Tasks list
│  │  │  │  │  ├─ new/
│  │  │  │  │  │  └─ page.tsx                # Create new task
│  │  │  │  │  └─ [id]/
│  │  │  │  │     └─ page.tsx                # View task details
│  │  │  │  ├─ auditors/
│  │  │  │  │  ├─ page.tsx                   # Auditors management
│  │  │  │  │  └─ [id]/
│  │  │  │  │     └─ page.tsx                # Auditor profile
│  │  │  │  ├─ reports/
│  │  │  │  │  ├─ page.tsx                   # Reports dashboard
│  │  │  │  │  ├─ analytics/
│  │  │  │  │  │  └─ page.tsx                # Analytics view
│  │  │  │  │  └─ submissions/
│  │  │  │  │     └─ page.tsx                # Submission reports
│  │  │  │  └─ settings/
│  │  │  │     └─ page.tsx                   # Admin settings
│  │  │  └─ layout.tsx                       # Admin layout wrapper
│  │  │
│  │  ├─ (auditor)/                          # Auditor layout group
│  │  │  ├─ auditor/
│  │  │  │  ├─ dashboard/
│  │  │  │  │  └─ page.tsx                   # Auditor dashboard
│  │  │  │  ├─ tasks/
│  │  │  │  │  ├─ page.tsx                   # Assigned tasks list
│  │  │  │  │  └─ [id]/
│  │  │  │  │     ├─ page.tsx                # Task details
│  │  │  │  │     └─ count/
│  │  │  │  │        └─ page.tsx             # Stock counting interface
│  │  │  │  ├─ scan/
│  │  │  │  │  └─ page.tsx                   # Barcode scanner page
│  │  │  │  ├─ history/
│  │  │  │  │  └─ page.tsx                   # Task history
│  │  │  │  └─ profile/
│  │  │  │     └─ page.tsx                   # Auditor profile
│  │  │  └─ layout.tsx                       # Auditor layout wrapper
│  │  │
│  │  ├─ api/                                # API Routes
│  │  │  ├─ auth/
│  │  │  │  ├─ login/
│  │  │  │  │  └─ route.ts                   # Login endpoint
│  │  │  │  ├─ register/
│  │  │  │  │  └─ route.ts                   # Register endpoint
│  │  │  │  ├─ logout/
│  │  │  │  │  └─ route.ts                   # Logout endpoint
│  │  │  │  └─ me/
│  │  │  │     └─ route.ts                   # Get current user
│  │  │  ├─ items/
│  │  │  │  ├─ route.ts                      # GET all, POST new item
│  │  │  │  ├─ [id]/
│  │  │  │  │  └─ route.ts                   # GET, PUT, DELETE item
│  │  │  │  ├─ search/
│  │  │  │  │  └─ route.ts                   # Search items
│  │  │  │  └─ bulk/
│  │  │  │     └─ route.ts                   # Bulk operations
│  │  │  ├─ tasks/
│  │  │  │  ├─ route.ts                      # GET all, POST new task
│  │  │  │  ├─ [id]/
│  │  │  │  │  ├─ route.ts                   # GET, PUT, DELETE task
│  │  │  │  │  ├─ assign/
│  │  │  │  │  │  └─ route.ts                # Assign task to auditor
│  │  │  │  │  ├─ submit/
│  │  │  │  │  │  └─ route.ts                # Submit count
│  │  │  │  │  └─ approve/
│  │  │  │  │     └─ route.ts                # Approve/Reject submission
│  │  │  │  └─ my-tasks/
│  │  │  │     └─ route.ts                   # Get auditor's tasks
│  │  │  ├─ reports/
│  │  │  │  ├─ route.ts                      # Generate reports
│  │  │  │  ├─ analytics/
│  │  │  │  │  └─ route.ts                   # Analytics data
│  │  │  │  ├─ discrepancies/
│  │  │  │  │  └─ route.ts                   # Discrepancy reports
│  │  │  │  └─ export/
│  │  │  │     └─ route.ts                   # Export reports (CSV/PDF)
│  │  │  └─ upload/
│  │  │     └─ route.ts                      # File upload handler
│  │  │
│  │  ├─ layout.tsx                          # Root layout
│  │  ├─ page.tsx                            # Home/Landing page
│  │  ├─ loading.tsx                         # Global loading component
│  │  ├─ error.tsx                           # Global error component
│  │  └─ not-found.tsx                       # 404 page
│  │
│  ├─ components/                            # React components
│  │  ├─ admin/                              # Admin-specific components
│  │  │  ├─ ItemsTable.tsx                   # Items data table
│  │  │  ├─ ItemForm.tsx                     # Create/Edit item form
│  │  │  ├─ TaskForm.tsx                     # Create/Edit task form
│  │  │  ├─ TasksList.tsx                    # Tasks list view
│  │  │  ├─ AuditorSelector.tsx              # Auditor selection dropdown
│  │  │  ├─ ApprovalPanel.tsx                # Approve/Reject panel
│  │  │  ├─ AnalyticsChart.tsx               # Charts for analytics
│  │  │  ├─ ReportsTable.tsx                 # Reports data table
│  │  │  └─ AdminSidebar.tsx                 # Admin navigation sidebar
│  │  │
│  │  ├─ auditor/                            # Auditor-specific components
│  │  │  ├─ TaskCard.tsx                     # Task card component
│  │  │  ├─ CountingForm.tsx                 # Stock counting form
│  │  │  ├─ BarcodeScanner.tsx               # Barcode scanner component
│  │  │  ├─ ItemSearchBar.tsx                # Item search interface
│  │  │  ├─ ProgressIndicator.tsx            # Task progress bar
│  │  │  ├─ SubmissionSummary.tsx            # Submission summary card
│  │  │  └─ AuditorSidebar.tsx               # Auditor navigation sidebar
│  │  │
│  │  ├─ shared/                             # Shared components
│  │  │  ├─ ui/                              # UI components
│  │  │  │  ├─ Button.tsx                    # Button component
│  │  │  │  ├─ Input.tsx                     # Input field
│  │  │  │  ├─ Select.tsx                    # Select dropdown
│  │  │  │  ├─ TextArea.tsx                  # Text area
│  │  │  │  ├─ Card.tsx                      # Card container
│  │  │  │  ├─ Modal.tsx                     # Modal dialog
│  │  │  │  ├─ Table.tsx                     # Table component
│  │  │  │  ├─ Badge.tsx                     # Status badge
│  │  │  │  ├─ Spinner.tsx                   # Loading spinner
│  │  │  │  ├─ Alert.tsx                     # Alert/Notification
│  │  │  │  ├─ Tabs.tsx                      # Tabs component
│  │  │  │  ├─ Pagination.tsx                # Pagination component
│  │  │  │  └─ Toast.tsx                     # Toast notification
│  │  │  │
│  │  │  ├─ layout/                          # Layout components
│  │  │  │  ├─ Header.tsx                    # App header
│  │  │  │  ├─ Sidebar.tsx                   # Generic sidebar
│  │  │  │  ├─ Footer.tsx                    # App footer
│  │  │  │  └─ Container.tsx                 # Content container
│  │  │  │
│  │  │  ├─ forms/                           # Form components
│  │  │  │  ├─ FormField.tsx                 # Form field wrapper
│  │  │  │  ├─ FormError.tsx                 # Error message display
│  │  │  │  ├─ FormLabel.tsx                 # Form label
│  │  │  │  └─ SearchInput.tsx               # Search input field
│  │  │  │
│  │  │  └─ auth/                            # Auth components
│  │  │     ├─ LoginForm.tsx                 # Login form
│  │  │     ├─ RegisterForm.tsx              # Registration form
│  │  │     └─ ProtectedRoute.tsx            # Route protection wrapper
│  │  │
│  │  └─ providers/                          # Context providers
│  │     ├─ AuthProvider.tsx                 # Auth context provider
│  │     ├─ ThemeProvider.tsx                # Theme context provider
│  │     └─ ToastProvider.tsx                # Toast notification provider
│  │
│  ├─ lib/                                   # Library code
│  │  ├─ firebase/                           # Firebase configuration
│  │  │  ├─ firebaseClient.ts                # Firebase client config
│  │  │  ├─ firebaseAdmin.ts                 # Firebase admin SDK (server)
│  │  │  └─ firebaseStorage.ts               # Firebase Storage config
│  │  │
│  │  ├─ services/                           # Service layer
│  │  │  ├─ auth.service.ts                  # Authentication services
│  │  │  ├─ items.service.ts                 # Items CRUD services
│  │  │  ├─ tasks.service.ts                 # Tasks CRUD services
│  │  │  ├─ users.service.ts                 # User management services
│  │  │  ├─ reports.service.ts               # Reports generation services
│  │  │  ├─ storage.service.ts               # File storage services
│  │  │  └─ notifications.service.ts         # Notifications services
│  │  │
│  │  └─ api-client.ts                       # API client wrapper
│  │
│  ├─ context/                               # React Context
│  │  ├─ AuthContext.tsx                     # Auth context (role-based)
│  │  ├─ TaskContext.tsx                     # Task management context
│  │  └─ ItemContext.tsx                     # Item management context
│  │
│  ├─ hooks/                                 # Custom React hooks
│  │  ├─ useAuth.ts                          # Auth hook
│  │  ├─ useUser.ts                          # User data hook
│  │  ├─ useItems.ts                         # Items data hook
│  │  ├─ useTasks.ts                         # Tasks data hook
│  │  ├─ useForm.ts                          # Form handling hook
│  │  ├─ useToast.ts                         # Toast notification hook
│  │  ├─ useDebounce.ts                      # Debounce hook
│  │  ├─ useLocalStorage.ts                  # Local storage hook
│  │  └─ useBarcodeScanner.ts                # Barcode scanner hook
│  │
│  ├─ types/                                 # TypeScript types/interfaces
│  │  ├─ index.ts                            # Export all types
│  │  ├─ user.types.ts                       # User types
│  │  ├─ item.types.ts                       # Item types
│  │  ├─ task.types.ts                       # Task types
│  │  ├─ report.types.ts                     # Report types
│  │  ├─ auth.types.ts                       # Auth types
│  │  ├─ api.types.ts                        # API response types
│  │  └─ common.types.ts                     # Common/shared types
│  │
│  ├─ utils/                                 # Utility functions
│  │  ├─ helpers.ts                          # General helper functions
│  │  ├─ formatters.ts                       # Data formatters
│  │  ├─ validators.ts                       # Input validators
│  │  ├─ constants.ts                        # App constants
│  │  ├─ dateUtils.ts                        # Date utilities
│  │  ├─ exportUtils.ts                      # Export utilities (CSV/PDF)
│  │  └─ errorHandler.ts                     # Error handling utilities
│  │
│  ├─ styles/                                # Global styles
│  │  └─ globals.css                         # Global CSS + Tailwind imports
│  │
│  └─ middleware.ts                          # Next.js middleware (route protection)
│
├─ firebase/                                 # Firebase Functions (optional)
│  ├─ functions/
│  │  ├─ src/
│  │  │  ├─ index.ts                         # Cloud Functions entry
│  │  │  ├─ triggers/
│  │  │  │  ├─ onTaskCreate.ts               # Task creation trigger
│  │  │  │  └─ onSubmissionApprove.ts        # Approval trigger
│  │  │  └─ api/
│  │  │     └─ webhooks.ts                   # Webhook handlers
│  │  ├─ package.json
│  │  └─ tsconfig.json
│  └─ firestore.rules                        # Firestore security rules
│
├─ .env.local                                # Environment variables (local)
├─ .env.example                              # Environment variables template
├─ .gitignore                                # Git ignore file
├─ next.config.js                            # Next.js configuration
├─ tailwind.config.ts                        # Tailwind CSS configuration
├─ postcss.config.js                         # PostCSS configuration
├─ tsconfig.json                             # TypeScript configuration
├─ package.json                              # Dependencies and scripts
├─ README.md                                 # Project documentation
└─ .eslintrc.json                            # ESLint configuration
```

## Key Features by Folder

### `/src/app/(admin)` - Admin Dashboard
- Complete CRUD operations for warehouse items
- Task creation and assignment to auditors
- Approval/rejection workflow for submissions
- Comprehensive reports and analytics
- User management

### `/src/app/(auditor)` - Auditor Dashboard
- View assigned tasks
- Barcode scanning functionality
- Stock counting interface
- Task progress tracking
- Submission history

### `/src/app/api` - API Routes
- RESTful endpoints for all operations
- Authentication endpoints
- File upload handling
- Report generation and export

### `/src/components` - Component Organization
- **admin/**: Admin-specific UI components
- **auditor/**: Auditor-specific UI components
- **shared/**: Reusable components across roles

### `/src/lib` - Business Logic
- Firebase client/admin configuration
- Service layer for database operations
- API client wrapper

### `/src/context` - State Management
- AuthContext with role-based access
- Task and Item contexts for data management

### `/src/hooks` - Custom Hooks
- Reusable logic for auth, data fetching, forms
- Barcode scanner integration
- Local storage and debouncing

### `/src/types` - TypeScript Definitions
- Strong typing for all data models
- API response types
- Role-based user types

### `/src/utils` - Helper Functions
- Validation, formatting, error handling
- Constants and configuration
- Export utilities for reports

### `middleware.ts` - Route Protection
- Role-based route access control
- Authentication verification
- Redirect logic for unauthorized access

## Environment Variables (.env.local)

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY=
```
