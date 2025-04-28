import {
  customProvider,
  extractReasoningMiddleware,
  LanguageModelV1Middleware,
  LanguageModelV1Prompt,
  wrapLanguageModel,
} from "ai";
import { xai } from "@ai-sdk/xai";
import { openai } from "@ai-sdk/openai";
import { isTestEnvironment } from "../constants";
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from "./models.test";
import { ragMiddleware, usageMiddleware } from "./middleware";

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        "chat-model": chatModel,
        "chat-model-reasoning": reasoningModel,
        "title-model": openai("gpt-4-turbo"),
        "artifact-model": artifactModel,
        "pulse-model": openai("gpt-4-turbo"),
      },
    })
  : customProvider({
      languageModels: {
        "chat-model": xai("grok-2-1212"),
        "chat-model-reasoning": wrapLanguageModel({
          model: xai("grok-3-mini-beta"),
          middleware: extractReasoningMiddleware({ tagName: "think" }),
        }),
        "title-model": openai("gpt-4-turbo"),
        "artifact-model": xai("grok-2-1212"),
        "pulse-model": wrapLanguageModel({
          model: openai("gpt-4-turbo"),
          middleware: [ragMiddleware, usageMiddleware],
        }),
      },
      imageModels: {
        "small-model": xai.image("grok-2-image"),
      },
    });
