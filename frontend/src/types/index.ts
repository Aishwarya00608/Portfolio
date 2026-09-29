export interface Profile {
  id: string;
  fullName: string;
  headline: string;
  shortBio: string;
  longBio: string;
  email: string;
  phone?: string;
  location?: string;
  profileImage?: string;
  resumeUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  description: string;
  problem?: string;
  solution?: string;
  features?: string;
  featuresList?: string[];
  architecture?: string;
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  startDate?: string;
  endDate?: string;
  featured: boolean;
  published: boolean;
  displayOrder: number;
  technologies: string;
  technologiesList?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  icon?: string;
  proficiency: number;
  displayOrder: number;
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Internship {
  id: string;
  company: string;
  role: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  location?: string;
  technologies?: string;
  technologiesList?: string[];
  responsibilities?: string;
  achievements?: string;
  certificateUrl?: string;
  companyUrl?: string;
  featured: boolean;
  published: boolean;
  displayOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Certification {
  id: string;
  name: string;
  organization: string;
  issueDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  certificateUrl?: string;
  description?: string;
  category: string;
  featured: boolean;
  published: boolean;
  displayOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  grade?: string;
  description?: string;
  displayOrder: number;
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Achievement {
  id: string;
  title: string;
  organization?: string;
  date?: string;
  description?: string;
  certificateUrl?: string;
  category?: string;
  featured: boolean;
  published: boolean;
  displayOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Hackathon {
  id: string;
  name: string;
  organizer?: string;
  date?: string;
  role?: string;
  projectName?: string;
  description?: string;
  result?: string;
  projectUrl?: string;
  displayOrder: number;
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon?: string;
  displayOrder: number;
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
}

export interface PortfolioStats {
  projects: number;
  certifications: number;
  internships: number;
  skills: number;
  achievements: number;
  hackathons: number;
  messages: number;
  unreadMessages: number;
}
