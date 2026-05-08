"use client";
import { useEffect } from "react";
import { logError } from "@/lib/errorLogger";

export function GlobalErrorListener() {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      logError(event.error || event.message, window.location.pathname);
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      logError(event.reason, window.location.pathname);
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleRejection);
    };
  }, []);

  return null;
}
