import { IconButton, ListItem, ListItemText } from "@mui/material";
import { Repository } from "../../../../models/repo";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import repoStore from "../../../../stores/repoStore";
import EditRepoModal from "../../../EditRepoModal/EditRepoModal";
import { useState } from "react";
// import styles from "./Repo.module.css";

const Repo: React.FC<{
  repository: Repository;
}> = ({ repository }) => {
  const [repo, setRepo] = useState<Repository>(repository);
  const [modalOpen, setModalOpen] = useState(false);

  const handleDelete = () => {
    repoStore.deleteRepo(repo.uniqueKey);
  };

  const handleEdit = () => {
    setModalOpen(true);
  };

  const handleUpdateRepo = (repo: Repository) => {
    setRepo(repo);
    repoStore.updateRepo(repo.uniqueKey, repo);
  };

  return (
    <ListItem>
      <ListItemText primary={repo.name} />
      <IconButton aria-label="edit" onClick={handleEdit}>
        <EditIcon />
      </IconButton>
      <IconButton aria-label="delete" onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
      <EditRepoModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onApply={handleUpdateRepo}
        currentRepo={repo}
      />
    </ListItem>
  );
};

export default Repo;
