export default function ForecastItem({ data }: { data: any }) {
  // Be defensive: data shape unknown; use only what's available
  const date = data?.dt_txt || data?.time || data?.date || "";
  const temp = data?.main?.temp ?? data?.temp ?? "-";
  const condition = data?.weather?.[0]?.description ?? data?.condition ?? "Unknown";
  const aqi = data?.aqi ?? null;

  return (
    <article className="forecast-item">
      <div className="forecast-date">{date}</div>
      <div className="forecast-temp">{temp}</div>
      <div className="forecast-condition">{condition}</div>
      {aqi !== null && <div className="forecast-aqi">AQI: {aqi}</div>}
    </article>
  );
}
