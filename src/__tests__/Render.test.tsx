import { test } from "@jest/globals";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Repository } from "../models/repo";
import App from "../App";
import EditRepoModal from "../components/EditRepoModal/EditRepoModal";
import Repo from "../components/RepoListWithChecks/RepoList/Repo/Repo";
import RepoList from "../components/RepoListWithChecks/RepoList/RepoList";
import LoadingDisplay from "../components/LoadingDisplay/LoadingDisplay";
import SearchQueryInput from "../components/SearchQueryInput/SearchQueryInput";
import NothingWasFound from "../components/NothingWasFound/NothingWasFound";
import SortSettingsModal from "../components/SortSettingsModal/SortSettingsModal";

const testRepo = new Repository({
  id: 1,
  name: "test",
  html_url: "test url",
  owner: {
    login: "owner test",
    html_url: "owner test url",
  },
  description: "desc",
  stargazers_count: 1000,
  forks_count: 228,
  open_issues_count: 999,
});

test("Render App", () => {
  render(<App />);
});

test("Render Repo", () => {
  render(<Repo repository={testRepo} />);
});

test("Render RepoList", () => {
  render(<RepoList />);
});

test("Render EditRepoModal", () => {
  render(
    <EditRepoModal
      open={true}
      onClose={() => {}}
      onApply={() => {}}
      currentRepo={testRepo}
    />
  );
});

test("Render EditRepoModal", () => {
  render(
    <SortSettingsModal open={true} onClose={() => {}} onApply={() => {}} />
  );
});

test("Render Loading", () => {
  render(<LoadingDisplay />);
});

test("Render NothingWasFound", () => {
  render(<NothingWasFound />);
});

test("Render SearchQueryInput", () => {
  render(<SearchQueryInput />);
});
