import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Hackathon } from '../types';
import { CertificateViewerModal } from './CertificateViewerModal';
import { ExternalLink } from 'lucide-react';

interface HackathonsSectionProps {
  hackathons: Hackathon[];
  loading?: boolean;
}

export const HackathonsSection: React.FC<HackathonsSectionProps> = ({ hackathons, loading }) => {
  const [selectedCert, setSelectedCert] = useState<{ url: string; title: string } | null>(null);

  if (!loading && hackathons.length === 0) return null;

  return (
    <section id="hackathons" className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hackathons Panel */}
        <div className="black-panel">
          
          {/* Section Marker */}
          <div className="flex items-center gap-3 pb-6 border-b border-[#262626] font-mono text-xs uppercase tracking-widest text-[#A0A0A0]">
            <span className="text-white font-bold">06 /</span>
            <span>FIELD NOTES & HACKATHONS</span>
          </div>

          <div className="pt-8 space-y-6">
            <h2 className="font-serif italic text-3xl sm:text-4xl text-white">
              Hackathons
            </h2>

            <p className="text-sm font-sans text-[#D5D5D5] max-w-2xl">
              Competitive innovation sprints, rapid prototyping, and high-intensity coding competitions.
            </p>

            {loading ? (
              <div className="text-center py-12 font-mono text-xs text-[#A0A0A0]">
                LOADING HACKATHONS LOG...
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
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
                      className="black-card p-6 flex flex-col justify-between group"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="black-tag text-[9px]">COMPETITIVE SPRINT</span>
                          {hack.date && (
                            <span className="text-[10px] font-mono text-[#A0A0A0]">
                              {hack.date}
                            </span>
                          )}
                        </div>

                        <div className="space-y-1">
                          <h3 className="font-serif font-bold text-xl text-white group-hover:text-[#A0A0A0] transition-colors">
                            {hack.name}
                          </h3>
                          {hack.organizer && (
                            <h4 className="font-mono text-xs uppercase text-[#A0A0A0]">
                              ORGANIZER: {hack.organizer}
                            </h4>
                          )}
                        </div>

                        {hack.projectName && (
                          <div className="p-3 border border-[#262626] bg-[#141414] rounded-xl text-xs font-mono">
                            <span className="text-[#A0A0A0] uppercase block text-[10px]">BUILD:</span>
                            <span className="font-bold text-white">{hack.projectName}</span>
                          </div>
                        )}

                        {hack.description && (
                          <p className="text-xs font-sans text-[#D5D5D5] leading-relaxed">
                            {hack.description}
                          </p>
                        )}
                      </div>

                      <div className="pt-4 mt-6 border-t border-[#262626] flex items-center justify-between">
                        {hack.result ? (
                          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#A0A0A0]">
                            ★ RESULT: {hack.result}
                          </span>
                        ) : <span />}

                        {/* View Certificate Action */}
                        {hasCert && (
                          <button
                            onClick={() =>
                              setSelectedCert({
                                url: certUrl!,
                                title: `${hack.name} - ${hack.result || 'Certificate'}`,
                              })
                            }
                            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-white hover:underline"
                          >
                            <span>View Certificate</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
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
