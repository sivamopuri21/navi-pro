import { collection, getDocs, query, orderBy, deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import type { ErrorLog } from "./errorLogger";

export async function getErrorLogs(): Promise<ErrorLog[]> {
  const q = query(collection(db, "errorLogs"), orderBy("timestamp", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as ErrorLog));
}

export async function deleteErrorLog(id: string) {
  return deleteDoc(doc(db, "errorLogs", id));
}

export async function clearAllErrorLogs() {
  const snap = await getDocs(collection(db, "errorLogs"));
  const deletes = snap.docs.map((d) => deleteDoc(d.ref));
  await Promise.all(deletes);
}

export async function getErrorLogRetentionDays(): Promise<number> {
  const snap = await getDoc(doc(db, "settings", "errorLogs"));
  if (!snap.exists()) return 7;
  return snap.data().retentionDays ?? 7;
}

export async function setErrorLogRetentionDays(days: number) {
  const { setDoc } = await import("firebase/firestore");
  return setDoc(doc(db, "settings", "errorLogs"), { retentionDays: days }, { merge: true });
}

export async function cleanupExpiredErrorLogs() {
  const retentionDays = await getErrorLogRetentionDays();
  const cutoff = Date.now() - retentionDays * 24 * 60 * 60 * 1000;
  const snap = await getDocs(collection(db, "errorLogs"));
  const expired = snap.docs.filter((d) => (d.data().timestamp || 0) < cutoff);
  const deletes = expired.map((d) => deleteDoc(d.ref));
  await Promise.all(deletes);
  return expired.length;
}
