import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProjectBySlug } from '../services/api';
import { Project } from '../types';
import { GameHUD } from '../components/GameHUD';
import { Footer } from '../components/Footer';
import { useSocialLinks, useStats, useProfile } from '../hooks/usePortfolioData';
import { ProjectFallbackImage } from '../components/pixel/ProjectFallbackImage';
import { playSelectSound } from '../utils/sound';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { socialLinks } = useSocialLinks();
  const { stats } = useStats();
  const { profile } = useProfile();

  useEffect(() => {
    if (slug) {
      setLoading(true);
      getProjectBySlug(slug)
        .then(setProject)
        .catch(() => setError('Project not found.'))
        .finally(() => setLoading(false));
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A0817] font-pixel text-xs text-[#00FF66]">
        <div className="w-10 h-10 border-4 border-[#FF2E93] border-t-transparent animate-spin mb-4" />
        <span>LOADING MISSION DISPATCH DATA...</span>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0817] p-4 font-pixel text-xs text-white">
        <div className="max-w-md pixel-card p-8 text-center space-y-4 bg-[#121026]">
          <h2 className="text-xl text-[#FF2E93]">MISSION NOT FOUND</h2>
          <p className="text-xs text-[#8B8BAE]">
            THE REQUESTED MISSION RECORD COULD NOT BE RETRIEVED.
          </p>
          <Link
            to="/"
            onClick={() => playSelectSound()}
            className="btn-pixel-primary text-xs inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO PORTFOLIO WORLD</span>
          </Link>
        </div>
      </div>
    );
  }

  const hasLiveDemo = Boolean(project.liveUrl && project.liveUrl.trim() !== '');

  return (
    <div className="min-h-screen bg-[#0A0817] text-[#E0E7FF] font-sans scanlines">
      <GameHUD stats={stats} profile={profile} />

      <main className="pt-8 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back Link */}
        <Link
          to="/"
          onClick={() => playSelectSound()}
          className="inline-flex items-center gap-2 font-pixel text-xs text-[#00F0FF] hover:text-[#00FF66] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← BACK TO ALL MISSIONS</span>
        </Link>

        {/* Header Block */}
        <div className="pixel-card p-6 sm:p-8 bg-[#121026] space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b-2 border-black font-pixel text-xs">
            <span className="text-[#FF2E93] bg-[#0A0817] px-2.5 py-1 border border-black uppercase">
              {project.category}
            </span>
            {(project.startDate || project.endDate) && (
              <span className="text-[#8B8BAE] text-[10px]">
                MISSION DATES: {project.startDate} – {project.endDate}
              </span>
            )}
          </div>

          <h1 className="font-pixel text-2xl sm:text-4xl text-[#FFD700] leading-snug drop-shadow-[3px_3px_0px_#000]">
            {project.title}
          </h1>

          <p className="font-pixel text-xs sm:text-sm text-[#00F0FF] leading-relaxed border-l-4 border-[#FF2E93] pl-3 py-1">
            "{project.shortDescription}"
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t-2 border-black">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSelectSound()}
                className="btn-pixel-primary text-xs"
              >
                <Github className="w-4 h-4" />
                <span>GITHUB REPOSITORY</span>
              </a>
            )}

            {/* LIVE DEMO BUTTON: Only displayed if liveUrl exists */}
            {hasLiveDemo && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSelectSound()}
                className="btn-pixel-gold text-xs"
              >
                <ExternalLink className="w-4 h-4" />
                <span>PLAY LIVE DEMO</span>
              </a>
            )}
          </div>
        </div>

        {/* Main Cover Image Banner */}
        <div className="pixel-card overflow-hidden bg-[#121026]">
          <ProjectFallbackImage
            imageUrl={project.imageUrl}
            title={project.title}
            category={project.category}
            className="w-full aspect-[16/9]"
          />
        </div>

        {/* Technology Stack Grid */}
        <div className="pixel-card p-6 bg-[#121026] space-y-4">
          <h3 className="font-pixel text-xs text-[#00FF66] uppercase">
            EQUIPPED TECHNOLOGY STACK
          </h3>
          <div className="flex flex-wrap gap-2">
            {(project.technologiesList || []).map((tech) => (
              <span key={tech} className="pixel-badge">
                +{tech}
              </span>
            ))}
          </div>
        </div>

        {/* Problem & Solution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {project.problem && (
            <div className="pixel-card p-6 bg-[#121026] space-y-3">
              <span className="font-pixel text-[10px] text-[#FF2E93] uppercase block">
                MISSION CHALLENGE & PROBLEM
              </span>
              <h3 className="font-pixel text-sm text-[#FFD700]">
                Problem Statement
              </h3>
              <p className="text-xs sm:text-sm font-sans text-[#E0E7FF] leading-relaxed">
                {project.problem}
              </p>
            </div>
          )}

          {project.solution && (
            <div className="pixel-card p-6 bg-[#121026] space-y-3">
              <span className="font-pixel text-[10px] text-[#00FF66] uppercase block">
                ENGINEERED SOLUTION
              </span>
              <h3 className="font-pixel text-sm text-[#FFD700]">
                System Solution
              </h3>
              <p className="text-xs sm:text-sm font-sans text-[#E0E7FF] leading-relaxed">
                {project.solution}
              </p>
            </div>
          )}
        </div>

        {/* System Architecture */}
        {project.architecture && (
          <div className="pixel-card p-6 bg-[#121026] space-y-4">
            <h3 className="font-pixel text-xs text-[#00F0FF] uppercase">
              SYSTEM ARCHITECTURE & PIPELINE
            </h3>
            <div className="p-4 bg-[#0A0817] border-2 border-black font-pixel text-xs text-[#00FF66] leading-relaxed">
              {project.architecture}
            </div>
          </div>
        )}

        {/* Detailed Features */}
        {(project.featuresList || []).length > 0 && (
          <div className="pixel-card p-6 bg-[#121026] space-y-4">
            <h3 className="font-pixel text-xs text-[#FFD700] uppercase">
              KEY MISSION FEATURES
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.featuresList?.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-[#0A0817] border border-black">
                  <span className="font-pixel text-xs text-[#FF2E93]">▶</span>
                  <span className="text-xs font-sans text-[#E0E7FF]">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Full Long Description */}
        <div className="pixel-card p-6 bg-[#121026] space-y-4">
          <h3 className="font-pixel text-xs text-[#FFD700] uppercase">
            COMPREHENSIVE MISSION OVERVIEW
          </h3>
          <p className="text-sm font-sans text-[#E0E7FF] leading-relaxed whitespace-pre-line">
            {project.description}
          </p>
        </div>

      </main>

      <Footer socialLinks={socialLinks} />
    </div>
  );
};
