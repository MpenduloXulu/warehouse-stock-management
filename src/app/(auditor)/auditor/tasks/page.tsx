'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/shared/ui/Card';
import { Button } from '@/components/shared/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { useTasks } from '@/hooks/useTasks';
import { useItems } from '@/hooks/useItems';
import { itemReportsService } from '@/lib/services/itemReports.service';
import { Item } from '@/types/item.types';

export default function AuditorTasksPage() {
  const { user } = useAuth();
  const { tasks, loading } = useTasks({ assignedTo: user?.uid });
  const { items, loading: itemsLoading } = useItems();
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [reportForm, setReportForm] = useState({
    barcode: '',
    countedQuantity: 0,
    expiryDate: '',
    comments: '',
  });

  // Mark items as viewed when page loads
  useEffect(() => {
    if (items.length > 0) {
      const viewedItems = JSON.parse(localStorage.getItem('viewedItems') || '[]');
      const allItemIds = items.map(item => item.id);
      const updatedViewed = [...new Set([...viewedItems, ...allItemIds])];
      localStorage.setItem('viewedItems', JSON.stringify(updatedViewed));
    }
  }, [items]);

  const activeTasks = tasks.filter(t => 
    t.status === 'assigned' || t.status === 'in_progress'
  );
  const submittedTasks = tasks.filter(t => t.status === 'submitted');
  const completedTasks = tasks.filter(t => t.status === 'approved');
  const rejectedTasks = tasks.filter(t => t.status === 'rejected');

  const handleOpenReportModal = (item: Item) => {
    setSelectedItem(item);
    setReportForm({
      barcode: item.barcodes?.[0] || '',
      countedQuantity: 0,
      expiryDate: '',
      comments: '',
    });
    setShowReportModal(true);
  };

  const handleSubmitReport = async () => {
    if (!selectedItem || !user) return;

    try {
      setSubmitting(true);
      await itemReportsService.createReport({
        itemId: selectedItem.id,
        itemName: selectedItem.name,
        itemDescription: selectedItem.description,
        category: selectedItem.category,
        location: selectedItem.location,
        barcode: reportForm.barcode,
        countedQuantity: reportForm.countedQuantity,
        expiryDate: reportForm.expiryDate || undefined,
        comments: reportForm.comments || undefined,
        auditorId: user.uid,
        auditorName: user.displayName || user.email || 'Unknown',
      });

      alert('Report submitted successfully!');
      setShowReportModal(false);
      setSelectedItem(null);
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Failed to submit report. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
        <p className="text-gray-600 mt-2">View and manage your assigned stock-taking tasks</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-blue-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Active Tasks</p>
              <p className="text-3xl font-bold text-blue-900 mt-2">
                {loading ? '...' : activeTasks.length}
              </p>
            </div>
            <div className="text-4xl">📋</div>
          </div>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Submitted</p>
              <p className="text-3xl font-bold text-purple-900 mt-2">
                {loading ? '...' : submittedTasks.length}
              </p>
            </div>
            <div className="text-4xl">⏳</div>
          </div>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Completed</p>
              <p className="text-3xl font-bold text-green-900 mt-2">
                {loading ? '...' : completedTasks.length}
              </p>
            </div>
            <div className="text-4xl">✅</div>
          </div>
        </Card>

        <Card className="bg-red-50 border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Rejected</p>
              <p className="text-3xl font-bold text-red-900 mt-2">
                {loading ? '...' : rejectedTasks.length}
              </p>
            </div>
            <div className="text-4xl">❌</div>
          </div>
        </Card>
      </div>

      {/* Items to Count */}
      <Card title="Items to Count" className="mb-6">
        {itemsLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">Loading items...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-gray-600 text-lg">No items available</p>
            <p className="text-gray-500 text-sm mt-2">
              Admin hasn't added any items yet
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map(item => (
              <div
                key={item.id}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white"
              >
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    {item.imageUrl ? (
                      <img 
                        src={item.imageUrl} 
                        alt={item.name} 
                        className="w-full h-full object-cover rounded-lg" 
                      />
                    ) : (
                      <span className="text-3xl">📦</span>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                        {item.category}
                      </span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                        {item.location}
                      </span>
                    </div>
                  </div>
                </div>
                
                <Button
                  onClick={() => handleOpenReportModal(item)}
                  className="w-full mt-4"
                  size="sm"
                >
                  📋 Submit Report
                </Button>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Submit Report Modal */}
      {showReportModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Submit Item Report</h2>
              <button
                onClick={() => setShowReportModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              {/* Item Details - Auto Populated */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Item Name <span className="text-gray-400">(Auto-populated)</span>
                </label>
                <input
                  type="text"
                  value={selectedItem.name}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-gray-400">(Auto-populated)</span>
                </label>
                <textarea
                  value={selectedItem.description}
                  disabled
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                />
              </div>

              {/* Category - Auto Populated */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-gray-400">(Auto-populated)</span>
                </label>
                <input
                  type="text"
                  value={selectedItem.category}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                />
              </div>

              {/* Location - Auto Populated */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location <span className="text-gray-400">(Auto-populated)</span>
                </label>
                <input
                  type="text"
                  value={selectedItem.location}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                />
              </div>

              {/* Barcode - Editable */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Barcode <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={reportForm.barcode}
                  onChange={(e) => setReportForm({ ...reportForm, barcode: e.target.value })}
                  placeholder="Enter or scan barcode"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {/* Quantity - Editable */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Counted Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={reportForm.countedQuantity}
                  onChange={(e) => setReportForm({ ...reportForm, countedQuantity: parseInt(e.target.value) || 0 })}
                  placeholder="Enter counted quantity"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  min="0"
                />
              </div>

              {/* Expiry Date - Editable */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date
                </label>
                <input
                  type="date"
                  value={reportForm.expiryDate}
                  onChange={(e) => setReportForm({ ...reportForm, expiryDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {/* Additional Comments - Editable */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Comments
                </label>
                <textarea
                  value={reportForm.comments}
                  onChange={(e) => setReportForm({ ...reportForm, comments: e.target.value })}
                  placeholder="Add any notes or observations about this item..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-6 border-t">
              <Button
                onClick={handleSubmitReport}
                disabled={submitting || !reportForm.barcode || reportForm.countedQuantity < 0}
                className="flex-1"
              >
                {submitting ? 'Submitting...' : '✅ Submit Report'}
              </Button>
              <Button
                onClick={() => setShowReportModal(false)}
                variant="outline"
                className="flex-1"
                disabled={submitting}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* All Tasks Table */}
      <Card title="All My Tasks">
        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No tasks assigned yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Task
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{task.title}</div>
                      <div className="text-sm text-gray-500">{task.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        task.status === 'approved' ? 'bg-green-100 text-green-800' :
                        task.status === 'submitted' ? 'bg-purple-100 text-purple-800' :
                        task.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                        task.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {task.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(task.dueDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {task.submittedAt ? new Date(task.submittedAt).toLocaleDateString() : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
