export interface CurrentWeather {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  rainfall: number;
  rainChance: number;
  pressure: number;
  uvIndex: number;
  condition: string;
  conditionIcon: string;
  sunrise?: string;
  sunset?: string;
}

export interface HourlyForecast {
  time: string;
  temperature: number;
  condition: string;
  conditionIcon: string;
  rainChance: number;
  aqi?: number;
}

export interface DailyForecast {
  day: string;
  date: string;
  highTemp: number;
  lowTemp: number;
  condition: string;
  conditionIcon: string;
  rainChance: number;
  aqi?: number;
}

export interface AirQuality {
  aqi: number;
  pm25: number;
  pm10: number;
  o3: number;
  no2: number;
  so2: number;
  co: number;
  status: string;
}

export interface Location {
  id: string;
  name: string;
  lat: number;
  lon: number;
  isDefault?: boolean;
}

export interface WeatherAlert {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'moderate' | 'high' | 'severe';
  startTime: string;
  endTime: string;
}

export interface EnvironmentalTip {
  id: string;
  title: string;
  content: string;
  category: 'weather' | 'health' | 'environment';
}