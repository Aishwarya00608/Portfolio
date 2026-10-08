import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Achievement } from '../types';
import { CertificateViewerModal } from './CertificateViewerModal';
import { ExternalLink, Trophy } from 'lucide-react';

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
        
        {/* Achievements Window */}
        <div className="bg-[#FAF7F2] border-2 border-[#CBD5E1] rounded-3xl p-6 sm:p-10 shadow-window relative overflow-hidden">
          
          {/* Section Marker */}
          <div className="flex items-center justify-between pb-6 border-b border-[#CBD5E1] font-mono text-xs text-[#64748B]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
              <span className="bg-[#FEF3C7] border border-[#FCD34D] text-[#B45309] px-3 py-0.5 rounded-full font-bold text-[10px] ml-2">
                achievements_milestones.archive
              </span>
            </div>
            <div className="font-mono text-xs font-bold text-[#1E293B]">
              07 / ACHIEVEMENTS
            </div>
          </div>

          <div className="pt-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h2 className="font-serif italic text-3xl sm:text-4xl text-[#B45309]">
                  Achievements
                </h2>
                <p className="text-sm font-sans text-[#475569] max-w-2xl mt-1">
                  Recognitions, active open-source contributions (GSSoC), public speaking engagements, and institutional honors.
                </p>
              </div>

              <div className="font-hand font-bold text-base text-[#B45309] bg-[#FEF3C7] border border-[#FCD34D] px-3.5 py-1 rounded-full shadow-sticker self-start sm:self-auto">
                ✦ Honors & Open Source
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12 font-mono text-xs text-[#64748B]">
                LOADING ACHIEVEMENTS...
              </div>
            ) : achievements.length === 0 ? (
              <div className="text-center py-12 font-mono text-xs border-2 border-dashed border-[#CBD5E1] rounded-2xl text-[#64748B]">
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
                      className="bg-[#FEF3C7] border-2 border-[#FCD34D] rounded-2xl p-6 flex flex-col justify-between group shadow-sticker"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-white text-[#B45309] border border-[#FCD34D]">
                            {item.category || 'MILESTONE'}
                          </span>
                          {item.date && (
                            <span className="text-[10px] font-mono font-bold text-[#D97706]">
                              {item.date}
                            </span>
                          )}
                        </div>

                        <h3 className="font-serif font-bold text-lg text-[#1E293B] group-hover:text-[#B45309] transition-colors">
                          {item.title}
                        </h3>

                        {item.organization && (
                          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#D97706]">
                            {item.organization}
                          </h4>
                        )}

                        {item.description && (
                          <p className="text-xs font-sans text-[#475569] leading-relaxed bg-white/80 p-3 rounded-xl border border-white">
                            {item.description}
                          </p>
                        )}
                      </div>

                      {/* Certificate Action (Hidden if no certificate exists) */}
                      {hasCertificate && (
                        <div className="pt-4 mt-4 border-t border-[#FCD34D]/50 flex items-center justify-end">
                          <button
                            onClick={() =>
                              setSelectedCert({
                                url: item.certificateUrl!,
                                title: item.title,
                              })
                            }
                            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#1E293B] hover:text-[#B45309] hover:underline"
                          >
                            <span>View Certificate</span>
                            <ExternalLink className="w-3.5 h-3.5 text-[#B45309]" />
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
