import React, { useState, useEffect } from "react";
import { pushToGitHub } from "../utils/githubAPI";

export default function KitEditor({ framework = "react", serverId }) {
  const [files, setFiles] = useState({
    "index.js": "// Start coding here",
    "index.html": "<div id='root'></div>",
    "style.css": "",
  });

  const [output, setOutput] = useState("");

  const handleChange = (filename, value) => {
    setFiles(prev => ({ ...prev, [filename]: value }));
  };

  const runFrontend = () => {
    if (framework === "react" || framework === "vite" || framework === "next") {
      const html = `
        <html>
          <head><style>${files["style.css"]}</style></head>
          <body>
            <div id="root"></div>
            <script type="module">
              ${files["index.js"]}
            </script>
          </body>
        </html>
      `;
      setOutput(html);
    } else if (framework === "python") {
      try {
        import("https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js").then(async (pyodideModule) => {
          const pyodide = await pyodideModule.loadPyodide();
          const result = await pyodide.runPythonAsync(files["index.js"]);
          setOutput(result);
        });
      } catch (err) {
        setOutput(err.message);
      }
    }
  };

  const saveServer = async () => {
    await pushToGitHub(`server-${serverId}`, files);
    alert("Server code saved to GitHub!");
  };

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div style={{ flex: 1 }}>
        {Object.keys(files).map(filename => (
          <div key={filename}>
            <h4>{filename}</h4>
            <textarea
              rows={10}
              cols={50}
              value={files[filename]}
              onChange={e => handleChange(filename, e.target.value)}
            />
          </div>
        ))}
        <button onClick={runFrontend}>Run</button>
        <button onClick={saveServer}>Save & Publish</button>
      </div>
      <div style={{ flex: 1 }}>
        <h4>Preview</h4>
        {framework === "react" || framework === "vite" || framework === "next" ? (
          <iframe
            title="preview"
            srcDoc={output}
            style={{ width: "100%", height: "500px", border: "1px solid black" }}
          />
        ) : (
          <pre>{output}</pre>
        )}
      </div>
    </div>
  );
}
