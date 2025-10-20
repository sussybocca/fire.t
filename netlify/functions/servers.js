import express from "express";
import fetch from "node-fetch";

const router = express.Router();

// Example in-memory DB for demo
let servers = [];

// CRUD servers
router.get("/", (req, res) => res.json(servers));

router.post("/", async (req, res) => {
  const { name, description, framework, githubRepo } = req.body;

  // Optional: VirusTotal scan
  let virusScanResult = "Not scanned";
  if (req.body.repoZipUrl) {
    const response = await fetch(`https://www.virustotal.com/api/v3/files`, {
      method: "POST",
      headers: {
        "x-apikey": process.env.VIRUSTOTAL_API_KEY,
      },
      body: req.body.repoZipUrl, // simple placeholder
    });
    const data = await response.json();
    virusScanResult = data.data?.attributes?.last_analysis_stats || "Unknown";
  }

  const newServer = { id: servers.length + 1, name, description, framework, githubRepo, virusScanResult };
  servers.push(newServer);
  res.json(newServer);
});

export default router;
