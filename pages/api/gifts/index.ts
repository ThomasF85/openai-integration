import { createAnswer } from "../../../services/aiService";

function createPrompt({ name, relation, occasion, hobbies }) {
  return `Create 5 short gift ideas for ${name} who is my ${relation} with the following hobbies: ${hobbies}. The occasion is ${occasion}.`;
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const answer = await createAnswer(createPrompt(JSON.parse(req.body)));

    const ideas = answer
      .split("\n")
      .filter((str) => /\S/.test(str))
      .map((str) => str.substring(3));

    return res.status(200).json({
      ...JSON.parse(req.body),
      ideas,
    });
  }

  res.status(405).send({ message: "Only POST requests are allowed" });
}
