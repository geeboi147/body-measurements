import React from 'react';
import Webcam from 'react-webcam';
import { Camera, Image as ImageIcon } from 'lucide-react';
import { CaptureButton } from '../ui/CaptureButton';

interface CameraCaptureProps {
  webcamRef: React.RefObject<Webcam>;
  image: string | null;
  isProcessing: boolean;
  onCapture: () => void;
  onRetake: () => void;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({
  webcamRef,
  image,
  isProcessing,
  onCapture,
  onRetake
}) => {
  if (!image) {
    return (
      <div className="relative">
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="w-full rounded-lg"
        />
        <CaptureButton
          onClick={onCapture}
          disabled={isProcessing}
          icon={<Camera className="w-5 h-5" />}
          label="Capture Image"
          variant="primary"
        />
      </div>
    );
  }

  return (
    <div className="relative">
      <img src={image} alt="Captured" className="w-full rounded-lg" />
      <CaptureButton
        onClick={onRetake}
        icon={<ImageIcon className="w-5 h-5" />}
        label="Retake Photo"
        variant="secondary"
      />
    </div>
  );
};