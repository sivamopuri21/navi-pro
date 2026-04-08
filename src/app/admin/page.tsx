"use client";
import { useAuth } from "@/context/AuthContext";
import { LoginForm } from "./LoginForm";
import { AdminDashboard } from "./AdminDashboard";

export default function AdminPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return <LoginForm />;

  return <AdminDashboard />;
}
