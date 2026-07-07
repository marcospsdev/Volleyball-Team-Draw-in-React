import { motion } from "framer-motion";
import { useId } from "react";

type Segment<T extends string> = {
  value: T;
  label: string;
};

type SegmentedControlProps<T extends string> = {
  segments: Segment<T>[];
  value: T;
  onChange: (value: T) => void;
};

export function SegmentedControl<T extends string>({
  segments,
  value,
  onChange,
}: SegmentedControlProps<T>) {
  const layoutId = useId();

  return (
    <div className="flex gap-1 p-1 rounded-full bg-black/5 dark:bg-white/10">
      {segments.map((segment) => {
        const selected = segment.value === value;
        return (
          <button
            key={segment.value}
            type="button"
            onClick={() => onChange(segment.value)}
            className="relative flex-1 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors"
            style={{ color: selected ? "#fff" : "inherit" }}
          >
            {selected && (
              <motion.span
                layoutId={`segmented-pill-${layoutId}`}
                className="absolute inset-0 rounded-full bg-[#007AFF]"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            <span className="relative z-10">{segment.label}</span>
          </button>
        );
      })}
    </div>
  );
}
