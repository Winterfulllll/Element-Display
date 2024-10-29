import { AppBar, Link, Toolbar, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
// import styles from "./Header.module.css";

export default function Header() {
  return (
    <AppBar position="relative">
      <Toolbar>
        <GitHubIcon sx={{ mr: 2 }} />
        <Link
          href={"https://github.com/Winterfulllll/Repo-Searcher"}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: "inherit",
            textDecoration: "none",
          }}
        >
          <Typography variant="h6" fontFamily={"Nunito"} fontWeight={700}>
            RepoSearcher
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
