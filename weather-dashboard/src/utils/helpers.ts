export const convertTemperature = (temp: number, unit: 'C' | 'F'): number => {
  if (unit === 'F') {
    return Math.round((temp * 9) / 5 + 32);
  }
  return temp;
};

export const convertSpeed = (speed: number, unit: 'km/h' | 'mph'): number => {
  if (unit === 'mph') {
    return Math.round(speed * 0.621371);
  }
  return speed;
};

export const convertRainfall = (rain: number, unit: 'mm' | 'in'): number => {
  if (unit === 'in') {
    return Math.round(rain * 0.0393701 * 100) / 100;
  }
  return rain;
};

export const getAQIStatus = (aqi: number): string => {
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
  if (aqi <= 200) return 'Unhealthy';
  if (aqi <= 300) return 'Very Unhealthy';
  return 'Hazardous';
};

export const getWindDirection = (degrees: number): string => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
};

export const getTrendIndicator = (current: number, previous: number): { value: number; isPositive: boolean } => {
  const difference = current - previous;
  return {
    value: Math.abs(Math.round(difference * 10) / 10),
    isPositive: difference >= 0
  };
};