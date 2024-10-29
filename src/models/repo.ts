import { v4 as uuidv4 } from "uuid";

export const SORT_BY_OPTIONS = [
  { value: "stars", labelRu: "Звездам" },
  { value: "forks", labelRu: "Форкам" },
  { value: "help-wanted-issues", labelRu: "Проблемам требующим помощи" },
  { value: null, labelRu: "<i>Выключить</i>" },
] as const;

export type SortBy = (typeof SORT_BY_OPTIONS)[number]["value"];

export const SORT_ORDER_OPTIONS = [
  { value: "desc", labelRu: "По убыванию" },
  { value: "asc", labelRu: "По возрастанию" },
] as const;

export type SortOrder = (typeof SORT_ORDER_OPTIONS)[number]["value"];

export interface RepositoryReceivedData {
  id: number;
  name: string;
  html_url: string;
  owner: {
    login: string;
    html_url: string;
  };
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
}

export interface ReceivedData {
  repos: RepositoryReceivedData[];
  total_count: number;
}

export type UpdatableRepositoryData = Omit<
  Repository,
  | "id"
  | "url"
  | "ownerUrl"
  | "starsCount"
  | "forksCount"
  | "openIssuesCount"
  | "uniqueKey"
>;

export class Repository {
  id: number;
  name: string;
  url: string;
  owner: string;
  ownerUrl: string;
  description: string | null;
  starsCount: number;
  forksCount: number;
  openIssuesCount: number;
  uniqueKey: string;

  constructor(repoData: RepositoryReceivedData) {
    this.id = repoData.id;
    this.name = repoData.name;
    this.owner = repoData.owner.login;
    this.ownerUrl = repoData.owner.html_url;
    this.description = repoData.description;
    this.url = repoData.html_url;
    this.starsCount = repoData.stargazers_count;
    this.forksCount = repoData.forks_count;
    this.openIssuesCount = repoData.open_issues_count;
    this.uniqueKey = uuidv4();
  }
}
