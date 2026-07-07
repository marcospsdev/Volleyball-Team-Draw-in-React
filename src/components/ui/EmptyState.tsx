import { Typography } from "@mui/material";
import type { ReactNode } from "react";

type EmptyStateProps = {
  icon: ReactNode;
  title: string;
  description?: string;
};

export function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-10 px-6 text-center opacity-70">
      {icon}
      <Typography variant="headline">{title}</Typography>
      {description && (
        <Typography variant="footnote" color="text.secondary">
          {description}
        </Typography>
      )}
    </div>
  );
}
