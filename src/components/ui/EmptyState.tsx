"use client";
import { FiInbox } from "react-icons/fi";

export function EmptyState({ message = "No items found" }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-gray-400">
      <FiInbox size={48} />
      <p className="mt-4 text-lg">{message}</p>
    </div>
  );
}
