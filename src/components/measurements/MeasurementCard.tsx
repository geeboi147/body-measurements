import React from 'react';

interface MeasurementCardProps {
  label: string;
  value: number;
}

export const MeasurementCard: React.FC<MeasurementCardProps> = ({ label, value }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm">
    <p className="text-sm text-gray-600">{label}</p>
    <p className="text-lg font-semibold">{value} inches</p>
  </div>
);