// src/services/apiService.ts
// Thin wrappers and safe stubs to satisfy the hook and provide minimal runtime behavior.
// Set VITE_WEATHER_API to your real API base in Vercel environment variables.

const API_BASE = (import.meta.env.VITE_WEATHER_API as string) || "https://api.example.com";

async function safeFetch(url: string) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      // return null-ish result but don't throw raw to keep callers simple
      return null;
    }
    return await res.json();
  } catch (e) {
    return null;
  }
}

/** Core helpers (keep these if hooks use them directly) */
export async function getCurrentWeather(lat: number, lon: number) {
  const url = `${API_BASE}/weather?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`;
  const data = await safeFetch(url);
  return data;
}

export async function getForecast(lat: number, lon: number) {
  const url = `${API_BASE}/forecast?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`;
  const data = await safeFetch(url);
  return data;
}

export async function getAirQuality(lat: number, lon: number) {
  const url = `${API_BASE}/air-quality?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`;
  const data = await safeFetch(url);
  return data;
}

/** 
 * Backwards-compatible wrappers and stubs for functions referenced by hooks.
 * These keep the TypeScript build happy and provide minimal runtime behavior.
 */
export async function getHourlyForecast(lat: number, lon: number) {
  // Many APIs return hourly data in the same forecast endpoint; reuse getForecast as a fallback.
  return await getForecast(lat, lon);
}

export async function getDailyForecast(lat: number, lon: number) {
  // Similarly reuse getForecast for daily data if a dedicated endpoint is unavailable.
  return await getForecast(lat, lon);
}

export async function getLocations(query: string) {
  // If your backend supports searching locations, adjust the path accordingly.
  // Fallback: return a simple array with the query echoed so UI can work.
  const url = `${API_BASE}/locations?q=${encodeURIComponent(query)}`;
  const data = await safeFetch(url);
  if (!data) {
    // fallback minimal shape so selectors can present something
    return [{ name: String(query), lat: null, lon: null }];
  }
  return data;
}

export async function getAlerts(lat: number, lon: number) {
  // Try an alerts endpoint; if none, return an empty array.
  const url = `${API_BASE}/alerts?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`;
  const data = await safeFetch(url);
  return data ?? [];
}

export async function getEnvironmentalTips() {
  // If you have a tips endpoint, use it; otherwise return a few defaults.
  const url = `${API_BASE}/tips`;
  const data = await safeFetch(url);
  if (data && Array.isArray(data)) return data;
  return [
    { id: 1, text: "Carry an umbrella if rain is forecast." },
    { id: 2, text: "Check air-quality warnings for sensitive groups." },
  ];
}
