'use client';

import { useState } from 'react';
import { Card } from '@/components/shared/ui/Card';
import { Button } from '@/components/shared/ui/Button';
import { useItems } from '@/hooks/useItems';

export default function AuditorScanPage() {
  const { items } = useItems();
  const [scannedBarcode, setScannedBarcode] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    if (!scannedBarcode.trim()) return;

    const item = items.find(i => 
      i.barcode?.toLowerCase() === scannedBarcode.toLowerCase()
    );

    setSearchResult(item || null);
  };

  const handleManualSearch = () => {
    if (!scannedBarcode.trim()) return;

    const item = items.find(i => 
      i.name.toLowerCase().includes(scannedBarcode.toLowerCase()) ||
      i.barcode?.toLowerCase().includes(scannedBarcode.toLowerCase())
    );

    setSearchResult(item || null);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Scan Items</h1>
        <p className="text-gray-600 mt-2">Scan or search for warehouse items</p>
      </div>

      {/* Scanner Card */}
      <Card title="Barcode Scanner" className="mb-6">
        <div className="space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              value={scannedBarcode}
              onChange={(e) => setScannedBarcode(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleScan()}
              placeholder="Enter barcode or item name..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-lg"
            />
            <Button onClick={handleScan} size="lg">
              🔍 Search
            </Button>
          </div>

          <div className="flex gap-4">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => setIsScanning(true)}
            >
              📷 Open Camera Scanner
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={handleManualSearch}
            >
              📝 Manual Search
            </Button>
          </div>
        </div>
      </Card>

      {/* Search Result */}
      {searchResult !== null && (
        <Card title="Search Result">
          {searchResult ? (
            <div className="space-y-4">
              <div className="flex items-start gap-6">
                <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  {searchResult.imageUrl ? (
                    <img 
                      src={searchResult.imageUrl} 
                      alt={searchResult.name} 
                      className="w-full h-full object-cover rounded-lg" 
                    />
                  ) : (
                    <span className="text-6xl">📦</span>
                  )}
                </div>

                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{searchResult.name}</h3>
                    <p className="text-gray-600 mt-1">{searchResult.description || 'No description'}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Barcode</p>
                      <p className="font-semibold text-gray-900">{searchResult.barcode || 'N/A'}</p>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Category</p>
                      <p className="font-semibold text-gray-900">{searchResult.category || 'Uncategorized'}</p>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="font-semibold text-gray-900">{searchResult.location || 'Not specified'}</p>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Quantity</p>
                      <p className={`font-semibold ${
                        searchResult.quantity === 0 ? 'text-red-600' :
                        searchResult.quantity < 10 ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>
                        {searchResult.quantity} {searchResult.unit || 'units'}
                      </p>
                    </div>
                  </div>

                  {searchResult.expiryDate && (
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-xs text-yellow-700">Expiry Date</p>
                      <p className="font-semibold text-yellow-900">
                        {new Date(searchResult.expiryDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button className="flex-1">
                  ✅ Confirm Count
                </Button>
                <Button variant="outline" className="flex-1">
                  📝 Report Issue
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">❌</div>
              <p className="text-gray-600 text-lg">Item not found</p>
              <p className="text-gray-500 text-sm mt-2">
                No item matches the barcode "{scannedBarcode}"
              </p>
            </div>
          )}
        </Card>
      )}

      {/* Camera Scanner Modal */}
      {isScanning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
            <h2 className="text-2xl font-bold mb-4">Camera Scanner</h2>
            <div className="aspect-video bg-gray-900 rounded-lg mb-4 flex items-center justify-center">
              <p className="text-white">Camera preview coming soon...</p>
            </div>
            <p className="text-gray-600 mb-4">
              Barcode scanning functionality will be integrated with device camera or external scanner.
            </p>
            <Button onClick={() => setIsScanning(false)} variant="outline" className="w-full">
              Close
            </Button>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">📱 How to Scan</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-blue-800">
          <li>Enter barcode manually and press Search</li>
          <li>Click "Open Camera Scanner" to use device camera (coming soon)</li>
          <li>Use external barcode scanner connected to your device</li>
          <li>Search by item name if you don't have the barcode</li>
        </ul>
      </div>
    </div>
  );
}
