import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div 
      className={cn(
        'rounded-lg bg-white shadow-md overflow-hidden transition-all hover:shadow-lg',
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ className?: string, children: React.ReactNode }> = ({ 
  className, 
  children 
}) => {
  return (
    <div className={cn('p-6 pb-4', className)}>
      {children}
    </div>
  );
};

export const CardContent: React.FC<{ className?: string, children: React.ReactNode }> = ({ 
  className, 
  children 
}) => {
  return (
    <div className={cn('px-6 py-2', className)}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<{ className?: string, children: React.ReactNode }> = ({ 
  className, 
  children 
}) => {
  return (
    <div className={cn('p-6 pt-4 flex items-center', className)}>
      {children}
    </div>
  );
};

export const CardTitle: React.FC<{ className?: string, children: React.ReactNode }> = ({ 
  className, 
  children 
}) => {
  return (
    <h3 className={cn('text-xl font-semibold', className)}>
      {children}
    </h3>
  );
};

export const CardDescription: React.FC<{ className?: string, children: React.ReactNode }> = ({ 
  className, 
  children 
}) => {
  return (
    <p className={cn('text-sm text-gray-500', className)}>
      {children}
    </p>
  );
};