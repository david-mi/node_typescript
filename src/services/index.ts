import { databaseServices } from "./database.js";
import { openAiServices } from "./openai.js";

export const services = {
  database: databaseServices,
  openAi: openAiServices
}