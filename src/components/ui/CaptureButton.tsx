import React from 'react';

interface CaptureButtonProps {
  onClick: () => void;
  disabled?: boolean;
  icon: React.ReactNode;
  label: string;
  variant: 'primary' | 'secondary';
}

export const CaptureButton: React.FC<CaptureButtonProps> = ({
  onClick,
  disabled,
  icon,
  label,
  variant
}) => {
  const baseClasses = "absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full flex items-center gap-2 transition-colors";
  const variantClasses = variant === 'primary' 
    ? "bg-blue-600 text-white hover:bg-blue-700"
    : "bg-gray-600 text-white hover:bg-gray-700";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses}`}
    >
      {icon}
      {label}
    </button>
  );
};