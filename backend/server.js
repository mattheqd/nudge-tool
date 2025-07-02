import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import chatRoutes from "./routes/chatRoutes.js";
import nudgeRoutes from "./routes/nudgeRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/api", chatRoutes);
app.use("/api", nudgeRoutes);
app.use("/api/session", sessionRoutes);

app.get("/", (req, res) => {
    res.send("Server is ready");
});

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
});
