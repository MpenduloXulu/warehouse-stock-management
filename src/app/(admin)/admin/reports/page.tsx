'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/shared/ui/Card';
import { Button } from '@/components/shared/ui/Button';
import { useItems } from '@/hooks/useItems';
import { useTasks } from '@/hooks/useTasks';
import { itemReportsService } from '@/lib/services/itemReports.service';
import { ItemReport } from '@/types/itemReport.types';

export default function ReportsPage() {
  const { items, loading: itemsLoading } = useItems();
  const { tasks, loading: tasksLoading } = useTasks();
  const [itemReports, setItemReports] = useState<ItemReport[]>([]);
  const [reportsLoading, setReportsLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const reports = await itemReportsService.getAllReports();
        setItemReports(reports);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setReportsLoading(false);
      }
    };

    fetchReports();
    // Refresh every 30 seconds
    const interval = setInterval(fetchReports, 30000);
    return () => clearInterval(interval);
  }, []);

  const completedTasks = tasks.filter(t => t.status === 'approved');
  const submittedTasks = tasks.filter(t => t.status === 'submitted');
  const pendingReports = itemReports.filter(r => r.status === 'pending');
  const approvedReports = itemReports.filter(r => r.status === 'approved');
  const totalItems = items.length;
  const lowStockItems = items.filter(i => i.expectedQuantity > 0 && i.expectedQuantity < 10).length;
  const outOfStockItems = items.filter(i => i.expectedQuantity === 0).length;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-2">View warehouse performance and statistics</p>
        </div>
        <Button variant="outline">
          📊 Export Report
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <Card className="bg-purple-50 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Pending Reports</p>
              <p className="text-3xl font-bold text-purple-900 mt-2">
                {reportsLoading ? '...' : pendingReports.length}
              </p>
            </div>
            <div className="text-4xl">📋</div>
          </div>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Total Items</p>
              <p className="text-3xl font-bold text-blue-900 mt-2">
                {itemsLoading ? '...' : totalItems}
              </p>
            </div>
            <div className="text-4xl">📦</div>
          </div>
        </Card>

        <Card className="bg-red-50 border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Out of Stock</p>
              <p className="text-3xl font-bold text-red-900 mt-2">
                {itemsLoading ? '...' : outOfStockItems}
              </p>
            </div>
            <div className="text-4xl">⚠️</div>
          </div>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600">Low Stock</p>
              <p className="text-3xl font-bold text-yellow-900 mt-2">
                {itemsLoading ? '...' : lowStockItems}
              </p>
            </div>
            <div className="text-4xl">📉</div>
          </div>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Tasks Completed</p>
              <p className="text-3xl font-bold text-green-900 mt-2">
                {tasksLoading ? '...' : completedTasks.length}
              </p>
            </div>
            <div className="text-4xl">✅</div>
          </div>
        </Card>
      </div>

      {/* Task Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card title="Task Performance">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Completed Tasks</p>
                <p className="text-sm text-gray-600">Approved by admin</p>
              </div>
              <span className="text-2xl font-bold text-green-600">
                {tasksLoading ? '...' : completedTasks.length}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Submitted Tasks</p>
                <p className="text-sm text-gray-600">Awaiting review</p>
              </div>
              <span className="text-2xl font-bold text-purple-600">
                {tasksLoading ? '...' : submittedTasks.length}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Total Tasks</p>
                <p className="text-sm text-gray-600">All time</p>
              </div>
              <span className="text-2xl font-bold text-blue-600">
                {tasksLoading ? '...' : tasks.length}
              </span>
            </div>
          </div>
        </Card>

        <Card title="Inventory Status">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">In Stock</p>
                <p className="text-sm text-gray-600">Items available</p>
              </div>
              <span className="text-2xl font-bold text-green-600">
                {itemsLoading ? '...' : items.filter(i => i.expectedQuantity > 10).length}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Low Stock Alert</p>
                <p className="text-sm text-gray-600">Less than 10 units</p>
              </div>
              <span className="text-2xl font-bold text-yellow-600">
                {itemsLoading ? '...' : lowStockItems}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Out of Stock</p>
                <p className="text-sm text-gray-600">Needs reorder</p>
              </div>
              <span className="text-2xl font-bold text-red-600">
                {itemsLoading ? '...' : outOfStockItems}
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Submitted Item Reports */}
      <Card title="Submitted Item Reports" className="mb-8">
        {reportsLoading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">Loading reports...</p>
          </div>
        ) : itemReports.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-gray-600">No reports submitted yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Auditor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Counted Qty
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {itemReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{report.itemName}</div>
                      <div className="text-sm text-gray-500">{report.barcode}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{report.auditorName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {report.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {report.countedQuantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        report.status === 'approved' ? 'bg-green-100 text-green-800' :
                        report.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {report.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(report.submittedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {report.status === 'pending' ? (
                        <div className="flex gap-2">
                          <button className="text-green-600 hover:text-green-900 font-medium">
                            Approve
                          </button>
                          <button className="text-red-600 hover:text-red-900 font-medium">
                            Reject
                          </button>
                        </div>
                      ) : (
                        <button className="text-blue-600 hover:text-blue-900 font-medium">
                          View
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Recent Items */}
      <Card title="Low Stock Items">
        {itemsLoading ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading...</p>
          </div>
        ) : lowStockItems === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No low stock items</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items
              .filter(i => i.expectedQuantity > 0 && i.expectedQuantity < 10)
              .slice(0, 10)
              .map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.category || 'Uncategorized'}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-yellow-600">{item.expectedQuantity} {item.unit || 'units'}</p>
                    <p className="text-xs text-gray-500">Low stock</p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </Card>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">📊 About Reports</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-blue-800">
          <li>Real-time statistics updated automatically</li>
          <li>Track inventory levels and identify low stock items</li>
          <li>Monitor task completion rates</li>
          <li>Export functionality coming soon</li>
        </ul>
      </div>
    </div>
  );
}
