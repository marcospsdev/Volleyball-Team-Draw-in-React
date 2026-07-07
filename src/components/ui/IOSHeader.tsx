import { AppBar, Toolbar, Avatar, IconButton, Typography } from "@mui/material";
import { motion } from "framer-motion";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import { useThemeMode } from "@/theme/useThemeMode";

const LOGO = "/logo/logo-header.png";

const MotionIconButton = motion.create(IconButton);

type IOSHeaderProps = {
  title: string;
};

export function IOSHeader({ title }: IOSHeaderProps) {
  const { mode, toggleMode } = useThemeMode();

  return (
    <AppBar
      position="sticky"
      sx={{ pt: "env(safe-area-inset-top)", borderRadius: 0 }}
    >
      <Toolbar sx={{ display: "flex", alignItems: "center", gap: 1.5, py: 1.5, px: 2 }}>
        <Avatar
          alt="Vôlei dos Melhores"
          src={LOGO}
          variant="rounded"
          sx={{ width: 36, height: 36, flexShrink: 0, bgcolor: "transparent" }}
        />
        <Typography variant="headline" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <MotionIconButton
          onClick={toggleMode}
          size="small"
          whileTap={{ scale: 0.8, rotate: 20 }}
          aria-label="Alternar modo claro/escuro"
        >
          {mode === "dark" ? (
            <LightModeRoundedIcon fontSize="small" />
          ) : (
            <DarkModeRoundedIcon fontSize="small" />
          )}
        </MotionIconButton>
      </Toolbar>
    </AppBar>
  );
}
