import { tool } from "@langchain/core/tools";
import { z } from "zod";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const readQATextFile = async () => {
  const filePath = path.join(__dirname, "..", "public", "qa.txt");

  if (!fs.existsSync(filePath)) {
    return `File not found: ${filePath}`;
  }

  try {
    const text = fs.readFileSync(filePath, "utf8");

    return text || "QA file is empty.";
  } catch (err) {
    console.error("Text file read error:", err);
    return "Failed to read QA file.";
  }
};

export const textReaderTool = tool(
  readQATextFile,
  {
    name: "textReaderTool",
    description: `
  Use this tool to answer customer questions by looking up information in the QA text file.
  The QA file contains common questions and answers about Dondon’s Gym.
  If a customer's question matches or is related to something in the QA file, use this tool to provide the answer.
  Do not guess—always rely on the QA file content for these questions.
    `,
    schema: z.object({})
  }
);