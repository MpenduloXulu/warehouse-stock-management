'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/shared/ui/Card';
import { Button } from '@/components/shared/ui/Button';
import { useTasks } from '@/hooks/useTasks';
import { usersService, UserProfile } from '@/lib/services/users.service';

export default function TasksPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { tasks, loading } = useTasks();
  const [auditors, setAuditors] = useState<UserProfile[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    loadAuditors();
  }, []);

  const loadAuditors = async () => {
    try {
      const data = await usersService.getUsersByRole('auditor');
      setAuditors(data.filter(a => a.isActive));
    } catch (error) {
      console.error('Error loading auditors:', error);
    }
  };

  const pendingTasks = tasks.filter(t => t.status === 'pending' || t.status === 'assigned');
  const inProgressTasks = tasks.filter(t => t.status === 'in_progress');
  const submittedTasks = tasks.filter(t => t.status === 'submitted');
  const completedTasks = tasks.filter(t => t.status === 'approved' || t.status === 'rejected');

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tasks Management</h1>
          <p className="text-gray-600 mt-2">Create and manage stock-taking tasks</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          <span className="mr-2">+</span>
          Create New Task
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-yellow-50 border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600">Pending</p>
              <p className="text-3xl font-bold text-yellow-900 mt-2">
                {loading ? '...' : pendingTasks.length}
              </p>
            </div>
            <div className="text-4xl">⏳</div>
          </div>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">In Progress</p>
              <p className="text-3xl font-bold text-blue-900 mt-2">
                {loading ? '...' : inProgressTasks.length}
              </p>
            </div>
            <div className="text-4xl">🔄</div>
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
            <div className="text-4xl">📋</div>
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

      {/* Tasks List */}
      <Card title="All Tasks">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">Loading tasks...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-gray-600 text-lg">No tasks found</p>
            <p className="text-gray-500 text-sm mt-2">
              Click &quot;Create New Task&quot; to assign stock-taking tasks to auditors
            </p>
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
                    Assigned To
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
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
                      <div className="text-sm text-gray-900">
                        {auditors.find(a => a.id === task.assignedTo)?.firstName || 'Unassigned'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        task.status === 'approved' ? 'bg-green-100 text-green-800' :
                        task.status === 'submitted' ? 'bg-purple-100 text-purple-800' :
                        task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                        task.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {task.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(task.dueDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => router.push(`/admin/tasks/${task.id}`)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
            <h2 className="text-2xl font-bold mb-4">Create New Task</h2>
            <p className="text-gray-600 mb-4">
              Task creation form coming soon. This will allow you to assign stock-taking tasks to auditors.
            </p>
            <Button onClick={() => setShowCreateForm(false)}>Close</Button>
          </div>
        </div>
      )}
    </div>
  );
}
