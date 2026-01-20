import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User as FirebaseUser,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebaseClient';
import { LoginCredentials, RegisterData, AuthUser } from '@/types';
import { COLLECTIONS } from '@/utils/constants';

export const authService = {
  // Login
  async login(credentials: LoginCredentials): Promise<AuthUser> {
    const { email, password } = credentials;
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    try {
      // Get user data from Firestore
      const userDoc = await getDoc(doc(db, COLLECTIONS.USERS, userCredential.user.uid));
      console.log('Firestore userDoc exists:', userDoc.exists());
      const userData = userDoc.data();
      console.log('Firestore userData:', JSON.stringify(userData, null, 2));
      
      if (!userData) {
        // If user document doesn't exist yet, return basic info
        console.warn('No Firestore document found for user:', userCredential.user.uid);
        return {
          uid: userCredential.user.uid,
          email: userCredential.user.email!,
          role: 'auditor',
          displayName: userCredential.user.displayName || email,
        };
      }
      
      console.log('User role from Firestore:', userData.role);
      return {
        uid: userCredential.user.uid,
        email: userCredential.user.email!,
        role: userData.role || 'auditor',
        displayName: userData.firstName + ' ' + userData.lastName,
      };
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Return basic auth info if Firestore fails
      return {
        uid: userCredential.user.uid,
        email: userCredential.user.email!,
        role: 'auditor',
        displayName: userCredential.user.displayName || email,
      };
    }
  },

  // Register
  async register(data: RegisterData): Promise<AuthUser> {
    const { email, password, firstName, lastName, role } = data;
    
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;
    
    console.log('✅ User created in Firebase Auth. UID:', uid);
    console.log('📝 Now creating Firestore document with role:', role);
    
    // Create user document in Firestore - CRITICAL: This must succeed
    const userDocData = {
      email,
      firstName,
      lastName,
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    };
    
    console.log('Firestore data to write:', JSON.stringify(userDocData, null, 2));
    
    try {
      await setDoc(doc(db, COLLECTIONS.USERS, uid), userDocData);
      console.log('✅ Firestore document created successfully at path: users/' + uid);
      
      // Verify
      const verifyDoc = await getDoc(doc(db, COLLECTIONS.USERS, uid));
      if (verifyDoc.exists()) {
        console.log('✅ VERIFIED: Document exists with data:', verifyDoc.data());
      } else {
        console.error('❌ VERIFICATION FAILED: Document does not exist after write!');
      }
    } catch (error: any) {
      console.error('❌ CRITICAL ERROR: Failed to create Firestore document:', error);
      console.error('Error code:', error?.code);
      console.error('Error message:', error?.message);
      throw new Error('Failed to create user profile in database: ' + (error?.message || 'Unknown error'));
    }
    
    return {
      uid: userCredential.user.uid,
      email: userCredential.user.email!,
      role,
      displayName: firstName + ' ' + lastName,
    };
  },

  // Logout
  async logout(): Promise<void> {
    await signOut(auth);
  },

  // Get current user
  async getCurrentUser(): Promise<AuthUser | null> {
    const firebaseUser = auth.currentUser;
    if (!firebaseUser) return null;
    
    try {
      const userDoc = await getDoc(doc(db, COLLECTIONS.USERS, firebaseUser.uid));
      const userData = userDoc.data();
      
      if (!userData) {
        // Return basic info if no Firestore document
        return {
          uid: firebaseUser.uid,
          email: firebaseUser.email!,
          role: 'auditor',
          displayName: firebaseUser.displayName || firebaseUser.email!,
        };
      }
      
      return {
        uid: firebaseUser.uid,
        email: firebaseUser.email!,
        role: userData.role,
        displayName: userData.firstName + ' ' + userData.lastName,
      };
    } catch (error) {
      console.error('Error fetching current user:', error);
      // Return basic Firebase auth info
      return {
        uid: firebaseUser.uid,
        email: firebaseUser.email!,
        role: 'auditor',
        displayName: firebaseUser.displayName || firebaseUser.email!,
      };
    }
  },

  // Get user by ID
  async getUserById(uid: string) {
    const userDoc = await getDoc(doc(db, COLLECTIONS.USERS, uid));
    if (!userDoc.exists()) return null;
    
    return {
      id: userDoc.id,
      ...userDoc.data(),
    };
  },
};
