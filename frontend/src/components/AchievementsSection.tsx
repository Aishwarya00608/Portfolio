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
    <section id="achievements" className="py-20 border-b border-[#1C1B1A]/20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 pb-4 border-b border-[#1C1B1A]/20 mb-8">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#A63A24]">
            SECTION N° 07
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1B1A]">
            Milestones, Open Source & Honors
          </h2>
        </div>

        <p className="text-sm font-sans text-[#1C1B1A]/70 max-w-2xl mb-12">
          Recognitions, active open-source contributions (GSSoC), public speaking engagements, and institutional honors.
        </p>

        {loading ? (
          <div className="text-center py-12 font-mono text-xs text-[#1C1B1A]/60">
            LOADING ACHIEVEMENTS...
          </div>
        ) : achievements.length === 0 ? (
          <div className="text-center py-12 font-mono text-xs border border-dashed border-[#1C1B1A]/20">
            NO ACHIEVEMENTS RECORDED YET.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((item, idx) => {
              const hasCertificate = Boolean(item.certificateUrl && item.certificateUrl.trim() !== '');

              return (
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
                      {item.category ? (
                        <span className="editorial-tag">{item.category}</span>
                      ) : (
                        <span className="editorial-tag">MILESTONE</span>
                      )}
                      {item.date && (
                        <span className="text-[10px] font-mono text-[#1C1B1A]/50">
                          {item.date}
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif font-bold text-lg text-[#1C1B1A] group-hover:text-[#A63A24] transition-colors">
                      {item.title}
                    </h3>

                    {item.organization && (
                      <h4 className="font-mono text-xs uppercase tracking-wider text-[#1C1B1A]/70">
                        {item.organization}
                      </h4>
                    )}

                    {item.description && (
                      <p className="text-xs font-sans text-[#1C1B1A]/75 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Certificate Action (Hidden if no certificate exists) */}
                  {hasCertificate && (
                    <div className="pt-4 mt-4 border-t border-[#1C1B1A]/15 flex items-center justify-end">
                      <button
                        onClick={() =>
                          setSelectedCert({
                            url: item.certificateUrl!,
                            title: item.title,
                          })
                        }
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#1C1B1A] hover:underline"
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
