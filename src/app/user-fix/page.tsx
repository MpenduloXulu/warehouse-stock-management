'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebaseClient';
import { Button } from '@/components/shared/ui/Button';
import { Card } from '@/components/shared/ui/Card';

export default function UserFixPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const usersData = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(usersData);
      console.log('Loaded users:', usersData);
    } catch (error) {
      console.error('Error loading users:', error);
      setMessage('Error loading users: ' + error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: 'admin' | 'auditor') => {
    try {
      await updateDoc(doc(db, 'users', userId), {
        role: newRole,
        updatedAt: new Date()
      });
      setMessage(`✅ Successfully updated user role to ${newRole}`);
      loadUsers(); // Reload users
    } catch (error) {
      console.error('Error updating user:', error);
      setMessage('❌ Error updating user: ' + error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">User Role Manager</h1>
        <p className="text-gray-600 mb-6">View and fix user roles in Firestore</p>

        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.includes('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {message}
          </div>
        )}

        <Card>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              <p className="mt-4 text-gray-600">Loading users...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No users found in Firestore</p>
              <p className="text-gray-500 text-sm mt-2">
                Users might not have Firestore documents. Register new users to create them.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {users.map((user) => (
                <div key={user.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {user.firstName} {user.lastName}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">{user.email}</p>
                      <div className="mt-2 space-y-1">
                        <p className="text-xs text-gray-500">
                          <span className="font-medium">UID:</span> {user.id}
                        </p>
                        <p className="text-xs text-gray-500">
                          <span className="font-medium">Current Role:</span>{' '}
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            user.role === 'admin' 
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {user.role || 'NOT SET'}
                          </span>
                        </p>
                        <p className="text-xs text-gray-500">
                          <span className="font-medium">Status:</span> {user.isActive ? '✅ Active' : '❌ Inactive'}
                        </p>
                        <p className="text-xs text-gray-500">
                          <span className="font-medium">Created:</span>{' '}
                          {user.createdAt ? new Date(user.createdAt.seconds * 1000).toLocaleString() : 'N/A'}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <Button
                        size="sm"
                        variant={user.role === 'admin' ? 'primary' : 'outline'}
                        onClick={() => updateUserRole(user.id, 'admin')}
                        disabled={user.role === 'admin'}
                      >
                        Set as Admin
                      </Button>
                      <Button
                        size="sm"
                        variant={user.role === 'auditor' ? 'primary' : 'outline'}
                        onClick={() => updateUserRole(user.id, 'auditor')}
                        disabled={user.role === 'auditor'}
                      >
                        Set as Auditor
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <div className="mt-6">
          <Button onClick={loadUsers} variant="outline">
            🔄 Refresh Users
          </Button>
        </div>

        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Instructions:</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
            <li>This page shows all users from Firestore</li>
            <li>Click "Set as Admin" or "Set as Auditor" to change a user's role</li>
            <li>After updating, logout and login again to see the changes</li>
            <li>Admin users access /admin/dashboard</li>
            <li>Auditor users access /auditor/dashboard</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
