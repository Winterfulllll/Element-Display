import {
  Container,
  IconButton,
  Link,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Repository } from "../../../../models/repo";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import repoStore from "../../../../stores/repoStore";
import EditRepoModal from "../../../EditRepoModal/EditRepoModal";
import { useState } from "react";
import truncate from "lodash/truncate";
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
      <Container
        sx={{
          overflow: "hidden",
        }}
      >
        <ListItemText
          primary={
            <Typography>
              <Link
                href={repo.ownerUrl}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "inherit",
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                {repo.owner}
              </Link>
              {" / "}
              <Link
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "inherit",
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                {repo.name}
              </Link>
            </Typography>
          }
          secondary={
            <Typography variant="body2" color="text.secondary">
              {repo.description ? (
                truncate(repo.description, {
                  length: 150,
                  omission: "...",
                })
              ) : (
                <i>Описание отсутствует</i>
              )}
            </Typography>
          }
        />
      </Container>
      <IconButton aria-label="edit" onClick={handleEdit} sx={{ ml: 5 }}>
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
