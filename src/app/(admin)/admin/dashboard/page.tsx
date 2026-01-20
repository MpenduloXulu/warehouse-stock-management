'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/shared/ui/Card';
import { Button } from '@/components/shared/ui/Button';
import { useItems } from '@/hooks/useItems';
import { useTasks } from '@/hooks/useTasks';

export default function AdminDashboard() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { items, loading: itemsLoading } = useItems();
  const { tasks, loading: tasksLoading } = useTasks();

  const pendingTasks = tasks.filter(t => t.status === 'pending' || t.status === 'assigned');
  const submittedTasks = tasks.filter(t => t.status === 'submitted');
  const completedTasks = tasks.filter(t => t.status === 'approved');

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-blue-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Total Items</p>
              <p className="text-3xl font-bold text-blue-900 mt-2">
                {itemsLoading ? '...' : items.length}
              </p>
            </div>
            <div className="text-4xl">📦</div>
          </div>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600">Pending Tasks</p>
              <p className="text-3xl font-bold text-yellow-900 mt-2">
                {tasksLoading ? '...' : pendingTasks.length}
              </p>
            </div>
            <div className="text-4xl">⏳</div>
          </div>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Submitted</p>
              <p className="text-3xl font-bold text-purple-900 mt-2">
                {tasksLoading ? '...' : submittedTasks.length}
              </p>
            </div>
            <div className="text-4xl">📋</div>
          </div>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Completed</p>
              <p className="text-3xl font-bold text-green-900 mt-2">
                {tasksLoading ? '...' : completedTasks.length}
              </p>
            </div>
            <div className="text-4xl">✅</div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Quick Actions">
          <div className="space-y-3">
            <a
              href="/admin/items"
              className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Manage Items</h3>
                  <p className="text-sm text-gray-600">View and add warehouse items</p>
                </div>
                <span className="text-2xl">📦</span>
              </div>
            </a>

            <a
              href="/admin/tasks/new"
              className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Create Task</h3>
                  <p className="text-sm text-gray-600">Assign a stock-taking task</p>
                </div>
                <span className="text-2xl">📝</span>
              </div>
            </a>

            <a
              href="/admin/reports"
              className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">View Reports</h3>
                  <p className="text-sm text-gray-600">Generate analytics and reports</p>
                </div>
                <span className="text-2xl">📊</span>
              </div>
            </a>
          </div>
        </Card>

        <Card title="Recent Activity">
          <div className="space-y-3">
            {tasks.slice(0, 5).map(task => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{task.title}</p>
                  <p className="text-sm text-gray-600">{task.status}</p>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(task.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
            {tasks.length === 0 && !tasksLoading && (
              <p className="text-gray-500 text-center py-4">No recent activity</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
