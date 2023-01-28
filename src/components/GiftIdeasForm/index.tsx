import {
  Avatar,
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { relations } from "../../db/inputParameters";

export default function Form({ handleSubmit, disabled }) {
  return (
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
              disabled={disabled}
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
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="occasion"
              label="The occasion"
              disabled={disabled}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="hobbies"
              label="Hobbies and interests:"
              disabled={disabled}
              required
              fullWidth
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={disabled}
          sx={{ mt: 3, mb: 2 }}
        >
          create
        </Button>
      </Box>
    </Paper>
  );
}
