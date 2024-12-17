import type { Measurements, Pose, Keypoint } from '../types/measurements';

const PIXEL_TO_INCH_RATIO = 0.1;

export function calculateMeasurements(poses: Pose[]): Measurements {
  if (!poses || poses.length === 0) {
    throw new Error('No pose detected');
  }

  const pose = poses[0];
  if (!pose.keypoints || pose.keypoints.length === 0) {
    throw new Error('Invalid pose data');
  }

  const keypoints = pose.keypoints;
  const measurements = calculateMeasurementsFromKeypoints(keypoints);

  if (!isValidMeasurements(measurements)) {
    throw new Error('Failed to calculate valid measurements');
  }

  return measurements;
}

function calculateMeasurementsFromKeypoints(keypoints: Keypoint[]): Measurements {
  const leftShoulder = findKeypoint(keypoints, 'left_shoulder');
  const rightShoulder = findKeypoint(keypoints, 'right_shoulder');
  const leftHip = findKeypoint(keypoints, 'left_hip');
  const rightHip = findKeypoint(keypoints, 'right_hip');
  const leftAnkle = findKeypoint(keypoints, 'left_ankle');

  const shoulderWidth = calculateDistance(leftShoulder, rightShoulder);
  const hipWidth = calculateDistance(leftHip, rightHip);
  const inseamLength = calculateDistance(leftHip, leftAnkle);

  return {
    chest: Math.round(shoulderWidth * PIXEL_TO_INCH_RATIO * 1.2),
    waist: Math.round(hipWidth * PIXEL_TO_INCH_RATIO * 0.9),
    hip: Math.round(hipWidth * PIXEL_TO_INCH_RATIO),
    inseam: Math.round(inseamLength * PIXEL_TO_INCH_RATIO),
  };
}

function findKeypoint(keypoints: Keypoint[], name: string): Keypoint {
  const keypoint = keypoints.find(kp => kp.name === name);
  if (!keypoint) {
    throw new Error(`Keypoint ${name} not found`);
  }
  return keypoint;
}

function calculateDistance(point1: Keypoint, point2: Keypoint): number {
  const dx = point2.x - point1.x;
  const dy = point2.y - point1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function isValidMeasurements(measurements: Measurements): boolean {
  return Object.values(measurements).every(value => 
    typeof value === 'number' && 
    !isNaN(value) && 
    value > 0 && 
    value < 100
  );
}