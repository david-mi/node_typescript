import { services } from "../services/index.js";
export const sendMessageToThreadAndGetResponse = async (req, res) => {
    const threadId = req.params.threadId;
    const userMessage = req.body.message;
    console.log(userMessage);
    const { id: assistantId } = await services.openAi.getAssistantByName("fitnessbot");
    const { id: runId } = await services.openAi.runThreadWithMessage({ threadId, assistantId, message: userMessage });
    console.log({ runId });
    const messageFromRun = await services.openAi.getMessageFromRun({ threadId, runId });
    console.log(messageFromRun);
    res.status(200).send(messageFromRun);
};
export const generateImageFromPrompt = async (req, res) => {
    const prompt = req.body.prompt;
    const imageResponse = await services.openAi.generateImageFromPrompt(prompt);
    res.status(200).send(imageResponse.data);
};
//# sourceMappingURL=chatbot.js.map