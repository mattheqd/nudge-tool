import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is ready");
});

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
}); 