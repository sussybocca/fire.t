import React, { useEffect, useState } from "react";

export default function ServerPage({ server }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/reviews/${server.id}`)
      .then(res => res.json())
      .then(data => setReviews(data));
  }, [server.id]);

  return (
    <div>
      <h1>{server.name}</h1>
      <p>{server.description}</p>
      <small>Framework: {server.framework}</small>
      <h2>Reviews</h2>
      {reviews.map(r => (
        <div key={r.id}>
          <strong>{r.user_name}</strong>: {r.comment} ({r.rating}/5)
        </div>
      ))}
    </div>
  );
}
