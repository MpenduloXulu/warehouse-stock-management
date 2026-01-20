'use client';

import { Card } from '@/components/shared/ui/Card';
import { useAuth } from '@/context/AuthContext';
import { useTasks } from '@/hooks/useTasks';

export default function AuditorHistoryPage() {
  const { user } = useAuth();
  const { tasks, loading } = useTasks({ assignedTo: user?.uid });

  const completedTasks = tasks.filter(t => 
    t.status === 'approved' || t.status === 'rejected' || t.status === 'submitted'
  ).sort((a, b) => {
    const dateA = a.submittedAt ? new Date(a.submittedAt).getTime() : 0;
    const dateB = b.submittedAt ? new Date(b.submittedAt).getTime() : 0;
    return dateB - dateA;
  });

  const approvedCount = tasks.filter(t => t.status === 'approved').length;
  const rejectedCount = tasks.filter(t => t.status === 'rejected').length;
  const submittedCount = tasks.filter(t => t.status === 'submitted').length;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Task History</h1>
        <p className="text-gray-600 mt-2">View your completed and submitted tasks</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-green-50 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Approved Tasks</p>
              <p className="text-3xl font-bold text-green-900 mt-2">
                {loading ? '...' : approvedCount}
              </p>
            </div>
            <div className="text-4xl">✅</div>
          </div>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Pending Review</p>
              <p className="text-3xl font-bold text-purple-900 mt-2">
                {loading ? '...' : submittedCount}
              </p>
            </div>
            <div className="text-4xl">⏳</div>
          </div>
        </Card>

        <Card className="bg-red-50 border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Rejected Tasks</p>
              <p className="text-3xl font-bold text-red-900 mt-2">
                {loading ? '...' : rejectedCount}
              </p>
            </div>
            <div className="text-4xl">❌</div>
          </div>
        </Card>
      </div>

      {/* History Timeline */}
      <Card title="Task History">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">Loading history...</p>
          </div>
        ) : completedTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-gray-600 text-lg">No history yet</p>
            <p className="text-gray-500 text-sm mt-2">
              Your completed tasks will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {completedTasks.map((task) => (
              <div
                key={task.id}
                className={`p-4 rounded-lg border-2 ${
                  task.status === 'approved' ? 'bg-green-50 border-green-200' :
                  task.status === 'rejected' ? 'bg-red-50 border-red-200' :
                  'bg-purple-50 border-purple-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900 text-lg">{task.title}</h3>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        task.status === 'approved' ? 'bg-green-100 text-green-800' :
                        task.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {task.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                    
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="flex items-center gap-2 text-gray-600">
                        <span>📅</span>
                        <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                      {task.submittedAt && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <span>✅</span>
                          <span>Submitted: {new Date(task.submittedAt).toLocaleDateString()}</span>
                        </div>
                      )}
                      {task.approvedAt && (
                        <div className="flex items-center gap-2 text-green-700">
                          <span>✓</span>
                          <span>Approved: {new Date(task.approvedAt).toLocaleDateString()}</span>
                        </div>
                      )}
                      {task.rejectedAt && (
                        <div className="flex items-center gap-2 text-red-700">
                          <span>✗</span>
                          <span>Rejected: {new Date(task.rejectedAt).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>

                    {task.adminNotes && (
                      <div className="mt-3 p-3 bg-white rounded border border-gray-200">
                        <p className="text-xs font-medium text-gray-700 mb-1">Admin Notes:</p>
                        <p className="text-sm text-gray-600">{task.adminNotes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Performance Summary */}
      {completedTasks.length > 0 && (
        <Card title="Performance Summary" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Completion Rate</h4>
              <div className="flex items-center gap-4">
                <div className="flex-1 bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-green-500 h-4 rounded-full transition-all"
                    style={{ width: `${(approvedCount / completedTasks.length) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {Math.round((approvedCount / completedTasks.length) * 100)}%
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Task Statistics</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Completed:</span>
                  <span className="font-medium">{completedTasks.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Approved:</span>
                  <span className="font-medium text-green-600">{approvedCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rejected:</span>
                  <span className="font-medium text-red-600">{rejectedCount}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
