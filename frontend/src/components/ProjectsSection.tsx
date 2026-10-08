import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Project, DOMAIN_CATEGORIES } from '../types';
import { ProjectFallbackImage } from './pixel/ProjectFallbackImage';
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';

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
        
        {/* Projects Main Panel */}
        <div className="black-panel">
          
          {/* Section Marker */}
          <div className="flex items-center gap-3 pb-6 border-b border-[#262626] font-mono text-xs uppercase tracking-widest text-[#A0A0A0]">
            <span className="text-white font-bold">03 /</span>
            <span>SELECTED WORK & CASE STUDIES</span>
          </div>

          <div className="pt-8 space-y-6">
            <h2 className="font-serif italic text-3xl sm:text-4xl text-white">
              Selected Work
            </h2>

            <p className="text-sm font-sans text-[#D5D5D5] max-w-2xl">
              Featured engineering case studies in computer vision fatigue monitoring, AI climate risk prediction platforms, and full-stack enterprise portals.
            </p>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 pb-6 border-b border-[#262626]">
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
                        ? 'bg-white text-black border-white'
                        : 'border-[#333333] bg-[#141414] text-[#A0A0A0] hover:border-white hover:text-white'
                    }`}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>

            {/* Editorial Case Studies Layout */}
            {loading ? (
              <div className="text-center py-12 font-mono text-xs text-[#A0A0A0]">
                LOADING CASE STUDIES...
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="text-center py-12 font-mono text-xs border border-dashed border-[#262626] rounded-2xl text-[#A0A0A0]">
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
                      className="black-card flex flex-col justify-between group"
                    >
                      <div>
                        {/* Project Image Container */}
                        <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-[#262626] bg-[#141414] mb-4">
                          {project.imageUrl && project.imageUrl.trim() !== '' ? (
                            <img
                              src={project.imageUrl}
                              alt={project.title}
                              className="w-full h-full object-cover filter grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
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
                            <span className="black-tag text-[9px] bg-[#111111]/90 backdrop-blur-sm">
                              {project.category}
                            </span>
                          </div>
                        </div>

                        {/* Card Text Content */}
                        <div className="space-y-3">
                          <h3 className="font-serif font-bold text-xl text-white group-hover:text-[#A0A0A0] transition-colors line-clamp-1">
                            {project.title}
                          </h3>
                          <p className="text-xs text-[#D5D5D5] leading-relaxed font-sans line-clamp-3">
                            {project.shortDescription}
                          </p>

                          {/* Tech Tags */}
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {(project.technologiesList || []).map((tech) => (
                              <span key={tech} className="black-tag text-[9px] px-2 py-0.5">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Card Action Footer */}
                      <div className="pt-4 border-t border-[#262626] mt-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#A0A0A0] hover:text-white transition-colors"
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
                              className="inline-flex items-center gap-1 text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400 hover:underline"
                              title="View Live Demo"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>Live Demo</span>
                            </a>
                          )}
                        </div>

                        <Link
                          to={`/projects/${project.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-mono font-bold uppercase text-white hover:translate-x-0.5 transition-transform"
                        >
                          <span>DETAILS</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
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
