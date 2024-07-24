declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      OPENAI_ASSISTANT_NATHABOT_ID: string
      OPENAI_ASSISTANT_ALLOTBOT_ID: string
      OPENAI_ASSISTANT_FITNESSBOT_ID: string
      OPENAI_API_KEY: string
    }
  }
}

export { }