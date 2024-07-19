import express, { type Express, type Request, type Response } from "express";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
const openai = new OpenAI({
  organization: process.env.ORGANIZATION_ID,
  project: process.env.PROJECT_ID,
});


const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", async (req: Request, res: Response) => {

  res.json({ message: "Express + TypeScript Server" });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});