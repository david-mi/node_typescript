import { RequestHandler } from "express";
import { services } from "../services/index.js";

export const sendMessageToThreadAndGetResponse: RequestHandler = async (req, res) => {
  const threadId = req.params.threadId as string
  const userMessage = req.body.message as string
  console.log(userMessage)
  const { id: assistantId } = await services.openAi.getAssistantByName("fitnessbot")
  const run = await services.openAi.runThreadWithMessage({ threadId, assistantId, message: userMessage })
  console.log({ runId: run.id })
  const messageFromRun = await services.openAi.getMessageFromRun({ threadId, runId: run.id })
  console.log(messageFromRun)
  res.status(200).send(messageFromRun)
}

export const generateImageFromPrompt: RequestHandler = async (req, res) => {
  const prompt = req.body.prompt as string
  const imageResponse = await services.openAi.generateImageFromPrompt(prompt)

  res.status(200).send(imageResponse.data)
}