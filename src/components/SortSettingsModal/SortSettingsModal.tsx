import {
  Button,
  FormControlLabel,
  MenuItem,
  Modal,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import { SORT_BY_OPTIONS, SortBy, SortOrder } from "../../models/repo";
import { useState } from "react";
import styles from "./SortSettingsModal.module.css";

const SortSettingsModal: React.FC<{
  open: boolean;
  onClose: () => void;
  onApply: (sortBy: SortBy, sortOrder: SortOrder) => void;
}> = ({ open, onClose, onApply }) => {
  const [sortBy, setSortBy] = useState<SortBy>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const handleApplyClick = () => {
    onApply(sortBy, sortOrder);
    onClose();
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleApplyClick();
    }
  };

  return (
    <Modal open={open} onClose={onClose} onKeyPress={handleKeyPress}>
      <div className={styles.modalContainer}>
        <Stack spacing={2} sx={{ minWidth: 300 }}>
          <TextField
            select
            label="Сортировать по"
            value={sortBy ?? ""}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            fullWidth
          >
            {SORT_BY_OPTIONS.map((option, index) => (
              <MenuItem key={index} value={option.value?.toString()}>
                {option.labelRu}
              </MenuItem>
            ))}
          </TextField>
          <FormControlLabel
            sx={{ ml: 10 }}
            control={
              <Switch
                checked={sortOrder === "asc"}
                onChange={(e) =>
                  setSortOrder(e.target.checked ? "asc" : "desc")
                }
                name="sortOrderSwitch"
              />
            }
            label="Обратный порядок"
          />
          <Button
            variant="contained"
            color="success"
            onClick={handleApplyClick}
          >
            Применить
          </Button>
        </Stack>
      </div>
    </Modal>
  );
};

export default SortSettingsModal;
