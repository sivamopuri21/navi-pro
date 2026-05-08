"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getErrorLogs, deleteErrorLog, clearAllErrorLogs, getErrorLogRetentionDays, setErrorLogRetentionDays, cleanupExpiredErrorLogs } from "@/lib/errorLogService";
import type { ErrorLog } from "@/lib/errorLogger";
import { FiTrash2, FiAlertCircle, FiClock, FiMonitor, FiX, FiSettings } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

export default function DevLogsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [logs, setLogs] = useState<ErrorLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [retentionDays, setRetentionDays] = useState(7);
  const [editDays, setEditDays] = useState("7");
  const [showSettings, setShowSettings] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (!user) return;
    Promise.all([getErrorLogs(), getErrorLogRetentionDays()])
      .then(([l, days]) => {
        setLogs(l);
        setRetentionDays(days);
        setEditDays(String(days));
      })
      .finally(() => setLoading(false));

    // Auto-cleanup expired logs on page load
    cleanupExpiredErrorLogs().then((count) => {
      if (count > 0) {
        toast.success(`Auto-cleaned ${count} expired log${count > 1 ? "s" : ""}`);
        getErrorLogs().then(setLogs);
      }
    });
  }, [user]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <p className="text-gray-500 mb-4">You must be logged in as admin to view this page.</p>
          <a href="/admin" className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors">
            Go to Admin Login
          </a>
        </div>
      </div>
    );
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteErrorLog(id);
      setLogs((prev) => prev.filter((l) => l.id !== id));
      toast.success("Log deleted");
    } catch { toast.error("Failed to delete"); }
  };

  const handleClearAll = async () => {
    if (!confirm("Clear ALL error logs? This cannot be undone.")) return;
    try {
      await clearAllErrorLogs();
      setLogs([]);
      toast.success("All logs cleared");
    } catch { toast.error("Failed to clear"); }
  };

  const handleSaveSettings = async () => {
    const days = parseInt(editDays);
    if (isNaN(days) || days < 1) { toast.error("Enter a valid number (minimum 1)"); return; }
    setSavingSettings(true);
    try {
      await setErrorLogRetentionDays(days);
      setRetentionDays(days);
      toast.success(`Error logs will auto-delete after ${days} days`);
      setShowSettings(false);
    } catch { toast.error("Failed to save"); }
    finally { setSavingSettings(false); }
  };

  const handleCleanupNow = async () => {
    try {
      const count = await cleanupExpiredErrorLogs();
      if (count > 0) {
        toast.success(`Cleaned ${count} expired log${count > 1 ? "s" : ""}`);
        getErrorLogs().then(setLogs);
      } else {
        toast.success("No expired logs to clean");
      }
    } catch { toast.error("Cleanup failed"); }
  };

  // Group logs by time period
  const now = Date.now();
  const todayStart = new Date().setHours(0, 0, 0, 0);
  const weekStart = now - 7 * 24 * 60 * 60 * 1000;
  const monthStart = now - 30 * 24 * 60 * 60 * 1000;

  const today: ErrorLog[] = [];
  const thisWeek: ErrorLog[] = [];
  const thisMonth: ErrorLog[] = [];
  const older: ErrorLog[] = [];

  logs.forEach((log) => {
    if (log.timestamp >= todayStart) today.push(log);
    else if (log.timestamp >= weekStart) thisWeek.push(log);
    else if (log.timestamp >= monthStart) thisMonth.push(log);
    else older.push(log);
  });

  const sections = [
    { label: "Today", logs: today },
    { label: "This Week", logs: thisWeek },
    { label: "This Month", logs: thisMonth },
    { label: "Older", logs: older },
  ].filter((s) => s.logs.length > 0);

  return (
    <div className="min-h-screen bg-primary text-white p-6">
      <Toaster position="top-right" />
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <FiAlertCircle className="text-accent" /> Error Logs
            </h1>
            <p className="text-gray-300 text-sm mt-1">
              {logs.length} error{logs.length !== 1 ? "s" : ""} logged • Auto-delete after {retentionDays} days
            </p>
          </div>
          <div className="flex gap-2">
            <a href="/admin" className="px-3 py-2 bg-accent/20 text-accent rounded-lg text-sm font-medium hover:bg-accent/30 transition-colors border border-accent/30">
              ← Admin
            </a>
          </div>
        </div>

        {/* Action bar */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <button onClick={() => setShowSettings(!showSettings)}
            className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-300 hover:text-accent bg-primary-light rounded-lg border border-white/10 hover:border-accent/30 transition-colors cursor-pointer">
            <FiSettings size={14} /> Retention: {retentionDays} days
          </button>
          <button onClick={handleCleanupNow}
            className="px-3 py-2 text-sm text-gray-300 hover:text-accent bg-primary-light rounded-lg border border-white/10 hover:border-accent/30 transition-colors cursor-pointer">
            Run Cleanup Now
          </button>
          {logs.length > 0 && (
            <button onClick={handleClearAll}
              className="px-3 py-2 text-sm text-red-300 bg-red-600/10 rounded-lg border border-red-600/20 hover:bg-red-600/20 transition-colors cursor-pointer ml-auto">
              Clear All
            </button>
          )}
        </div>

        {/* Settings panel */}
        {showSettings && (
          <div className="bg-primary-light rounded-xl border border-white/10 p-5 mb-6">
            <h3 className="font-semibold text-accent text-sm mb-2">Auto-Delete Settings</h3>
            <p className="text-xs text-gray-400 mb-4">
              Error logs older than this many days will be automatically deleted when you visit this page.
            </p>
            <div className="flex items-center gap-3">
              <input type="number" min="1" value={editDays} onChange={(e) => setEditDays(e.target.value)}
                className="w-20 px-3 py-2 rounded-lg bg-primary border border-white/10 text-white text-sm outline-none focus:border-accent" />
              <span className="text-sm text-gray-400">days</span>
              <button onClick={handleSaveSettings} disabled={savingSettings}
                className="px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-dark transition-colors cursor-pointer disabled:opacity-50">
                {savingSettings ? "Saving..." : "Save"}
              </button>
              <button onClick={() => setShowSettings(false)}
                className="px-4 py-2 text-gray-400 hover:text-white text-sm cursor-pointer">
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-primary-light rounded-xl animate-pulse" />
            ))}
          </div>
        ) : logs.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <FiAlertCircle size={48} className="mx-auto mb-4 opacity-30" />
            <p>No errors logged. Everything is running smoothly.</p>
          </div>
        ) : (
          <div className="space-y-10">
            {sections.map((section) => (
              <div key={section.label}>
                <h2 className="text-sm font-semibold text-accent mb-4 flex items-center gap-2 uppercase tracking-wider">
                  <FiClock size={14} /> {section.label}
                  <span className="text-gray-400 normal-case tracking-normal font-normal">({section.logs.length})</span>
                </h2>
                <div className="space-y-3">
                  {section.logs.map((log) => (
                    <div key={log.id} className="bg-primary-light rounded-xl border border-white/10 overflow-hidden">
                      <div className="p-4 flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-red-400 mt-2 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-mono text-red-300 break-all">{log.message}</p>
                          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-400">
                            <span className="flex items-center gap-1">
                              <FiMonitor size={10} /> {log.page}
                            </span>
                            <span>
                              {new Date(log.timestamp).toLocaleDateString("en-IN", { day: "numeric", month: "short" })} at {new Date(log.timestamp).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-1 shrink-0">
                          {log.stack && (
                            <button onClick={() => setExpandedId(expandedId === log.id ? null : log.id!)}
                              className="p-1.5 text-gray-400 hover:text-accent cursor-pointer" title="Toggle stack trace">
                              {expandedId === log.id ? <FiX size={14} /> : <span className="text-xs font-mono">{ }</span>}
                            </button>
                          )}
                          <button onClick={() => handleDelete(log.id!)}
                            className="p-1.5 text-gray-400 hover:text-red-400 cursor-pointer" title="Delete">
                            <FiTrash2 size={14} />
                          </button>
                        </div>
                      </div>
                      {expandedId === log.id && log.stack && (
                        <div className="px-4 pb-4">
                          <pre className="text-xs text-gray-300 bg-primary-dark rounded-lg p-3 overflow-x-auto whitespace-pre-wrap font-mono border border-white/5">
                            {log.stack}
                          </pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
