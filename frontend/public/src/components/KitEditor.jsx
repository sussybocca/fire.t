import React, { useState } from "react";

export default function KitEditor() {
  const [code, setCode] = useState("// Write your code here");

  const handleRun = () => {
    console.log("Run code", code);
  };

  return (
    <div>
      <textarea value={code} onChange={(e) => setCode(e.target.value)} rows={20} cols={80}></textarea>
      <br />
      <button onClick={handleRun}>Run</button>
    </div>
  );
}
