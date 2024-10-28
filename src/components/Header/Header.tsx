import { AppBar, Toolbar, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <AppBar position="relative">
      <Toolbar>
        <GitHubIcon sx={{ mr: 2 }} />
        <Typography variant="h6">RepoSearcher</Typography>
      </Toolbar>
    </AppBar>
  );
}
