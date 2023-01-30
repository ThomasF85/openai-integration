import { Button, CircularProgress, Container } from "@mui/material";
import Header from "../src/components/Header";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import Alert from "../src/components/Alert";
import EmbeddingForm from "../src/components/EmbeddingForm";
import { postRequest } from "../src/requests";
import { IEmbedding } from "../src/domain/embeddings";

export default function Embeddings() {
  const [embedding, setEmbedding] = useState<IEmbedding | null>(null);

  const { trigger, isMutating, error } = useSWRMutation(
    "/api/embedding",
    postRequest
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    try {
      const result: IEmbedding = await trigger(data);
      (event.target as HTMLFormElement).reset();
      setEmbedding(result);
    } catch (error) {}
  }

  return (
    <>
      <Header label="Embedding creator" />
      <Container component="main" maxWidth="xs">
        <EmbeddingForm handleSubmit={handleSubmit} disabled={isMutating} />
        {error && !isMutating && <Alert error={error} />}
        {isMutating && (
          <CircularProgress sx={{ display: "block", mx: "auto" }} />
        )}
      </Container>
      {embedding && !isMutating && (
        <>
          <pre
            style={{
              whiteSpace: "break-spaces",
              height: "30em",
              overflowY: "auto",
              backgroundColor: "#eeeeee",
            }}
          >
            {JSON.stringify(embedding, null, 2)}
          </pre>
          <Button
            variant="outlined"
            onClick={() =>
              navigator.clipboard.writeText(JSON.stringify(embedding, null, 2))
            }
          >
            copy to clipboard
          </Button>
        </>
      )}
    </>
  );
}
