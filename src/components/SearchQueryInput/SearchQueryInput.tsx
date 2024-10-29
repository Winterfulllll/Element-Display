import { Divider, IconButton, InputBase, Paper } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import repoStore from "../../stores/repoStore";
import SortSettingsModal from "../SortSettingsModal/SortSettingsModal";
import { SortBy, SortOrder } from "../../models/repo";
// import styles from "./SearchQueryInput.module.css";

export default function SearchQueryInput() {
  const [query, setQuery] = useState(repoStore.query);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSearch = () => {
    if (query.trim() !== "") {
      repoStore.updateSearchParams({ query });
      repoStore.fetchRepos();
    } else {
      alert("Поле поиска не может быть пустым!");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSettingsClick = () => {
    setModalOpen(true);
  };

  const handleApplySettings = (sortBy: SortBy, sortOrder: SortOrder) => {
    repoStore.updateSearchParams({ sortBy: sortBy, sortOrder: sortOrder });
    if (repoStore.query) {
      repoStore.fetchRepos();
    }
  };

  return (
    <>
      <Paper
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Напишите ключевые слова для поиска"
          inputProps={{ "aria-label": "search" }}
          value={query}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={handleSearch}
        >
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="settings"
          onClick={handleSettingsClick}
        >
          <SettingsIcon />
        </IconButton>
      </Paper>
      <SortSettingsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onApply={handleApplySettings}
      />
    </>
  );
}
