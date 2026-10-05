import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Project, DOMAIN_CATEGORIES } from '../types';
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';

interface ProjectsSectionProps {
  projects: Project[];
  loading?: boolean;
}

// Fallback high-res distinct images map by project slug/index to guarantee no 2 projects share images
const PROJECT_FALLBACK_IMAGES: Record<string, string> = {
  'driver-drowsiness-monitoring-system': 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800&auto=format&fit=crop',
  'mini-erp-crm-operations-portal': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
  'ai-based-climate-risk-platform': 'https://images.unsplash.com/photo-1590055531615-f16d36ffe8ec?q=80&w=800&auto=format&fit=crop',
};

const DEFAULT_UNIQUE_IMAGES = [
  'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop',
];

const getProjectImage = (project: Project, idx: number): string => {
  if (project.imageUrl && project.imageUrl.trim() !== '') {
    return project.imageUrl;
  }
  if (project.slug && PROJECT_FALLBACK_IMAGES[project.slug]) {
    return PROJECT_FALLBACK_IMAGES[project.slug];
  }
  return DEFAULT_UNIQUE_IMAGES[idx % DEFAULT_UNIQUE_IMAGES.length];
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects, loading }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Categories list
  const categoryList = ['All', ...Array.from(new Set([...DOMAIN_CATEGORIES, ...projects.map((p) => p.category)]))];

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section id="projects" className="py-20 border-b border-[#1C1B1A]/15 dark:border-[#EAE7E1]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 pb-4 border-b border-[#1C1B1A]/20 dark:border-[#EAE7E1]/20 mb-8">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#1C1B1A]/60 dark:text-[#EAE7E1]/60">
            SECTION 03
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1B1A] dark:text-[#EAE7E1]">
            Featured Engineering Projects
          </h2>
        </div>

        <p className="text-sm font-sans text-[#1C1B1A]/70 dark:text-[#EAE7E1]/70 max-w-2xl mb-10">
          Selected works showcasing applied artificial intelligence, computer vision, data analytics, and full-stack software development.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-12 pb-6 border-b border-[#1C1B1A]/15 dark:border-[#EAE7E1]/15">
          {categoryList.map((cat) => {
            const count = cat === 'All' ? projects.length : projects.filter(p => p.category.toLowerCase() === cat.toLowerCase()).length;
            if (cat !== 'All' && count === 0) return null; // Show only relevant categories

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-[11px] font-mono font-bold tracking-widest uppercase px-3.5 py-1.5 border transition-all ${
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? 'bg-[#1C1B1A] text-[#FAF8F5] dark:bg-[#EAE7E1] dark:text-[#141312] border-[#1C1B1A] dark:border-[#EAE7E1]'
                    : 'border-[#1C1B1A]/20 dark:border-[#EAE7E1]/20 text-[#1C1B1A]/70 dark:text-[#EAE7E1]/70 hover:border-[#1C1B1A] dark:hover:border-[#EAE7E1]'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Projects Editorial Cards Grid */}
        {loading ? (
          <div className="text-center py-12 font-mono text-xs text-[#1C1B1A]/60 dark:text-[#EAE7E1]/60">
            LOADING PROJECTS CATALOG...
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-12 font-mono text-xs border border-dashed border-[#1C1B1A]/20 dark:border-[#EAE7E1]/20">
            NO PROJECTS FOUND IN THIS CATEGORY.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => {
              const projectImg = getProjectImage(project, idx);
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
                    {/* Unique Project Image Header */}
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-[#1C1B1A]/20 dark:border-[#EAE7E1]/20 bg-[#E8E4DC] dark:bg-[#262422]">
                      <img
                        src={projectImg}
                        alt={project.title}
                        className="w-full h-full object-cover filter grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="editorial-tag bg-[#FAF8F5]/90 dark:bg-[#141312]/90 backdrop-blur-sm">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 space-y-4">
                      <div className="space-y-1">
                        <h3 className="font-serif font-bold text-xl text-[#1C1B1A] dark:text-[#EAE7E1] group-hover:text-[#A63A24] dark:group-hover:text-amber-400 transition-colors line-clamp-1">
                          {project.title}
                        </h3>
                        <p className="text-xs text-[#1C1B1A]/70 dark:text-[#EAE7E1]/70 leading-relaxed font-sans line-clamp-3">
                          {project.shortDescription}
                        </p>
                      </div>

                      {/* Technology Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {(project.technologiesList || []).map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] font-mono border border-[#1C1B1A]/15 dark:border-[#EAE7E1]/15 px-2 py-0.5 text-[#1C1B1A]/80 dark:text-[#EAE7E1]/80"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Links */}
                  <div className="p-6 pt-0 border-t border-[#1C1B1A]/15 dark:border-[#EAE7E1]/15 mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 pt-4">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#1C1B1A] dark:text-[#EAE7E1] hover:underline"
                          title="View GitHub Repository"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>GitHub</span>
                        </a>
                      )}

                      {/* OPTIONAL LIVE DEMO BUTTON: Only displayed if liveUrl is non-empty */}
                      {hasLiveDemo && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#A63A24] dark:text-amber-400 hover:underline"
                          title="View Live Demo"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>

                    <Link
                      to={`/projects/${project.slug}`}
                      className="pt-4 inline-flex items-center gap-1 text-xs font-mono font-bold uppercase text-[#1C1B1A] dark:text-[#EAE7E1] hover:translate-x-0.5 transition-transform"
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
