import repoStore from "../../stores/repoStore";
import RepoList from "./RepoList/RepoList";
import LoadingDisplay from "../LoadingDisplay/LoadingDisplay";
import NothingWasFound from "../NothingWasFound/NothingWasFound";
import { observer } from "mobx-react-lite";
import styles from "./RepoListWithChecks.module.css";

const RepoListWithChecks = observer(() => {
  return (
    <div className={styles.container}>
      {repoStore.repoTotalCount > 0 ? (
        <RepoList />
      ) : repoStore.isLoading ? (
        <LoadingDisplay />
      ) : (
        repoStore.repoTotalCount === 0 && <NothingWasFound />
      )}
    </div>
  );
});

export default RepoListWithChecks;
