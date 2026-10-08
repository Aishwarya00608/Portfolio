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
        <div className="editorial-panel-projects">
          
          {/* Section Marker */}
          <div className="flex items-center gap-3 pb-6 border-b border-[#ECDAD6] font-mono text-xs uppercase tracking-widest text-[#6E625A]">
            <span className="text-[#9E4933] font-bold">02 /</span>
            <span>SELECTED WORK & CASE STUDIES</span>
          </div>

          <div className="pt-8 space-y-6">
            <h2 className="font-serif italic text-3xl sm:text-4xl text-[#9E4933]">
              Selected Work
            </h2>

            <p className="text-sm font-sans text-[#473B35] max-w-2xl">
              Featured engineering case studies in computer vision fatigue monitoring, AI climate risk prediction platforms, and full-stack enterprise portals.
            </p>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 pb-6 border-b border-[#ECDAD6]">
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
                        ? 'bg-[#2B2522] text-[#FAF7F2] border-[#2B2522]'
                        : 'border-[#DDBABA] bg-[#F7EBEB] text-[#703A3A] hover:border-[#2B2522]'
                    }`}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>

            {/* Editorial Case Studies Layout */}
            {loading ? (
              <div className="text-center py-12 font-mono text-xs text-[#6E625A]">
                LOADING CASE STUDIES...
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="text-center py-12 font-mono text-xs border border-dashed border-[#ECDAD6] rounded-2xl text-[#6E625A]">
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
                      className="editorial-card-pink flex flex-col justify-between group"
                    >
                      <div>
                        {/* Project Image Container */}
                        <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-[#E2CDCD] bg-[#FAF4EF] mb-4">
                          {project.imageUrl && project.imageUrl.trim() !== '' ? (
                            <img
                              src={project.imageUrl}
                              alt={project.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
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
                            <span className="editorial-tag-pink text-[9px] bg-[#FAF7F2]/90 backdrop-blur-sm">
                              {project.category}
                            </span>
                          </div>
                        </div>

                        {/* Card Text Content */}
                        <div className="space-y-3">
                          <h3 className="font-serif font-bold text-xl text-[#2B2522] group-hover:text-[#9E4933] transition-colors line-clamp-1">
                            {project.title}
                          </h3>
                          <p className="text-xs text-[#473B35] leading-relaxed font-sans line-clamp-3">
                            {project.shortDescription}
                          </p>

                          {/* Tech Tags */}
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {(project.technologiesList || []).map((tech) => (
                              <span key={tech} className="editorial-tag-pink text-[9px] px-2 py-0.5">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Card Action Footer */}
                      <div className="pt-4 border-t border-[#E2CDCD] mt-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#6E625A] hover:text-[#2B2522] transition-colors"
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
                              className="inline-flex items-center gap-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#9E4933] hover:underline"
                              title="View Live Demo"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>Live Demo</span>
                            </a>
                          )}
                        </div>

                        <Link
                          to={`/projects/${project.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-mono font-bold uppercase text-[#2B2522] hover:translate-x-0.5 transition-transform"
                        >
                          <span>DETAILS</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#9E4933]" />
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
