import * as tf from '@tensorflow/tfjs';
import * as poseDetection from '@tensorflow-models/pose-detection';
import type { Pose } from '../types/measurements';

let detector: poseDetection.PoseDetector | null = null;

export async function initializeDetector(): Promise<poseDetection.PoseDetector> {
  if (!detector) {
    try {
      await tf.ready();
      const model = poseDetection.SupportedModels.BlazePose;
      const detectorConfig = {
        runtime: 'tfjs',
        modelType: 'full'
      };
      detector = await poseDetection.createDetector(model, detectorConfig);
    } catch (error) {
      throw new Error('Failed to initialize pose detector');
    }
  }
  return detector;
}

export async function detectPose(imageSource: string): Promise<Pose[]> {
  const detector = await initializeDetector();
  
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imageSource;
    
    img.onload = async () => {
      try {
        const poses = await detector.estimatePoses(img);
        resolve(poses as Pose[]);
      } catch (error) {
        reject(new Error('Failed to detect pose'));
      }
    };
    
    img.onerror = () => reject(new Error('Failed to load image'));
  });
}