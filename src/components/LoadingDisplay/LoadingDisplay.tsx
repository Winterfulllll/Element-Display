import { CircularProgress } from "@mui/material";
// import styles from "./LoadingDisplay.module.css";

export default function LoadingDisplay() {
  return (
    <div style={{ textAlign: "center", zIndex: "1000" }}>
      <CircularProgress />
    </div>
  );
}
