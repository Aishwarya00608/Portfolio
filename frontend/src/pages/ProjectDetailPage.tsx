import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProjectBySlug } from '../services/api';
import { Project } from '../types';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useSocialLinks } from '../hooks/usePortfolioData';
import { ProjectFallbackImage } from '../components/pixel/ProjectFallbackImage';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { socialLinks } = useSocialLinks();

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
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5] font-mono text-xs text-[#1C1B1A]/60">
        LOADING PROJECT DISPATCH...
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5] p-4 text-center font-sans">
        <div className="max-w-md editorial-card p-8 space-y-4">
          <h2 className="font-serif font-bold text-2xl text-[#1C1B1A]">Project Not Found</h2>
          <p className="text-xs text-[#1C1B1A]/70">
            The requested project record could not be retrieved.
          </p>
          <Link to="/" className="btn-editorial-primary text-xs inline-flex items-center gap-2">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO PORTFOLIO</span>
          </Link>
        </div>
      </div>
    );
  }

  const hasLiveDemo = Boolean(project.liveUrl && project.liveUrl.trim() !== '');

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1B1A] font-sans">
      <Navbar />

      <main className="pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#1C1B1A]/70 hover:text-[#1C1B1A] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO ALL PROJECTS</span>
        </Link>

        {/* Header Block */}
        <div className="space-y-6 border-b border-[#1C1B1A]/20 pb-8">
          <div className="flex items-center justify-between">
            <span className="editorial-tag">{project.category}</span>
            {(project.startDate || project.endDate) && (
              <span className="text-xs font-mono text-[#1C1B1A]/60">
                {project.startDate} – {project.endDate}
              </span>
            )}
          </div>

          <h1 className="font-serif font-bold text-4xl sm:text-6xl text-[#1C1B1A]">
            {project.title}
          </h1>

          <p className="font-display italic text-xl sm:text-2xl text-[#1C1B1A]/90 leading-snug">
            "{project.shortDescription}"
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-editorial-primary text-xs"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GITHUB REPOSITORY</span>
              </a>
            )}

            {/* OPTIONAL LIVE DEMO BUTTON */}
            {hasLiveDemo && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-editorial-secondary text-xs"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>LIVE DEMO</span>
              </a>
            )}
          </div>
        </div>

        {/* Main Cover Image */}
        <div className="editorial-card overflow-hidden aspect-[16/9] bg-[#F4F0E8]">
          {project.imageUrl && project.imageUrl.trim() !== '' ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover filter contrast-105"
            />
          ) : (
            <ProjectFallbackImage
              imageUrl={null}
              title={project.title}
              category={project.category}
              className="w-full h-full"
            />
          )}
        </div>

        {/* Technologies Grid */}
        <div className="editorial-card p-6 sm:p-8 space-y-4">
          <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#A63A24]">
            EQUIPPED TECHNOLOGY STACK
          </h3>
          <div className="flex flex-wrap gap-2">
            {(project.technologiesList || []).map((tech) => (
              <span key={tech} className="editorial-tag">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Problem & Solution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {project.problem && (
            <div className="editorial-card p-6 sm:p-8 space-y-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#A63A24] block">
                CHALLENGE & PROBLEM
              </span>
              <h3 className="font-serif font-bold text-xl text-[#1C1B1A]">
                Problem Statement
              </h3>
              <p className="text-xs sm:text-sm font-sans text-[#1C1B1A]/80 leading-relaxed">
                {project.problem}
              </p>
            </div>
          )}

          {project.solution && (
            <div className="editorial-card p-6 sm:p-8 space-y-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-700 block">
                ENGINEERED APPROACH
              </span>
              <h3 className="font-serif font-bold text-xl text-[#1C1B1A]">
                System Solution
              </h3>
              <p className="text-xs sm:text-sm font-sans text-[#1C1B1A]/80 leading-relaxed">
                {project.solution}
              </p>
            </div>
          )}
        </div>

        {/* System Architecture */}
        {project.architecture && (
          <div className="editorial-card p-6 sm:p-8 space-y-4">
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#A63A24]">
              SYSTEM ARCHITECTURE & PIPELINE
            </h3>
            <div className="p-4 border border-[#1C1B1A]/20 font-mono text-xs text-[#1C1B1A] bg-[#FAF8F5] leading-relaxed">
              {project.architecture}
            </div>
          </div>
        )}

        {/* Detailed Features */}
        {(project.featuresList || []).length > 0 && (
          <div className="editorial-card p-6 sm:p-8 space-y-6">
            <h3 className="font-serif font-bold text-2xl text-[#1C1B1A]">
              Key System Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.featuresList?.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 border border-[#1C1B1A]/10 bg-[#FAF8F5]">
                  <span className="font-mono text-xs text-[#A63A24] font-bold">—</span>
                  <span className="text-xs font-sans text-[#1C1B1A]/90">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Full Long Description */}
        <div className="editorial-card p-6 sm:p-8 space-y-4">
          <h3 className="font-serif font-bold text-2xl text-[#1C1B1A]">
            Comprehensive Overview
          </h3>
          <p className="text-sm font-sans text-[#1C1B1A]/80 leading-relaxed whitespace-pre-line">
            {project.description}
          </p>
        </div>

      </main>

      <Footer socialLinks={socialLinks} />
    </div>
  );
};
