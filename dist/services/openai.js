import OpenAI from "openai";
export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
function getAssistantByName(name) {
    const ASSISTANTS_IDS = {
        nathabot: process.env.OPENAI_ASSISTANT_NATHABOT_ID,
        allotbot: process.env.OPENAI_ASSISTANT_ALLOTBOT_ID,
        fitnessbot: process.env.OPENAI_ASSISTANT_FITNESSBOT_ID
    };
    return openai.beta.assistants.retrieve(ASSISTANTS_IDS[name]);
}
function runThreadWithMessage({ threadId, assistantId, message }) {
    return openai.beta.threads.runs.createAndPoll(threadId, {
        additional_messages: [{ content: message, role: "user" }],
        assistant_id: assistantId,
        model: "gpt-4o"
    });
}
async function getMessageFromRun({ runId, threadId }) {
    const pageList = await openai.beta.threads.messages.list(threadId, { run_id: runId });
    const messageContent = pageList.data[0]?.content[0];
    return messageContent && messageContent.type === "text"
        ? messageContent.text.value
        : null;
}
function sendUserMessageToThread({ threadId, userMessage }) {
    return openai.beta.threads.messages.create(threadId, { role: "user", content: userMessage });
}
function generateImageFromPrompt(prompt) {
    return openai.images.generate({
        prompt
    });
}
export const openAiServices = {
    getAssistantByName,
    runThreadWithMessage,
    getMessageFromRun,
    sendUserMessageToThread,
    generateImageFromPrompt
};
//# sourceMappingURL=openai.js.map