import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";

export interface ErrorLog {
  id?: string;
  message: string;
  stack?: string;
  page: string;
  timestamp: number;
  userAgent?: string;
}

export async function logError(error: unknown, page: string) {
  try {
    const err = error instanceof Error ? error : new Error(String(error));
    await addDoc(collection(db, "errorLogs"), {
      message: err.message,
      stack: err.stack || "",
      page,
      timestamp: Date.now(),
      userAgent: typeof window !== "undefined" ? navigator.userAgent : "server",
    });
  } catch {
    // Silently fail — don't break the app if logging fails
    console.error("Failed to log error:", error);
  }
}
