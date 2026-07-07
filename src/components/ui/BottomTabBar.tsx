import { useEffect, useState } from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import ShuffleRoundedIcon from "@mui/icons-material/ShuffleRounded";
import SportsVolleyballRoundedIcon from "@mui/icons-material/SportsVolleyballRounded";

const TABS = [
  { label: "Membros", value: "/membros", icon: <GroupsRoundedIcon /> },
  { label: "Times", value: "/team-draw", icon: <ShuffleRoundedIcon /> },
  { label: "Placar", value: "/game-score", icon: <SportsVolleyballRoundedIcon /> },
];

export function BottomTabBar() {
  const location = useLocation();
  const [value, setValue] = useState(location.pathname);

  useEffect(() => {
    setValue(location.pathname);
  }, [location]);

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        pb: "env(safe-area-inset-bottom)",
      }}
      elevation={0}
      square
    >
      <BottomNavigation showLabels value={value} onChange={(_, next) => setValue(next)}>
        {TABS.map((tab) => (
          <BottomNavigationAction
            key={tab.value}
            label={tab.label}
            value={tab.value}
            icon={tab.icon}
            component={Link}
            to={tab.value}
            sx={{
              color: value === tab.value ? "#007AFF" : "text.secondary",
              "&.Mui-selected": { color: "#007AFF" },
            }}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}
