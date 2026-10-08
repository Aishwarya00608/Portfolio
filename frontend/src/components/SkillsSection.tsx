import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Skill, DOMAIN_CATEGORIES } from '../types';
import { PixelPotion, PixelGem } from './pixel/PixelDecorations';
import { playSelectSound } from '../utils/sound';

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
    <section id="skills" className="py-16 border-b-4 border-[#2A2650]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 p-3 bg-[#121026] border-4 border-black shadow-[4px_4px_0px_0px_#000] font-pixel text-xs">
          <div className="flex items-center gap-2 text-[#00F0FF]">
            <span>LEVEL 02</span>
            <span className="text-[#8B8BAE]">•</span>
            <span className="text-[#00FF66]">SKILL LAB & INVENTORY</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-[#FFD700]">
            <PixelPotion size={16} /> TOTAL ABILITIES: {skills.length}
          </div>
        </div>

        <p className="font-pixel text-xs text-[#E0E7FF] max-w-3xl mb-8 leading-relaxed">
          EQUIPPED TECH ABILITIES & SKILL INVENTORY ACROSS ARTIFICIAL INTELLIGENCE, MACHINE LEARNING, COMPUTER VISION, DATA SCIENCE, AND WEB SYSTEMS.
        </p>

        {/* Category Filters (Inventory Slot Tabs) */}
        <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b-2 border-[#2A2650]">
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

        {/* Skills Display - Game Inventory Grid (NO PERCENTAGES!) */}
        {loading ? (
          <div className="text-center py-12 font-pixel text-xs text-[#00FF66] animate-pulse">
            LOADING INVENTORY SLOTS...
          </div>
        ) : skills.length === 0 ? (
          <div className="text-center py-12 font-pixel text-xs border-4 border-dashed border-[#2A2650] text-[#8B8BAE]">
            NO ABILITIES RECORDED YET.
          </div>
        ) : selectedCategory === 'All' ? (
          /* Grouped Category Inventory Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupedCategories.map((catName) => {
              const catSkills = skills.filter((s) => s.category === catName);
              return (
                <motion.div
                  key={catName}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="pixel-card p-5 bg-[#121026] flex flex-col justify-between"
                >
                  <div>
                    {/* Category Header */}
                    <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-black">
                      <div className="flex items-center gap-2">
                        <PixelGem size={14} />
                        <h3 className="font-pixel text-xs text-[#FFD700] uppercase">
                          {catName}
                        </h3>
                      </div>
                      <span className="font-pixel text-[9px] bg-[#1E1A3C] text-[#00FF66] px-2 py-0.5 border border-black">
                        {catSkills.length} ITEMS
                      </span>
                    </div>

                    {/* Inventory Items List (Pure Badges, No Percentages) */}
                    <div className="flex flex-wrap gap-2">
                      {catSkills.map((skill) => (
                        <div
                          key={skill.id}
                          className="px-3 py-1.5 bg-[#1E1A3C] text-[#E0E7FF] border-2 border-black shadow-[2px_2px_0px_#000] font-pixel text-[11px] flex items-center gap-1.5 hover:border-[#00FF66] transition-all"
                        >
                          <span className="text-[#FF2E93]">▶</span>
                          <span>{skill.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* Filtered Inventory Grid Slots */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredSkills.map((skill) => (
              <div
                key={skill.id}
                className="pixel-card p-4 bg-[#121026] text-center flex flex-col items-center justify-center space-y-2 hover:border-[#00FF66]"
              >
                <PixelGem size={16} />
                <span className="font-pixel text-[9px] text-[#8B8BAE] uppercase">
                  {skill.category}
                </span>
                <h4 className="font-pixel text-xs text-[#00FF66]">
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
