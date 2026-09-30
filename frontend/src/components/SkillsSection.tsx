import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Skill } from '../types';
import {
  Code,
  Binary,
  Brain,
  Camera,
  Layout,
  Database,
  Wrench,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

interface SkillsSectionProps {
  skills: Skill[];
  loading?: boolean;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills, loading }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'AI',
    'Programming',
    'Data Science',
    'Machine Learning',
    'Computer Vision',
    'Web Development',
    'Databases',
    'DevOps / Tools',
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'AI':
        return <Sparkles className="w-4 h-4 text-purple-500" />;
      case 'Programming':
        return <Code className="w-4 h-4 text-purple-500" />;
      case 'Data Science':
        return <Binary className="w-4 h-4 text-pink-500" />;
      case 'Machine Learning':
        return <Brain className="w-4 h-4 text-indigo-500" />;
      case 'Computer Vision':
        return <Camera className="w-4 h-4 text-rose-500" />;
      case 'Web Development':
        return <Layout className="w-4 h-4 text-cyan-500" />;
      case 'Databases':
        return <Database className="w-4 h-4 text-emerald-500" />;
      case 'DevOps / Tools':
        return <Wrench className="w-4 h-4 text-amber-500" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-purple-500" />;
    }
  };

  const filteredSkills =
    activeCategory === 'All'
      ? skills
      : skills.filter((s) => s.category.toLowerCase() === activeCategory.toLowerCase());

  // Group skills by category for "All" view
  const groupedCategories = Array.from(new Set(skills.map((s) => s.category)));

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 dark:bg-slate-800 text-pink-700 dark:text-pink-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Code className="w-3.5 h-3.5" />
            <span>Technical Expertise</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900 dark:text-white">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
            Database-backed skill index curated across machine learning, computer vision, data analytics, and full-stack engineering.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-cute scale-105'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-pink-300'
              }`}
            >
              {cat !== 'All' && getCategoryIcon(cat)}
              <span>{cat}</span>
            </button>
          ))}
        </div>

        {/* Skills Display */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-4 border-pink-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-slate-500">Loading skills database...</p>
          </div>
        ) : skills.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-800/50 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
            <p className="text-slate-500 dark:text-slate-400">No skills added yet.</p>
          </div>
        ) : activeCategory === 'All' ? (
          /* Grouped Categories View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupedCategories.map((catName) => {
              const catSkills = skills.filter((s) => s.category === catName);
              return (
                <div
                  key={catName}
                  className="p-6 rounded-3xl bg-white dark:bg-slate-800/80 border border-purple-100/80 dark:border-slate-700/80 shadow-sm hover:shadow-cute transition-shadow duration-300"
                >
                  <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-100 dark:border-slate-700">
                    <div className="w-8 h-8 rounded-xl bg-pink-50 dark:bg-slate-700 flex items-center justify-center">
                      {getCategoryIcon(catName)}
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">
                      {catName}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {catSkills.map((skill) => (
                      <div key={skill.id} className="space-y-1">
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-pink-500" />
                            {skill.name}
                          </span>
                          <span className="text-purple-600 dark:text-purple-400 font-mono">
                            {skill.proficiency}%
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full transition-all duration-500"
                            style={{ width: `${skill.proficiency}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Filtered Category Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-pink-50 dark:bg-slate-700 flex items-center justify-center">
                    {getCategoryIcon(skill.category)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                      {skill.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500">
                      {skill.category}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold font-mono px-2 py-1 rounded-full bg-purple-50 dark:bg-slate-700 text-purple-600 dark:text-purple-300">
                  {skill.proficiency}%
                </span>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
