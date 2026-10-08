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
    <section id="projects" className="py-20 border-b border-[#1C1B1A]/20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 pb-4 border-b border-[#1C1B1A]/20 mb-8">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#A63A24]">
            SECTION N° 03
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1B1A]">
            Selected Work & Case Studies
          </h2>
        </div>

        <p className="text-sm font-sans text-[#1C1B1A]/70 max-w-2xl mb-10">
          Featured engineering files in computer vision fatigue monitoring, AI climate risk prediction platforms, and full-stack enterprise systems.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-12 pb-6 border-b border-[#1C1B1A]/15">
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
                className={`text-[11px] font-mono font-bold tracking-widest uppercase px-3.5 py-1.5 border transition-all ${
                  isSelected
                    ? 'bg-[#1C1B1A] text-[#FAF8F5] border-[#1C1B1A]'
                    : 'border-[#1C1B1A]/20 text-[#1C1B1A]/70 hover:border-[#1C1B1A] hover:text-[#1C1B1A]'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Editorial Case Studies Grid */}
        {loading ? (
          <div className="text-center py-12 font-mono text-xs text-[#1C1B1A]/60">
            LOADING CASE STUDIES...
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-12 font-mono text-xs border border-dashed border-[#1C1B1A]/20">
            NO PROJECTS FOUND IN THIS CATEGORY.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => {
              const hasLiveDemo = Boolean(project.liveUrl && project.liveUrl.trim() !== '');

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="editorial-card flex flex-col justify-between group"
                >
                  <div>
                    {/* Project Image Header (Fallback logic guarantees unique artwork per project) */}
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-[#1C1B1A]/20 bg-[#F4F0E8]">
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
                        <span className="editorial-tag bg-white/90 backdrop-blur-sm">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 space-y-4">
                      <div className="space-y-1">
                        <h3 className="font-serif font-bold text-xl text-[#1C1B1A] group-hover:text-[#A63A24] transition-colors line-clamp-1">
                          {project.title}
                        </h3>
                        <p className="text-xs text-[#1C1B1A]/70 leading-relaxed font-sans line-clamp-3">
                          {project.shortDescription}
                        </p>
                      </div>

                      {/* Technology Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {(project.technologiesList || []).map((tech) => (
                          <span key={tech} className="editorial-tag text-[9px] py-0.5 px-2">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Links */}
                  <div className="p-6 pt-0 border-t border-[#1C1B1A]/15 mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 pt-4">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#1C1B1A] hover:underline"
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
                          className="inline-flex items-center gap-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#A63A24] hover:underline"
                          title="View Live Demo"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>

                    <Link
                      to={`/projects/${project.slug}`}
                      className="pt-4 inline-flex items-center gap-1 text-xs font-mono font-bold uppercase text-[#1C1B1A] hover:translate-x-0.5 transition-transform"
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
    </section>
  );
};
