export interface Measurements {
  chest: number;
  waist: number;
  hip: number;
  inseam: number;
}

export interface Keypoint {
  name: string;
  x: number;
  y: number;
  score?: number;
}

export interface Pose {
  keypoints: Keypoint[];
  score?: number;
}