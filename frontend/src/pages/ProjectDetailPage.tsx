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
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2] font-mono text-xs text-[#6E625A]">
        LOADING PROJECT DISPATCH...
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2] p-4 text-center font-sans">
        <div className="max-w-md editorial-panel-projects p-8 space-y-4 text-center">
          <h2 className="font-serif font-bold text-2xl text-[#2B2522]">Project Not Found</h2>
          <p className="text-xs text-[#6E625A]">
            The requested project record could not be retrieved.
          </p>
          <Link to="/" className="btn-editorial-primary text-xs inline-flex items-center gap-2">
            <ArrowLeft className="w-3.5 h-3.5 text-[#F5E6E6]" />
            <span>RETURN TO PORTFOLIO</span>
          </Link>
        </div>
      </div>
    );
  }

  const hasLiveDemo = Boolean(project.liveUrl && project.liveUrl.trim() !== '');

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2B2522] font-sans pb-12">
      <Navbar />

      <main className="pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="editorial-panel-projects space-y-8">
          {/* Back Link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#6E625A] hover:text-[#2B2522] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#9E4933]" />
            <span>BACK TO ALL PROJECTS</span>
          </Link>

          {/* Header Block */}
          <div className="space-y-6 border-b border-[#ECDAD6] pb-8">
            <div className="flex items-center justify-between">
              <span className="editorial-tag-pink">{project.category}</span>
              {(project.startDate || project.endDate) && (
                <span className="text-xs font-mono text-[#9E4933]">
                  {project.startDate} – {project.endDate}
                </span>
              )}
            </div>

            <h1 className="font-serif font-bold text-4xl sm:text-6xl text-[#2B2522]">
              {project.title}
            </h1>

            <p className="font-display italic text-xl sm:text-2xl text-[#6E625A] leading-snug">
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
                  <Github className="w-3.5 h-3.5 text-[#FAF7F2]" />
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
                  <ExternalLink className="w-3.5 h-3.5 text-[#9E4933]" />
                  <span>LIVE DEMO</span>
                </a>
              )}
            </div>
          </div>

          {/* Main Cover Image */}
          <div className="rounded-2xl overflow-hidden aspect-[16/9] border border-[#E2CDCD] bg-[#FAF4EF]">
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
          <div className="editorial-card-pink space-y-4">
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#6E625A]">
              EQUIPPED TECHNOLOGY STACK
            </h3>
            <div className="flex flex-wrap gap-2">
              {(project.technologiesList || []).map((tech) => (
                <span key={tech} className="editorial-tag-pink">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Problem & Solution Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.problem && (
              <div className="editorial-card-pink space-y-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#9E4933] block">
                  CHALLENGE & PROBLEM
                </span>
                <h3 className="font-serif font-bold text-xl text-[#2B2522]">
                  Problem Statement
                </h3>
                <p className="text-xs sm:text-sm font-sans text-[#473B35] leading-relaxed">
                  {project.problem}
                </p>
              </div>
            )}

            {project.solution && (
              <div className="editorial-card-pink space-y-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#4E6B4E] block">
                  ENGINEERED APPROACH
                </span>
                <h3 className="font-serif font-bold text-xl text-[#2B2522]">
                  System Solution
                </h3>
                <p className="text-xs sm:text-sm font-sans text-[#473B35] leading-relaxed">
                  {project.solution}
                </p>
              </div>
            )}
          </div>

          {/* System Architecture */}
          {project.architecture && (
            <div className="editorial-card-pink space-y-4">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#6E625A]">
                SYSTEM ARCHITECTURE & PIPELINE
              </h3>
              <div className="p-4 border border-[#E2CDCD] font-mono text-xs text-[#2B2522] bg-[#FAF7F2] rounded-xl leading-relaxed">
                {project.architecture}
              </div>
            </div>
          )}

          {/* Detailed Features */}
          {(project.featuresList || []).length > 0 && (
            <div className="editorial-card-pink space-y-6">
              <h3 className="font-serif font-bold text-2xl text-[#2B2522]">
                Key System Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.featuresList?.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 border border-[#E2CDCD] bg-[#FAF7F2] rounded-xl">
                    <span className="font-mono text-xs text-[#9E4933] font-bold">—</span>
                    <span className="text-xs font-sans text-[#473B35]">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Full Long Description */}
          <div className="editorial-card-pink space-y-4">
            <h3 className="font-serif font-bold text-2xl text-[#2B2522]">
              Comprehensive Overview
            </h3>
            <p className="text-sm font-sans text-[#473B35] leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </div>

        </div>

      </main>

      <Footer socialLinks={socialLinks} />
    </div>
  );
};
