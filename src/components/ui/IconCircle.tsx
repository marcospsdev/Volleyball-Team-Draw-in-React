type IconCircleProps = {
  emoji?: string;
  color?: string;
  size?: number;
};

export function IconCircle({ emoji, color = "#8E8E93", size = 28 }: IconCircleProps) {
  if (emoji) {
    return (
      <span
        style={{ fontSize: size, lineHeight: 1, display: "inline-block" }}
        aria-hidden
      >
        {emoji}
      </span>
    );
  }

  return (
    <span
      style={{
        display: "inline-block",
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: color,
      }}
      aria-hidden
    />
  );
}
