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
        <div className="editorial-panel-hackathons">
          
          {/* Section Marker */}
          <div className="flex items-center gap-3 pb-6 border-b border-[#ECCDC5] font-mono text-xs uppercase tracking-widest text-[#6E625A]">
            <span className="text-[#9E4933] font-bold">06 /</span>
            <span>FIELD NOTES & HACKATHONS</span>
          </div>

          <div className="pt-8 space-y-6">
            <h2 className="font-serif italic text-3xl sm:text-4xl text-[#9E4933]">
              Hackathons
            </h2>

            <p className="text-sm font-sans text-[#473B35] max-w-2xl">
              Competitive innovation sprints, rapid prototyping, and high-intensity coding competitions.
            </p>

            {loading ? (
              <div className="text-center py-12 font-mono text-xs text-[#6E625A]">
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
                      className="editorial-card-peach p-6 flex flex-col justify-between group"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="editorial-tag text-[9px] bg-[#FAF7F2]">COMPETITIVE SPRINT</span>
                          {hack.date && (
                            <span className="text-[10px] font-mono text-[#9E4933]">
                              {hack.date}
                            </span>
                          )}
                        </div>

                        <div className="space-y-1">
                          <h3 className="font-serif font-bold text-xl text-[#2B2522] group-hover:text-[#9E4933] transition-colors">
                            {hack.name}
                          </h3>
                          {hack.organizer && (
                            <h4 className="font-mono text-xs uppercase text-[#9E4933]">
                              ORGANIZER: {hack.organizer}
                            </h4>
                          )}
                        </div>

                        {hack.projectName && (
                          <div className="p-3 border border-[#ECCDC5] bg-[#FAF7F2] rounded-xl text-xs font-mono">
                            <span className="text-[#6E625A] uppercase block text-[10px]">BUILD:</span>
                            <span className="font-bold text-[#2B2522]">{hack.projectName}</span>
                          </div>
                        )}

                        {hack.description && (
                          <p className="text-xs font-sans text-[#473B35] leading-relaxed">
                            {hack.description}
                          </p>
                        )}
                      </div>

                      <div className="pt-4 mt-6 border-t border-[#ECCDC5] flex items-center justify-between">
                        {hack.result ? (
                          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#9E4933]">
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
                            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#2B2522] hover:text-[#9E4933] hover:underline"
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
