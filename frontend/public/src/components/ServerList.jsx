import React, { useEffect, useState } from "react";

export default function ServerList({ onSelect }) {
  const [servers, setServers] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/servers`)
      .then(res => res.json())
      .then(data => setServers(data));
  }, []);

  return (
    <div>
      <h1>Monox Servers</h1>
      {servers.map(s => (
        <div key={s.id} onClick={() => onSelect(s)} style={{ cursor: "pointer", border: "1px solid #ccc", margin: "5px", padding: "10px" }}>
          <h3>{s.name}</h3>
          <p>{s.description}</p>
          <small>{s.framework}</small>
        </div>
      ))}
    </div>
  );
}
