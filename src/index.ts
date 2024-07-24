import express, { type Express } from "express";
import { chatbotRouter } from "./routes/index.js";

const app: Express = express();
app.use(express.json())
app.use("/api/chatbot", chatbotRouter)
app.listen(process.env.PORT, () => console.log(`[server]: running on PORT ${process.env.PORT}...`));