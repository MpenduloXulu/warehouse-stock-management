import Link from 'next/link';
import { Button } from '@/components/shared/ui/Button';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Warehouse Stock Simulation
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Streamline your warehouse inventory management with our comprehensive stock-taking solution
          </p>
          
          <div className="flex gap-4 justify-center mb-16">
            <Link href="/login">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" size="lg">Sign Up</Button>
            </Link>
          </div>

          <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800 text-center">
              <strong>First time setup?</strong> Test your Firebase connection first →{' '}
              <Link href="/firebase-test" className="text-yellow-900 underline font-semibold hover:text-yellow-950">
                Firebase Test Page
              </Link>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-xl font-semibold mb-2">Item Management</h3>
              <p className="text-gray-600">
                Easily manage warehouse items with barcode support and detailed tracking
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-semibold mb-2">Task Assignment</h3>
              <p className="text-gray-600">
                Assign stock-taking tasks to auditors and track progress in real-time
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2">Reports & Analytics</h3>
              <p className="text-gray-600">
                Generate comprehensive reports and identify discrepancies instantly
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
