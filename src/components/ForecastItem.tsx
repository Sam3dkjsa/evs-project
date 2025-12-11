import React from 'react';

interface ForecastItemProps {
  time?: string;
  day?: string;
  date?: string;
  highTemp?: number;
  lowTemp?: number;
  temperature?: number;
  condition: string;
  conditionIcon: string;
  rainChance: number;
  aqi?: number;
  isHourly?: boolean;
}

const ForecastItem = ({
  time,
  day,
  date,
  highTemp,
  lowTemp,
  temperature,
  condition,
  conditionIcon,
  rainChance,
  aqi,
  isHourly = false
}: ForecastItemProps) => {
  return (
    <div className="flex items-center justify-between py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="flex items-center w-1/4">
        {isHourly ? (
          <span className="text-gray-900 font-medium">{time}</span>
        ) : (
          <div>
            <span className="text-gray-900 font-medium">{day}</span>
            <span className="block text-gray-500 text-xs">{date}</span>
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-center w-1/4">
        {/* In a real app, this would be an actual weather icon */}
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-xs">{conditionIcon.charAt(0)}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-end w-1/4">
        {isHourly ? (
          <span className="text-gray-900 font-medium">{temperature}°</span>
        ) : (
          <div className="flex items-center">
            <span className="text-gray-900 font-medium mr-2">{highTemp}°</span>
            <span className="text-gray-500">{lowTemp}°</span>
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-end w-1/4">
        <span className="text-gray-500 text-sm">{rainChance}%</span>
      </div>
    </div>
  );
};

export default ForecastItem;