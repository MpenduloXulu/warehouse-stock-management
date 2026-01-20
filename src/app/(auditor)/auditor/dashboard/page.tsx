'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/shared/ui/Card';
import { Button } from '@/components/shared/ui/Button';
import { useTasks } from '@/hooks/useTasks';

export default function AuditorDashboard() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { tasks, loading } = useTasks({ assignedTo: user?.uid });

  const activeTasks = tasks.filter(t => 
    t.status === 'assigned' || t.status === 'in_progress'
  );
  const completedTasks = tasks.filter(t => t.status === 'approved');
  const pendingReview = tasks.filter(t => t.status === 'submitted');

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Auditor Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user?.displayName}</p>
        </div>
        <Button
          variant="outline"
          onClick={async () => {
            await logout();
            router.push('/login');
          }}
        >
          🚪 Sign Out
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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

        <Card className="bg-yellow-50 border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600">Pending Review</p>
              <p className="text-3xl font-bold text-yellow-900 mt-2">
                {loading ? '...' : pendingReview.length}
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
      </div>

      {/* Active Tasks */}
      <Card title="My Active Tasks" className="mb-6">
        <div className="space-y-3">
          {activeTasks.length > 0 ? (
            activeTasks.map(task => (
              <a
                key={task.id}
                href={`/auditor/tasks/${task.id}`}
                className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{task.title}</h3>
                    <p className="text-sm text-gray-600">{task.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    task.status === 'assigned' 
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {task.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              </a>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">
              {loading ? 'Loading...' : 'No active tasks assigned to you'}
            </p>
          )}
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Quick Actions">
          <div className="space-y-3">
            <a
              href="/auditor/tasks"
              className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">View All Tasks</h3>
                  <p className="text-sm text-gray-600">See all assigned tasks</p>
                </div>
                <span className="text-2xl">📝</span>
              </div>
            </a>

            <a
              href="/auditor/scan"
              className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Scan Items</h3>
                  <p className="text-sm text-gray-600">Use barcode scanner</p>
                </div>
                <span className="text-2xl">📷</span>
              </div>
            </a>

            <a
              href="/auditor/history"
              className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Task History</h3>
                  <p className="text-sm text-gray-600">View completed tasks</p>
                </div>
                <span className="text-2xl">📊</span>
              </div>
            </a>
          </div>
        </Card>

        <Card title="Recent Submissions">
          <div className="space-y-3">
            {pendingReview.concat(completedTasks).slice(0, 5).map(task => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{task.title}</p>
                  <p className="text-sm text-gray-600">{task.status}</p>
                </div>
                <span className="text-xs text-gray-500">
                  {task.submittedAt ? new Date(task.submittedAt).toLocaleDateString() : '-'}
                </span>
              </div>
            ))}
            {tasks.length === 0 && !loading && (
              <p className="text-gray-500 text-center py-4">No submissions yet</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
