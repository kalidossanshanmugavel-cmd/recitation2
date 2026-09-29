import { Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import api from "./api";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import CourseDetails from "./pages/CourseDetails";
import Courses from "./pages/Courses";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import MCQ from "./pages/MCQ";
import Practice from "./pages/Practice";
import Progress from "./pages/Progress";
import Register from "./pages/Register";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    api.get("/auth/me")
      .then((r) => setUser(r.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const protect = (element) => (
    <ProtectedRoute loading={loading} user={user}>{element}</ProtectedRoute>
  );

  const appRoutes = (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} />
      <Route path="/register" element={user ? <Navigate to="/" /> : <Register setUser={setUser} />} />
      <Route path="/" element={protect(<Dashboard user={user || { name: "" }} />)} />
      <Route path="/courses" element={protect(<Courses />)} />
      <Route path="/courses/:id" element={protect(<CourseDetails />)} />
      <Route path="/mcq" element={protect(<MCQ />)} />
      <Route path="/practice" element={protect(<Practice />)} />
      <Route path="/progress" element={protect(<Progress />)} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );

  if (!user) {
    return <Container maxWidth="lg" sx={{ py: 5 }}>{appRoutes}</Container>;
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      <Box sx={{ flexGrow: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <Navbar user={user} setUser={setUser} />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Container maxWidth="lg" sx={{ py: 5 }}>{appRoutes}</Container>
        </Box>
      </Box>
    </Box>
  );
}
