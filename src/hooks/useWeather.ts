import { useState, useEffect } from 'react';
import {
  getCurrentWeather,
  getHourlyForecast,
  getDailyForecast,
  getAirQuality,
  getLocations,
  getAlerts,
  getEnvironmentalTips
} from '../services/apiService';
import type {
  CurrentWeather,
  HourlyForecast,
  DailyForecast,
  AirQuality,
  Location,
  WeatherAlert,
  EnvironmentalTip
} from '../types/weatherTypes';

interface WeatherData {
  current: CurrentWeather | null;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
  airQuality: AirQuality | null;
  locations: Location[];
  alerts: WeatherAlert[];
  tips: EnvironmentalTip[];
  loading: boolean;
  error: string | null;
}

export const useWeather = (initialLat: number = 40.7128, initialLon: number = -74.0060) => {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    current: null,
    hourly: [],
    daily: [],
    airQuality: null,
    locations: [],
    alerts: [],
    tips: [],
    loading: true,
    error: null
  });
  const [lat, setLat] = useState<number>(initialLat);
  const [lon, setLon] = useState<number>(initialLon);

  const fetchData = async () => {
    try {
      setWeatherData(prev => ({ ...prev, loading: true, error: null }));
      
      // Fetch all data in parallel
      const [
        current,
        hourly,
        daily,
        airQuality,
        locations,
        alerts,
        tips
      ] = await Promise.all([
        getCurrentWeather(lat, lon),
        getHourlyForecast(lat, lon),
        getDailyForecast(lat, lon),
        getAirQuality(lat, lon),
        getLocations(),
        getAlerts(lat, lon),
        getEnvironmentalTips()
      ]);
      
      setWeatherData({
        current,
        hourly,
        daily,
        airQuality,
        locations,
        alerts,
        tips,
        loading: false,
        error: null
      });
    } catch (err) {
      setWeatherData(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to fetch weather data. Please try again.'
      }));
    }
  };

  useEffect(() => {
    fetchData();
  }, [lat, lon]);

  const refreshData = () => {
    fetchData();
  };

  const setLocation = (newLat: number, newLon: number) => {
    setLat(newLat);
    setLon(newLon);
  };

  return {
    ...weatherData,
    refreshData,
    setLocation
  };
};