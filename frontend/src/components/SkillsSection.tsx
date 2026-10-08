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
        <div className="editorial-panel-skills">
          
          {/* Section Marker */}
          <div className="flex items-center gap-3 pb-6 border-b border-[#D5E2D5] font-mono text-xs uppercase tracking-widest text-[#6E625A]">
            <span className="text-[#3E593E] font-bold">03 /</span>
            <span>MY TOOLBOX & TECHNICAL INDEX</span>
          </div>

          <div className="pt-8 space-y-6">
            <h2 className="font-serif italic text-3xl sm:text-4xl text-[#3E593E]">
              What I Work With
            </h2>

            <p className="text-sm font-sans text-[#473B35] max-w-2xl">
              A curated index of frameworks, algorithms, and engineering tools across Artificial Intelligence, Machine Learning, Computer Vision, and Software Systems.
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 pt-2 pb-6 border-b border-[#D5E2D5]">
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
                        ? 'bg-[#2B2522] text-[#FAF7F2] border-[#2B2522]'
                        : 'border-[#B2C5B2] bg-[#EAF0EA] text-[#344834] hover:border-[#2B2522]'
                    }`}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>

            {/* Skills Catalog (NO PERCENTAGES! Clean Domain Cards) */}
            {loading ? (
              <div className="text-center py-12 font-mono text-xs text-[#6E625A]">
                LOADING TECHNICAL TOOLBOX...
              </div>
            ) : skills.length === 0 ? (
              <div className="text-center py-12 font-mono text-xs border border-dashed border-[#D5E2D5] rounded-2xl text-[#6E625A]">
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
                      className="editorial-card-sage flex flex-col justify-between"
                    >
                      <div>
                        {/* Domain Category Title */}
                        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#C2D4C2]">
                          <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#2B2522]">
                            {catName}
                          </h3>
                          <span className="text-[10px] font-mono text-[#3E593E]">
                            {catSkills.length} ITEMS
                          </span>
                        </div>

                        {/* Skill Items */}
                        <div className="space-y-2">
                          {catSkills.map((skill) => (
                            <div
                              key={skill.id}
                              className="flex items-center gap-2 py-1 text-sm font-sans text-[#2B2522]"
                            >
                              <span className="font-mono text-xs text-[#3E593E]">—</span>
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
                  <div key={skill.id} className="editorial-card-sage p-4 text-center">
                    <span className="block font-mono text-[9px] uppercase text-[#3E593E] mb-1">
                      {skill.category}
                    </span>
                    <h4 className="font-serif font-bold text-[#2B2522] text-sm">
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
