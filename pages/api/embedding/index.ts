import { createEmbedding } from "../../../services/aiService";
import { withErrorHandling } from "../../../src/backend/withErrorHandling";
import { IEmbedding } from "../../../src/domain/embeddings";

async function handler(req, res) {
  if (req.method === "POST") {
    const embedding: IEmbedding = {
      input: req.body.input,
      vector: await createEmbedding(req.body.input),
    };

    return res.status(200).json({
      ...embedding,
    });
  }
}

export default withErrorHandling(["POST"], handler);
