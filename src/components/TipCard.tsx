export default function TipCard() {
  const tips = [
    "Carry an umbrella if rain is expected.",
    "Air quality alerts may affect sensitive groups.",
    "Check wind speed before planning outdoor activities.",
  ];

  return (
    <div className="tip-card">
      <h3>Tips</h3>
      <ul>
        {tips.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </div>
  );
}
