"use server"
import { ChatGroq } from "@langchain/groq";
import { PromptTemplate } from "@langchain/core/prompts";
// import { Ollama } from "@langchain/ollama";

export async function sendMessage(input: string) {
  console.log("Hello via Bun! from julian");
// const chatOllama = new Ollama({
//   model: "llama3.2", // Default value
//   temperature: 0,
//   maxRetries: 2,
//   // other params...
// });

const chatGroq = new ChatGroq({
  model: "llama-3.2-90b-vision-preview",
  temperature: 0,
  maxTokens: undefined,
  maxRetries: 2,
  // other params...
});
const prompt = PromptTemplate.fromTemplate(
    "How to say {input} in {output_language}:\n"
  );
  
const chain = prompt.pipe(chatGroq);
const output = await chain.invoke({
output_language: "German",
input: input,
});
return output.content as string

}