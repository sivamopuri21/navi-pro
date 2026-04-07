export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrls: string[];
  createdAt: number;
}

export interface Testimonial {
  id: string;
  name: string;
  feedback: string;
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
