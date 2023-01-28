import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import Header from "../src/components/Header";
import { relations } from "../src/db/inputParameters";
import IdeasCard, { IdeaSet } from "../src/components/IdeasCard";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import Alert from "@mui/material/Alert";

async function sendRequest(url, { arg }) {
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
  });

  if (!res.ok) {
    const error: any = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await res.json();
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
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Header label="Gift ideas creator" />
      <Container component="main" maxWidth="xs">
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            px: 2,
            mb: 4,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <SmartToyIcon />
          </Avatar>
          <Typography component="h2" variant="h5">
            Create new ideas
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="relation"
                  label="For your"
                  disabled={isMutating}
                  select
                  required
                  fullWidth
                >
                  {relations.map((relation) => (
                    <MenuItem key={relation} value={relation}>
                      {relation}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="name"
                  label="Their name"
                  required
                  fullWidth
                  disabled={isMutating}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="occasion"
                  label="The occasion"
                  disabled={isMutating}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="hobbies"
                  label="Hobbies and interests:"
                  disabled={isMutating}
                  required
                  fullWidth
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isMutating}
              sx={{ mt: 3, mb: 2 }}
            >
              create
            </Button>
          </Box>
        </Paper>
        {error && !isMutating && (
          <Alert severity="error">
            Something went wrong, pleases try again!
          </Alert>
        )}
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
