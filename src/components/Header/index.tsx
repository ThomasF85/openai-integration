import { Typography } from "@mui/material";

interface Props {
  label: string;
}

export default function Header({ label }: Props) {
  return (
    <header style={{ padding: "1em 0" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {label}
      </Typography>
    </header>
  );
}
