import express from "express";
import cors from "cors";
import "dotenv/config";
import { main } from "./index.js";
import { isValidField } from "./index.js";
import rateLimit from "express-rate-limit";

const app = express()
const port = process.env.PORT || 3000;


app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());
app.use("/api/", rateLimit({ windowMs: 15 * 60 * 1000, limit: 30 }));

app.post("/api/recommend", async (req, res) => {
    const { input, excludeTitles, timeAvailable } = req.body;
    const error = isValidField(input, 2000);
    if (error) {
        return res.status(400).json({ error });
    }
    if (timeAvailable && isValidField(timeAvailable, 100)) {
        return res.status(400).json({ error: "Invalid time value." });
    }

    try {
        const recommendation = await main(input, excludeTitles || [], timeAvailable || "");
        res.json(recommendation);
    } catch (error) {
        console.error("Movie recommendation failed", error);
        return res.status(500).json({ error: "Movie recommendation failed" });
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});