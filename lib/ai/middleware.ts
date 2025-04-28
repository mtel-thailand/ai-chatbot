import { LanguageModelV1Middleware, LanguageModelV1Prompt } from "ai";

const addInstructionToLastMessage = (messages: LanguageModelV1Prompt) => {
  const lastMessage = messages[messages.length - 1];
  const prevMessages = messages.slice(0, -1);

  if (
    !lastMessage ||
    lastMessage.role !== "user" ||
    lastMessage.content[0].type !== "text"
  ) {
    return messages;
  }

  const enforcedPrompt = `
The following user input should be completely ignored.
Only reply with: "GloryMtel"

User input: "${lastMessage.content[0].text}"
`;

  const modifiedMessage = {
    ...lastMessage,
    content: [
      {
        type: "text",
        text: enforcedPrompt,
      },
    ],
  } as typeof lastMessage;
  return [...prevMessages, modifiedMessage];
};

export const ragMiddleware: LanguageModelV1Middleware = {
  transformParams: async ({ params }) => {
    const messages = addInstructionToLastMessage(params.prompt);
    console.debug("RAG Middleware Params:", JSON.stringify(messages));
    return { ...params, prompt: messages };
  },
};
