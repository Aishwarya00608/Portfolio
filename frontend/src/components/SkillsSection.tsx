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
    <section id="skills" className="py-20 border-b border-[#1C1B1A]/20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 pb-4 border-b border-[#1C1B1A]/20 mb-8">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#A63A24]">
            SECTION N° 02
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1B1A]">
            My Toolbox & Technical Index
          </h2>
        </div>

        <p className="text-sm font-sans text-[#1C1B1A]/70 max-w-2xl mb-8">
          A curated index of frameworks, algorithms, and engineering tools across Artificial Intelligence, Machine Learning, Computer Vision, and Software Systems.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10 pb-6 border-b border-[#1C1B1A]/15">
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

        {/* Skills Catalog (NO PERCENTAGES! Pure Magazine Index) */}
        {loading ? (
          <div className="text-center py-12 font-mono text-xs text-[#1C1B1A]/60">
            LOADING TECHNICAL INDEX...
          </div>
        ) : skills.length === 0 ? (
          <div className="text-center py-12 font-mono text-xs border border-dashed border-[#1C1B1A]/20">
            NO SKILLS RECORDED YET.
          </div>
        ) : selectedCategory === 'All' ? (
          /* Grouped Categories Magazine Index */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {groupedCategories.map((catName) => {
              const catSkills = skills.filter((s) => s.category === catName);
              return (
                <motion.div
                  key={catName}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="editorial-card flex flex-col justify-between"
                >
                  <div>
                    {/* Category Header */}
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#1C1B1A]/15">
                      <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#A63A24]">
                        {catName}
                      </h3>
                      <span className="text-[10px] font-mono text-[#1C1B1A]/50">
                        {catSkills.length} ITEMS
                      </span>
                    </div>

                    {/* Skill List */}
                    <div className="space-y-2">
                      {catSkills.map((skill) => (
                        <div
                          key={skill.id}
                          className="flex items-center gap-2 py-1 text-sm font-sans text-[#1C1B1A]"
                        >
                          <span className="font-mono text-xs text-[#A63A24]">—</span>
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
          /* Filtered Category Grid */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredSkills.map((skill) => (
              <div key={skill.id} className="editorial-card p-4 text-center">
                <span className="block font-mono text-[10px] uppercase text-[#1C1B1A]/50 mb-1">
                  {skill.category}
                </span>
                <h4 className="font-serif font-bold text-[#1C1B1A] text-sm">
                  {skill.name}
                </h4>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
