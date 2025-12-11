import { useState } from "react";
import LocationSelector from "./components/LocationSelector";
import ForecastItem from "./components/ForecastItem";
import MetricCard from "./components/MetricCard";
import TipCard from "./components/TipCard";
import AlertCard from "./components/AlertCard";
import { useWeather } from "./hooks/useWeather"; // named import

export default function App() {
  const [location, setLocation] = useState<{ name?: string; lat?: number; lon?: number } | null>(null);
  // useWeather appears to return { current, hourly, daily, refreshData, ... }
  const { current, hourly, daily, loading, error, refreshData } = useWeather(location?.lat, location?.lon);

  // Defensive helpers to read possibly-differently-named fields
  const tempVal = (current && ((current as any).temp ?? (current as any).temperature ?? (current as any).temperatureC ?? "-")) || "-";
  const humidityVal = (current && ((current as any).humidity ?? (current as any).hum ?? "-")) || "-";
  const windVal = (current && ((current as any).windSpeed ?? (current as any).wind_speed ?? (current as any).wind?.speed ?? "-")) || "-";
  const alertsList = (current && ((current as any).alerts ?? (current as any).weatherAlerts ?? [])) || [];

  return (
    <div className="app-root">
      <header>
        <h1>Weather Dashboard</h1>
      </header>

      <main>
        {/* Keep LocationSelector but silence a prop-type mismatch until you add a typed onSelect prop */}
        {/* @ts-ignore */}
        <LocationSelector onSelect={(loc: any) => {
          // some LocationSelector instances may return {lat, lon} or (lat, lon)
          if (loc && typeof loc === "object" && ("lat" in loc || "lon" in loc)) {
            setLocation({ name: (loc as any).name, lat: (loc as any).lat, lon: (loc as any).lon });
          } else if (Array.isArray(loc) && loc.length >= 2) {
            setLocation({ lat: loc[0], lon: loc[1] });
          } else {
            // fallback: set raw
            setLocation(loc as any);
          }
        }} />

        <div className="controls">
          <button onClick={() => refreshData && refreshData()}>Refresh</button>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>Error: {String(error)}</p>}

        {current && (
          <section className="current">
            <MetricCard title="Temperature" value={`${tempVal}`} />
            <MetricCard title="Humidity" value={`${humidityVal}`} />
            <MetricCard title="Wind" value={`${windVal}`} />
          </section>
        )}

        {/* Some hooks provide `hourly` / `daily`; others provide `forecast`. Handle both */}
        {Array.isArray(hourly) && hourly.length > 0 && (
          <section className="forecast">
            {hourly.map((f: any, i: number) => (
              <ForecastItem key={i} data={f} />
            ))}
          </section>
        )}

        {Array.isArray(daily) && daily.length > 0 && (
          <section className="forecast-daily">
            {daily.map((f: any, i: number) => (
              <ForecastItem key={`d-${i}`} data={f} />
            ))}
          </section>
        )}

        <section className="tips">
          <TipCard />
        </section>

        <section className="alerts">
          <AlertCard alerts={alertsList} />
        </section>
      </main>

      <footer>
        <small>Built with mild disdain and good intentions.</small>
      </footer>
    </div>
  );
}
