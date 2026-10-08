import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Skill, DOMAIN_CATEGORIES } from '../types';

interface SkillsSectionProps {
  skills: Skill[];
  loading?: boolean;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills, loading }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categoryFilters = ['All', ...DOMAIN_CATEGORIES];

  const filteredSkills =
    selectedCategory === 'All'
      ? skills
      : skills.filter((s) => s.category.toLowerCase() === selectedCategory.toLowerCase());

  // Group skills by category
  const groupedCategories = Array.from(new Set(skills.map((s) => s.category)));

  return (
    <section id="skills" className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Skills Main Panel */}
        <div className="black-panel">
          
          {/* Section Marker */}
          <div className="flex items-center gap-3 pb-6 border-b border-[#262626] font-mono text-xs uppercase tracking-widest text-[#A0A0A0]">
            <span className="text-white font-bold">02 /</span>
            <span>MY TOOLBOX & TECHNICAL INDEX</span>
          </div>

          <div className="pt-8 space-y-6">
            <h2 className="font-serif italic text-3xl sm:text-4xl text-white">
              What I Work With
            </h2>

            <p className="text-sm font-sans text-[#D5D5D5] max-w-2xl">
              A curated index of frameworks, algorithms, and engineering tools across Artificial Intelligence, Machine Learning, Computer Vision, and Software Systems.
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 pt-2 pb-6 border-b border-[#262626]">
              {categoryFilters.map((cat) => {
                const count =
                  cat === 'All'
                    ? skills.length
                    : skills.filter((s) => s.category.toLowerCase() === cat.toLowerCase()).length;
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

            {/* Skills Catalog (NO PERCENTAGES! Clean Domain Cards) */}
            {loading ? (
              <div className="text-center py-12 font-mono text-xs text-[#A0A0A0]">
                LOADING TECHNICAL TOOLBOX...
              </div>
            ) : skills.length === 0 ? (
              <div className="text-center py-12 font-mono text-xs border border-dashed border-[#262626] rounded-2xl text-[#A0A0A0]">
                NO SKILLS RECORDED YET.
              </div>
            ) : selectedCategory === 'All' ? (
              /* Grouped Domain Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                {groupedCategories.map((catName) => {
                  const catSkills = skills.filter((s) => s.category === catName);
                  return (
                    <motion.div
                      key={catName}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4 }}
                      className="black-card flex flex-col justify-between"
                    >
                      <div>
                        {/* Domain Category Title */}
                        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#262626]">
                          <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-white">
                            {catName}
                          </h3>
                          <span className="text-[10px] font-mono text-[#A0A0A0]">
                            {catSkills.length} ITEMS
                          </span>
                        </div>

                        {/* Skill Items */}
                        <div className="space-y-2">
                          {catSkills.map((skill) => (
                            <div
                              key={skill.id}
                              className="flex items-center gap-2 py-1 text-sm font-sans text-[#D5D5D5]"
                            >
                              <span className="font-mono text-xs text-white">—</span>
                              <span className="font-medium">{skill.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              /* Filtered Grid */
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 pt-4">
                {filteredSkills.map((skill) => (
                  <div key={skill.id} className="black-card p-4 text-center">
                    <span className="block font-mono text-[9px] uppercase text-[#A0A0A0] mb-1">
                      {skill.category}
                    </span>
                    <h4 className="font-serif font-bold text-white text-sm">
                      {skill.name}
                    </h4>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
