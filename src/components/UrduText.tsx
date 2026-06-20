import { type CSSProperties, type ReactNode } from "react";

interface UrduTextProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: keyof React.JSX.IntrinsicElements;
}

export function UrduText({ children, className = "", style, as: Tag = "span" }: UrduTextProps) {
  return (
    <Tag
      dir="rtl"
      lang="ur"
      className={className}
      style={{ fontFamily: "var(--font-urdu)", ...style }}
    >
      {children}
    </Tag>
  );
}
