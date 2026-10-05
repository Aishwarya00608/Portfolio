import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import * as api from '../services/api';
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
  DOMAIN_CATEGORIES,
} from '../types';
import {
  LayoutDashboard,
  User,
  FolderGit2,
  Briefcase,
  Award,
  Code2,
  GraduationCap,
  Trophy,
  Terminal,
  Share2,
  Mail,
  LogOut,
  Plus,
  Trash2,
  Edit3,
  Eye,
  EyeOff,
  Star,
  Check,
  X,
  ShieldCheck,
  Lock,
  ArrowLeft,
  RefreshCw,
  FileText,
  Upload,
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [stats, setStats] = useState<PortfolioStats | null>(null);

  // Content state
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [internships, setInternships] = useState<Internship[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Modal control
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<string>('');
  const [editItem, setEditItem] = useState<any>(null);

  // Modal Asset upload states
  const [modalImageUrl, setModalImageUrl] = useState<string>('');
  const [modalCertUrl, setModalCertUrl] = useState<string>('');
  const [projectImageUploading, setProjectImageUploading] = useState(false);
  const [certificateUploading, setCertificateUploading] = useState(false);

  // Asset upload states
  const [photoUploading, setPhotoUploading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [resumeUploading, setResumeUploading] = useState(false);

  const handleProjectImageModalUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProjectImageUploading(true);
    try {
      const res = await api.uploadProjectImage(file);
      setModalImageUrl(res.url);
      showNotification(res.message || 'Project image uploaded successfully!');
    } catch (err: any) {
      showNotification('Project image upload failed.', 'error');
    } finally {
      setProjectImageUploading(false);
    }
  };

  const handleCertificateModalUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCertificateUploading(true);
    try {
      const res = await api.uploadCertificateFile(file);
      setModalCertUrl(res.url);
      showNotification(res.message || 'Certificate uploaded successfully!');
    } catch (err: any) {
      showNotification('Certificate upload failed.', 'error');
    } finally {
      setCertificateUploading(false);
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
    const fileExt = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];

    if (!allowedExtensions.includes(fileExt) && !allowedMimeTypes.includes(file.type)) {
      showNotification('Only JPG, PNG and WEBP files are supported.', 'error');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showNotification('Profile photo must be smaller than 5MB.', 'error');
      return;
    }

    // Set local preview
    const previewUrl = URL.createObjectURL(file);
    setPhotoPreview(previewUrl);
    setPhotoUploading(true);

    try {
      const res = await api.uploadProfilePhoto(file);
      if (profile) {
        const updatedProfile = { ...profile, profileImage: res.url };
        setProfile(updatedProfile);
        await api.updateProfile(updatedProfile);
      }
      showNotification(res.message || 'Profile photo updated successfully!');
    } catch (err: any) {
      showNotification(err.response?.data?.message || 'Upload failed. Please try again.', 'error');
    } finally {
      setPhotoUploading(false);
    }
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileExt = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    if (fileExt !== '.pdf' && file.type !== 'application/pdf') {
      showNotification('Only PDF files are supported.', 'error');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      showNotification('Resume PDF must be smaller than 10MB.', 'error');
      return;
    }

    setResumeUploading(true);
    try {
      const res = await api.uploadResumeFile(file);
      if (profile) {
        const updatedProfile = { ...profile, resumeUrl: res.url };
        setProfile(updatedProfile);
        await api.updateProfile(updatedProfile);
      }
      showNotification(res.message || 'Resume PDF updated successfully!');
    } catch (err: any) {
      showNotification(err.response?.data?.message || 'Upload failed. Please try again.', 'error');
    } finally {
      setResumeUploading(false);
    }
  };

  // Change password state
  const [passState, setPassState] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

  const handleChangePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passState.newPassword !== passState.confirmPassword) {
      showNotification('New passwords do not match.', 'error');
      return;
    }
    try {
      const res = await api.changePassword({
        currentPassword: passState.currentPassword,
        newPassword: passState.newPassword,
      });
      showNotification(res.message || 'Password updated successfully!');
      setPassState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err: any) {
      showNotification(err.response?.data?.message || 'Failed to update password.', 'error');
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }
    loadData();
  }, [isAuthenticated]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [
        sData,
        pData,
        projData,
        internData,
        certData,
        skillData,
        eduData,
        achData,
        hackData,
        socialData,
        msgData,
      ] = await Promise.all([
        api.getPortfolioStats(),
        api.getProfile().catch(() => null),
        api.getProjects({ all: true }),
        api.getInternships(true),
        api.getCertifications({ all: true }),
        api.getSkills({ all: true }),
        api.getEducation(true),
        api.getAchievements(true),
        api.getHackathons(true),
        api.getSocialLinks(true),
        api.getContactMessages().catch(() => []),
      ]);

      setStats(sData);
      setProfile(pData);
      setProjects(projData);
      setInternships(internData);
      setCertifications(certData);
      setSkills(skillData);
      setEducation(eduData);
      setAchievements(achData);
      setHackathons(hackData);
      setSocialLinks(socialData);
      setMessages(msgData);
    } catch (err: any) {
      console.error('Dashboard load error:', err);
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (text: string, type: 'success' | 'error' = 'success') => {
    setStatusMsg({ text, type });
    setTimeout(() => setStatusMsg(null), 4000);
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // --- CRUD Handlers ---

  // Profile Save
  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    try {
      const updated = await api.updateProfile(profile);
      setProfile(updated);
      showNotification('Profile updated successfully! ✦');
    } catch (err) {
      showNotification('Failed to update profile.', 'error');
    }
  };

  // Delete generic item
  const handleDelete = async (type: string, id: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      switch (type) {
        case 'project':
          await api.deleteProject(id);
          setProjects(projects.filter((p) => p.id !== id));
          break;
        case 'internship':
          await api.deleteInternship(id);
          setInternships(internships.filter((i) => i.id !== id));
          break;
        case 'certification':
          await api.deleteCertification(id);
          setCertifications(certifications.filter((c) => c.id !== id));
          break;
        case 'skill':
          await api.deleteSkill(id);
          setSkills(skills.filter((s) => s.id !== id));
          break;
        case 'education':
          await api.deleteEducation(id);
          setEducation(education.filter((e) => e.id !== id));
          break;
        case 'achievement':
          await api.deleteAchievement(id);
          setAchievements(achievements.filter((a) => a.id !== id));
          break;
        case 'hackathon':
          await api.deleteHackathon(id);
          setHackathons(hackathons.filter((h) => h.id !== id));
          break;
        case 'social':
          await api.deleteSocialLink(id);
          setSocialLinks(socialLinks.filter((s) => s.id !== id));
          break;
        case 'message':
          await api.deleteContactMessage(id);
          setMessages(messages.filter((m) => m.id !== id));
          break;
      }
      showNotification('Item deleted successfully!');
      loadData();
    } catch (err) {
      showNotification('Error deleting item.', 'error');
    }
  };

  // Toggle published / featured
  const handleToggle = async (type: string, item: any, field: 'published' | 'featured') => {
    try {
      const updatedData = { [field]: !item[field] };
      switch (type) {
        case 'project':
          await api.updateProject(item.id, updatedData);
          break;
        case 'internship':
          await api.updateInternship(item.id, updatedData);
          break;
        case 'certification':
          await api.updateCertification(item.id, updatedData);
          break;
        case 'skill':
          await api.updateSkill(item.id, updatedData);
          break;
        case 'education':
          await api.updateEducation(item.id, updatedData);
          break;
        case 'achievement':
          await api.updateAchievement(item.id, updatedData);
          break;
        case 'hackathon':
          await api.updateHackathon(item.id, updatedData);
          break;
        case 'social':
          await api.updateSocialLink(item.id, updatedData);
          break;
      }
      showNotification('Updated successfully!');
      loadData();
    } catch (err) {
      showNotification('Failed to toggle status.', 'error');
    }
  };

  // Open Modal for Add/Edit
  const openFormModal = (type: string, item: any = null) => {
    setModalType(type);
    setEditItem(item);
    setModalImageUrl(item?.imageUrl || '');
    setModalCertUrl(item?.certificateUrl || '');
    setModalOpen(true);
  };

  // Save Modal Form
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data: any = {};
    formData.forEach((val, key) => {
      if (val === 'true') data[key] = true;
      else if (val === 'false') data[key] = false;
      else data[key] = val;
    });

    try {
      if (modalType === 'project') {
        data.imageUrl = modalImageUrl;
        if (editItem) await api.updateProject(editItem.id, data);
        else await api.createProject(data);
      } else if (modalType === 'internship') {
        if (editItem) await api.updateInternship(editItem.id, data);
        else await api.createInternship(data);
      } else if (modalType === 'certification') {
        data.certificateUrl = modalCertUrl;
        if (editItem) await api.updateCertification(editItem.id, data);
        else await api.createCertification(data);
      } else if (modalType === 'skill') {
        if (editItem) await api.updateSkill(editItem.id, data);
        else await api.createSkill(data);
      } else if (modalType === 'education') {
        if (editItem) await api.updateEducation(editItem.id, data);
        else await api.createEducation(data);
      } else if (modalType === 'achievement') {
        data.certificateUrl = modalCertUrl;
        if (editItem) await api.updateAchievement(editItem.id, data);
        else await api.createAchievement(data);
      } else if (modalType === 'hackathon') {
        data.certificateUrl = modalCertUrl;
        if (editItem) await api.updateHackathon(editItem.id, data);
        else await api.createHackathon(data);
      } else if (modalType === 'social') {
        if (editItem) await api.updateSocialLink(editItem.id, data);
        else await api.createSocialLink(data);
      }

      showNotification('Saved successfully! ✦');
      setModalOpen(false);
      loadData();
    } catch (err) {
      showNotification('Failed to save record.', 'error');
    }
  };

  const navTabs = [
    { id: 'dashboard', name: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'profile', name: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'projects', name: `Projects (${projects.length})`, icon: <FolderGit2 className="w-4 h-4" /> },
    { id: 'internships', name: `Internships (${internships.length})`, icon: <Briefcase className="w-4 h-4" /> },
    { id: 'certifications', name: `Certifications (${certifications.length})`, icon: <Award className="w-4 h-4" /> },
    { id: 'skills', name: `Skills (${skills.length})`, icon: <Code2 className="w-4 h-4" /> },
    { id: 'education', name: `Education (${education.length})`, icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'achievements', name: `Achievements (${achievements.length})`, icon: <Trophy className="w-4 h-4" /> },
    { id: 'hackathons', name: `Hackathons (${hackathons.length})`, icon: <Terminal className="w-4 h-4" /> },
    { id: 'social', name: `Social Links`, icon: <Share2 className="w-4 h-4" /> },
    { id: 'messages', name: `Messages (${messages.length})`, icon: <Mail className="w-4 h-4" /> },
    { id: 'settings', name: `Security & Password`, icon: <Lock className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-950 border-b md:border-b-0 md:border-r border-slate-800 p-4 flex flex-col justify-between shrink-0">
        <div>
          {/* Header */}
          <div className="flex items-center gap-2 mb-8 px-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center text-white">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-white text-sm font-serif">Portfolio CMS</h2>
              <p className="text-[11px] text-pink-400">Admin Control Panel</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-pink-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {tab.icon}
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-slate-800 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800/60"
          >
            <ArrowLeft className="w-4 h-4 text-pink-400" />
            View Public Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/30 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-6xl">
        {/* Status Toast */}
        {statusMsg && (
          <div
            className={`mb-6 p-4 rounded-2xl flex items-center gap-2 text-xs font-bold ${
              statusMsg.type === 'success' ? 'bg-emerald-950/80 border border-emerald-800 text-emerald-300' : 'bg-rose-950/80 border border-rose-800 text-rose-300'
            }`}
          >
            <Check className="w-4 h-4" />
            <span>{statusMsg.text}</span>
          </div>
        )}

        {/* --- TAB 1: DASHBOARD OVERVIEW --- */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-bold font-serif text-white">Portfolio Overview</h1>
              <p className="text-xs text-slate-400 mt-1">
                Welcome back, {user?.name || 'Aiswarya'}! Content database single source of truth.
              </p>
            </div>

            {/* Dynamic Counter Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700">
                <div className="text-3xl font-extrabold font-serif text-pink-400 mb-1">
                  {stats?.projects || 0}
                </div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Published Projects
                </div>
              </div>
              <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700">
                <div className="text-3xl font-extrabold font-serif text-purple-400 mb-1">
                  {stats?.certifications || 0}
                </div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Certifications
                </div>
              </div>
              <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700">
                <div className="text-3xl font-extrabold font-serif text-indigo-400 mb-1">
                  {stats?.skills || 0}
                </div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Skills Indexed
                </div>
              </div>
              <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700">
                <div className="text-3xl font-extrabold font-serif text-cyan-400 mb-1">
                  {stats?.internships || 0}
                </div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Internships
                </div>
              </div>
              <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700">
                <div className="text-3xl font-extrabold font-serif text-amber-400 mb-1">
                  {stats?.achievements || 0}
                </div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Achievements
                </div>
              </div>
              <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700">
                <div className="text-3xl font-extrabold font-serif text-rose-400 mb-1">
                  {stats?.messages || 0}
                </div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Contact Messages
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-6 rounded-3xl bg-slate-800/50 border border-slate-700">
              <h3 className="font-bold text-white text-sm mb-4">Quick Content Actions</h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => openFormModal('project')}
                  className="px-4 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add New Project
                </button>
                <button
                  onClick={() => openFormModal('certification')}
                  className="px-4 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-600 text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add Certification
                </button>
                <button
                  onClick={() => openFormModal('internship')}
                  className="px-4 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add Internship
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 2: PROFILE EDITOR --- */}
        {activeTab === 'profile' && profile && (
          <form onSubmit={handleProfileSave} className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold font-serif text-white">Profile Details</h1>
              <button type="submit" className="btn-cute-primary text-xs py-2 px-5">
                Save Profile Changes
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-6 rounded-3xl bg-slate-800/80 border border-slate-700">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Full Name</label>
                <input
                  type="text"
                  value={profile.fullName}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Headline</label>
                <input
                  type="text"
                  value={profile.headline}
                  onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Phone</label>
                <input
                  type="text"
                  value={profile.phone || ''}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Location</label>
                <input
                  type="text"
                  value={profile.location || ''}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Resume PDF URL</label>
                <input
                  type="text"
                  value={profile.resumeUrl || ''}
                  onChange={(e) => setProfile({ ...profile, resumeUrl: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">GitHub URL</label>
                <input
                  type="text"
                  value={profile.githubUrl || ''}
                  onChange={(e) => setProfile({ ...profile, githubUrl: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">LinkedIn URL</label>
                <input
                  type="text"
                  value={profile.linkedinUrl || ''}
                  onChange={(e) => setProfile({ ...profile, linkedinUrl: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-400 mb-1">Short Bio</label>
                <textarea
                  rows={2}
                  value={profile.shortBio}
                  onChange={(e) => setProfile({ ...profile, shortBio: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-400 mb-1">Long Bio</label>
                <textarea
                  rows={4}
                  value={profile.longBio}
                  onChange={(e) => setProfile({ ...profile, longBio: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                />
              </div>
            </div>

            {/* --- PROFILE ASSETS SECTION --- */}
            <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700 space-y-6">
              <div>
                <h2 className="text-xl font-bold font-serif text-white">Profile Assets</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Upload and manage your profile photo and official resume PDF. Uploaded files are saved to persistent storage and automatically reflected on the public portfolio.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* --- PROFILE PHOTO --- */}
                <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-700 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <User className="w-4 h-4 text-pink-400" /> Profile Photo
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Supported: JPG, JPEG, PNG, WEBP (Max 5MB)
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-pink-400 bg-slate-800 shrink-0 shadow-md">
                      <img
                        src={
                          photoPreview ||
                          profile.profileImage ||
                          'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop'
                        }
                        alt="Profile Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="text-xs font-semibold text-slate-300">
                        {photoUploading ? (
                          <span className="text-pink-400 flex items-center gap-1.5 animate-pulse">
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Uploading photo...
                          </span>
                        ) : profile.profileImage ? (
                          <span className="text-emerald-400 flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> Saved & Active
                          </span>
                        ) : (
                          <span className="text-slate-400">Default Avatar</span>
                        )}
                      </div>
                      <label className="btn-cute-secondary text-xs py-2 px-4 inline-flex items-center gap-2 cursor-pointer hover:bg-slate-800">
                        <Plus className="w-3.5 h-3.5 text-pink-400" />
                        <span>{photoUploading ? 'Uploading...' : 'Upload New Photo'}</span>
                        <input
                          type="file"
                          accept="image/jpeg,image/jpg,image/png,image/webp"
                          onChange={handlePhotoUpload}
                          disabled={photoUploading}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* --- RESUME PDF --- */}
                <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-700 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <FileText className="w-4 h-4 text-purple-400" /> Resume Document
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Supported: PDF (Max 10MB)
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="text-xs p-3 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-between">
                      <div className="flex items-center gap-2 truncate">
                        <FileText className="w-4 h-4 text-purple-400 shrink-0" />
                        <span className="truncate text-slate-200 font-mono">
                          {profile.resumeUrl ? profile.resumeUrl.split('/').pop() : 'No resume uploaded yet'}
                        </span>
                      </div>
                      {profile.resumeUrl && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 text-[10px] font-bold uppercase border border-emerald-800 shrink-0">
                          Uploaded
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {profile.resumeUrl && (
                        <a
                          href={profile.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-cute-secondary text-xs py-2 px-3 inline-flex items-center gap-1.5"
                        >
                          <Eye className="w-3.5 h-3.5 text-pink-400" /> View Current Resume
                        </a>
                      )}
                      <label className="btn-cute-secondary text-xs py-2 px-3 inline-flex items-center gap-1.5 cursor-pointer hover:bg-slate-800">
                        <Plus className="w-3.5 h-3.5 text-purple-400" />
                        <span>{resumeUploading ? 'Uploading...' : 'Upload New Resume'}</span>
                        <input
                          type="file"
                          accept="application/pdf"
                          onChange={handleResumeUpload}
                          disabled={resumeUploading}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}

        {/* --- TAB 3: PROJECTS MANAGEMENT --- */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold font-serif text-white">Project Management</h1>
              <button
                onClick={() => openFormModal('project')}
                className="btn-cute-primary text-xs py-2 px-4"
              >
                <Plus className="w-4 h-4" /> Add New Project
              </button>
            </div>

            <div className="bg-slate-800/80 rounded-3xl border border-slate-700 overflow-hidden">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider font-bold">
                  <tr>
                    <th className="p-4">Title</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Published</th>
                    <th className="p-4">Featured</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {projects.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-700/40">
                      <td className="p-4 font-bold text-white">{item.title}</td>
                      <td className="p-4 text-pink-400">{item.category}</td>
                      <td className="p-4">
                        <button
                          onClick={() => handleToggle('project', item, 'published')}
                          className={`p-1 rounded-lg ${item.published ? 'text-emerald-400' : 'text-slate-500'}`}
                        >
                          {item.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleToggle('project', item, 'featured')}
                          className={`p-1 rounded-lg ${item.featured ? 'text-amber-400' : 'text-slate-500'}`}
                        >
                          <Star className="w-4 h-4" />
                        </button>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => openFormModal('project', item)}
                          className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete('project', item.id)}
                          className="p-1.5 rounded-lg bg-rose-950/60 text-rose-400 hover:bg-rose-900"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- TAB 4: INTERNSHIPS MANAGEMENT --- */}
        {activeTab === 'internships' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold font-serif text-white">Internship Management</h1>
              <button
                onClick={() => openFormModal('internship')}
                className="btn-cute-primary text-xs py-2 px-4"
              >
                <Plus className="w-4 h-4" /> Add Internship
              </button>
            </div>

            <div className="bg-slate-800/80 rounded-3xl border border-slate-700 overflow-hidden">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider font-bold">
                  <tr>
                    <th className="p-4">Company</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Dates</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {internships.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-700/40">
                      <td className="p-4 font-bold text-white">{item.company}</td>
                      <td className="p-4 text-purple-300">{item.role}</td>
                      <td className="p-4 font-mono text-slate-400">
                        {item.startDate} – {item.endDate}
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => openFormModal('internship', item)}
                          className="p-1.5 rounded-lg bg-slate-700 text-white"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete('internship', item.id)}
                          className="p-1.5 rounded-lg bg-rose-950/60 text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- TAB 5: CERTIFICATIONS MANAGEMENT --- */}
        {activeTab === 'certifications' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold font-serif text-white">Certification Management</h1>
              <button
                onClick={() => openFormModal('certification')}
                className="btn-cute-primary text-xs py-2 px-4"
              >
                <Plus className="w-4 h-4" /> Add Certification
              </button>
            </div>

            <div className="bg-slate-800/80 rounded-3xl border border-slate-700 overflow-hidden">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider font-bold">
                  <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Organization</th>
                    <th className="p-4">Category</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {certifications.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-700/40">
                      <td className="p-4 font-bold text-white">{item.name}</td>
                      <td className="p-4 text-purple-300">{item.organization}</td>
                      <td className="p-4 text-pink-400">{item.category}</td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => openFormModal('certification', item)}
                          className="p-1.5 rounded-lg bg-slate-700 text-white"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete('certification', item.id)}
                          className="p-1.5 rounded-lg bg-rose-950/60 text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- TAB 6: SKILLS MANAGEMENT --- */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold font-serif text-white">Skill Management</h1>
              <button
                onClick={() => openFormModal('skill')}
                className="btn-cute-primary text-xs py-2 px-4"
              >
                <Plus className="w-4 h-4" /> Add Skill
              </button>
            </div>

            <div className="bg-slate-800/80 rounded-3xl border border-slate-700 overflow-hidden">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider font-bold">
                  <tr>
                    <th className="p-4">Skill Name</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Proficiency</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {skills.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-700/40">
                      <td className="p-4 font-bold text-white">{item.name}</td>
                      <td className="p-4 text-purple-300">{item.category}</td>
                      <td className="p-4 font-mono text-pink-400">{item.proficiency}%</td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => openFormModal('skill', item)}
                          className="p-1.5 rounded-lg bg-slate-700 text-white"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete('skill', item.id)}
                          className="p-1.5 rounded-lg bg-rose-950/60 text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- TAB 7: EDUCATION MANAGEMENT --- */}
        {activeTab === 'education' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold font-serif text-white">Education Management</h1>
              <button
                onClick={() => openFormModal('education')}
                className="btn-cute-primary text-xs py-2 px-4"
              >
                <Plus className="w-4 h-4" /> Add Education Record
              </button>
            </div>

            <div className="bg-slate-800/80 rounded-3xl border border-slate-700 overflow-hidden">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider font-bold">
                  <tr>
                    <th className="p-4">Institution</th>
                    <th className="p-4">Degree</th>
                    <th className="p-4">Dates</th>
                    <th className="p-4">Grade</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {education.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-700/40">
                      <td className="p-4 font-bold text-white">{item.institution}</td>
                      <td className="p-4 text-purple-300">{item.degree}</td>
                      <td className="p-4 font-mono text-slate-400">{item.startDate} – {item.endDate}</td>
                      <td className="p-4 text-emerald-400 font-semibold">{item.grade || '—'}</td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => openFormModal('education', item)}
                          className="p-1.5 rounded-lg bg-slate-700 text-white"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete('education', item.id)}
                          className="p-1.5 rounded-lg bg-rose-950/60 text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- TAB 8: ACHIEVEMENTS MANAGEMENT --- */}
        {activeTab === 'achievements' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold font-serif text-white">Achievement Management</h1>
              <button
                onClick={() => openFormModal('achievement')}
                className="btn-cute-primary text-xs py-2 px-4"
              >
                <Plus className="w-4 h-4" /> Add Achievement
              </button>
            </div>

            <div className="bg-slate-800/80 rounded-3xl border border-slate-700 overflow-hidden">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider font-bold">
                  <tr>
                    <th className="p-4">Title</th>
                    <th className="p-4">Organization</th>
                    <th className="p-4">Category</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {achievements.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-700/40">
                      <td className="p-4 font-bold text-white">{item.title}</td>
                      <td className="p-4 text-purple-300">{item.organization || '—'}</td>
                      <td className="p-4 text-amber-400">{item.category || 'General'}</td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => openFormModal('achievement', item)}
                          className="p-1.5 rounded-lg bg-slate-700 text-white"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete('achievement', item.id)}
                          className="p-1.5 rounded-lg bg-rose-950/60 text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- TAB 9: HACKATHONS MANAGEMENT --- */}
        {activeTab === 'hackathons' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold font-serif text-white">Hackathon Management</h1>
              <button
                onClick={() => openFormModal('hackathon')}
                className="btn-cute-primary text-xs py-2 px-4"
              >
                <Plus className="w-4 h-4" /> Add Hackathon
              </button>
            </div>

            <div className="bg-slate-800/80 rounded-3xl border border-slate-700 overflow-hidden">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider font-bold">
                  <tr>
                    <th className="p-4">Hackathon Name</th>
                    <th className="p-4">Organizer</th>
                    <th className="p-4">Project</th>
                    <th className="p-4">Result</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {hackathons.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-700/40">
                      <td className="p-4 font-bold text-white">{item.name}</td>
                      <td className="p-4 text-purple-300">{item.organizer || '—'}</td>
                      <td className="p-4 text-cyan-300">{item.projectName || '—'}</td>
                      <td className="p-4 text-emerald-400 font-semibold">{item.result || '—'}</td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => openFormModal('hackathon', item)}
                          className="p-1.5 rounded-lg bg-slate-700 text-white"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete('hackathon', item.id)}
                          className="p-1.5 rounded-lg bg-rose-950/60 text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- TAB 10: SOCIAL LINKS MANAGEMENT --- */}
        {activeTab === 'social' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold font-serif text-white">Social Links Management</h1>
              <button
                onClick={() => openFormModal('social')}
                className="btn-cute-primary text-xs py-2 px-4"
              >
                <Plus className="w-4 h-4" /> Add Social Link
              </button>
            </div>

            <div className="bg-slate-800/80 rounded-3xl border border-slate-700 overflow-hidden">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider font-bold">
                  <tr>
                    <th className="p-4">Platform</th>
                    <th className="p-4">URL</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {socialLinks.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-700/40">
                      <td className="p-4 font-bold text-white">{item.platform}</td>
                      <td className="p-4 text-purple-300 font-mono">{item.url}</td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => openFormModal('social', item)}
                          className="p-1.5 rounded-lg bg-slate-700 text-white"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete('social', item.id)}
                          className="p-1.5 rounded-lg bg-rose-950/60 text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- TAB 11: MESSAGES MANAGEMENT --- */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold font-serif text-white">Submitted Messages</h1>

            {messages.length === 0 ? (
              <div className="p-8 text-center text-slate-400 bg-slate-800/50 rounded-3xl">
                No contact messages submitted yet.
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="p-5 rounded-2xl bg-slate-800 border border-slate-700 space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-pink-400">{msg.name} ({msg.email})</span>
                      <span className="text-slate-400">{new Date(msg.createdAt).toLocaleString()}</span>
                    </div>
                    {msg.subject && (
                      <div className="text-xs font-bold text-purple-300">{msg.subject}</div>
                    )}
                    <p className="text-xs text-slate-300 bg-slate-900 p-3 rounded-xl">
                      {msg.message}
                    </p>
                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => handleDelete('message', msg.id)}
                        className="text-xs text-rose-400 hover:underline flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete Message
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* --- TAB 12: SECURITY & PASSWORD SETTINGS --- */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-xl">
            <h1 className="text-2xl font-bold font-serif text-white">Security & Password Settings</h1>
            
            <div className="p-8 rounded-3xl bg-slate-800/80 border border-slate-700 space-y-5">
              <div>
                <h3 className="font-bold text-white text-base">Change Admin Password</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Update your admin account password. The new password will take effect immediately.
                </p>
              </div>

              <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Current Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={passState.currentPassword}
                    onChange={(e) => setPassState({ ...passState, currentPassword: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    New Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={passState.newPassword}
                    onChange={(e) => setPassState({ ...passState, newPassword: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Confirm New Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={passState.confirmPassword}
                    onChange={(e) => setPassState({ ...passState, confirmPassword: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-cute-primary text-xs py-2.5 px-6 font-bold"
                >
                  Update Password
                </button>
              </form>
            </div>
          </div>
        )}

      </main>

      {/* --- FORM MODAL FOR ADD / EDIT --- */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
              <h3 className="font-bold font-serif text-lg text-pink-400 capitalize">
                {editItem ? `Edit ${modalType}` : `Add New ${modalType}`}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              {modalType === 'project' && (
                <>
                  <div>
                    <label className="block text-slate-400 mb-1">Title *</label>
                    <input
                      name="title"
                      required
                      defaultValue={editItem?.title || ''}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Domain / Category *</label>
                    <select
                      name="category"
                      required
                      defaultValue={editItem?.category || 'Artificial Intelligence'}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                    >
                      {DOMAIN_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Project Image (Optional)</label>
                    <div className="space-y-2">
                      {modalImageUrl ? (
                        <div className="relative rounded-xl overflow-hidden border border-slate-700 h-28 bg-slate-950 flex items-center justify-center">
                          <img src={modalImageUrl} alt="Project Preview" className="h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => setModalImageUrl('')}
                            className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-rose-900/90 text-white text-[11px] font-bold"
                          >
                            Remove Image
                          </button>
                        </div>
                      ) : (
                        <div className="p-3 border border-dashed border-slate-700 rounded-xl text-center">
                          <label className="cursor-pointer text-xs font-bold text-pink-400 hover:underline flex items-center justify-center gap-2">
                            <Upload className="w-4 h-4" />
                            {projectImageUploading ? 'Uploading Image...' : 'Upload Unique Project Image'}
                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/webp"
                              className="hidden"
                              onChange={handleProjectImageModalUpload}
                              disabled={projectImageUploading}
                            />
                          </label>
                        </div>
                      )}
                      <input
                        type="text"
                        name="imageUrl"
                        value={modalImageUrl}
                        onChange={(e) => setModalImageUrl(e.target.value)}
                        placeholder="Or paste custom image URL"
                        className="w-full p-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-[11px] font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Short Description *</label>
                    <textarea
                      name="shortDescription"
                      required
                      rows={2}
                      defaultValue={editItem?.shortDescription || ''}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Full Description *</label>
                    <textarea
                      name="description"
                      required
                      rows={3}
                      defaultValue={editItem?.description || ''}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Technologies (comma separated)</label>
                    <input
                      name="technologies"
                      defaultValue={
                        Array.isArray(editItem?.technologiesList)
                          ? editItem.technologiesList.join(', ')
                          : editItem?.technologies || 'Python, React, TypeScript'
                      }
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">GitHub URL</label>
                    <input
                      name="githubUrl"
                      defaultValue={editItem?.githubUrl || ''}
                      placeholder="https://github.com/username/repo"
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">
                      Live Demo URL <span className="text-slate-500 font-normal">(Optional)</span>
                    </label>
                    <input
                      name="liveUrl"
                      defaultValue={editItem?.liveUrl || ''}
                      placeholder="https://example.com"
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono"
                    />
                  </div>
                </>
              )}

              {modalType === 'certification' && (
                <>
                  <div>
                    <label className="block text-slate-400 mb-1">Certification Name *</label>
                    <input
                      name="name"
                      required
                      defaultValue={editItem?.name || ''}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Issuing Organization *</label>
                    <input
                      name="organization"
                      required
                      defaultValue={editItem?.organization || ''}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Category</label>
                    <select
                      name="category"
                      defaultValue={editItem?.category || 'Artificial Intelligence'}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                    >
                      {DOMAIN_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Certificate / Badge File (Optional)</label>
                    <div className="space-y-2">
                      {modalCertUrl ? (
                        <div className="p-3 rounded-xl bg-slate-950 border border-slate-700 flex items-center justify-between">
                          <div className="flex items-center gap-2 truncate text-slate-300">
                            <FileText className="w-4 h-4 text-purple-400 shrink-0" />
                            <span className="truncate text-xs font-mono">{modalCertUrl}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setModalCertUrl('')}
                            className="px-2.5 py-1 rounded-lg bg-rose-900/90 text-white text-[11px] font-bold shrink-0 ml-2 hover:bg-rose-800"
                          >
                            Remove Certificate
                          </button>
                        </div>
                      ) : (
                        <div className="p-3 border border-dashed border-slate-700 rounded-xl text-center">
                          <label className="cursor-pointer text-xs font-bold text-pink-400 hover:underline flex items-center justify-center gap-2">
                            <Upload className="w-4 h-4" />
                            {certificateUploading ? 'Uploading File...' : 'Upload Certificate / Badge (PDF, JPG, PNG)'}
                            <input
                              type="file"
                              accept="application/pdf,image/jpeg,image/jpg,image/png,image/webp"
                              className="hidden"
                              onChange={handleCertificateModalUpload}
                              disabled={certificateUploading}
                            />
                          </label>
                        </div>
                      )}
                      <input
                        type="text"
                        name="certificateUrl"
                        value={modalCertUrl}
                        onChange={(e) => setModalCertUrl(e.target.value)}
                        placeholder="Or paste external certificate URL"
                        className="w-full p-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-[11px] font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Description</label>
                    <textarea
                      name="description"
                      rows={2}
                      defaultValue={editItem?.description || ''}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                    />
                  </div>
                </>
              )}

              {modalType === 'internship' && (
                <>
                  <div>
                    <label className="block text-slate-400 mb-1">Company *</label>
                    <input
                      name="company"
                      required
                      defaultValue={editItem?.company || ''}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Role *</label>
                    <input
                      name="role"
                      required
                      defaultValue={editItem?.role || ''}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1">Start Date</label>
                      <input
                        name="startDate"
                        required
                        defaultValue={editItem?.startDate || ''}
                        className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">End Date</label>
                      <input
                        name="endDate"
                        required
                        defaultValue={editItem?.endDate || ''}
                        className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Description</label>
                    <textarea
                      name="description"
                      required
                      rows={2}
                      defaultValue={editItem?.description || ''}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                    />
                  </div>
                </>
              )}

              {modalType === 'skill' && (
                <>
                  <div>
                    <label className="block text-slate-400 mb-1">Skill Name *</label>
                    <input
                      name="name"
                      required
                      defaultValue={editItem?.name || ''}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Domain / Category</label>
                    <select
                      name="category"
                      defaultValue={editItem?.category || 'Artificial Intelligence'}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                    >
                      {DOMAIN_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Proficiency % (1-100, stored in DB for backend compat)</label>
                    <input
                      name="proficiency"
                      type="number"
                      defaultValue={editItem?.proficiency || 85}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                    />
                  </div>
                </>
              )}

              {modalType === 'education' && (
                <>
                  <div>
                    <label className="block text-slate-400 mb-1">Institution *</label>
                    <input
                      name="institution"
                      required
                      defaultValue={editItem?.institution || ''}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Degree *</label>
                    <input
                      name="degree"
                      required
                      defaultValue={editItem?.degree || ''}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Field of Study</label>
                    <input
                      name="field"
                      required
                      defaultValue={editItem?.field || 'Computer Science'}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1">Start Date</label>
                      <input
                        name="startDate"
                        required
                        defaultValue={editItem?.startDate || ''}
                        className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">End Date</label>
                      <input
                        name="endDate"
                        required
                        defaultValue={editItem?.endDate || ''}
                        className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Grade / CGPA</label>
                      <input
                        name="grade"
                        defaultValue={editItem?.grade || ''}
                        className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Description</label>
                    <textarea
                      name="description"
                      rows={2}
                      defaultValue={editItem?.description || ''}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                    />
                  </div>
                </>
              )}

              {modalType === 'achievement' && (
                <>
                  <div>
                    <label className="block text-slate-400 mb-1">Title *</label>
                    <input
                      name="title"
                      required
                      defaultValue={editItem?.title || ''}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Organization</label>
                    <input
                      name="organization"
                      defaultValue={editItem?.organization || ''}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Domain / Category</label>
                    <select
                      name="category"
                      defaultValue={editItem?.category || 'Artificial Intelligence'}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                    >
                      {DOMAIN_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Certificate / Badge File (Optional)</label>
                    <div className="space-y-2">
                      {modalCertUrl ? (
                        <div className="p-3 rounded-xl bg-slate-950 border border-slate-700 flex items-center justify-between">
                          <div className="flex items-center gap-2 truncate text-slate-300">
                            <FileText className="w-4 h-4 text-purple-400 shrink-0" />
                            <span className="truncate text-xs font-mono">{modalCertUrl}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setModalCertUrl('')}
                            className="px-2.5 py-1 rounded-lg bg-rose-900/90 text-white text-[11px] font-bold shrink-0 ml-2 hover:bg-rose-800"
                          >
                            Remove Certificate
                          </button>
                        </div>
                      ) : (
                        <div className="p-3 border border-dashed border-slate-700 rounded-xl text-center">
                          <label className="cursor-pointer text-xs font-bold text-pink-400 hover:underline flex items-center justify-center gap-2">
                            <Upload className="w-4 h-4" />
                            {certificateUploading ? 'Uploading File...' : 'Upload Certificate / Badge (PDF, JPG, PNG)'}
                            <input
                              type="file"
                              accept="application/pdf,image/jpeg,image/jpg,image/png,image/webp"
                              className="hidden"
                              onChange={handleCertificateModalUpload}
                              disabled={certificateUploading}
                            />
                          </label>
                        </div>
                      )}
                      <input
                        type="text"
                        name="certificateUrl"
                        value={modalCertUrl}
                        onChange={(e) => setModalCertUrl(e.target.value)}
                        placeholder="Or paste external certificate URL"
                        className="w-full p-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-[11px] font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Description</label>
                    <textarea
                      name="description"
                      rows={2}
                      defaultValue={editItem?.description || ''}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                    />
                  </div>
                </>
              )}

              {modalType === 'hackathon' && (
                <>
                  <div>
                    <label className="block text-slate-400 mb-1">Hackathon Name *</label>
                    <input
                      name="name"
                      required
                      defaultValue={editItem?.name || ''}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Organizer</label>
                    <input
                      name="organizer"
                      defaultValue={editItem?.organizer || ''}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Project Name</label>
                    <input
                      name="projectName"
                      defaultValue={editItem?.projectName || ''}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Result / Standing</label>
                    <input
                      name="result"
                      defaultValue={editItem?.result || ''}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Certificate / Badge File (Optional)</label>
                    <div className="space-y-2">
                      {modalCertUrl ? (
                        <div className="p-3 rounded-xl bg-slate-950 border border-slate-700 flex items-center justify-between">
                          <div className="flex items-center gap-2 truncate text-slate-300">
                            <FileText className="w-4 h-4 text-purple-400 shrink-0" />
                            <span className="truncate text-xs font-mono">{modalCertUrl}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setModalCertUrl('')}
                            className="px-2.5 py-1 rounded-lg bg-rose-900/90 text-white text-[11px] font-bold shrink-0 ml-2 hover:bg-rose-800"
                          >
                            Remove Certificate
                          </button>
                        </div>
                      ) : (
                        <div className="p-3 border border-dashed border-slate-700 rounded-xl text-center">
                          <label className="cursor-pointer text-xs font-bold text-pink-400 hover:underline flex items-center justify-center gap-2">
                            <Upload className="w-4 h-4" />
                            {certificateUploading ? 'Uploading File...' : 'Upload Certificate / Badge (PDF, JPG, PNG)'}
                            <input
                              type="file"
                              accept="application/pdf,image/jpeg,image/jpg,image/png,image/webp"
                              className="hidden"
                              onChange={handleCertificateModalUpload}
                              disabled={certificateUploading}
                            />
                          </label>
                        </div>
                      )}
                      <input
                        type="text"
                        name="certificateUrl"
                        value={modalCertUrl}
                        onChange={(e) => setModalCertUrl(e.target.value)}
                        placeholder="Or paste external certificate URL"
                        className="w-full p-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-[11px] font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Description</label>
                    <textarea
                      name="description"
                      rows={2}
                      defaultValue={editItem?.description || ''}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                    />
                  </div>
                </>
              )}

              {modalType === 'social' && (
                <>
                  <div>
                    <label className="block text-slate-400 mb-1">Platform Name *</label>
                    <input
                      name="platform"
                      required
                      defaultValue={editItem?.platform || ''}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">URL *</label>
                    <input
                      name="url"
                      required
                      defaultValue={editItem?.url || ''}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono"
                    />
                  </div>
                </>
              )}

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
