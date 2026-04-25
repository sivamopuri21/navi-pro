"use client";
import Image from "next/image";

interface Props {
  size?: "sm" | "md" | "lg";
  light?: boolean;
}

export function Logo({ size = "md" }: Props) {
  const sizes = {
    sm: "h-13",
    md: "h-17",
    lg: "h-23",
  };

  return (
    <Image
      src="/logo-navipro.png"
      alt="NaviPro Projects"
      width={200}
      height={80}
      className={`${sizes[size]} w-auto object-contain`}
      priority
    />
  );
}
