"use server"
import { ChatGroq } from "@langchain/groq";
import { PromptTemplate } from "@langchain/core/prompts";

export async function sendMessage(input: string, language: string, additionalInfo: string) {
  try {
    console.log("Hello via Bun! from Julian");

    const chatGroq = new ChatGroq({
      model: "llama-3.2-90b-vision-preview",
      temperature: 0,
      maxTokens: undefined,
      maxRetries: 2,
    });

    // Create a prompt that uses both the input and the new additionalInfo
    const prompt = PromptTemplate.fromTemplate(
      "How to say {input} in {language}. Additional information: {additionalInfo}\n"
    );

    const chain = prompt.pipe(chatGroq);

    const output = await chain.invoke({
      input: input,
      language: language,
      additionalInfo: additionalInfo, // Use the additionalInfo here
    });

    console.log("Response from ChatGroq:", output);
    return output?.content || "No content returned";
  } catch (error) {
    console.error("Error invoking the chain:", error);
    return "Error occurred while processing the message.";
  }
}
