import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { ModerationError } from "../domain/ModerationError";

type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export function withErrorHandling(
  allowedMethods: RequestMethod[],
  handler: NextApiHandler
) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    try {
      if (!allowedMethods.includes(req.method as RequestMethod)) {
        return res.status(405).json({ message: "Method not allowed" });
      }
      return await handler(req, res);
    } catch (error: any) {
      if (error?.name === ModerationError.NAME) {
        return res.status(400).json({ error });
      }
      console.error("non moderation error on request", error);
      return res.status(500).json({ error });
    }
  };
}
