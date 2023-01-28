import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { List, ListItem } from "@mui/material";

export interface IdeaSet {
  ideas: string[];
  name: string;
  relation: string;
  occasion: string;
  hobbies: string;
}

export default function IdeasCard({
  ideas,
  name,
  relation,
  occasion,
  hobbies,
}: IdeaSet) {
  return (
    <Card sx={{ width: "100%", my: 2 }} variant="outlined">
      <CardContent
        sx={{
          "&:last-child": {
            pb: 0,
          },
        }}
      >
        <Typography variant="h6" component="h2">
          Ideas for {name}, your {relation}
        </Typography>
        <List sx={{ listStyleType: "disc", pl: 2 }}>
          {ideas.map((idea, index) => (
            <ListItem
              key={index}
              sx={{ display: "list-item", pl: 0, py: 0.5, fontSize: "0.8em" }}
            >
              <Typography variant="body2" fontSize="1em">
                {idea}
              </Typography>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
