import React from 'react';
import Card from './Card';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
  className?: string;
}

const MetricCard = ({ 
  title, 
  value, 
  unit = '', 
  trend, 
  icon,
  className = '' 
}: MetricCardProps) => {
  return (
    <Card className={`flex flex-col ${className}`}>
      <div className="flex justify-between items-start">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        {icon && <div className="text-blue-500">{icon}</div>}
      </div>
      
      <div className="mt-2 flex items-baseline">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        {unit && <span className="ml-1 text-gray-500">{unit}</span>}
      </div>
      
      {trend && (
        <div className={`mt-2 text-sm flex items-center ${trend.isPositive ? 'text-red-500' : 'text-green-500'}`}>
          <span>{trend.isPositive ? '↑' : '↓'} {trend.value}{unit} vs yesterday</span>
        </div>
      )}
    </Card>
  );
};

export default MetricCard;