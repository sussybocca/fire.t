import React, { useEffect, useState } from "react";

export default function ServerPage({ server }) {
  const [reviews, setReviews] = useState([]);
  const [showGuidelines, setShowGuidelines] = useState(true);
  const [serverHTML, setServerHTML] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/reviews/${server.id}`)
      .then(res => res.json())
      .then(data => setReviews(data));

    // Fetch server deployed HTML (Vercel or GitHub Pages)
    fetch(server.deployedURL) // server.deployedURL must point to the live server
      .then(res => res.text())
      .then(html => setServerHTML(html));
  }, [server]);

  const proceedToServer = () => {
    setShowGuidelines(false);
  };

  if (showGuidelines) {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        <h2>Server Guidelines</h2>
        <p>
          You are about to enter a user-created server. Monox is not responsible
          for content or security. VirusTotal scan: {server.virusScanResult}
        </p>
        <button onClick={proceedToServer}>Proceed</button>
      </div>
    );
  }

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <iframe
        srcDoc={serverHTML}
        title={server.name}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          background: "rgba(255,255,255,0.8)",
          padding: "10px",
          borderRadius: "8px",
        }}
      >
        <h4>{server.name}</h4>
        <p>{server.description}</p>
        <p>Framework: {server.framework}</p>
        <h5>Reviews:</h5>
        {reviews.map(r => (
          <div key={r.id}>
            <strong>{r.user_name}</strong>: {r.comment} ({r.rating}/5)
          </div>
        ))}
      </div>
    </div>
  );
}
