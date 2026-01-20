'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/shared/ui/Card';
import { Button } from '@/components/shared/ui/Button';
import { usersService, UserProfile } from '@/lib/services/users.service';

export default function AuditorsPage() {
  const [auditors, setAuditors] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAuditors = async () => {
    try {
      setLoading(true);
      const data = await usersService.getUsersByRole('auditor');
      setAuditors(data);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching auditors:', err);
      setError(err.message || 'Failed to fetch auditors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuditors();
    
    // Auto-refresh every 30 seconds to catch new registrations
    const interval = setInterval(fetchAuditors, 30000);
    return () => clearInterval(interval);
  }, []);

  const toggleAuditorStatus = async (auditorId: string, currentStatus: boolean) => {
    try {
      await usersService.updateUserStatus(auditorId, !currentStatus);
      await fetchAuditors();
    } catch (err: any) {
      console.error('Error updating auditor status:', err);
      alert('Failed to update auditor status');
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Auditors Management</h1>
          <p className="text-gray-600 mt-2">View and manage warehouse auditors</p>
        </div>
        <Button onClick={fetchAuditors} variant="outline">
          🔄 Refresh
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-blue-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Total Auditors</p>
              <p className="text-3xl font-bold text-blue-900 mt-2">
                {loading ? '...' : auditors.length}
              </p>
            </div>
            <div className="text-4xl">👥</div>
          </div>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Active Auditors</p>
              <p className="text-3xl font-bold text-green-900 mt-2">
                {loading ? '...' : auditors.filter(a => a.isActive).length}
              </p>
            </div>
            <div className="text-4xl">✅</div>
          </div>
        </Card>

        <Card className="bg-red-50 border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Inactive Auditors</p>
              <p className="text-3xl font-bold text-red-900 mt-2">
                {loading ? '...' : auditors.filter(a => !a.isActive).length}
              </p>
            </div>
            <div className="text-4xl">⛔</div>
          </div>
        </Card>
      </div>

      {/* Auditors List */}
      <Card title="All Auditors">
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">Loading auditors...</p>
          </div>
        ) : auditors.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👥</div>
            <p className="text-gray-600 text-lg">No auditors found</p>
            <p className="text-gray-500 text-sm mt-2">
              Auditors will appear here after they register on the system
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Auditor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Registered
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {auditors.map((auditor) => (
                  <tr key={auditor.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-primary-700 font-semibold text-sm">
                            {auditor.firstName.charAt(0)}{auditor.lastName.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {auditor.firstName} {auditor.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {auditor.id.substring(0, 8)}...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{auditor.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        auditor.isActive 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {auditor.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {auditor.createdAt.toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button
                        size="sm"
                        variant={auditor.isActive ? 'outline' : 'primary'}
                        onClick={() => toggleAuditorStatus(auditor.id, auditor.isActive)}
                      >
                        {auditor.isActive ? 'Deactivate' : 'Activate'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">ℹ️ About Auditors</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-blue-800">
          <li>New auditors appear automatically when they register</li>
          <li>This page refreshes every 30 seconds to show new auditors</li>
          <li>You can activate/deactivate auditors to control their access</li>
          <li>Inactive auditors cannot login to the system</li>
        </ul>
      </div>
    </div>
  );
}
