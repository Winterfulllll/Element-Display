import { Container, CssBaseline } from "@mui/material";
import Header from "./components/Header/Header";
import SearchQueryInput from "./components/SearchQueryInput/SearchQueryInput";
import RepoListWithChecks from "./components/RepoListWithChecks/RepoListWithChecks";

export default function App() {
  return (
    <>
      <CssBaseline />
      <Header />
      <Container sx={{ mt: "40px" }}>
        <SearchQueryInput />
        <RepoListWithChecks />
      </Container>
    </>
  );
}
