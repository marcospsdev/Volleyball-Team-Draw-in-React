import { AppBar, Toolbar, Avatar, IconButton, Typography } from "@mui/material";
import { motion } from "framer-motion";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import { useThemeMode } from "@/theme/useThemeMode";

const MARQUINHOS_AVATAR = "/avatars/marcos.jpg";
const LUQUINHAS_AVATAR = "/avatars/lucas.png";

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
      <Toolbar sx={{ display: "flex", alignItems: "center", gap: 1, py: 1.5, px: 2 }}>
        <Avatar
          alt="Marquinhos"
          src={MARQUINHOS_AVATAR}
          sx={{ width: 36, height: 36, border: "2px solid rgba(255,255,255,0.5)", flexShrink: 0 }}
        />
        <Typography variant="headline" sx={{ flexGrow: 1, textAlign: "center" }}>
          {title}
        </Typography>
        <Avatar
          alt="Luquinhas"
          src={LUQUINHAS_AVATAR}
          sx={{ width: 36, height: 36, border: "2px solid rgba(255,255,255,0.5)", flexShrink: 0 }}
        />
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
