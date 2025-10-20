import express from "express";
import pkg from "pg";
const { Pool } = pkg;
const router = express.Router();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

router.get("/:serverId", async (req, res) => {
  const { serverId } = req.params;
  try {
    const { rows } = await pool.query(
      "SELECT * FROM reviews WHERE server_id = $1 ORDER BY created_at DESC",
      [serverId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/:serverId", async (req, res) => {
  const { serverId } = req.params;
  const { user, comment, rating } = req.body;
  try {
    const { rows } = await pool.query(
      "INSERT INTO reviews (server_id, user_name, comment, rating) VALUES ($1, $2, $3, $4) RETURNING *",
      [serverId, user, comment, rating]
    );
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
