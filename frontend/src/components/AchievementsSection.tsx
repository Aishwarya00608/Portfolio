import React from 'react';
import { motion } from 'framer-motion';
import { Achievement } from '../types';
import { ExternalLink } from 'lucide-react';
import { getCertificateViewUrl } from '../services/api';

interface AchievementsSectionProps {
  achievements: Achievement[];
  loading?: boolean;
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({ achievements, loading }) => {
  const handleViewCert = (url?: string) => {
    if (!url) return;
    const viewUrl = getCertificateViewUrl(url);
    window.open(viewUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="achievements" className="py-20 border-b border-[#1C1B1A]/15 dark:border-[#EAE7E1]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 pb-4 border-b border-[#1C1B1A]/20 dark:border-[#EAE7E1]/20 mb-8">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#1C1B1A]/60 dark:text-[#EAE7E1]/60">
            SECTION 07
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1B1A] dark:text-[#EAE7E1]">
            Honors, Open Source & Leadership
          </h2>
        </div>

        <p className="text-sm font-sans text-[#1C1B1A]/70 dark:text-[#EAE7E1]/70 max-w-2xl mb-12">
          Recognitions, active open-source contributions, public speaking engagements, and institutional honors.
        </p>

        {loading ? (
          <div className="text-center py-12 font-mono text-xs text-[#1C1B1A]/60 dark:text-[#EAE7E1]/60">
            LOADING ACHIEVEMENTS...
          </div>
        ) : achievements.length === 0 ? (
          <div className="text-center py-12 font-mono text-xs border border-dashed border-[#1C1B1A]/20 dark:border-[#EAE7E1]/20">
            NO ACHIEVEMENTS RECORDED YET.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="editorial-card p-6 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    {item.category && <span className="editorial-tag">{item.category}</span>}
                    {item.date && (
                      <span className="text-[10px] font-mono text-[#1C1B1A]/50 dark:text-[#EAE7E1]/50">
                        {item.date}
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif font-bold text-lg text-[#1C1B1A] dark:text-[#EAE7E1] group-hover:text-[#A63A24] dark:group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h3>

                  {item.organization && (
                    <h4 className="font-mono text-xs uppercase tracking-wider text-[#1C1B1A]/70 dark:text-[#EAE7E1]/70">
                      {item.organization}
                    </h4>
                  )}

                  {item.description && (
                    <p className="text-xs font-sans text-[#1C1B1A]/75 dark:text-[#EAE7E1]/75 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>

                {/* View Certificate / Badge Button (Requirement 9) */}
                {item.certificateUrl && (
                  <div className="pt-4 mt-4 border-t border-[#1C1B1A]/15 dark:border-[#EAE7E1]/15 flex items-center justify-end">
                    <button
                      onClick={() => handleViewCert(item.certificateUrl)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#1C1B1A] dark:text-[#EAE7E1] hover:underline"
                    >
                      <span>View Certificate</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
