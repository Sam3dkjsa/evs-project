import React from 'react';
import Card from './Card';

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const ChartCard = ({ title, children, className = '' }: ChartCardProps) => {
  return (
    <Card className={className}>
      <h3 className="text-gray-900 font-semibold mb-4">{title}</h3>
      <div className="h-64">
        {children}
      </div>
    </Card>
  );
};

export default ChartCard;