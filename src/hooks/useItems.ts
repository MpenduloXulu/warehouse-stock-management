import { useState, useEffect, useCallback } from 'react';
import { itemsService } from '@/lib/services/items.service';
import { Item, CreateItemInput, UpdateItemInput, ItemSearchFilters } from '@/types';

export const useItems = (filters?: ItemSearchFilters) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const data = filters
        ? await itemsService.searchItems(filters)
        : await itemsService.getAllItems();
      setItems(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch items');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const createItem = async (data: CreateItemInput, userId: string) => {
    try {
      const id = await itemsService.createItem(data, userId);
      await fetchItems();
      return id;
    } catch (err: any) {
      throw new Error(err.message || 'Failed to create item');
    }
  };

  const updateItem = async (id: string, data: UpdateItemInput) => {
    try {
      await itemsService.updateItem(id, data);
      await fetchItems();
    } catch (err: any) {
      throw new Error(err.message || 'Failed to update item');
    }
  };

  const deleteItem = async (id: string) => {
    try {
      await itemsService.deleteItem(id);
      await fetchItems();
    } catch (err: any) {
      throw new Error(err.message || 'Failed to delete item');
    }
  };

  return {
    items,
    loading,
    error,
    addItem: createItem,
    createItem,
    updateItem,
    deleteItem,
    refetch: fetchItems,
  };
};
