import { useState } from "react";
import LocationSelector from "./components/LocationSelector";
import ForecastItem from "./components/ForecastItem";
import MetricCard from "./components/MetricCard";
import TipCard from "./components/TipCard";
import AlertCard from "./components/AlertCard";
import useWeather from "./hooks/useWeather";

export default function App() {
  // Keep a solid minimal state: location and units
  const [location, setLocation] = useState<{ name?: string; lat?: number; lon?: number } | null>(null);
  const [units, setUnits] = useState<"metric" | "imperial">("metric");

  // useWeather hook returns current, forecast, loading, error
  const { current, forecast, loading, error, refresh } = useWeather(location?.lat, location?.lon, units);

  return (
    <div className="app-root">
      <header>
        <h1>Weather Dashboard</h1>
      </header>

      <main>
        <LocationSelector
          onSelect={(loc) => {
            setLocation(loc);
          }}
        />

        <div className="controls">
          <button onClick={() => setUnits(units === "metric" ? "imperial" : "metric")}>
            Toggle units ({units})
          </button>
          <button onClick={() => refresh()}>Refresh</button>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p>Error: {String(error)}</p>}

        {current && (
          <section className="current">
            <MetricCard title="Temperature" value={`${current.temp}°`} />
            <MetricCard title="Humidity" value={`${current.humidity}%`} />
            <MetricCard title="Wind" value={`${current.wind_speed} m/s`} />
          </section>
        )}

        {forecast && (
          <section className="forecast">
            {forecast.map((f: any, i: number) => (
              <ForecastItem key={i} data={f} />
            ))}
          </section>
        )}

        <section className="tips">
          <TipCard />
        </section>

        <section className="alerts">
          <AlertCard alerts={(current && current.alerts) || []} />
        </section>
      </main>

      <footer>
        <small>Built with mild disdain and good intentions.</small>
      </footer>
    </div>
  );
}
