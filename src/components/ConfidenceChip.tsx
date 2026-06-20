import type { Confidence } from "@/types/medicine";

const config: Record<Confidence, { label: string; bg: string; text: string }> = {
  high: {
    label: "Identified",
    bg: "var(--color-mint)",
    text: "var(--color-green-deep)",
  },
  low: {
    label: "Low confidence",
    bg: "var(--color-amber-surface)",
    text: "var(--color-amber-text)",
  },
  unreadable: {
    label: "Unreadable",
    bg: "#F9ECEB",
    text: "var(--color-coral)",
  },
};

export function ConfidenceChip({ confidence }: { confidence: Confidence }) {
  const { label, bg, text } = config[confidence];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium"
      style={{ backgroundColor: bg, color: text }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current flex-shrink-0" />
      {label}
    </span>
  );
}
