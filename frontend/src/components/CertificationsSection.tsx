import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Certification } from '../types';
import { Award, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';

interface CertificationsSectionProps {
  certifications: Certification[];
  loading?: boolean;
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({ certifications, loading }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'AI / ML', 'Data', 'Programming', 'Development', 'Business', 'Other'];

  const filteredCerts =
    selectedCategory === 'All'
      ? certifications
      : certifications.filter((c) => c.category === selectedCategory);

  return (
    <section id="certifications" className="py-20 relative bg-purple-50/20 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 dark:bg-slate-800 text-pink-700 dark:text-pink-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Credentials & Badges</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900 dark:text-white">
            Professional <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
            Verified certifications across Google, IBM, Cisco, Simplilearn, Anthropic, and ThinkQbator.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-cute'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-pink-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Certifications Cards Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-4 border-pink-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-slate-500">Loading certifications database...</p>
          </div>
        ) : filteredCerts.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-800/50 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
            <p className="text-slate-500 dark:text-slate-400">No certifications found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCerts.map((cert, idx) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-purple-100/80 dark:border-slate-700/80 shadow-sm hover:shadow-cute transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-pink-50 dark:bg-slate-700 flex items-center justify-center text-pink-500 shrink-0 group-hover:scale-110 transition-transform">
                      <Award className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-50 dark:bg-slate-700 text-purple-700 dark:text-purple-300">
                      {cert.category}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                    {cert.name}
                  </h3>

                  <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1">
                    {cert.organization}
                  </h4>

                  {cert.description && (
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                      {cert.description}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    Verified Credential
                  </span>
                  {(cert.credentialUrl || cert.certificateUrl) && (
                    <a
                      href={cert.credentialUrl || cert.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-pink-600 dark:text-pink-400 hover:underline flex items-center gap-1"
                    >
                      <span>View Credential</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
