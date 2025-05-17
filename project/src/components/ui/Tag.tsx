import React from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface TagProps {
  children: React.ReactNode;
  onRemove?: () => void;
  className?: string;
  color?: 'primary' | 'secondary' | 'accent' | 'neutral';
}

export const Tag: React.FC<TagProps> = ({ 
  children, 
  onRemove, 
  className, 
  color = 'primary' 
}) => {
  const colorClasses = {
    primary: 'bg-primary-100 text-primary-800',
    secondary: 'bg-secondary-100 text-secondary-800',
    accent: 'bg-accent-100 text-accent-800',
    neutral: 'bg-gray-100 text-gray-800'
  };
  
  return (
    <span 
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium',
        colorClasses[color],
        className
      )}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          className="ml-1.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full hover:bg-opacity-20 hover:bg-gray-500 focus:outline-none"
          onClick={onRemove}
        >
          <X size={12} className="text-current" />
        </button>
      )}
    </span>
  );
};