import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Achievement } from '../types';
import { CertificateViewerModal } from './CertificateViewerModal';
import { PixelStar, PixelTrophy } from './pixel/PixelDecorations';
import { playSelectSound } from '../utils/sound';

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
    <section id="achievements" className="py-16 border-b-4 border-[#2A2650]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Level Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 p-3 bg-[#121026] border-4 border-black shadow-[4px_4px_0px_0px_#000] font-pixel text-xs">
          <div className="flex items-center gap-2 text-[#F59E0B]">
            <span>LEVEL 07</span>
            <span className="text-[#8B8BAE]">•</span>
            <span className="text-[#FFD700]">ACHIEVEMENT ROOM</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-[#00FF66]">
            <PixelStar size={16} /> UNLOCKED: {achievements.length}
          </div>
        </div>

        <p className="font-pixel text-xs text-[#E0E7FF] max-w-3xl mb-8 leading-relaxed">
          SPECIAL RECOGNITIONS, OPEN-SOURCE CONTRIBUTIONS (GSSOC), PUBLIC SPEAKING, AND INSTITUTIONAL HONORS.
        </p>

        {loading ? (
          <div className="text-center py-12 font-pixel text-xs text-[#00FF66] animate-pulse">
            LOADING ACHIEVEMENTS...
          </div>
        ) : achievements.length === 0 ? (
          <div className="text-center py-12 font-pixel text-xs border-4 border-dashed border-[#2A2650] text-[#8B8BAE]">
            NO ACHIEVEMENTS UNLOCKED YET.
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
                  className="pixel-card p-6 bg-[#121026] flex flex-col justify-between group hover:border-[#F59E0B]"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b-2 border-black font-pixel text-[10px]">
                      <span className="text-[#F59E0B] flex items-center gap-1">
                        <PixelStar size={14} /> ACHIEVEMENT UNLOCKED
                      </span>
                      {item.date && <span className="text-[#8B8BAE]">{item.date}</span>}
                    </div>

                    <h3 className="font-pixel text-sm text-[#FFD700] leading-snug group-hover:text-[#00FF66] transition-colors">
                      {item.title}
                    </h3>

                    {item.organization && (
                      <h4 className="font-pixel text-xs text-[#00F0FF] uppercase">
                        {item.organization}
                      </h4>
                    )}

                    {item.description && (
                      <p className="text-xs text-[#E0E7FF] font-sans leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Certificate Action (Hidden if no certificate exists) */}
                  {hasCertificate && (
                    <div className="pt-4 mt-4 border-t-2 border-black flex items-center justify-end font-pixel text-[10px]">
                      <button
                        onClick={() => {
                          playSelectSound();
                          setSelectedCert({
                            url: item.certificateUrl!,
                            title: item.title,
                          });
                        }}
                        className="btn-pixel-gold py-1 px-3 text-[9px]"
                      >
                        <PixelTrophy size={12} />
                        <span>VIEW CERTIFICATE</span>
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
