import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Skill, DOMAIN_CATEGORIES } from '../types';
import { Folder, Terminal, Sparkles } from 'lucide-react';

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
        
        {/* Skills Main Pastel Window */}
        <div className="bg-[#FAF7F2] border-2 border-[#CBD5E1] rounded-3xl p-6 sm:p-10 shadow-window relative overflow-hidden">
          
          {/* Browser Window Header */}
          <div className="flex items-center justify-between pb-6 border-b border-[#CBD5E1] font-mono text-xs text-[#64748B]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
              <span className="bg-[#DCFCE7] border border-[#86EFAC] text-[#15803D] px-3 py-0.5 rounded-full font-bold text-[10px] ml-2">
                technical_toolbox.index
              </span>
            </div>
            <div className="font-mono text-xs font-bold text-[#1E293B]">
              03 / WHAT I WORK WITH
            </div>
          </div>

          <div className="pt-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h2 className="font-serif italic text-3xl sm:text-4xl text-[#15803D]">
                  My Toolbox
                </h2>
                <p className="text-sm font-sans text-[#475569] max-w-2xl mt-1">
                  A curated index of frameworks, algorithms, and engineering tools across Artificial Intelligence, Machine Learning, Computer Vision, and Software Systems.
                </p>
              </div>

              <div className="font-hand font-bold text-base text-[#16A34A] bg-[#DCFCE7] border border-[#86EFAC] px-3.5 py-1 rounded-full shadow-sticker self-start sm:self-auto">
                ✦ Zero Percentages • Domain Folders
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 pt-2 pb-6 border-b border-[#CBD5E1]">
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
                        ? 'bg-[#15803D] text-white border-[#15803D] shadow-sm'
                        : 'border-[#CBD5E1] bg-white text-[#64748B] hover:border-[#15803D] hover:text-[#15803D]'
                    }`}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>

            {/* Skills Catalog (NO PERCENTAGES! Clean Domain Cards & Folders) */}
            {loading ? (
              <div className="text-center py-12 font-mono text-xs text-[#64748B]">
                LOADING TECHNICAL TOOLBOX...
              </div>
            ) : skills.length === 0 ? (
              <div className="text-center py-12 font-mono text-xs border-2 border-dashed border-[#CBD5E1] rounded-2xl text-[#64748B]">
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
                      className="bg-[#DCFCE7] border-2 border-[#86EFAC] rounded-2xl p-6 shadow-sticker flex flex-col justify-between"
                    >
                      <div>
                        {/* Domain Category Title */}
                        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#86EFAC]">
                          <div className="flex items-center gap-2">
                            <Folder className="w-4 h-4 text-[#16A34A]" />
                            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#15803D]">
                              {catName}
                            </h3>
                          </div>
                          <span className="text-[10px] font-mono font-bold text-[#16A34A] bg-white px-2 py-0.5 rounded-full border border-[#86EFAC]">
                            {catSkills.length} ITEMS
                          </span>
                        </div>

                        {/* Skill Items */}
                        <div className="space-y-2">
                          {catSkills.map((skill) => (
                            <div
                              key={skill.id}
                              className="flex items-center gap-2 py-1 px-2 rounded-lg bg-white/80 border border-white/60 text-sm font-sans text-[#14532D]"
                            >
                              <span className="font-mono text-xs text-[#16A34A]">✦</span>
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
                  <div key={skill.id} className="bg-[#DCFCE7] border-2 border-[#86EFAC] rounded-2xl p-4 text-center shadow-sticker">
                    <span className="block font-mono text-[9px] uppercase text-[#16A34A] mb-1">
                      {skill.category}
                    </span>
                    <h4 className="font-serif font-bold text-[#14532D] text-sm">
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
