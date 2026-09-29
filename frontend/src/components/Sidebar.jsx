import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import QuizIcon from "@mui/icons-material/Quiz";
import CodeIcon from "@mui/icons-material/Code";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useLocation, useNavigate } from "react-router-dom";

const expandedWidth = 240;
const collapsedWidth = 72;

const navItems = [
  { label: "Dashboard", path: "/", icon: <DashboardIcon /> },
  { label: "Courses", path: "/courses", icon: <MenuBookIcon /> },
  { label: "MCQ", path: "/mcq", icon: <QuizIcon /> },
  { label: "Practice", path: "/practice", icon: <CodeIcon /> },
  { label: "Progress", path: "/progress", icon: <TrendingUpIcon /> },
];

export default function Sidebar({ collapsed, setCollapsed }) {
  const navigate = useNavigate();
  const location = useLocation();
  const width = collapsed ? collapsedWidth : expandedWidth;

  const isActive = (path) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname === path || location.pathname.startsWith(`${path}/`);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width,
          boxSizing: "border-box",
          overflowX: "hidden",
          transition: (theme) => theme.transitions.create("width"),
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", minHeight: 64, px: collapsed ? 1 : 2 }}>
        {!collapsed && (
          <Typography variant="h6" sx={{ fontWeight: 800, flexGrow: 1 }}>
            Recitation
          </Typography>
        )}
        <Tooltip title={collapsed ? "Expand sidebar" : "Minimize sidebar"}>
          <IconButton onClick={() => setCollapsed((value) => !value)} sx={{ mx: collapsed ? "auto" : 0 }}>
            {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </Tooltip>
      </Box>

      <Divider />

      <List sx={{ px: 1 }}>
        {navItems.map((item) => (
          <Tooltip key={item.path} title={collapsed ? item.label : ""} placement="right">
            <ListItemButton
              selected={isActive(item.path)}
              onClick={() => navigate(item.path)}
              sx={{ minHeight: 48, borderRadius: 2, mb: 0.5, justifyContent: collapsed ? "center" : "initial" }}
            >
              <ListItemIcon sx={{ minWidth: collapsed ? 0 : 40, justifyContent: "center" }}>
                {item.icon}
              </ListItemIcon>
              {!collapsed && <ListItemText primary={item.label} />}
            </ListItemButton>
          </Tooltip>
        ))}
      </List>

      <Box sx={{ flexGrow: 1 }} />
    </Drawer>
  );
}
