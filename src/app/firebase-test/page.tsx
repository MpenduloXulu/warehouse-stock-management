'use client';

import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase/firebaseClient';
import { collection, getDocs } from 'firebase/firestore';
import { Card } from '@/components/shared/ui/Card';

export default function FirebaseTestPage() {
  const [authStatus, setAuthStatus] = useState<string>('Checking...');
  const [firestoreStatus, setFirestoreStatus] = useState<string>('Checking...');
  const [errorDetails, setErrorDetails] = useState<string>('');

  useEffect(() => {
    const testFirebase = async () => {
      // Test Authentication
      try {
        if (auth) {
          setAuthStatus('✅ Authentication SDK loaded');
        } else {
          setAuthStatus('❌ Authentication SDK failed to load');
        }
      } catch (error: any) {
        setAuthStatus(`❌ Auth Error: ${error.message}`);
      }

      // Test Firestore
      try {
        if (db) {
          // Try to read from Firestore
          const testCollection = collection(db, 'test');
          await getDocs(testCollection);
          setFirestoreStatus('✅ Firestore connected successfully');
        } else {
          setFirestoreStatus('❌ Firestore SDK failed to load');
        }
      } catch (error: any) {
        setFirestoreStatus(`❌ Firestore Error`);
        setErrorDetails(error.message || JSON.stringify(error));
      }
    };

    testFirebase();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Firebase Connection Test</h1>

        <Card className="mb-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Authentication Status:</h3>
              <p className={`text-sm ${authStatus.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
                {authStatus}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Firestore Status:</h3>
              <p className={`text-sm ${firestoreStatus.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
                {firestoreStatus}
              </p>
              {errorDetails && (
                <div className="mt-2 p-3 bg-red-50 rounded text-xs text-red-700">
                  <p className="font-semibold mb-1">Error Details:</p>
                  <p className="break-all">{errorDetails}</p>
                </div>
              )}
            </div>
          </div>
        </Card>

        <Card title="Setup Instructions">
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-semibold text-red-600 mb-2">If you see errors above, follow these steps:</h4>
            </div>

            <div>
              <p className="font-semibold mb-2">1. Enable Authentication:</p>
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li>Go to <a href="https://console.firebase.google.com/project/warehouse-simulation-89d63/authentication" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Firebase Console - Authentication</a></li>
                <li>Click &quot;Get Started&quot;</li>
                <li>Go to &quot;Sign-in method&quot; tab</li>
                <li>Enable &quot;Email/Password&quot;</li>
                <li>Click &quot;Save&quot;</li>
              </ol>
            </div>

            <div>
              <p className="font-semibold mb-2">2. Enable Firestore Database:</p>
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li>Go to <a href="https://console.firebase.google.com/project/warehouse-simulation-89d63/firestore" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Firebase Console - Firestore</a></li>
                <li>Click &quot;Create database&quot;</li>
                <li>Choose &quot;Start in test mode&quot;</li>
                <li>Select your location (e.g., us-central)</li>
                <li>Click &quot;Enable&quot;</li>
              </ol>
            </div>

            <div>
              <p className="font-semibold mb-2">3. Verify & Test:</p>
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li>Refresh this page after enabling both services</li>
                <li>All statuses should show ✅</li>
                <li>Go to <a href="/register" className="text-blue-600 underline">Register</a> to create your account</li>
              </ol>
            </div>
          </div>
        </Card>

        <div className="mt-6 text-center">
          <a href="/register" className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
            Go to Register
          </a>
        </div>
      </div>
    </div>
  );
}
