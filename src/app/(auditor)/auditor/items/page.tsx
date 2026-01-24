'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card } from '@/components/shared/ui/Card';
import { useItems } from '@/hooks/useItems';

export default function AuditorItemsPage() {
  const { items, loading } = useItems();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Filter items based on search and category
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.barcodes?.some(b => b.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.location?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = Array.from(new Set(items.map(i => i.category).filter(Boolean)));

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Warehouse Items</h1>
        <p className="text-gray-600 mt-2">View all items added by admin</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-blue-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Total Items</p>
              <p className="text-3xl font-bold text-blue-900 mt-2">
                {loading ? '...' : items.length}
              </p>
            </div>
            <div className="text-4xl">📦</div>
          </div>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">In Stock</p>
              <p className="text-3xl font-bold text-green-900 mt-2">
                {loading ? '...' : items.filter(i => i.expectedQuantity > 0).length}
              </p>
            </div>
            <div className="text-4xl">✅</div>
          </div>
        </Card>

        <Card className="bg-red-50 border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Out of Stock</p>
              <p className="text-3xl font-bold text-red-900 mt-2">
                {loading ? '...' : items.filter(i => i.expectedQuantity === 0).length}
              </p>
            </div>
            <div className="text-4xl">⚠️</div>
          </div>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Categories</p>
              <p className="text-3xl font-bold text-purple-900 mt-2">
                {loading ? '...' : categories.length}
              </p>
            </div>
            <div className="text-4xl">📋</div>
          </div>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search by name, barcode, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* Items Table */}
      <Card title={`Items (${filteredItems.length})`}>
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">Loading items...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-gray-600 text-lg">
              {items.length === 0 ? 'No items found' : 'No items match your search'}
            </p>
            <p className="text-gray-500 text-sm mt-2">
              {items.length === 0 
                ? 'Admin has not added any items yet'
                : 'Try adjusting your search or filter'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                          {item.imageUrl ? (
                            <Image src={item.imageUrl} alt={item.name} width={40} height={40} className="rounded-lg object-cover" />
                          ) : (
                            <span className="text-gray-500 text-xl">📦</span>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-500">{item.description || 'No description'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {item.category || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.location || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">ℹ️ About Items</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-blue-800">
          <li>This page shows all items added by the admin</li>
          <li>Items update automatically when admin adds new items</li>
          <li>Use search to find specific items by name, barcode, or location</li>
          <li>Filter by category to view specific item types</li>
          <li>You can only view items - editing is admin-only</li>
        </ul>
      </div>
    </div>
  );
}
