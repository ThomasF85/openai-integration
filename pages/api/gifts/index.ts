import { createAnswer } from "../../../services/aiService";
import { withErrorHandling } from "../../../src/backend/withErrorHandling";

function createPrompt({ name, relation, occasion, hobbies }) {
  return `Create 5 short gift ideas for ${name} who is my ${relation} with the following hobbies: ${hobbies}. The occasion is ${occasion}.`;
}

async function handler(req, res) {
  if (req.method === "POST") {
    const answer = await createAnswer(createPrompt(req.body));

    const ideas = answer
      .split("\n")
      .filter((str) => /\S/.test(str))
      .map((str) => str.substring(3));

    return res.status(200).json({
      ...req.body,
      ideas,
    });
  }
}

export default withErrorHandling(["POST"], handler);
