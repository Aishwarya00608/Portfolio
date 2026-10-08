import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Internship } from '../types';
import { CertificateViewerModal } from './CertificateViewerModal';
import { PixelGem, PixelTrophy } from './pixel/PixelDecorations';
import { playSelectSound } from '../utils/sound';

interface ExperienceTimelineProps {
  internships: Internship[];
  loading?: boolean;
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ internships, loading }) => {
  const [selectedCert, setSelectedCert] = useState<{ url: string; title: string } | null>(null);

  return (
    <section id="experience" className="py-16 border-b-4 border-[#2A2650]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 p-3 bg-[#121026] border-4 border-black shadow-[4px_4px_0px_0px_#000] font-pixel text-xs">
          <div className="flex items-center gap-2 text-[#FFD700]">
            <span>LEVEL 04</span>
            <span className="text-[#8B8BAE]">•</span>
            <span className="text-[#00FF66]">QUEST LOG & EXPERIENCE</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-[#00F0FF]">
            <PixelGem size={16} /> QUESTS COMPLETED: {internships.length}
          </div>
        </div>

        <p className="font-pixel text-xs text-[#E0E7FF] max-w-3xl mb-8 leading-relaxed">
          CHRONOLOGICAL LOG OF COMPLETED PROFESSIONAL QUESTS AND ENGAGEMENTS IN AI, ML, AND FULL-STACK SYSTEMS.
        </p>

        {loading ? (
          <div className="text-center py-12 font-pixel text-xs text-[#00FF66] animate-pulse">
            LOADING QUEST LOG...
          </div>
        ) : internships.length === 0 ? (
          <div className="text-center py-12 font-pixel text-xs border-4 border-dashed border-[#2A2650] text-[#8B8BAE]">
            NO COMPLETED QUESTS FOUND.
          </div>
        ) : (
          <div className="space-y-6">
            {internships.map((item, idx) => {
              const dateDisplay =
                item.company.toLowerCase().includes('flyrank')
                  ? 'JUL 2026 – SEP 2026'
                  : `${item.startDate} – ${item.endDate}`;

              const hasCertificate = Boolean(item.certificateUrl && item.certificateUrl.trim() !== '');

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="pixel-card p-6 bg-[#121026] hover:border-[#00FF66]"
                >
                  {/* Quest Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b-2 border-black font-pixel text-xs">
                    <div className="flex items-center gap-2 text-[#00FF66]">
                      <span className="bg-[#0A0817] px-2 py-1 border border-black text-[#FF2E93]">
                        QUEST {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[#FFD700]">QUEST COMPLETED</span>
                    </div>
                    <span className="text-[#00F0FF] text-[10px]">
                      {dateDisplay} • {item.location ? item.location.toUpperCase() : 'REMOTE'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Quest Title Info */}
                    <div className="lg:col-span-4 space-y-2">
                      <h3 className="font-pixel text-base text-[#FFD700] leading-snug">
                        {item.role}
                      </h3>
                      <h4 className="font-pixel text-xs text-[#00FF66] uppercase">
                        {item.company}
                      </h4>
                    </div>

                    {/* Quest Details & Deliverables */}
                    <div className="lg:col-span-8 space-y-4">
                      <p className="text-sm text-[#E0E7FF] leading-relaxed font-sans">
                        {item.description}
                      </p>

                      {item.achievements && (
                        <div className="p-3 bg-[#0A0817] border-l-4 border-[#FF2E93] text-xs font-sans text-[#E0E7FF] space-y-1">
                          <strong className="font-pixel text-[9px] text-[#FFD700] block uppercase">
                            REWARD / KEY CAPSTONE DELIVERABLE:
                          </strong>
                          <p>{item.achievements}</p>
                        </div>
                      )}

                      {/* Tech Stack Badges */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {(item.technologiesList || []).map((tech) => (
                          <span
                            key={tech}
                            className="font-pixel text-[9px] bg-[#1E1A3C] text-[#00F0FF] border border-black px-2 py-0.5"
                          >
                            +{tech}
                          </span>
                        ))}
                      </div>

                      {/* Certificate Viewing Button */}
                      {hasCertificate && (
                        <div className="pt-2">
                          <button
                            onClick={() => {
                              playSelectSound();
                              setSelectedCert({
                                url: item.certificateUrl!,
                                title: `${item.role} - ${item.company}`,
                              });
                            }}
                            className="btn-pixel-gold text-[10px] py-1.5 px-3"
                          >
                            <PixelTrophy size={14} />
                            <span>VIEW QUEST CERTIFICATE</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
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
