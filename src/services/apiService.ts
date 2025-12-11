// src/services/apiService.ts
// Minimal API service helpers that use the passed lat/lon parameters.
// Set VITE_WEATHER_API in your environment (Vercel/Netlify) to the base URL of your weather API.

const API_BASE = (import.meta.env.VITE_WEATHER_API as string) || "https://api.example.com";

/**
 * Example: GET {API_BASE}/weather?lat={lat}&lon={lon}
 * Adjust endpoints/params to match your backend or third-party API.
 */
export async function getCurrentWeather(lat: number, lon: number) {
  // ensure params are used (and used safely)
  const url = `${API_BASE}/weather?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Weather API error: ${res.status}`);
  }
  return res.json();
}

export async function getForecast(lat: number, lon: number) {
  const url = `${API_BASE}/forecast?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Forecast API error: ${res.status}`);
  }
  return res.json();
}

/**
 * A thin wrapper for an air quality endpoint (if present).
 */
export async function getAirQuality(lat: number, lon: number) {
  const url = `${API_BASE}/air-quality?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`AirQuality API error: ${res.status}`);
  }
  return res.json();
}
