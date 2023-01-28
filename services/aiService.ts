import { Configuration, OpenAIApi } from "openai";
import { ModerationError } from "../src/domain/ModerationError";

const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function createAnswer(prompt): Promise<string> {
  await moderate(prompt);

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    temperature: 0.8,
    max_tokens: 250,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });

  return response.data.choices[0].text as string;
}

export async function createImage(prompt) {
  await moderate(prompt);

  const response = await openai.createImage({
    prompt,
    n: 1,
    size: "1024x1024",
  });
  return response.data.data[0].url;
}

async function moderate(prompt) {
  const moderationResponse: any = await openai.createModeration({
    input: prompt,
  });
  const flags: string[] = Object.entries(
    moderationResponse.data.results[0].categories
  )
    .filter(([_, value]) => value)
    .map(([flag, _]) => flag);
  if (flags.length > 0) {
    throw new ModerationError(flags);
  }
}
