import express from "express";
import { chatbotRouter } from "./routes/index.js";
const app = express();
app.use(express.json());
app.use("/api/chatbot", chatbotRouter);
app.listen(process.env.PORT, () => console.log(`[server]: running on PORT ${process.env.PORT}...`));
//# sourceMappingURL=index.js.map