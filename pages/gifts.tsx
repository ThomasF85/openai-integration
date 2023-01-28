import { CircularProgress, Container } from "@mui/material";
import Header from "../src/components/Header";
import { relations } from "../src/db/inputParameters";
import IdeasCard, { IdeaSet } from "../src/components/IdeasCard";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import { ModerationError } from "../src/domain/ModerationError";
import Alert from "../src/components/Alert";
import Form from "../src/components/GiftIdeasForm";

async function sendRequest(url, { arg }) {
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
  });

  if (!res.ok) {
    const info = await res.json();
    if (info.error?.flags) {
      throw new ModerationError(info.error.flags);
    }
    const error: any = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = info;
    error.status = res.status;
    throw error;
  }

  return res.json();
}

export default function Gifts() {
  const [ideaSets, setIdeaSets] = useState<IdeaSet[]>([]);

  const { trigger, isMutating, error } = useSWRMutation(
    "/api/gifts",
    sendRequest
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    try {
      const result: IdeaSet = await trigger(data);
      (event.target as HTMLFormElement).reset();
      setIdeaSets((prev) => [{ ...result }, ...prev]);
    } catch (error) {}
  }

  return (
    <>
      <Header label="Gift ideas creator" />
      <Container component="main" maxWidth="xs">
        <Form handleSubmit={handleSubmit} disabled={isMutating} />
        {error && !isMutating && <Alert error={error} />}
        {isMutating && (
          <CircularProgress sx={{ display: "block", mx: "auto" }} />
        )}
        {ideaSets.map((prompt) => (
          <IdeasCard {...prompt} />
        ))}
      </Container>
    </>
  );
}
