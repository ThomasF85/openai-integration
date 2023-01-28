import { CircularProgress, Container } from "@mui/material";
import Header from "../src/components/Header";
import IdeasCard, { IdeaSet } from "../src/components/IdeasCard";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import Alert from "../src/components/Alert";
import GiftIdeasForm from "../src/components/GiftIdeasForm";
import { postRequest } from "../src/requests";

export default function Gifts() {
  const [ideaSets, setIdeaSets] = useState<IdeaSet[]>([]);

  const { trigger, isMutating, error } = useSWRMutation(
    "/api/gifts",
    postRequest
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
        <GiftIdeasForm handleSubmit={handleSubmit} disabled={isMutating} />
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
