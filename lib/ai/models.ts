export const DEFAULT_CHAT_MODEL: string = "pulse-model";

interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const chatModels: Array<ChatModel> = [
  {
    id: "pulse-model",
    name: "Pulse model",
    description: "AI Activity Tracking",
  },
  // {
  //   id: "chat-model",
  //   name: "Chat model",
  //   description: "Primary model for all-purpose chat",
  // },
  // {
  //   id: "chat-model-reasoning",
  //   name: "Reasoning model",
  //   description: "Uses advanced reasoning",
  // },
];
