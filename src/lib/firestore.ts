import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Project, Testimonial, Contact, SiteContent } from "@/types";

// ── Projects ──
const projectsRef = collection(db, "projects");

export async function getProjects(): Promise<Project[]> {
  const q = query(projectsRef, orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Project));
}

export async function addProject(data: Omit<Project, "id">) {
  return addDoc(projectsRef, { ...data, createdAt: Date.now() });
}

export async function updateProject(id: string, data: Partial<Project>) {
  return updateDoc(doc(db, "projects", id), data);
}

export async function deleteProject(id: string) {
  return deleteDoc(doc(db, "projects", id));
}

// ── Testimonials ──
const testimonialsRef = collection(db, "testimonials");

export async function getTestimonials(): Promise<Testimonial[]> {
  const q = query(testimonialsRef, orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Testimonial));
}

export async function addTestimonial(data: Omit<Testimonial, "id">) {
  return addDoc(testimonialsRef, { ...data, createdAt: Date.now() });
}

export async function updateTestimonial(id: string, data: Partial<Testimonial>) {
  return updateDoc(doc(db, "testimonials", id), data);
}

export async function deleteTestimonial(id: string) {
  return deleteDoc(doc(db, "testimonials", id));
}

// ── Contacts ──
export async function addContact(data: Omit<Contact, "id" | "createdAt">) {
  return addDoc(collection(db, "contacts"), { ...data, createdAt: Date.now() });
}

export async function getContacts(): Promise<Contact[]> {
  const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Contact));
}

// ── Site Content ──
export async function getSiteContent(): Promise<SiteContent | null> {
  const snap = await getDoc(doc(db, "siteContent", "main"));
  if (!snap.exists()) return null;
  return snap.data() as SiteContent;
}

export async function updateSiteContent(data: Partial<SiteContent>) {
  return updateDoc(doc(db, "siteContent", "main"), data);
}
