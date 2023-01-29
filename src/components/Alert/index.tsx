import MuiAlert from "@mui/material/Alert";
import { ModerationError } from "../../domain/ModerationError";

export default function Alert({ error }) {
  console.log("A", error);
  console.log("B", ModerationError.name);
  console.log("C", error.name === ModerationError.name);
  return (
    <MuiAlert severity="error">
      {error.name === ModerationError.name
        ? `Your request can not be processed, it has been flagged as ${error.flags.join(
            ", "
          )}`
        : "Something went wrong, please try again!"}
    </MuiAlert>
  );
}
