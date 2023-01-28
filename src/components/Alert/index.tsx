import MuiAlert from "@mui/material/Alert";
import { ModerationError } from "../../domain/ModerationError";

export default function Alert({ error }) {
  return (
    <MuiAlert severity="error">
      {error.name === ModerationError.name
        ? `Your request can not be processed, it has been flagged as ${error.flags.join(
            ", "
          )}`
        : "Something went wrong, pleases try again!"}
    </MuiAlert>
  );
}
