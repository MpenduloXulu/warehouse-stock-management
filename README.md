# Warehouse Stock Simulation Web Application

A comprehensive warehouse inventory management and stock-taking system built with Next.js, TypeScript, Tailwind CSS, and Firebase.

## 🚀 Features

### Admin Features
- ✅ Manage warehouse items (CRUD operations)
- ✅ Assign stock-taking tasks to auditors
- ✅ View task status and progress
- ✅ Approve or reject stock-take submissions
- ✅ View reports and analytics
- ✅ User management

### Auditor Features
- ✅ View assigned tasks
- ✅ Scan or search items by barcode
- ✅ Submit counted quantities
- ✅ View task progress
- ✅ Track task history

## 🛠️ Technology Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Authentication
- **Database**: Firestore
- **Storage**: Firebase Storage
- **State Management**: React Context API
- **Form Handling**: Custom hooks
- **Validation**: Zod

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication pages
│   │   ├── login/
│   │   └── register/
│   ├── (admin)/                  # Admin pages
│   │   └── admin/
│   │       ├── dashboard/
│   │       ├── items/
│   │       ├── tasks/
│   │       ├── auditors/
│   │       └── reports/
│   ├── (auditor)/                # Auditor pages
│   │   └── auditor/
│   │       ├── dashboard/
│   │       ├── tasks/
│   │       ├── scan/
│   │       └── history/
│   └── api/                      # API routes (to be implemented)
├── components/
│   ├── admin/                    # Admin-specific components
│   ├── auditor/                  # Auditor-specific components
│   └── shared/                   # Shared components
│       └── ui/                   # UI components (Button, Input, Card, etc.)
├── context/                      # React Context
│   └── AuthContext.tsx
├── hooks/                        # Custom hooks
│   ├── useAuth.ts
│   ├── useItems.ts
│   ├── useTasks.ts
│   └── useForm.ts
├── lib/
│   ├── firebase/                 # Firebase configuration
│   │   ├── firebaseClient.ts
│   │   ├── firebaseAdmin.ts
│   │   └── firebaseStorage.ts
│   └── services/                 # Service layer
│       ├── auth.service.ts
│       ├── items.service.ts
│       └── tasks.service.ts
├── types/                        # TypeScript types
│   ├── user.types.ts
│   ├── item.types.ts
│   ├── task.types.ts
│   ├── report.types.ts
│   ├── auth.types.ts
│   ├── api.types.ts
│   └── common.types.ts
├── utils/                        # Utility functions
│   ├── constants.ts
│   ├── formatters.ts
│   ├── validators.ts
│   ├── helpers.ts
│   └── errorHandler.ts
└── middleware.ts                 # Route protection middleware
```

## 🔧 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd "Stock Management"
```

2. **Install dependencies**
```bash
npm install
```

3. **Firebase Setup** ✅

Your Firebase project is already configured with:
- **Project ID**: warehouse-simulation-89d63
- **Authentication**: Email/Password enabled
- **Firestore Database**: Ready to use
- **Storage**: Enabled

4. **Deploy Firestore Security Rules**

```bash
# Install Firebase CLI if you haven't already
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init

# Select Firestore and Storage
# Choose your existing project: warehouse-simulation-89d63

# Deploy security rules
firebase deploy --only firestore:rules,storage:rules
```

5. **Configure Admin SDK (Optional for server-side operations)**

For Firebase Admin SDK, download your service account key:
- Go to Firebase Console > Project Settings > Service Accounts
- Click "Generate New Private Key"
- Add the credentials to `.env.local`:

```env
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk@warehouse-simulation-89d63.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour Private Key Here\n-----END PRIVATE KEY-----\n"
```

6. **Run the development server**
```bash
npm run dev
```

The app will be available at [http://localhost:3001](http://localhost:3001) (or 3000 if available).

## 🔒 Authentication & Authorization

The application uses Firebase Authentication with role-based access control:

- **Admin**: Full access to all features
- **Auditor**: Limited access to assigned tasks and counting interface

Route protection is implemented via Next.js middleware (`src/middleware.ts`).

## 📊 Firestore Collections

### users
```typescript
{
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'auditor';
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}
```

### items
```typescript
{
  id: string;
  sku: string;
  name: string;
  description: string;
  category: string;
  location: string;
  expectedQuantity: number;
  unit: string;
  barcodes: string[];
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  isActive: boolean;
}
```

### tasks
```typescript
{
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'assigned' | 'in_progress' | 'submitted' | 'approved' | 'rejected';
  assignedTo?: string;
  createdBy: string;
  items: TaskItem[];
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

## 🚧 Next Steps

The following features are ready to be implemented:

1. **API Routes**: Complete REST API endpoints in `src/app/api/`
2. **Admin Pages**: Items management, task creation, auditor management
3. **Auditor Pages**: Task detail view, counting interface, barcode scanner
4. **Reports**: Analytics dashboard, discrepancy reports, export functionality
5. **Additional Components**: Modals, tables, forms, charts
6. **Testing**: Unit tests and integration tests
7. **Deployment**: Deploy to Vercel or Firebase Hosting

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions, please open an issue in the repository.

---

Built with ❤️ using Next.js and Firebase
