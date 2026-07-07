import { useRef, useState, type ChangeEvent } from "react";
import { Avatar, TextField, IconButton } from "@mui/material";
import PhotoCameraRoundedIcon from "@mui/icons-material/PhotoCameraRounded";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { resizeImageFile } from "@/lib/imageResize";
import type { MemberPhoto } from "@/types";

type PhotoPickerProps = {
  photo: MemberPhoto | null;
  onChange: (photo: MemberPhoto | null) => void;
  fallbackLetter: string;
};

export function PhotoPicker({ photo, onChange, fallbackLetter }: PhotoPickerProps) {
  const [mode, setMode] = useState<"upload" | "url">(photo?.kind === "url" ? "url" : "upload");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const previewSrc =
    photo?.kind === "upload" ? photo.dataUrl : photo?.kind === "url" ? photo.url : undefined;

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await resizeImageFile(file);
    onChange({ kind: "upload", dataUrl });
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <Avatar src={previewSrc} sx={{ width: 84, height: 84, fontSize: 32 }}>
          {fallbackLetter}
        </Avatar>
        {mode === "upload" && (
          <IconButton
            size="small"
            onClick={() => fileInputRef.current?.click()}
            sx={{
              position: "absolute",
              bottom: -4,
              right: -4,
              bgcolor: "primary.main",
              color: "white",
              "&:hover": { bgcolor: "primary.dark" },
            }}
          >
            <PhotoCameraRoundedIcon fontSize="small" />
          </IconButton>
        )}
      </div>

      <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleFileChange} />

      <SegmentedControl
        segments={[
          { value: "upload", label: "Upload" },
          { value: "url", label: "Link (URL)" },
        ]}
        value={mode}
        onChange={setMode}
      />

      {mode === "url" && (
        <TextField
          label="URL da imagem"
          size="small"
          fullWidth
          value={photo?.kind === "url" ? photo.url : ""}
          onChange={(e) =>
            onChange(e.target.value ? { kind: "url", url: e.target.value } : null)
          }
        />
      )}
    </div>
  );
}
