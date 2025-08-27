process.env.GOOGLE_API_KEY = process.env.GEMINI_API_KEY;
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { textReaderTool } from "./tools.mjs";
import { ChatPromptTemplate } from "@langchain/core/prompts";

export const promptTemplate = ChatPromptTemplate.fromMessages([
  [
    "system", 
    `You're a highly knowledgeable AI assistant for Dondon’s Gym. 
        Your goal is to provide accurate, concise, and helpful answers to customer questions using the following resources:
        1. QA information from the internal QA file.
    Always respond clearly, and if you cannot find an answer in the resources, politely indicate that the information is not available. 
    Format your responses for readability and avoid unnecessary details.`
  ],
  ["user", "{query}"],
]);

// --- Initialize agent ---
const agentModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  temperature: 0,
});

const agentCheckpointer = new MemorySaver();
const agent = createReactAgent({
  llm: agentModel,
  tools: [textReaderTool],
  checkpointSaver: agentCheckpointer,
});

export default agent