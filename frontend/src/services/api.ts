import axios from 'axios';
import {
  Profile,
  Project,
  Skill,
  Internship,
  Certification,
  Education,
  Achievement,
  Hackathon,
  SocialLink,
  ContactMessage,
  PortfolioStats,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Attach JWT token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Profile API
export const getProfile = () => api.get<Profile>('/profile').then((r) => r.data);
export const updateProfile = (data: Partial<Profile>) => api.put<Profile>('/profile', data).then((r) => r.data);
export const getResumeDownloadUrl = (): string => `${API_BASE_URL}/profile/resume/download`;

// Projects API
export const getProjects = (params?: { category?: string; featured?: boolean; all?: boolean }) =>
  api.get<Project[]>('/projects', { params }).then((r) => r.data);
export const getProjectBySlug = (slug: string) => api.get<Project>(`/projects/${slug}`).then((r) => r.data);
export const createProject = (data: Partial<Project>) => api.post<Project>('/projects', data).then((r) => r.data);
export const updateProject = (id: string, data: Partial<Project>) => api.put<Project>(`/projects/${id}`, data).then((r) => r.data);
export const deleteProject = (id: string) => api.delete(`/projects/${id}`).then((r) => r.data);

// Internships API
export const getInternships = (all?: boolean) => api.get<Internship[]>('/internships', { params: { all } }).then((r) => r.data);
export const createInternship = (data: Partial<Internship>) => api.post<Internship>('/internships', data).then((r) => r.data);
export const updateInternship = (id: string, data: Partial<Internship>) => api.put<Internship>(`/internships/${id}`, data).then((r) => r.data);
export const deleteInternship = (id: string) => api.delete(`/internships/${id}`).then((r) => r.data);

// Certifications API
export const getCertifications = (params?: { category?: string; all?: boolean }) =>
  api.get<Certification[]>('/certifications', { params }).then((r) => r.data);
export const createCertification = (data: Partial<Certification>) => api.post<Certification>('/certifications', data).then((r) => r.data);
export const updateCertification = (id: string, data: Partial<Certification>) => api.put<Certification>(`/certifications/${id}`, data).then((r) => r.data);
export const deleteCertification = (id: string) => api.delete(`/certifications/${id}`).then((r) => r.data);

// Skills API
export const getSkills = (params?: { category?: string; all?: boolean }) =>
  api.get<Skill[]>('/skills', { params }).then((r) => r.data);
export const createSkill = (data: Partial<Skill>) => api.post<Skill>('/skills', data).then((r) => r.data);
export const updateSkill = (id: string, data: Partial<Skill>) => api.put<Skill>(`/skills/${id}`, data).then((r) => r.data);
export const deleteSkill = (id: string) => api.delete(`/skills/${id}`).then((r) => r.data);

// Education API
export const getEducation = (all?: boolean) => api.get<Education[]>('/education', { params: { all } }).then((r) => r.data);
export const createEducation = (data: Partial<Education>) => api.post<Education>('/education', data).then((r) => r.data);
export const updateEducation = (id: string, data: Partial<Education>) => api.put<Education>(`/education/${id}`, data).then((r) => r.data);
export const deleteEducation = (id: string) => api.delete(`/education/${id}`).then((r) => r.data);

// Achievements API
export const getAchievements = (all?: boolean) => api.get<Achievement[]>('/achievements', { params: { all } }).then((r) => r.data);
export const createAchievement = (data: Partial<Achievement>) => api.post<Achievement>('/achievements', data).then((r) => r.data);
export const updateAchievement = (id: string, data: Partial<Achievement>) => api.put<Achievement>(`/achievements/${id}`, data).then((r) => r.data);
export const deleteAchievement = (id: string) => api.delete(`/achievements/${id}`).then((r) => r.data);

// Hackathons API
export const getHackathons = (all?: boolean) => api.get<Hackathon[]>('/hackathons', { params: { all } }).then((r) => r.data);
export const createHackathon = (data: Partial<Hackathon>) => api.post<Hackathon>('/hackathons', data).then((r) => r.data);
export const updateHackathon = (id: string, data: Partial<Hackathon>) => api.put<Hackathon>(`/hackathons/${id}`, data).then((r) => r.data);
export const deleteHackathon = (id: string) => api.delete(`/hackathons/${id}`).then((r) => r.data);

// Social Links API
export const getSocialLinks = (all?: boolean) => api.get<SocialLink[]>('/social-links', { params: { all } }).then((r) => r.data);
export const createSocialLink = (data: Partial<SocialLink>) => api.post<SocialLink>('/social-links', data).then((r) => r.data);
export const updateSocialLink = (id: string, data: Partial<SocialLink>) => api.put<SocialLink>(`/social-links/${id}`, data).then((r) => r.data);
export const deleteSocialLink = (id: string) => api.delete(`/social-links/${id}`).then((r) => r.data);

// Contact API
export const submitContact = (data: { name: string; email: string; subject?: string; message: string }) =>
  api.post<{ success: boolean; message: string }>('/contact', data).then((r) => r.data);
export const getContactMessages = () => api.get<ContactMessage[]>('/contact').then((r) => r.data);
export const markMessageRead = (id: string, read: boolean) => api.put<ContactMessage>(`/contact/${id}`, { read }).then((r) => r.data);
export const deleteContactMessage = (id: string) => api.delete(`/contact/${id}`).then((r) => r.data);

// Stats API
export const getPortfolioStats = () => api.get<PortfolioStats>('/stats').then((r) => r.data);

// Auth API
export const loginAdmin = (credentials: { email: string; password: string }) =>
  api.post<{ token: string; user: { id: string; email: string; name: string } }>('/auth/login', credentials).then((r) => r.data);
export const getMe = () => api.get('/auth/me').then((r) => r.data);
export const changePassword = (data: { currentPassword: string; newPassword: string }) =>
  api.post<{ success: boolean; message: string }>('/auth/change-password', data).then((r) => r.data);

// Upload API
export const uploadProfilePhoto = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return api.post<{ url: string; message: string }>('/upload/photo', formData).then((r) => r.data);
};

export const uploadResumeFile = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return api.post<{ url: string; message: string }>('/upload/resume', formData).then((r) => r.data);
};

export const uploadProjectImage = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return api.post<{ url: string; message: string }>('/upload/project-image', formData).then((r) => r.data);
};

export const uploadCertificateFile = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return api.post<{ url: string; message: string }>('/upload/certificate', formData).then((r) => r.data);
};

export const getCertificateViewUrl = (url?: string): string => {
  if (!url) return '';
  return `${API_BASE_URL}/upload/certificate/view?url=${encodeURIComponent(url)}`;
};

export default api;
