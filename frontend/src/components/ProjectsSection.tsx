import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Project, DOMAIN_CATEGORIES } from '../types';
import { ProjectFallbackImage } from './pixel/ProjectFallbackImage';
import { PixelStar, PixelSword } from './pixel/PixelDecorations';
import { playSelectSound } from '../utils/sound';
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
    <section id="projects" className="py-16 border-b-4 border-[#2A2650]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Level Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 p-3 bg-[#121026] border-4 border-black shadow-[4px_4px_0px_0px_#000] font-pixel text-xs">
          <div className="flex items-center gap-2 text-[#FF2E93]">
            <span>LEVEL 03</span>
            <span className="text-[#8B8BAE]">•</span>
            <span className="text-[#FFD700]">PROJECT WORLD & MISSIONS</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-[#00FF66]">
            <PixelStar size={16} /> MISSIONS: {projects.length}
          </div>
        </div>

        <p className="font-pixel text-xs text-[#E0E7FF] max-w-3xl mb-8 leading-relaxed">
          SELECTED MISSION CARDS SHOWCASING APPLIED ARTIFICIAL INTELLIGENCE, COMPUTER VISION, DATA ANALYTICS, AND FULL-STACK SYSTEMS.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b-2 border-[#2A2650]">
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
                onClick={() => {
                  playSelectSound();
                  setSelectedCategory(cat);
                }}
                className={`font-pixel text-[10px] uppercase px-3 py-2 border-2 border-black shadow-[2px_2px_0px_#000] transition-all ${
                  isSelected
                    ? 'bg-[#FF2E93] text-white border-black shadow-[3px_3px_0px_#000]'
                    : 'bg-[#1E1A3C] text-[#00F0FF] hover:bg-[#25204C] hover:text-[#00FF66]'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Mission Cards Grid */}
        {loading ? (
          <div className="text-center py-12 font-pixel text-xs text-[#00FF66] animate-pulse">
            LOADING MISSIONS CATALOG...
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-12 font-pixel text-xs border-4 border-dashed border-[#2A2650] text-[#8B8BAE]">
            NO MISSIONS FOUND IN THIS DOMAIN.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => {
              const missionNumber = String(idx + 1).padStart(2, '0');
              const hasLiveDemo = Boolean(project.liveUrl && project.liveUrl.trim() !== '');

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="pixel-card flex flex-col justify-between group bg-[#121026] hover:border-[#00FF66]"
                >
                  <div>
                    {/* Mission Header Bar */}
                    <div className="flex items-center justify-between px-4 py-2 bg-[#1E1A3C] border-b-4 border-black font-pixel text-[10px]">
                      <span className="text-[#FF2E93] flex items-center gap-1">
                        <PixelSword size={12} /> MISSION {missionNumber}
                      </span>
                      <span className="text-[#00FF66] bg-[#0A0817] px-2 py-0.5 border border-black uppercase">
                        {project.category}
                      </span>
                    </div>

                    {/* Project-Specific Image Header (Fallback logic ensures 100% distinct visuals per project) */}
                    <ProjectFallbackImage
                      imageUrl={project.imageUrl}
                      title={project.title}
                      category={project.category}
                      className="aspect-[16/9]"
                    />

                    {/* Card Body */}
                    <div className="p-5 space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-pixel text-sm text-[#FFD700] leading-snug group-hover:text-[#00FF66] transition-colors line-clamp-2">
                          {project.title}
                        </h3>
                        <p className="text-xs text-[#E0E7FF] leading-relaxed font-sans line-clamp-3">
                          {project.shortDescription}
                        </p>
                      </div>

                      {/* Technology Badges */}
                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#2A2650]">
                        {(project.technologiesList || []).map((tech) => (
                          <span
                            key={tech}
                            className="font-pixel text-[9px] bg-[#1E1A3C] text-[#00F0FF] border border-black px-2 py-0.5"
                          >
                            +{tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Mission Action Buttons */}
                  <div className="p-4 pt-0 border-t-2 border-black bg-[#0A0817] flex flex-wrap items-center justify-between gap-2 mt-4">
                    <div className="flex items-center gap-2 pt-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => playSelectSound()}
                          className="px-2.5 py-1.5 bg-[#1E1A3C] text-[#00FF66] border-2 border-black shadow-[2px_2px_0px_#000] font-pixel text-[10px] inline-flex items-center gap-1 hover:bg-[#FF2E93] hover:text-white"
                          title="View Source Code"
                        >
                          <Github className="w-3 h-3" />
                          <span>GITHUB</span>
                        </a>
                      )}

                      {/* LIVE DEMO BUTTON: Only displayed if liveUrl exists! */}
                      {hasLiveDemo && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => playSelectSound()}
                          className="px-2.5 py-1.5 bg-[#FFD700] text-black border-2 border-black shadow-[2px_2px_0px_#000] font-pixel text-[10px] inline-flex items-center gap-1 hover:bg-[#FFE033] animate-pulse"
                          title="Play Live Demo"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>PLAY DEMO</span>
                        </a>
                      )}
                    </div>

                    <Link
                      to={`/projects/${project.slug}`}
                      onClick={() => playSelectSound()}
                      className="pt-3 font-pixel text-[10px] text-[#FF2E93] hover:text-[#00FF66] inline-flex items-center gap-1"
                    >
                      <span>DETAILS</span>
                      <ArrowUpRight className="w-3 h-3" />
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
