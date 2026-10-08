import React, { useState } from 'react';
import { GameStartScreen } from '../components/GameStartScreen';
import { GameHUD } from '../components/GameHUD';
import { WorldMap } from '../components/WorldMap';
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
  const [showStartScreen, setShowStartScreen] = useState<boolean>(() => {
    // Check if user already entered in this session
    return sessionStorage.getItem('rpg_game_started') !== 'true';
  });

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

  const handleStartGame = () => {
    sessionStorage.setItem('rpg_game_started', 'true');
    setShowStartScreen(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0817] text-[#E0E7FF] font-sans scanlines">
      {/* Game Start Screen Overlay */}
      {showStartScreen && <GameStartScreen onStart={handleStartGame} />}

      {/* Main Game Portfolio World */}
      <GameHUD
        stats={stats}
        profile={profile}
        onOpenStartScreen={() => setShowStartScreen(true)}
      />

      <main className="relative z-10">
        {/* Interactive Game World Map */}
        <WorldMap />

        {/* Level 01: About Me & Player Profile */}
        <Hero profile={profile} socialLinks={socialLinks} />
        <About profile={profile} stats={stats} />

        {/* Level 02: Skill Lab Inventory */}
        <SkillsSection skills={skills} loading={skillsLoading} />

        {/* Level 03: Project World Missions */}
        <ProjectsSection projects={projects} loading={projectsLoading} />

        {/* Level 04: Experience Quest Log */}
        <ExperienceTimeline internships={internships} loading={internshipsLoading} />

        {/* Level 05: Certification Center Trophy Room */}
        <CertificationsSection certifications={certifications} loading={certsLoading} />

        {/* Level 06: Hackathon Battle Arena */}
        <HackathonsSection hackathons={hackathons} loading={hackLoading} />

        {/* Level 07: Achievement Room */}
        <AchievementsSection achievements={achievements} loading={achLoading} />

        {/* Level 08: Education Vault */}
        <EducationSection education={education} loading={eduLoading} />

        {/* Final Level: Contact */}
        <ContactSection />
      </main>

      <Footer socialLinks={socialLinks} />
    </div>
  );
};
