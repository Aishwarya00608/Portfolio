import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Achievement } from '../types';
import { CertificateViewerModal } from './CertificateViewerModal';
import { ExternalLink } from 'lucide-react';

interface AchievementsSectionProps {
  achievements: Achievement[];
  loading?: boolean;
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({
  achievements,
  loading,
}) => {
  const [selectedCert, setSelectedCert] = useState<{ url: string; title: string } | null>(null);

  return (
    <section id="achievements" className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Achievements Panel */}
        <div className="black-panel">
          
          {/* Section Marker */}
          <div className="flex items-center gap-3 pb-6 border-b border-[#262626] font-mono text-xs uppercase tracking-widest text-[#A0A0A0]">
            <span className="text-white font-bold">07 /</span>
            <span>MILESTONES & ACHIEVEMENTS</span>
          </div>

          <div className="pt-8 space-y-6">
            <h2 className="font-serif italic text-3xl sm:text-4xl text-white">
              Achievements
            </h2>

            <p className="text-sm font-sans text-[#D5D5D5] max-w-2xl">
              Recognitions, active open-source contributions (GSSoC), public speaking engagements, and institutional honors.
            </p>

            {loading ? (
              <div className="text-center py-12 font-mono text-xs text-[#A0A0A0]">
                LOADING ACHIEVEMENTS...
              </div>
            ) : achievements.length === 0 ? (
              <div className="text-center py-12 font-mono text-xs border border-dashed border-[#262626] rounded-2xl text-[#A0A0A0]">
                NO ACHIEVEMENTS RECORDED YET.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                {achievements.map((item, idx) => {
                  const hasCertificate = Boolean(item.certificateUrl && item.certificateUrl.trim() !== '');

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.08 }}
                      className="black-card p-6 flex flex-col justify-between group"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="black-tag text-[9px] px-2 py-0.5">
                            {item.category || 'MILESTONE'}
                          </span>
                          {item.date && (
                            <span className="text-[10px] font-mono text-[#A0A0A0]">
                              {item.date}
                            </span>
                          )}
                        </div>

                        <h3 className="font-serif font-bold text-lg text-white group-hover:text-[#A0A0A0] transition-colors">
                          {item.title}
                        </h3>

                        {item.organization && (
                          <h4 className="font-mono text-xs uppercase tracking-wider text-[#A0A0A0]">
                            {item.organization}
                          </h4>
                        )}

                        {item.description && (
                          <p className="text-xs font-sans text-[#D5D5D5] leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </div>

                      {/* Certificate Action (Hidden if no certificate exists) */}
                      {hasCertificate && (
                        <div className="pt-4 mt-4 border-t border-[#262626] flex items-center justify-end">
                          <button
                            onClick={() =>
                              setSelectedCert({
                                url: item.certificateUrl!,
                                title: item.title,
                              })
                            }
                            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-white hover:underline"
                          >
                            <span>View Certificate</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            )}

          </div>

        </div>

        {/* Certificate Viewer Modal */}
        <CertificateViewerModal
          isOpen={Boolean(selectedCert)}
          onClose={() => setSelectedCert(null)}
          title={selectedCert?.title || ''}
          certificateUrl={selectedCert?.url}
        />

      </div>
    </section>
  );
};
