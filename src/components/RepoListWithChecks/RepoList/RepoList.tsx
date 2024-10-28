import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import { List } from "@mui/material";
import repoStore from "../../../stores/repoStore";
import Repo from "./Repo/Repo";
import LoadingDisplay from "../../LoadingDisplay/LoadingDisplay";
// import styles from "./RepoList.module.css";

const RepoList = observer(() => {
  const listRef = useRef<HTMLUListElement>(null);

  const handleScroll = () => {
    if (listRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      if (
        scrollTop + clientHeight >= scrollHeight - 100 &&
        !repoStore.isLoading &&
        repoStore.hasMore
      ) {
        repoStore.fetchRepos();
      }
    }
  };

  const checkHeightAndFetch = () => {
    if (listRef.current) {
      const { scrollHeight, clientHeight } = listRef.current;
      if (
        scrollHeight <= clientHeight &&
        !repoStore.isLoading &&
        repoStore.hasMore
      ) {
        repoStore.fetchRepos();
      }
    }
  };

  useEffect(() => {
    checkHeightAndFetch();
  }, [repoStore.repos.length]);

  useEffect(() => {
    const listElement = listRef.current;

    if (listElement) {
      listElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (listElement) {
        listElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <List
      ref={listRef}
      component="ul"
      sx={{ maxHeight: 600, maxWidth: "100%", overflow: "auto" }}
    >
      {repoStore.repos.map((repo) => (
        <Repo key={repo.uniqueKey} repository={repo} />
      ))}
      {repoStore.isLoading && <LoadingDisplay />}
    </List>
  );
});

export default RepoList;
