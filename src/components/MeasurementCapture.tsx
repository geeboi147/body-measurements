import React from 'react';
import { CameraCapture } from './camera/CameraCapture';
import { MeasurementDisplay } from './measurements/MeasurementDisplay';
import { Instructions } from './ui/Instructions';
import { useMeasurementCapture } from '../hooks/useMeasurementCapture';

export const MeasurementCapture: React.FC = () => {
  const {
    webcamRef,
    image,
    measurements,
    isProcessing,
    error,
    handleCapture,
    handleRetake
  } = useMeasurementCapture();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <Instructions />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CameraCapture
            webcamRef={webcamRef}
            image={image}
            isProcessing={isProcessing}
            onCapture={handleCapture}
            onRetake={handleRetake}
          />

          <MeasurementDisplay
            measurements={measurements}
            isProcessing={isProcessing}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};