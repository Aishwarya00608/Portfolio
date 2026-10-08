import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProjectBySlug } from '../services/api';
import { Project } from '../types';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useSocialLinks } from '../hooks/usePortfolioData';
import { ProjectFallbackImage } from '../components/pixel/ProjectFallbackImage';
import { ArrowLeft, Github, ExternalLink, Sparkles } from 'lucide-react';

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
      <div className="min-h-screen flex items-center justify-center bg-[#F0F7FF] font-mono text-xs text-[#64748B]">
        LOADING PROJECT DISPATCH...
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F0F7FF] p-4 text-center font-sans">
        <div className="max-w-md bg-[#FAF7F2] border-2 border-[#CBD5E1] rounded-3xl p-8 space-y-4 text-center shadow-window">
          <h2 className="font-serif font-bold text-2xl text-[#1E293B]">Project Not Found</h2>
          <p className="text-xs text-[#64748B]">
            The requested project record could not be retrieved.
          </p>
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-[#1E293B] text-white text-xs font-mono font-bold uppercase rounded-full shadow-md">
            <ArrowLeft className="w-3.5 h-3.5 text-[#F472B6]" />
            <span>RETURN TO PORTFOLIO</span>
          </Link>
        </div>
      </div>
    );
  }

  const hasLiveDemo = Boolean(project.liveUrl && project.liveUrl.trim() !== '');

  return (
    <div className="min-h-screen bg-[#F0F7FF] text-[#1E293B] font-sans pb-12">
      <Navbar />

      <main className="pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="bg-[#FAF7F2] border-2 border-[#CBD5E1] rounded-3xl p-6 sm:p-10 shadow-window space-y-8 relative">
          
          {/* Back Link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#64748B] hover:text-[#1E293B] transition-colors bg-white px-3.5 py-1.5 rounded-full border border-[#CBD5E1] shadow-sticker"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#BE185D]" />
            <span>BACK TO ALL PROJECTS</span>
          </Link>

          {/* Header Block */}
          <div className="space-y-6 border-b border-[#CBD5E1] pb-8">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase px-3 py-1 rounded-full bg-[#FCE7F3] text-[#BE185D] border border-[#F472B6]">
                {project.category}
              </span>
              {(project.startDate || project.endDate) && (
                <span className="text-xs font-mono font-bold text-[#BE185D]">
                  {project.startDate} – {project.endDate}
                </span>
              )}
            </div>

            <h1 className="font-serif font-bold text-4xl sm:text-6xl text-[#1E293B]">
              {project.title}
            </h1>

            <p className="font-display italic text-xl sm:text-2xl text-[#64748B] leading-snug">
              "{project.shortDescription}"
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#1E293B] text-white text-xs font-mono font-bold uppercase rounded-full shadow-md hover:bg-[#0F172A]"
                >
                  <Github className="w-3.5 h-3.5 text-[#F472B6]" />
                  <span>GITHUB REPOSITORY</span>
                </a>
              )}

              {/* OPTIONAL LIVE DEMO BUTTON */}
              {hasLiveDemo && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#1E293B] border border-[#CBD5E1] text-xs font-mono font-bold uppercase rounded-full shadow-sm hover:border-[#1E293B]"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#0284C7]" />
                  <span>LIVE DEMO</span>
                </a>
              )}
            </div>
          </div>

          {/* Main Cover Image */}
          <div className="rounded-2xl overflow-hidden aspect-[16/9] border-2 border-[#CBD5E1] bg-white shadow-sticker">
            {project.imageUrl && project.imageUrl.trim() !== '' ? (
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover"
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
          <div className="bg-[#FCE7F3] border-2 border-[#F472B6] rounded-2xl p-6 shadow-sticker space-y-4">
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#9D174D]">
              EQUIPPED TECHNOLOGY STACK
            </h3>
            <div className="flex flex-wrap gap-2">
              {(project.technologiesList || []).map((tech) => (
                <span key={tech} className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-white text-[#BE185D] border border-[#F472B6]">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Problem & Solution Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.problem && (
              <div className="bg-[#FFFBEB] border-2 border-[#FCD34D] rounded-2xl p-6 shadow-sticker space-y-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#B45309] block">
                  CHALLENGE & PROBLEM
                </span>
                <h3 className="font-serif font-bold text-xl text-[#1E293B]">
                  Problem Statement
                </h3>
                <p className="text-xs sm:text-sm font-sans text-[#451A03] leading-relaxed">
                  {project.problem}
                </p>
              </div>
            )}

            {project.solution && (
              <div className="bg-[#DCFCE7] border-2 border-[#86EFAC] rounded-2xl p-6 shadow-sticker space-y-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#15803D] block">
                  ENGINEERED APPROACH
                </span>
                <h3 className="font-serif font-bold text-xl text-[#1E293B]">
                  System Solution
                </h3>
                <p className="text-xs sm:text-sm font-sans text-[#14532D] leading-relaxed">
                  {project.solution}
                </p>
              </div>
            )}
          </div>

          {/* System Architecture */}
          {project.architecture && (
            <div className="bg-white border-2 border-[#CBD5E1] rounded-2xl p-6 shadow-sticker space-y-4">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#64748B]">
                SYSTEM ARCHITECTURE & PIPELINE
              </h3>
              <div className="p-4 border border-[#E2E8F0] font-mono text-xs text-[#1E293B] bg-[#F8FAFC] rounded-xl leading-relaxed">
                {project.architecture}
              </div>
            </div>
          )}

          {/* Detailed Features */}
          {(project.featuresList || []).length > 0 && (
            <div className="bg-[#E0F2FE] border-2 border-[#7DD3FC] rounded-2xl p-6 shadow-sticker space-y-6">
              <h3 className="font-serif font-bold text-2xl text-[#0369A1]">
                Key System Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.featuresList?.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 border border-[#BAE6FD] bg-white rounded-xl shadow-sm">
                    <span className="font-mono text-xs text-[#0284C7] font-bold">✦</span>
                    <span className="text-xs font-sans text-[#334155]">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Full Long Description */}
          <div className="bg-white border-2 border-[#CBD5E1] rounded-2xl p-6 shadow-sticker space-y-4">
            <h3 className="font-serif font-bold text-2xl text-[#1E293B]">
              Comprehensive Overview
            </h3>
            <p className="text-sm font-sans text-[#334155] leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </div>

        </div>

      </main>

      <Footer socialLinks={socialLinks} />
    </div>
  );
};
