import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

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
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  };
}
