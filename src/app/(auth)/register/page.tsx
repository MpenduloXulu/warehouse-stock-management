'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/shared/ui/Button';
import { Input } from '@/components/shared/ui/Input';
import { useForm } from '@/hooks/useForm';
import { handleFirebaseError } from '@/utils/errorHandler';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { values, errors, handleChange, handleSubmit, isSubmitting } = useForm({
    initialValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      role: 'auditor' as 'admin' | 'auditor',
    },
    onSubmit: async (data) => {
      try {
        setServerError('');
        setSuccessMessage('');
        console.log('Starting registration with data:', data);
        await register(data);
        console.log('Registration successful! Showing success message...');
        
        // Show success message
        setSuccessMessage('Account created successfully! Redirecting to dashboard...');
        
        // Small delay to show message and ensure cookies are set
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Redirect based on role
        const dashboardPath = data.role === 'admin' ? '/admin/dashboard' : '/auditor/dashboard';
        console.log('Redirecting to:', dashboardPath);
        router.push(dashboardPath);
      } catch (error: any) {
        console.error('Registration error:', error);
        setServerError(handleFirebaseError(error));
      }
    },
    validate: (data) => {
      const errors: Record<string, string> = {};
      if (!data.email) errors.email = 'Email is required';
      if (!data.password) errors.password = 'Password is required';
      if (data.password.length < 6) errors.password = 'Password must be at least 6 characters';
      if (!data.firstName) errors.firstName = 'First name is required';
      if (!data.lastName) errors.lastName = 'Last name is required';
      return errors;
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600">Join our warehouse management system</p>
        </div>

        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-600 text-sm font-semibold flex items-center gap-2">
              <span>✅</span>
              {successMessage}
            </p>
          </div>
        )}

        {serverError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm font-semibold mb-2">{serverError}</p>
            {(serverError.includes('configuration') || serverError.includes('offline') || serverError.includes('connect')) && (
              <div className="mt-2 text-xs text-red-700">
                <p className="font-medium mb-1">Setup Required:</p>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>Go to <a href="https://console.firebase.google.com/project/warehouse-simulation-89d63" target="_blank" rel="noopener noreferrer" className="underline hover:text-red-900">Firebase Console</a></li>
                  <li>Enable <strong>Authentication</strong> → Sign-in method → Email/Password</li>
                  <li>Enable <strong>Firestore Database</strong> (Create database in test mode)</li>
                  <li>Check your internet connection</li>
                  <li>Refresh and try again</li>
                </ol>
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First Name"
              type="text"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              error={errors.firstName}
              placeholder="John"
              required
            />

            <Input
              label="Last Name"
              type="text"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              error={errors.lastName}
              placeholder="Doe"
              required
            />
          </div>

          <Input
            label="Email"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="john@example.com"
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="At least 6 characters"
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <select
              name="role"
              value={values.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="auditor">Auditor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <Button
            type="submit"
            className="w-full"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Create Account
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-primary-600 hover:text-primary-700 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
