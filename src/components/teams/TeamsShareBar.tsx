import type { RefObject } from "react";
import { useTheme } from "@mui/material";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import IosShareRoundedIcon from "@mui/icons-material/IosShareRounded";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import { GlassButton } from "@/components/ui/GlassButton";
import type { Team } from "@/types";
import { buildShareText } from "@/lib/shareText";
import { shareOrCopyText } from "@/hooks/useShare";
import { shareOrDownloadImage } from "@/hooks/useShareImage";

type Severity = "success" | "info" | "warning" | "error";

type TeamsShareBarProps = {
  teams: Team[];
  captureRef: RefObject<HTMLDivElement | null>;
  onFeedback: (message: string, severity: Severity) => void;
};

export function TeamsShareBar({ teams, captureRef, onFeedback }: TeamsShareBarProps) {
  const theme = useTheme();

  const handleShareText = async () => {
    const text = buildShareText(teams);
    const result = await shareOrCopyText(text, "Times do vôlei");
    if (result === "shared") onFeedback("Times compartilhados!", "success");
    else if (result === "copied") onFeedback("Times copiados! Cole no grupo do vôlei.", "success");
    else if (result === "failed") onFeedback("Não foi possível compartilhar.", "error");
  };

  const handleShareImage = async () => {
    const node = captureRef.current;
    if (!node) return;
    const result = await shareOrDownloadImage(
      node,
      "times-volei.png",
      theme.palette.background.default,
    );
    if (result === "shared") onFeedback("Imagem compartilhada!", "success");
    else if (result === "downloaded") onFeedback("Imagem baixada!", "success");
    else onFeedback("Não foi possível gerar a imagem.", "error");
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(buildShareText(teams));
      onFeedback("Times copiados! Cole no grupo do vôlei.", "success");
    } catch {
      onFeedback("Não foi possível copiar o texto.", "error");
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-3 mt-4">
      <GlassButton variant="contained" startIcon={<IosShareRoundedIcon />} onClick={handleShareText}>
        Compartilhar
      </GlassButton>
      <GlassButton variant="outlined" startIcon={<ImageRoundedIcon />} onClick={handleShareImage}>
        Compartilhar imagem
      </GlassButton>
      <GlassButton variant="text" startIcon={<ContentCopyRoundedIcon />} onClick={handleCopyText}>
        Copiar texto
      </GlassButton>
    </div>
  );
}
