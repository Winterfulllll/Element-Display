import axios from "axios";
import { ReceivedData } from "../models/repo";

export const getRepos = async (
  query: string,
  page: number,
  per_page: number,
  sort: string | null,
  order: string | null
): Promise<ReceivedData> => {
  const response = await axios.get(
    "https://api.github.com/search/repositories",
    {
      params: {
        q: query,
        sort: sort,
        order: order,
        page: page,
        per_page: per_page,
      },
    }
  );
  return { repos: response.data.items, total_count: response.data.total_count };
};
