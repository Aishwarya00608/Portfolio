import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Certification } from '../types';
import { CertificateViewerModal } from './CertificateViewerModal';
import { PixelTrophy, PixelStar } from './pixel/PixelDecorations';
import { playSelectSound } from '../utils/sound';

interface CertificationsSectionProps {
  certifications: Certification[];
  loading?: boolean;
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  certifications,
  loading,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCert, setSelectedCert] = useState<{ url: string; title: string } | null>(null);

  const categories = ['All', 'AI / ML', 'Data', 'Programming', 'Development', 'Business', 'Other'];

  const filteredCerts =
    selectedCategory === 'All'
      ? certifications
      : certifications.filter((c) => c.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section id="certifications" className="py-16 border-b-4 border-[#2A2650]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Level Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 p-3 bg-[#121026] border-4 border-black shadow-[4px_4px_0px_0px_#000] font-pixel text-xs">
          <div className="flex items-center gap-2 text-[#A855F7]">
            <span>LEVEL 05</span>
            <span className="text-[#8B8BAE]">•</span>
            <span className="text-[#FFD700]">CERTIFICATION CENTER & TROPHY ROOM</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-[#00FF66]">
            <PixelTrophy size={16} /> TROPHIES: {certifications.length}
          </div>
        </div>

        <p className="font-pixel text-xs text-[#E0E7FF] max-w-3xl mb-8 leading-relaxed">
          VERIFIED TROPHIES AND INDUSTRY CREDENTIALS UNLOCKED FROM GOOGLE, IBM, CISCO, SIMPLILEARN, ANTHROPIC, AND THINKQBATOR.
        </p>

        {/* Category Filter Tags */}
        <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b-2 border-[#2A2650]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playSelectSound();
                setSelectedCategory(cat);
              }}
              className={`font-pixel text-[10px] uppercase px-3 py-2 border-2 border-black shadow-[2px_2px_0px_#000] transition-all ${
                selectedCategory.toLowerCase() === cat.toLowerCase()
                  ? 'bg-[#FF2E93] text-white border-black shadow-[3px_3px_0px_#000]'
                  : 'bg-[#1E1A3C] text-[#00F0FF] hover:bg-[#25204C] hover:text-[#00FF66]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Trophy Cards Grid */}
        {loading ? (
          <div className="text-center py-12 font-pixel text-xs text-[#00FF66] animate-pulse">
            LOADING TROPHY ROOM...
          </div>
        ) : filteredCerts.length === 0 ? (
          <div className="text-center py-12 font-pixel text-xs border-4 border-dashed border-[#2A2650] text-[#8B8BAE]">
            NO TROPHIES RECORDED IN THIS CATEGORY.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCerts.map((cert, idx) => {
              const certTargetUrl = cert.certificateUrl || cert.credentialUrl;

              return (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="pixel-card p-6 bg-[#121026] flex flex-col justify-between group hover:border-[#FFD700]"
                >
                  <div className="space-y-4">
                    {/* Trophy Top Banner */}
                    <div className="flex items-center justify-between pb-3 border-b-2 border-black font-pixel text-[10px]">
                      <span className="text-[#FFD700] flex items-center gap-1">
                        <PixelTrophy size={14} /> TROPHY UNLOCKED
                      </span>
                      <span className="text-[#00F0FF] bg-[#0A0817] px-2 py-0.5 border border-black uppercase">
                        {cert.category}
                      </span>
                    </div>

                    <h3 className="font-pixel text-sm text-[#FFD700] leading-snug group-hover:text-[#00FF66] transition-colors">
                      {cert.name}
                    </h3>

                    <h4 className="font-pixel text-xs text-[#00FF66] uppercase">
                      ISSUED BY: {cert.organization}
                    </h4>

                    {cert.description && (
                      <p className="text-xs text-[#E0E7FF] leading-relaxed font-sans">
                        {cert.description}
                      </p>
                    )}
                  </div>

                  {/* View Certificate Action */}
                  <div className="pt-4 mt-4 border-t-2 border-black flex items-center justify-between font-pixel text-[10px]">
                    <span className="text-[#00FF66] flex items-center gap-1">
                      <PixelStar size={12} /> VERIFIED
                    </span>
                    {certTargetUrl ? (
                      <button
                        onClick={() => {
                          playSelectSound();
                          setSelectedCert({
                            url: certTargetUrl,
                            title: `${cert.name} - ${cert.organization}`,
                          });
                        }}
                        className="btn-pixel-gold py-1.5 px-3 text-[10px]"
                      >
                        <span>VIEW CERTIFICATE</span>
                      </button>
                    ) : (
                      <span className="text-[#8B8BAE]">N/A</span>
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
