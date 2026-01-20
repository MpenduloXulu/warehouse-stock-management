import { useState, useEffect } from 'react';
import { tasksService } from '@/lib/services/tasks.service';
import { Task, CreateTaskInput, UpdateTaskInput, TaskFilters } from '@/types';

export const useTasks = (filters?: TaskFilters) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = filters
        ? await tasksService.filterTasks(filters)
        : await tasksService.getAllTasks();
      setTasks(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [JSON.stringify(filters)]);

  const createTask = async (data: CreateTaskInput, userId: string, userName: string) => {
    try {
      const id = await tasksService.createTask(data, userId, userName);
      await fetchTasks();
      return id;
    } catch (err: any) {
      throw new Error(err.message || 'Failed to create task');
    }
  };

  const updateTask = async (id: string, data: UpdateTaskInput) => {
    try {
      await tasksService.updateTask(id, data);
      await fetchTasks();
    } catch (err: any) {
      throw new Error(err.message || 'Failed to update task');
    }
  };

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    refetch: fetchTasks,
  };
};
