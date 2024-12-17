import { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { detectPose } from '../utils/poseDetection';
import { calculateMeasurements } from '../utils/measurements';
import type { Measurements } from '../types/measurements';

export function useMeasurementCapture() {
  const webcamRef = useRef<Webcam>(null);
  const [image, setImage] = useState<string | null>(null);
  const [measurements, setMeasurements] = useState<Measurements | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCapture = useCallback(async () => {
    if (!webcamRef.current) {
      setError('Camera not initialized');
      return;
    }

    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) {
      setError('Failed to capture image');
      return;
    }

    setImage(imageSrc);
    setIsProcessing(true);
    setError(null);
    
    try {
      const poses = await detectPose(imageSrc);
      const measurements = calculateMeasurements(poses);
      setMeasurements(measurements);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to process measurements');
      setMeasurements(null);
    } finally {
      setIsProcessing(false);
    }
  }, [webcamRef]);

  const handleRetake = useCallback(() => {
    setImage(null);
    setMeasurements(null);
    setError(null);
  }, []);

  return {
    webcamRef,
    image,
    measurements,
    isProcessing,
    error,
    handleCapture,
    handleRetake
  };
}