import { Button, Grid2, Modal, TextField } from "@mui/material";
import { Repository, UpdatableRepositoryData } from "../../models/repo";
import { useState } from "react";
import styles from "./EditRepoModal.module.css";

const EditRepoModal: React.FC<{
  open: boolean;
  onClose: () => void;
  onApply: (repo: Repository) => void;
  currentRepo: Repository;
}> = ({ open, onClose, onApply, currentRepo }) => {
  const [updatedRepoData, setUpdatedRepoData] =
    useState<UpdatableRepositoryData>({
      name: currentRepo.name,
      owner: currentRepo.owner,
      description: currentRepo.description,
    });

  const handleApplyClick = () => {
    const updatedRepo: Repository = {
      ...currentRepo,
      ...updatedRepoData,
    };
    onApply(updatedRepo);
    onClose();
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleApplyClick();
    }
  };

  const handleChange =
    (field: keyof UpdatableRepositoryData) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setUpdatedRepoData({ ...updatedRepoData, [field]: event.target.value });
    };

  return (
    <Modal open={open} onClose={onClose} onKeyPress={handleKeyPress}>
      <div className={styles.modalContainer}>
        <Grid2 container spacing={2} sx={{ minWidth: 300 }}>
          <Grid2 size={6}>
            <TextField
              id="name"
              label="Название репозитория"
              placeholder="Введите новое название"
              defaultValue={updatedRepoData.name}
              onChange={handleChange("name")}
              multiline
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              id="owner"
              label="Владелец"
              placeholder="Введите новое имя"
              defaultValue={updatedRepoData.owner}
              onChange={handleChange("owner")}
              multiline
            />
          </Grid2>
        </Grid2>
        <TextField
          id="description"
          label="Описание"
          placeholder="Введите новое описание"
          defaultValue={updatedRepoData.description}
          onChange={handleChange("description")}
          multiline
          fullWidth
          sx={{ mt: 2 }}
        />
        <Button
          fullWidth
          variant="contained"
          color="success"
          onClick={handleApplyClick}
          sx={{ mt: 2 }}
        >
          Изменить
        </Button>
      </div>
    </Modal>
  );
};

export default EditRepoModal;
