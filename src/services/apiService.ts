import type {
  CurrentWeather,
  HourlyForecast,
  DailyForecast,
  AirQuality,
  Location,
  WeatherAlert,
  EnvironmentalTip
} from '../types/weatherTypes';

// Mock data for development
const mockCurrentWeather: CurrentWeather = {
  temperature: 22,
  feelsLike: 24,
  humidity: 65,
  windSpeed: 12,
  windDirection: 'SW',
  rainfall: 2.4,
  rainChance: 30,
  pressure: 1013,
  uvIndex: 5,
  condition: 'Partly Cloudy',
  conditionIcon: 'partly-cloudy',
  sunrise: '06:45',
  sunset: '19:30'
};

const mockHourlyForecast: HourlyForecast[] = [
  { time: '12:00', temperature: 22, condition: 'Partly Cloudy', conditionIcon: 'partly-cloudy', rainChance: 10 },
  { time: '13:00', temperature: 23, condition: 'Sunny', conditionIcon: 'sunny', rainChance: 0 },
  { time: '14:00', temperature: 24, condition: 'Sunny', conditionIcon: 'sunny', rainChance: 0 },
  { time: '15:00', temperature: 24, condition: 'Partly Cloudy', conditionIcon: 'partly-cloudy', rainChance: 5 },
  { time: '16:00', temperature: 23, condition: 'Cloudy', conditionIcon: 'cloudy', rainChance: 15 },
  { time: '17:00', temperature: 22, condition: 'Cloudy', conditionIcon: 'cloudy', rainChance: 20 },
  { time: '18:00', temperature: 21, condition: 'Light Rain', conditionIcon: 'light-rain', rainChance: 40 },
  { time: '19:00', temperature: 20, condition: 'Rain', conditionIcon: 'rain', rainChance: 60 },
  { time: '20:00', temperature: 19, condition: 'Rain', conditionIcon: 'rain', rainChance: 70 },
  { time: '21:00', temperature: 19, condition: 'Light Rain', conditionIcon: 'light-rain', rainChance: 50 },
  { time: '22:00', temperature: 18, condition: 'Cloudy', conditionIcon: 'cloudy', rainChance: 20 },
  { time: '23:00', temperature: 18, condition: 'Partly Cloudy', conditionIcon: 'partly-cloudy', rainChance: 10 }
];

const mockDailyForecast: DailyForecast[] = [
  { day: 'Today', date: 'Jun 12', highTemp: 24, lowTemp: 18, condition: 'Partly Cloudy', conditionIcon: 'partly-cloudy', rainChance: 30 },
  { day: 'Wed', date: 'Jun 13', highTemp: 26, lowTemp: 19, condition: 'Sunny', conditionIcon: 'sunny', rainChance: 0 },
  { day: 'Thu', date: 'Jun 14', highTemp: 27, lowTemp: 20, condition: 'Sunny', conditionIcon: 'sunny', rainChance: 0 },
  { day: 'Fri', date: 'Jun 15', highTemp: 25, lowTemp: 19, condition: 'Thunderstorms', conditionIcon: 'thunderstorms', rainChance: 80 },
  { day: 'Sat', date: 'Jun 16', highTemp: 23, lowTemp: 18, condition: 'Rain', conditionIcon: 'rain', rainChance: 90 },
  { day: 'Sun', date: 'Jun 17', highTemp: 22, lowTemp: 17, condition: 'Cloudy', conditionIcon: 'cloudy', rainChance: 40 },
  { day: 'Mon', date: 'Jun 18', highTemp: 24, lowTemp: 18, condition: 'Partly Cloudy', conditionIcon: 'partly-cloudy', rainChance: 20 }
];

const mockAirQuality: AirQuality = {
  aqi: 42,
  pm25: 10,
  pm10: 20,
  o3: 60,
  no2: 30,
  so2: 5,
  co: 0.4,
  status: 'Good'
};

const mockLocations: Location[] = [
  { id: '1', name: 'New York, NY', lat: 40.7128, lon: -74.0060, isDefault: true },
  { id: '2', name: 'Los Angeles, CA', lat: 34.0522, lon: -118.2437 },
  { id: '3', name: 'Chicago, IL', lat: 41.8781, lon: -87.6298 }
];

const mockAlerts: WeatherAlert[] = [
  {
    id: '1',
    title: 'Heat Advisory',
    description: 'High temperatures expected. Stay hydrated and avoid prolonged sun exposure.',
    severity: 'moderate',
    startTime: '2023-06-12T10:00:00Z',
    endTime: '2023-06-12T20:00:00Z'
  }
];

const mockTips: EnvironmentalTip[] = [
  {
    id: '1',
    title: 'Stay Hydrated',
    content: 'Drink plenty of water throughout the day, especially during hot weather.',
    category: 'health'
  }
];

// API service functions
export const getCurrentWeather = async (lat: number, lon: number): Promise<CurrentWeather> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockCurrentWeather;
};

export const getHourlyForecast = async (lat: number, lon: number): Promise<HourlyForecast[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockHourlyForecast;
};

export const getDailyForecast = async (lat: number, lon: number): Promise<DailyForecast[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockDailyForecast;
};

export const getAirQuality = async (lat: number, lon: number): Promise<AirQuality> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockAirQuality;
};

export const getLocations = async (): Promise<Location[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockLocations;
};

export const saveLocation = async (location: Omit<Location, 'id'>): Promise<Location> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return { ...location, id: Date.now().toString() };
};

export const getAlerts = async (lat: number, lon: number): Promise<WeatherAlert[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockAlerts;
};

export const getEnvironmentalTips = async (): Promise<EnvironmentalTip[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockTips;
};