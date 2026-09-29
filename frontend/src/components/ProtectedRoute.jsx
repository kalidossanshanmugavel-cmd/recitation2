import { CircularProgress, Box } from "@mui/material";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ loading, user, children }) {
  if (loading) {
    return (
      <Box sx={{ minHeight: "70vh", display: "grid", placeItems: "center" }}>
        <CircularProgress />
      </Box>
    );
  }
  return user ? children : <Navigate to="/login" replace />;
}
