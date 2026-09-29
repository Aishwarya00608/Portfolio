import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProjectBySlug } from '../services/api';
import { Project } from '../types';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useSocialLinks } from '../hooks/usePortfolioData';
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Calendar,
  Layers,
  Sparkles,
  CheckCircle2,
  Cpu,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';

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
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8FF] dark:bg-dark-bg">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-pink-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-500">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8FF] dark:bg-dark-bg p-4 text-center">
        <div className="max-w-md bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Project Not Found</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            The project you are looking for does not exist or has been removed.
          </p>
          <Link to="/" className="btn-cute-primary text-xs inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8FF] dark:bg-dark-bg text-slate-800 dark:text-slate-100 font-sans">
      <Navbar />

      <main className="pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-pink-500 dark:hover:text-pink-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all projects
        </Link>

        {/* Hero Banner */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 dark:bg-slate-800 text-pink-700 dark:text-pink-300 text-xs font-bold">
            <Layers className="w-3.5 h-3.5" />
            <span>{project.category}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-slate-900 dark:text-white leading-tight">
            {project.title}
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {project.shortDescription}
          </p>

          {/* Action Links & Meta */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-b border-slate-200 dark:border-slate-800 py-4">
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
              {(project.startDate || project.endDate) && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-pink-500" />
                  {project.startDate} – {project.endDate}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cute-secondary text-xs"
                >
                  <Github className="w-4 h-4 text-slate-800 dark:text-slate-200" />
                  GitHub Repository
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cute-primary text-xs"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Main Cover Image */}
        {project.imageUrl && (
          <div className="my-10 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-cute h-72 sm:h-96">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Technologies Grid */}
        <div className="mb-12 p-6 rounded-3xl bg-white dark:bg-slate-800 border border-purple-100 dark:border-slate-700 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-purple-500" />
            Technologies & Frameworks
          </h3>
          <div className="flex flex-wrap gap-2">
            {(project.technologiesList || []).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-full text-xs font-mono font-semibold bg-purple-50 dark:bg-slate-700 text-purple-700 dark:text-purple-300 border border-purple-100 dark:border-slate-600"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Problem & Solution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {project.problem && (
            <div className="p-8 rounded-3xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/40">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-900/60 text-rose-600 dark:text-rose-300 flex items-center justify-center mb-4">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2">
                Problem Statement
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {project.problem}
              </p>
            </div>
          )}

          {project.solution && (
            <div className="p-8 rounded-3xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-300 flex items-center justify-center mb-4">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2">
                Engineered Solution
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {project.solution}
              </p>
            </div>
          )}
        </div>

        {/* System Architecture */}
        {project.architecture && (
          <div className="mb-12 p-8 rounded-3xl bg-white dark:bg-slate-800 border border-purple-100 dark:border-slate-700 shadow-sm">
            <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-500" />
              System Architecture & Data Workflow
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-mono bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
              {project.architecture}
            </p>
          </div>
        )}

        {/* Detailed Features */}
        {(project.featuresList || []).length > 0 && (
          <div className="mb-12 p-8 rounded-3xl bg-white dark:bg-slate-800 border border-purple-100 dark:border-slate-700 shadow-sm">
            <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white mb-6">
              Key System Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.featuresList?.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-700/40">
                  <CheckCircle2 className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-medium">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Full Long Description */}
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-purple-100 dark:border-slate-700 shadow-sm">
          <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white mb-4">
            Comprehensive Overview
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
            {project.description}
          </p>
        </div>

      </main>

      <Footer socialLinks={socialLinks} />
    </div>
  );
};
