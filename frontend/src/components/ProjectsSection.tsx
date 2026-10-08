import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Project, DOMAIN_CATEGORIES } from '../types';
import { ProjectFallbackImage } from './pixel/ProjectFallbackImage';
import { Github, ExternalLink, ArrowUpRight, FolderGit2 } from 'lucide-react';

interface ProjectsSectionProps {
  projects: Project[];
  loading?: boolean;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects, loading }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categoryList = [
    'All',
    ...Array.from(new Set([...DOMAIN_CATEGORIES, ...projects.map((p) => p.category)])),
  ];

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section id="projects" className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Projects Main Browser Window */}
        <div className="bg-[#FAF7F2] border-2 border-[#CBD5E1] rounded-3xl p-6 sm:p-10 shadow-window relative overflow-hidden">
          
          {/* Section Marker & Window Header */}
          <div className="flex items-center justify-between pb-6 border-b border-[#CBD5E1] font-mono text-xs text-[#64748B]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
              <span className="bg-[#FCE7F3] border border-[#F472B6] text-[#BE185D] px-3 py-0.5 rounded-full font-bold text-[10px] ml-2">
                selected_projects.folder
              </span>
            </div>
            <div className="font-mono text-xs font-bold text-[#1E293B]">
              02 / MY WORK & CASE STUDIES
            </div>
          </div>

          <div className="pt-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h2 className="font-serif italic text-3xl sm:text-4xl text-[#BE185D]">
                  My Work
                </h2>
                <p className="text-sm font-sans text-[#475569] max-w-2xl mt-1">
                  Featured engineering case studies in computer vision fatigue monitoring, AI climate risk prediction platforms, and full-stack enterprise portals.
                </p>
              </div>

              <div className="font-hand font-bold text-base text-[#EC4899] bg-[#FCE7F3] border border-[#F472B6] px-3.5 py-1 rounded-full shadow-sticker self-start sm:self-auto">
                ✦ Interactive Case Studies
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 pb-6 border-b border-[#CBD5E1]">
              {categoryList.map((cat) => {
                const count =
                  cat === 'All'
                    ? projects.length
                    : projects.filter((p) => p.category.toLowerCase() === cat.toLowerCase()).length;
                if (cat !== 'All' && count === 0) return null;

                const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();

                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-[10px] font-mono font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full border transition-all ${
                      isSelected
                        ? 'bg-[#1E293B] text-[#FAF7F2] border-[#1E293B] shadow-sm'
                        : 'border-[#CBD5E1] bg-white text-[#64748B] hover:border-[#1E293B] hover:text-[#1E293B]'
                    }`}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>

            {/* Editorial Case Studies Layout */}
            {loading ? (
              <div className="text-center py-12 font-mono text-xs text-[#64748B]">
                LOADING CASE STUDIES...
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="text-center py-12 font-mono text-xs border-2 border-dashed border-[#CBD5E1] rounded-2xl text-[#64748B]">
                NO PROJECTS FOUND IN THIS CATEGORY.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                {filteredProjects.map((project, idx) => {
                  const hasLiveDemo = Boolean(project.liveUrl && project.liveUrl.trim() !== '');

                  return (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="bg-white border-2 border-[#CBD5E1] rounded-2xl p-5 flex flex-col justify-between group shadow-window hover:border-[#1E293B] transition-all"
                    >
                      <div>
                        {/* Project Image Container */}
                        <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] mb-4">
                          {project.imageUrl && project.imageUrl.trim() !== '' ? (
                            <img
                              src={project.imageUrl}
                              alt={project.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                            />
                          ) : (
                            <ProjectFallbackImage
                              imageUrl={null}
                              title={project.title}
                              category={project.category}
                              className="w-full h-full"
                            />
                          )}
                          <div className="absolute top-3 left-3">
                            <span className="text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/90 text-[#0284C7] border border-[#BAE6FD] shadow-sticker">
                              {project.category}
                            </span>
                          </div>
                        </div>

                        {/* Card Text Content */}
                        <div className="space-y-3">
                          <h3 className="font-serif font-bold text-xl text-[#1E293B] group-hover:text-[#BE185D] transition-colors line-clamp-1">
                            {project.title}
                          </h3>
                          <p className="text-xs text-[#475569] leading-relaxed font-sans line-clamp-3">
                            {project.shortDescription}
                          </p>

                          {/* Tech Tags */}
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {(project.technologiesList || []).map((tech) => (
                              <span
                                key={tech}
                                className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0]"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Card Action Footer */}
                      <div className="pt-4 border-t border-[#E2E8F0] mt-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#64748B] hover:text-[#1E293B] transition-colors"
                              title="View GitHub Repository"
                            >
                              <Github className="w-3.5 h-3.5" />
                              <span>GitHub</span>
                            </a>
                          )}

                          {/* OPTIONAL LIVE DEMO BUTTON: Displayed ONLY if liveUrl exists */}
                          {hasLiveDemo && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#0284C7] hover:underline"
                              title="View Live Demo"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>Live Demo</span>
                            </a>
                          )}
                        </div>

                        <Link
                          to={`/projects/${project.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-mono font-bold uppercase text-[#1E293B] hover:translate-x-0.5 transition-transform"
                        >
                          <span>DETAILS</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#BE185D]" />
                        </Link>
                      </div>

                    </motion.div>
                  );
                })}
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
