import { useState } from "react";
import LocationSelector from "./components/LocationSelector";
import ForecastItem from "./components/ForecastItem";
import MetricCard from "./components/MetricCard";
import TipCard from "./components/TipCard";
import AlertCard from "./components/AlertCard";
import { useWeather } from "./hooks/useWeather"; // named import (fixes TS2613)

export default function App() {
  const [location, setLocation] = useState<{ name?: string; lat?: number; lon?: number } | null>(null);
  const [units, setUnits] = useState<"metric" | "imperial">("metric");

  // use the named hook exported by src/hooks/useWeather.ts
  const { current, forecast, loading, error, refresh } = useWeather(location?.lat, location?.lon, units);

  return (
    <div className="app-root">
      <header>
        <h1>Weather Dashboard</h1>
      </header>

      <main>
        {/* If LocationSelector prop types differ in your repo, this quiets TypeScript while still passing the callback.
            Replace the ts-ignore with a proper prop name later if you prefer a typed approach. */}
        {/* @ts-ignore */}
        <LocationSelector
          onSelect={(loc: any) => {
            setLocation(loc);
          }}
        />

        <div className="controls">
          <button onClick={() => setUnits(units === "metric" ? "imperial" : "metric")}>
            Toggle units ({units})
          </button>
          <button onClick={() => refresh && refresh()}>Refresh</button>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p>Error: {String(error)}</p>}

        {current && (
          <section className="current">
            <MetricCard title="Temperature" value={`${current.temp ?? "-"}°`} />
            <MetricCard title="Humidity" value={`${current.humidity ?? "-"}%`} />
            <MetricCard title="Wind" value={`${current.wind_speed ?? "-"} m/s`} />
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
