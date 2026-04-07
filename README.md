# Navi Pro Projects — Business Website & Admin Panel

A modern, SEO-optimized business website with an admin panel for **Navi Pro Projects Pvt. Ltd.** — a civil & interior works company specializing in hospitals, lab setup, and infrastructure projects.

## Tech Stack

- **Framework:** Next.js 16 (App Router, TypeScript)
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Backend:** Firebase (Firestore, Auth, Storage)
- **Hosting:** Vercel

## Features

### Public Website
- Home, About, Services, Projects, Testimonials, Contact pages
- SEO optimized with meta tags and Open Graph
- Responsive, mobile-first design
- Two switchable UI templates (Corporate Premium / Modern Showcase)
- Image lightbox, search, pagination
- Skeleton loaders and empty states
- Contact form saves to Firestore

### Admin Panel (`/admin`)
- Firebase email/password authentication
- CRUD for Projects (with image upload to Firebase Storage)
- CRUD for Testimonials
- View contact submissions
- Edit site content (About, Services)

## Setup

### 1. Clone and install

```bash
npm install
```

### 2. Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Authentication** → Email/Password sign-in
3. Create a **Firestore Database**
4. Enable **Firebase Storage**
5. Create an admin user in Firebase Auth
6. Create a document at `siteContent/main` in Firestore with fields: `about` (string), `services` (array)

### 3. Environment Variables

Copy `.env.local` and fill in your Firebase config:

```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_TEMPLATE=corporate
```

### 4. Template Switching

Set `NEXT_PUBLIC_TEMPLATE` in `.env.local`:
- `corporate` — Clean, minimal, professional layout
- `showcase` — Image-heavy, visual, animated layout

### 5. Firebase Security Rules

Deploy the included `firestore.rules` and `storage.rules` to your Firebase project.

### 6. Run

```bash
npm run dev
```

### 7. Deploy to Vercel

```bash
npx vercel
```

Add environment variables in Vercel dashboard.

## Folder Structure

```
src/
├── app/
│   ├── (public)/          # Public pages with Navbar/Footer
│   │   ├── about/
│   │   ├── contact/
│   │   ├── projects/
│   │   ├── services/
│   │   └── testimonials/
│   ├── admin/             # Protected admin panel
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── cards/             # ProjectCard, TestimonialCard
│   ├── hero/              # CorporateHero, ShowcaseHero
│   ├── layout/            # Navbar, Footer
│   └── ui/                # Button, Section, Skeleton, etc.
├── context/               # AuthContext
├── lib/                   # Firebase, Firestore, Storage, Template
└── types/                 # TypeScript interfaces
```

## Color Palette

Inspired by Lord Venkateshwara (subtle, professional):
- **Gold:** `#c5a55a` — accents, CTAs
- **Deep Blue:** `#1a1a5e` — headings, hero backgrounds
- **White:** `#ffffff` — backgrounds
- Maintains a corporate feel without being overtly religious
