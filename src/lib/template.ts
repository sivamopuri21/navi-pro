export type Template = "corporate" | "showcase";

export function getTemplate(): Template {
  const t = process.env.NEXT_PUBLIC_TEMPLATE;
  if (t === "showcase") return "showcase";
  return "corporate";
}
