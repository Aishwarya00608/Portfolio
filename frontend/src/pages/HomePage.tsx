import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { SkillsSection } from '../components/SkillsSection';
import { ProjectsSection } from '../components/ProjectsSection';
import { ExperienceTimeline } from '../components/ExperienceTimeline';
import { CertificationsSection } from '../components/CertificationsSection';
import { AchievementsSection } from '../components/AchievementsSection';
import { HackathonsSection } from '../components/HackathonsSection';
import { EducationSection } from '../components/EducationSection';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import {
  useProfile,
  useProjects,
  useInternships,
  useCertifications,
  useSkills,
  useEducation,
  useAchievements,
  useHackathons,
  useSocialLinks,
  useStats,
} from '../hooks/usePortfolioData';

export const HomePage: React.FC = () => {
  const { profile } = useProfile();
  const { projects, loading: projectsLoading } = useProjects();
  const { internships, loading: internshipsLoading } = useInternships();
  const { certifications, loading: certsLoading } = useCertifications();
  const { skills, loading: skillsLoading } = useSkills();
  const { education, loading: eduLoading } = useEducation();
  const { achievements, loading: achLoading } = useAchievements();
  const { hackathons, loading: hackLoading } = useHackathons();
  const { socialLinks } = useSocialLinks();
  const { stats } = useStats();

  return (
    <div className="min-h-screen bg-[#F0F7FF] text-[#1E293B] font-sans pb-12">
      <Navbar />
      <main className="space-y-4">
        <Hero profile={profile} socialLinks={socialLinks} />
        <About profile={profile} stats={stats} />
        <SkillsSection skills={skills} loading={skillsLoading} />
        <ProjectsSection projects={projects} loading={projectsLoading} />
        <ExperienceTimeline internships={internships} loading={internshipsLoading} />
        <CertificationsSection certifications={certifications} loading={certsLoading} />
        <HackathonsSection hackathons={hackathons} loading={hackLoading} />
        <AchievementsSection achievements={achievements} loading={achLoading} />
        <EducationSection education={education} loading={eduLoading} />
        <ContactSection />
      </main>
      <Footer socialLinks={socialLinks} />
    </div>
  );
};
