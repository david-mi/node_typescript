import { Router } from "express";
import { sendMessageToThreadAndGetResponse, generateImageFromPrompt } from "../controllers/chatbot.js";
export const chatbotRouter = Router();
chatbotRouter.post("/send-message/:threadId", sendMessageToThreadAndGetResponse);
chatbotRouter.post("/generate-image", generateImageFromPrompt);
//# sourceMappingURL=chatbot.js.map