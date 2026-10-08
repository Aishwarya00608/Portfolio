import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Hackathon } from '../types';
import { CertificateViewerModal } from './CertificateViewerModal';
import { PixelSword, PixelTrophy } from './pixel/PixelDecorations';
import { playSelectSound } from '../utils/sound';

interface HackathonsSectionProps {
  hackathons: Hackathon[];
  loading?: boolean;
}

export const HackathonsSection: React.FC<HackathonsSectionProps> = ({ hackathons, loading }) => {
  const [selectedCert, setSelectedCert] = useState<{ url: string; title: string } | null>(null);

  if (!loading && hackathons.length === 0) return null;

  return (
    <section id="hackathons" className="py-16 border-b-4 border-[#2A2650]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Level Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 p-3 bg-[#121026] border-4 border-black shadow-[4px_4px_0px_0px_#000] font-pixel text-xs">
          <div className="flex items-center gap-2 text-[#EF4444]">
            <span>LEVEL 06</span>
            <span className="text-[#8B8BAE]">•</span>
            <span className="text-[#FFD700]">HACKATHON BATTLE ARENA</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-[#00FF66]">
            <PixelSword size={16} /> ARENAS: {hackathons.length}
          </div>
        </div>

        <p className="font-pixel text-xs text-[#E0E7FF] max-w-3xl mb-8 leading-relaxed">
          COMPETITIVE INNOVATION SPRINTS, HIGH-INTENSITY SOFTWARE BATTLES, AND PROTOTYPING ARENAS.
        </p>

        {loading ? (
          <div className="text-center py-12 font-pixel text-xs text-[#00FF66] animate-pulse">
            LOADING ARENA RECORDS...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hackathons.map((hack, idx) => {
              const certUrl = hack.certificateUrl || hack.projectUrl;
              const hasCert = Boolean(certUrl && certUrl.trim() !== '');

              return (
                <motion.div
                  key={hack.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="pixel-card p-6 bg-[#121026] flex flex-col justify-between group hover:border-[#EF4444]"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b-2 border-black font-pixel text-[10px]">
                      <span className="text-[#EF4444] flex items-center gap-1">
                        <PixelSword size={12} /> BATTLE ARENA
                      </span>
                      {hack.date && <span className="text-[#8B8BAE]">{hack.date}</span>}
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-pixel text-sm text-[#FFD700] leading-snug group-hover:text-[#00FF66] transition-colors">
                        {hack.name}
                      </h3>
                      {hack.organizer && (
                        <h4 className="font-pixel text-xs text-[#00F0FF] uppercase">
                          ORGANIZER: {hack.organizer}
                        </h4>
                      )}
                    </div>

                    {hack.projectName && (
                      <div className="p-3 bg-[#0A0817] border border-black font-pixel text-[10px] space-y-1">
                        <span className="text-[#8B8BAE] uppercase block">PROJECT BUILT:</span>
                        <span className="text-[#00FF66]">{hack.projectName}</span>
                      </div>
                    )}

                    {hack.description && (
                      <p className="text-xs text-[#E0E7FF] font-sans leading-relaxed">
                        {hack.description}
                      </p>
                    )}
                  </div>

                  {/* Result & Certificate Action */}
                  <div className="pt-4 mt-4 border-t-2 border-black flex flex-wrap items-center justify-between gap-2 font-pixel text-[10px]">
                    {hack.result ? (
                      <span className="text-[#FFD700] bg-[#1E1A3C] px-2 py-0.5 border border-black">
                        🏆 RESULT: {hack.result}
                      </span>
                    ) : <span />}

                    {hasCert && (
                      <button
                        onClick={() => {
                          playSelectSound();
                          setSelectedCert({
                            url: certUrl!,
                            title: `${hack.name} - ${hack.result || 'Certificate'}`,
                          });
                        }}
                        className="btn-pixel-gold py-1 px-2.5 text-[9px]"
                      >
                        <PixelTrophy size={12} />
                        <span>VIEW CERTIFICATE</span>
                      </button>
                    )}
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
