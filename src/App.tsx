import React, { useState } from 'react';
import { useWeather } from './hooks/useWeather';
import MetricCard from './components/MetricCard';
import ForecastItem from './components/ForecastItem';
import ChartCard from './components/ChartCard';
import LocationSelector from './components/LocationSelector';
import AlertCard from './components/AlertCard';
import TipCard from './components/TipCard';
import Card from './components/Card';
import { convertTemperature, convertSpeed, convertRainfall, getAQIStatus } from './utils/helpers';

function App() {
  const { 
    current, 
    hourly, 
    daily, 
    airQuality, 
    locations, 
    alerts, 
    tips, 
    loading, 
    error, 
    refreshData,
    setLocation
  } = useWeather();
  
  const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C');
  const [speedUnit, setSpeedUnit] = useState<'km/h' | 'mph'>('km/h');
  const [rainUnit, setRainUnit] = useState<'mm' | 'in'>('mm');

  const handleAddLocation = (name: string, lat: number, lon: number) => {
    // In a real app, this would save to localStorage or backend
    // For now, we'll just simulate adding it
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading weather data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="text-center max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={refreshData}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">EcoWeather Pro – Environmental Dashboard</h1>
              <p className="text-gray-500 mt-1">Real-time weather and air quality monitoring</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={refreshData}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
              >
                <span>↻</span>
                <span className="ml-2">Refresh</span>
              </button>
              <div className="flex space-x-2">
                <button
                  onClick={() => setTempUnit(tempUnit === 'C' ? 'F' : 'C')}
                  className="px-3 py-1 bg-gray-100 rounded-lg text-sm font-medium"
                >
                  °{tempUnit}
                </button>
                <button
                  onClick={() => setSpeedUnit(speedUnit === 'km/h' ? 'mph' : 'km/h')}
                  className="px-3 py-1 bg-gray-100 rounded-lg text-sm font-medium"
                >
                  {speedUnit}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Current Weather Metrics */}
        {current && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Temperature"
              value={convertTemperature(current.temperature, tempUnit)}
              unit={`°${tempUnit}`}
              trend={{ value: 1.5, isPositive: true }}
            />
            <MetricCard
              title="Feels Like"
              value={convertTemperature(current.feelsLike, tempUnit)}
              unit={`°${tempUnit}`}
            />
            <MetricCard
              title="Humidity"
              value={current.humidity}
              unit="%"
              trend={{ value: 10, isPositive: false }}
            />
            <MetricCard
              title="Wind"
              value={convertSpeed(current.windSpeed, speedUnit)}
              unit={speedUnit}
              trend={{ value: 2.3, isPositive: true }}
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hourly Forecast */}
            <Card className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Hourly Forecast</h2>
              <div className="overflow-x-auto">
                <div className="flex space-x-4 pb-4" style={{ minWidth: '800px' }}>
                  {hourly.map((hour, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <span className="text-gray-500 text-sm">{hour.time}</span>
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center my-2">
                        <span className="text-xs">{hour.conditionIcon.charAt(0)}</span>
                      </div>
                      <span className="font-medium">{convertTemperature(hour.temperature, tempUnit)}°</span>
                      <span className="text-gray-500 text-sm">{hour.rainChance}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Daily Forecast */}
            <Card className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7-Day Forecast</h2>
              <div className="divide-y divide-gray-100">
                {daily.map((day, index) => (
                  <ForecastItem
                    key={index}
                    day={day.day}
                    date={day.date}
                    highTemp={convertTemperature(day.highTemp, tempUnit)}
                    lowTemp={convertTemperature(day.lowTemp, tempUnit)}
                    condition={day.condition}
                    conditionIcon={day.conditionIcon}
                    rainChance={day.rainChance}
                  />
                ))}
              </div>
            </Card>

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <ChartCard title="Temperature Trend">
                <div className="flex items-center justify-center h-full text-gray-500">
                  Temperature chart visualization would appear here
                </div>
              </ChartCard>
              <ChartCard title="Rainfall / Precipitation">
                <div className="flex items-center justify-center h-full text-gray-500">
                  Rainfall chart visualization would appear here
                </div>
              </ChartCard>
            </div>

            <ChartCard title="Air Quality Index" className="mb-8">
              <div className="flex items-center justify-center h-full text-gray-500">
                Air quality chart visualization would appear here
              </div>
            </ChartCard>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <LocationSelector 
              locations={locations} 
              onSelectLocation={setLocation}
              onAddLocation={handleAddLocation}
            />

            {/* Quick Actions */}
            <Card className="mb-6">
              <h3 className="text-gray-900 font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 gap-3">
                <button className="text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-sm">
                  View 7-Day Forecast
                </button>
                <button className="text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-sm">
                  View Air Quality Details
                </button>
                <button className="text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-sm">
                  Manage Saved Locations
                </button>
              </div>
            </Card>

            {/* Alerts */}
            {alerts.length > 0 && (
              <div>
                {alerts.map((alert, index) => (
                  <AlertCard
                    key={index}
                    title={alert.title}
                    description={alert.description}
                    severity={alert.severity}
                  />
                ))}
              </div>
            )}

            {/* Air Quality Info */}
            {airQuality && (
              <Card className="mb-6">
                <h3 className="text-gray-900 font-semibold mb-4">Air Quality</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-3xl font-bold">{airQuality.aqi}</span>
                    <span className="text-gray-500 ml-2">AQI</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    airQuality.aqi <= 50 
                      ? 'bg-green-100 text-green-800' 
                      : airQuality.aqi <= 100 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-red-100 text-red-800'
                  }`}>
                    {getAQIStatus(airQuality.aqi)}
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">PM2.5</p>
                    <p className="font-medium">{airQuality.pm25} μg/m³</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">PM10</p>
                    <p className="font-medium">{airQuality.pm10} μg/m³</p>
                  </div>
                </div>
              </Card>
            )}

            {/* Tips */}
            {tips.map((tip, index) => (
              <TipCard
                key={index}
                title={tip.title}
                content={tip.content}
                category={tip.category}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;