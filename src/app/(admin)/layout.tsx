'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/shared/ui/Button';
import { itemReportsService } from '@/lib/services/itemReports.service';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [pendingReportsCount, setPendingReportsCount] = useState(0);

  useEffect(() => {
    const fetchPendingCount = async () => {
      const count = await itemReportsService.getPendingReportsCount();
      setPendingReportsCount(count);
    };

    fetchPendingCount();
    // Refresh every 30 seconds
    const interval = setInterval(fetchPendingCount, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
        {/* Sidebar Navigation */}
        <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-primary-600">Admin Panel</h2>
            {user && (
              <div className="mt-3">
                <p className="text-xs text-gray-500">Logged in as</p>
                <p className="text-sm font-medium text-gray-700 truncate">{user.displayName}</p>
              </div>
            )}
          </div>
          
          <nav className="mt-6 flex-1">
            <a
              href="/admin/dashboard"
              className="block px-6 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
            >
              📊 Dashboard
            </a>
            <a
              href="/admin/items"
              className="block px-6 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
            >
              📦 Items
            </a>
            <a
              href="/admin/auditors"
              className="block px-6 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
            >
              👥 Auditors
            </a>
            <a
              href="/admin/reports"
              className="block px-6 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors relative"
            >
              📈 Reports
              {pendingReportsCount > 0 && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                  {pendingReportsCount}
                </span>
              )}
            </a>
          </nav>

          {/* Sign Out Button */}
          <div className="p-4 border-t border-gray-200">
            <Button
              variant="outline"
              className="w-full"
              onClick={handleLogout}
            >
              🚪 Sign Out
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="ml-64">
          {children}
        </div>
      </div>
  );
}
