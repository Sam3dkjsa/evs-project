import React from 'react';
import Card from './Card';

interface TipCardProps {
  title: string;
  content: string;
  category: 'weather' | 'health' | 'environment';
}

const TipCard = ({ title, content, category }: TipCardProps) => {
  const getCategoryIcon = () => {
    switch (category) {
      case 'weather': return '🌦️';
      case 'health': return '❤️';
      case 'environment': return '🌱';
      default: return '💡';
    }
  };
  
  return (
    <Card className="mb-4">
      <div className="flex items-start">
        <span className="text-lg mr-3">{getCategoryIcon()}</span>
        <div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{content}</p>
        </div>
      </div>
    </Card>
  );
};

export default TipCard;