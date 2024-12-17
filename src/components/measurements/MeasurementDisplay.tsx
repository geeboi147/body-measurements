import React from 'react';
import { Ruler } from 'lucide-react';
import { MeasurementCard } from './MeasurementCard';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage } from '../ui/ErrorMessage';
import type { Measurements } from '../../types/measurements';

interface MeasurementDisplayProps {
  measurements: Measurements | null;
  isProcessing: boolean;
  error: string | null;
}

export const MeasurementDisplay: React.FC<MeasurementDisplayProps> = ({
  measurements,
  isProcessing,
  error
}) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <Ruler className="w-6 h-6 text-blue-600" />
        <h3 className="text-xl font-semibold">Measurements</h3>
      </div>
      
      {isProcessing && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      
      {measurements && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <MeasurementCard label="Chest" value={measurements.chest} />
            <MeasurementCard label="Waist" value={measurements.waist} />
            <MeasurementCard label="Hip" value={measurements.hip} />
            <MeasurementCard label="Inseam" value={measurements.inseam} />
          </div>
          <div className="mt-4 text-sm text-gray-500">
            Note: These measurements are approximate. For best results, please consult with your fashion designer.
          </div>
        </div>
      )}
      
      {!measurements && !isProcessing && !error && (
        <div className="text-center text-gray-500 py-12">
          <p>Capture an image to see measurements</p>
        </div>
      )}
    </div>
  );
};