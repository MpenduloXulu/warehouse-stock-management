'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/shared/ui/Button';
import { Input } from '@/components/shared/ui/Input';
import { useForm } from '@/hooks/useForm';
import { handleFirebaseError } from '@/utils/errorHandler';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [serverError, setServerError] = useState('');

  const { values, errors, handleChange, handleSubmit, isSubmitting } = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (data) => {
      try {
        setServerError('');
        console.log('Starting login...');
        const user = await login(data);
        console.log('Login successful! User data:', JSON.stringify(user, null, 2));
        console.log('User role from login:', user?.role);
        
        // Small delay to ensure cookies are set
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // Determine role - check multiple sources
        let userRole = user?.role;
        
        // Check cookies as backup
        const cookies = document.cookie.split(';').map(c => c.trim());
        const roleCookie = cookies.find(c => c.startsWith('user-role='));
        if (roleCookie) {
          const cookieRole = roleCookie.split('=')[1];
          console.log('Role from cookie:', cookieRole);
          if (!userRole) userRole = cookieRole;
        }
        
        console.log('Final determined role:', userRole);
        
        // Redirect based on role - strict check
        if (userRole === 'admin') {
          console.log('Redirecting to ADMIN dashboard');
          router.push('/admin/dashboard');
        } else {
          console.log('Redirecting to AUDITOR dashboard');
          router.push('/auditor/dashboard');
        }
      } catch (error: any) {
        console.error('Login error:', error);
        setServerError(handleFirebaseError(error));
      }
    },
    validate: (data) => {
      const errors: Record<string, string> = {};
      if (!data.email) errors.email = 'Email is required';
      if (!data.password) errors.password = 'Password is required';
      return errors;
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        {serverError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm font-semibold mb-2">{serverError}</p>
            {(serverError.includes('configuration') || serverError.includes('offline') || serverError.includes('connect')) && (
              <div className="mt-2 text-xs text-red-700">
                <p className="font-medium mb-1">Setup Required:</p>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>Go to <a href="https://console.firebase.google.com/project/warehouse-simulation-89d63" target="_blank" rel="noopener noreferrer" className="underline hover:text-red-900">Firebase Console</a></li>
                  <li>Enable <strong>Authentication</strong> → Sign-in method → Email/Password</li>
                  <li>Enable <strong>Firestore Database</strong> (Start in test mode)</li>
                  <li>Check your internet connection</li>
                  <li>See <code className="bg-red-100 px-1 rounded">FIREBASE_SETUP.md</code> for detailed steps</li>
                </ol>
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="Enter your email"
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="Enter your password"
            required
          />

          <Button
            type="submit"
            className="w-full"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-primary-600 hover:text-primary-700 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
