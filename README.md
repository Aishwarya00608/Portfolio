# ✦ BULUSU VYAGHRI AISHWARYA — FULL-STACK PERSONAL PORTFOLIO & CMS

> A cute, elegant, modern, and recruiter-friendly **Full-Stack Personal Portfolio + Admin CMS Dashboard + Database**.
> Powered by **React, Vite, TypeScript, Tailwind CSS, Node.js, Express, Prisma ORM, and PostgreSQL (or SQLite)**.

---

## 🌟 FEATURES

- **100% Database-Driven Content Management**: The database is the **single source of truth**. Adding a new certification, project, internship, or skill in the Admin Dashboard instantly updates the public portfolio automatically without touching frontend code!
- **Cute & Professional Aesthetic**: Styled with soft pastel hues (lavender, soft pink, cream), dark mode support, glassmorphism, subtle sparkles ✦, micro-animations, and clean typography.
- **Protected Admin Dashboard**: JWT + bcrypt authentication for full CRUD control over Profile, Projects, Internships, Certifications, Skills, Education, Achievements, Hackathons, Social Links, and Contact Messages.
- **Dynamic Project Showcase**: Dedicated detail pages (`/projects/:slug`) rendering problem statements, engineered solutions, system architecture workflows, and technology tags.
- **Completed Internship Timeline**: Accurate experience timeline displaying exact dates (e.g. FlyRank AI: **July 2026 – September 2026** with status "Completed") and capstone links.
- **Interactive Contact Form**: Stores visitor messages directly in PostgreSQL/SQLite for admin review, featuring toast notifications and confetti animations.
- **Resume Viewer & Downloader**: In-browser PDF/document modal and download trigger powered by profile database state.

---

## 🏗️ ARCHITECTURE

```text
                    ┌─────────────────────┐
                    │   PostgreSQL /      │
                    │   SQLite DB         │
                    └──────────┬──────────┘
                               │
                               │ Prisma ORM
                               │
                    ┌──────────▼──────────┐
                    │   Node + Express    │
                    │      REST API       │
                    └──────────┬──────────┘
                               │
                  ┌────────────┴────────────┐
                  │                         │
        ┌─────────▼─────────┐     ┌────────▼────────┐
        │  Public Website   │     │  Admin Dashboard │
        │ React + Vite      │     │ React + Vite     │
        └───────────────────┘     └──────────────────┘
```

---

## 📁 PROJECT STRUCTURE

```text
portfolio/
│
├── frontend/                  # React + Vite + TypeScript Frontend
│   ├── src/
│   │   ├── components/        # Navbar, Hero, About, Skills, Projects, Experience, etc.
│   │   ├── pages/             # HomePage, ProjectDetailPage, AdminLoginPage, AdminDashboardPage
│   │   ├── context/           # ThemeContext (Dark/Light mode), AuthContext (JWT)
│   │   ├── hooks/             # Custom database fetching hooks (useProjects, useCertifications, etc.)
│   │   ├── services/          # Axios API service endpoints
│   │   ├── types/             # TypeScript interfaces for database models
│   │   └── index.css          # Tailwind CSS theme & pastel glassmorphism tokens
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
│
├── backend/                   # Node.js + Express + Prisma Backend REST API
│   ├── src/
│   │   ├── controllers/       # Handlers for CRUD & Auth APIs
│   │   ├── routes/            # Express router modules
│   │   ├── middleware/        # JWT auth protection middleware
│   │   ├── lib/               # Prisma client instance
│   │   └── server.ts          # Express application entry point
│   ├── prisma/
│   │   ├── schema.prisma      # Database schema definitions
│   │   └── seed.ts            # Seeding script with Aishwarya's projects & profile
│   ├── package.json
│   └── tsconfig.json
│
├── .env.example               # Template environment variables
├── .gitignore                 # Repository ignore definitions
└── README.md                  # Project documentation
```

---

## ⚙️ SETUP & INSTALLATION

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### 1. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Generate Prisma Client & Push Database Schema
npm run prisma:db-push

# Seed the database with Aishwarya's profile, projects & certifications
npm run seed

# Start the Express server in development mode
npm run dev
```

The API server will run at: `http://localhost:5000`

### 2. Frontend Setup

Open a new terminal window:

```bash
cd frontend

# Install dependencies
npm install

# Start Vite development server
npm run dev
```

The frontend application will run at: `http://localhost:5173`

---

## 🔑 ADMIN CREDENTIALS

To manage content via the dashboard, navigate to `http://localhost:5173/admin/login` and log in with:

- **Email**: `aishwarya@example.com`
- **Password**: `adminpassword123`

*(Password can be updated in the database or via environment configuration).*

---

## ✦ HOW TO ADD NEW CONTENT (FUTURE-PROOF CMS WORKFLOW)

### Adding a New Certification
1. Log into `/admin/login`.
2. Go to **Certifications** tab.
3. Click **`+ Add Certification`**.
4. Fill in the name, organization, category, and description.
5. Click **Save Record ✦**.
6. Refresh or visit the public portfolio (`/`) — the new certification appears instantly in the grid and category filters!

### Adding a New Project
1. Go to **Projects** tab in Admin.
2. Click **`+ Add New Project`**.
3. Fill in title, category, short description, features, and technologies.
4. Click **Save Record ✦**.
5. The project card automatically renders on the homepage and creates a dedicated `/projects/:slug` detail page!

---

## 🚀 DEPLOYMENT GUIDE

### Backend Deployment (Render / Railway)
1. Push the `backend/` directory to GitHub.
2. Create a Web Service on Render or Railway connected to your repository.
3. Set Environment Variables:
   - `DATABASE_URL`: Your PostgreSQL database URL (e.g. Supabase / Neon)
   - `JWT_SECRET`: A secure secret string
   - `PORT`: 5000
   - `CLIENT_URL`: Your deployed frontend URL
4. Build command: `npm run build && npx prisma db push`
5. Start command: `npm start`

### Frontend Deployment (Vercel / Netlify)
1. Push the `frontend/` directory to GitHub.
2. Import project into Vercel.
3. Set Environment Variable:
   - `VITE_API_URL`: Your deployed backend URL (e.g. `https://your-backend.onrender.com/api`)
4. Build command: `npm run build`
5. Output directory: `dist`

---

## 🛡️ LICENCE & CREDITS

Designed & Built by **Bulusu Vyaghri Aishwarya** ✦
