// src/services/apiService.ts
// Flexible API helpers that accept 0..2 arguments.
// This compatibility layer avoids TypeScript errors when callers pass different arg shapes (none, a single object, or lat,lon).

const API_BASE = (import.meta.env.VITE_WEATHER_API as string) || "https://api.example.com";

function resolveLatLon(a?: any, b?: any): { lat?: number | null; lon?: number | null } {
  // Support patterns:
  //  - no args -> {lat: null, lon: null}
  //  - single object { lat, lon }
  //  - two separate args (lat, lon)
  if (a == null && b == null) return { lat: null, lon: null };
  if (typeof a === "object" && (a.lat !== undefined || a.lon !== undefined)) {
    return { lat: a.lat ?? null, lon: a.lon ?? null };
  }
  // numeric args
  return { lat: a ?? null, lon: b ?? null };
}

async function safeFetch(url: string) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      return null;
    }
    return await res.json();
  } catch (e) {
    return null;
  }
}

/** Core endpoints (accept optional params) */
export async function getCurrentWeather(arg1?: any, arg2?: any) {
  const { lat, lon } = resolveLatLon(arg1, arg2);
  const url = lat != null && lon != null ? `${API_BASE}/weather?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}` : `${API_BASE}/weather`;
  return await safeFetch(url);
}

export async function getForecast(arg1?: any, arg2?: any) {
  const { lat, lon } = resolveLatLon(arg1, arg2);
  const url = lat != null && lon != null ? `${API_BASE}/forecast?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}` : `${API_BASE}/forecast`;
  return await safeFetch(url);
}

export async function getAirQuality(arg1?: any, arg2?: any) {
  const { lat, lon } = resolveLatLon(arg1, arg2);
  const url = lat != null && lon != null ? `${API_BASE}/air-quality?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}` : `${API_BASE}/air-quality`;
  return await safeFetch(url);
}

/** Backwards-compatible aliases / wrappers that some hooks expect.
 *  They accept 0..2 args as well.
 */
export async function getHourlyForecast(arg1?: any, arg2?: any) {
  return await getForecast(arg1, arg2);
}

export async function getDailyForecast(arg1?: any, arg2?: any) {
  return await getForecast(arg1, arg2);
}

export async function getLocations(query?: string) {
  if (!query) {
    // return empty array or a small fallback so UI doesn't blow up
    return [];
  }
  const url = `${API_BASE}/locations?q=${encodeURIComponent(query)}`;
  const data = await safeFetch(url);
  return data ?? [];
}

export async function getAlerts(arg1?: any, arg2?: any) {
  const { lat, lon } = resolveLatLon(arg1, arg2);
  const url = lat != null && lon != null ? `${API_BASE}/alerts?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}` : `${API_BASE}/alerts`;
  const data = await safeFetch(url);
  return data ?? [];
}

export async function getEnvironmentalTips() {
  const url = `${API_BASE}/tips`;
  const data = await safeFetch(url);
  if (Array.isArray(data)) return data;
  return [
    { id: 1, text: "Carry an umbrella if rain is forecast." },
    { id: 2, text: "Check air-quality warnings for sensitive groups." },
  ];
}
