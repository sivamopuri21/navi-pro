export interface Project {
  id: string;
  title: string;
  description: string;
  pointOfContact: string;
  imageUrls: string[];
  createdAt: number;
}

export interface Testimonial {
  id: string;
  name: string;
  feedback: string;
  approved: boolean;
  createdAt: number;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: number;
}

export interface SiteContent {
  about: string;
  services: string[];
}
