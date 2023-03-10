import { ModerationError } from "./domain/ModerationError";

export async function postRequest(url, { arg }) {
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(arg),
  });

  if (!res.ok) {
    const info = await res.json();
    if (info?.error?.name === ModerationError.NAME) {
      const error: ModerationError = info.error;
      throw new ModerationError(error.flags);
    }
    const error: any = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = info;
    error.status = res.status;
    throw error;
  }

  return res.json();
}
