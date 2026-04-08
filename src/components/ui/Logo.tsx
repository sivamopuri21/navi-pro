"use client";

interface Props {
  size?: "sm" | "md" | "lg";
  light?: boolean;
}

export function Logo({ size = "md", light }: Props) {
  const sizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-3xl",
  };

  return (
    <div className={`${sizes[size]} font-bold tracking-tight leading-tight`}>
      <span className={light ? "text-white" : "text-primary"}>Navi</span>
      <span className="text-accent">Pro</span>
    </div>
  );
}
