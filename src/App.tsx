import React from 'react';
import { MeasurementCapture } from './components/MeasurementCapture';
import { Ruler } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Ruler className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Virtual Measurement Studio</h1>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <MeasurementCapture />
      </main>

      <footer className="bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            Note: This tool provides approximate measurements. For best results, please consult with your fashion designer.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;