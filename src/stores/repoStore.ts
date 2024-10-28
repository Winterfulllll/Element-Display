import { makeAutoObservable, runInAction } from "mobx";
import {
  Repository,
  ReceivedData,
  SortBy,
  SortOrder,
  UpdatableRepositoryData,
} from "../models/repo";
import { getRepos } from "../api";

class RepoStore {
  public repos: Repository[] = [];
  public isLoading: boolean = false;
  public repoTotalCount: number = -1;
  public query: string = "";
  public hasMore: boolean = true;
  private page: number = 1;
  private perPage: number = 20;
  private sortOrder: SortOrder = "desc";
  private sortBy: SortBy = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchRepos() {
    if (this.isLoading) return;
    runInAction(() => {
      this.isLoading = true;
    });
    try {
      const response: ReceivedData = await getRepos(
        this.query,
        this.page,
        this.perPage,
        this?.sortBy,
        this?.sortOrder
      );
      const newReposData = response.repos;
      runInAction(() => {
        this.repos = [
          ...this.repos,
          ...newReposData.map((repoData) => new Repository(repoData)),
        ];
        this.repoTotalCount = response.total_count;

        if (
          newReposData.length < this.perPage ||
          this.page * this.perPage >= this.repoTotalCount
        ) {
          this.hasMore = false;
        } else {
          this.hasMore = true;
        }

        this.page++;
      });
    } catch (error) {
      console.error("Error loading repositories:", error);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  updateSearchParams(
    params: Partial<{ query?: string; sortOrder?: SortOrder; sortBy?: SortBy }>
  ): void {
    Object.assign(this, params);
    this.page = 1;
    this.repos = [];
    if (this.query) {
      this.fetchRepos();
    }
  }

  deleteRepo(uniqueKey: string): void {
    runInAction(() => {
      this.repos = this.repos.filter((repo) => repo.uniqueKey !== uniqueKey);
    });
  }

  updateRepo(
    uniqueKey: string,
    updatedRepoData: Partial<UpdatableRepositoryData>
  ): void {
    runInAction(() => {
      const repoIndex = this.repos.findIndex(
        (repo) => repo.uniqueKey === uniqueKey
      );
      if (repoIndex !== -1) {
        this.repos[repoIndex] = {
          ...this.repos[repoIndex],
          ...updatedRepoData,
        };
      }
    });
  }
}

export default new RepoStore();
