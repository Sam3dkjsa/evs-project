import React from 'react';
import Card from './Card';

interface AlertCardProps {
  title: string;
  description: string;
  severity: 'low' | 'moderate' | 'high' | 'severe';
}

const AlertCard = ({ title, description, severity }: AlertCardProps) => {
  const getSeverityClass = () => {
    switch (severity) {
      case 'low': return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'moderate': return 'bg-yellow-50 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-orange-50 text-orange-800 border-orange-200';
      case 'severe': return 'bg-red-50 text-red-800 border-red-200';
      default: return 'bg-gray-50 text-gray-800 border-gray-200';
    }
  };
  
  const getSeverityIcon = () => {
    switch (severity) {
      case 'low': return 'ℹ️';
      case 'moderate': return '⚠️';
      case 'high': return '⚠️';
      case 'severe': return '🚨';
      default: return 'ℹ️';
    }
  };
  
  return (
    <Card className={`border-l-4 ${getSeverityClass()} mb-4`}>
      <div className="flex items-start">
        <span className="text-lg mr-3">{getSeverityIcon()}</span>
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm mt-1">{description}</p>
        </div>
      </div>
    </Card>
  );
};

export default AlertCard;