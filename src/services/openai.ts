import OpenAI from "openai";
import type { AssistantNameType } from "../types.js"

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function getAssistantByName(name: AssistantNameType) {
  const ASSISTANTS_IDS: Record<AssistantNameType, string> = {
    nathabot: process.env.OPENAI_ASSISTANT_NATHABOT_ID,
    allotbot: process.env.OPENAI_ASSISTANT_ALLOTBOT_ID,
    fitnessbot: process.env.OPENAI_ASSISTANT_FITNESSBOT_ID
  }

  return openai.beta.assistants.retrieve(ASSISTANTS_IDS[name])
}

function runThreadWithMessage({ threadId, assistantId, message }: { threadId: string, assistantId: string, message: string }) {
  return openai.beta.threads.runs.createAndPoll(
    threadId,
    {
      additional_messages: [{ content: message, role: "user" }],
      additional_instructions: "Tu vas rajouter un emoji drapeau aléatoire à chaque fin de phrase",
      assistant_id: assistantId,
    },
    { pollIntervalMs: 500 }
  );
}

async function getMessageFromRun({ runId, threadId }: { runId: string, threadId: string }) {
  const pageList = await openai.beta.threads.messages.list(threadId, { run_id: runId })

  const messageContent = pageList.data[0]?.content[0]
  return messageContent && messageContent.type === "text"
    ? messageContent.text.value
    : null
}

function sendUserMessageToThread({ threadId, userMessage }: { threadId: string, userMessage: string }) {
  return openai.beta.threads.messages.create(
    threadId,
    { role: "user", content: userMessage }
  )
}

function generateImageFromPrompt(prompt: string) {
  return openai.images.generate({
    prompt
  })
}

export const openAiServices = {
  getAssistantByName,
  runThreadWithMessage,
  getMessageFromRun,
  sendUserMessageToThread,
  generateImageFromPrompt
}