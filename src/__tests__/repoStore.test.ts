import RepoStore from "../stores/repoStore";
import { Repository } from "../models/repo";
import { getRepos } from "../api";

jest.mock("../api");

describe("RepoStore", () => {
  const store = RepoStore;
  let consoleErrorSpy: jest.SpyInstance;

  const TestRepoData = {
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
  };
  const mockRepoResponse = {
    total_count: 1,
    repos: [TestRepoData],
  };

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    (getRepos as jest.Mock).mockResolvedValue(mockRepoResponse);
  });

  it("should update search params and refetch", () => {
    store.updateSearchParams({
      query: "test",
      sortBy: "stars",
      sortOrder: "asc",
    });

    expect(store.query).toBe("test");
    expect(store.repos.length).toBe(0);
    store.fetchRepos();
    expect(getRepos).toHaveBeenCalledWith("test", 1, 20, "stars", "asc");
  });

  it("should delete a repo", () => {
    const repo = new Repository(TestRepoData);
    store.repos = [repo];

    store.deleteRepo(repo.uniqueKey);

    expect(store.repos.length).toBe(0);
  });

  it("should update a repo", () => {
    const repo = new Repository(TestRepoData);
    store.repos = [repo];

    store.updateRepo(repo.uniqueKey, { description: "new desc" });

    expect(store.repos[0].description).toBe("new desc");
    expect(store.repos[0].name).toBe("test");
  });
});
