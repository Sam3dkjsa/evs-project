type Alert = {
  title?: string;
  description?: string;
};

export default function AlertCard({ alerts }: { alerts?: Alert[] }) {
  const list = alerts || [];
  if (list.length === 0) {
    return null;
  }

  return (
    <div className="alert-card">
      <h3>Alerts</h3>
      <ul>
        {list.map((a, i) => (
          <li key={i}>
            <strong>{a.title || "Alert"}</strong>
            <div>{a.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
