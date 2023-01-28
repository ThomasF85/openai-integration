import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function createAnswer(prompt): Promise<string> {
  const time = Date.now();
  const moderationResponse: any = await openai.createModeration({
    input: prompt,
  });
  console.log(Date.now() - time);
  console.log(moderationResponse.data.results[0].categories);
  if (
    Object.values(moderationResponse.data.results[0].categories).some(
      (value) => value === true
    )
  ) {
    throw new Error("Request did not pass moderation");
  }

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
  const response = await openai.createImage({
    prompt,
    n: 1,
    size: "1024x1024",
  });
  return response.data.data[0].url;
}
