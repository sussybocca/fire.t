import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import serversRouter from "./api/servers.js";
import reviewsRouter from "./api/reviews.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/servers", serversRouter);
app.use("/api/reviews", reviewsRouter);

app.get("/", (req, res) => res.send("Monox Backend Running"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
