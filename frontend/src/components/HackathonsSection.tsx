import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Hackathon } from '../types';
import { CertificateViewerModal } from './CertificateViewerModal';
import { ExternalLink, Terminal } from 'lucide-react';

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
        
        {/* Hackathons Window */}
        <div className="bg-[#FAF7F2] border-2 border-[#CBD5E1] rounded-3xl p-6 sm:p-10 shadow-window relative overflow-hidden">
          
          {/* Section Marker */}
          <div className="flex items-center justify-between pb-6 border-b border-[#CBD5E1] font-mono text-xs text-[#64748B]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
              <span className="bg-[#FFEDD5] border border-[#FDBA74] text-[#C2410C] px-3 py-0.5 rounded-full font-bold text-[10px] ml-2">
                hackathon_sprints.log
              </span>
            </div>
            <div className="font-mono text-xs font-bold text-[#1E293B]">
              06 / HACKATHONS
            </div>
          </div>

          <div className="pt-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h2 className="font-serif italic text-3xl sm:text-4xl text-[#C2410C]">
                  Hackathons
                </h2>
                <p className="text-sm font-sans text-[#475569] max-w-2xl mt-1">
                  Competitive innovation sprints, rapid prototyping, and high-intensity coding competitions.
                </p>
              </div>

              <div className="font-hand font-bold text-base text-[#C2410C] bg-[#FFEDD5] border border-[#FDBA74] px-3.5 py-1 rounded-full shadow-sticker self-start sm:self-auto">
                ✦ Rapid Prototyping Sprints
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12 font-mono text-xs text-[#64748B]">
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
                      className="bg-[#FFEDD5] border-2 border-[#FDBA74] rounded-2xl p-6 flex flex-col justify-between group shadow-sticker"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-white text-[#EA580C] border border-[#FDBA74]">
                            COMPETITIVE SPRINT
                          </span>
                          {hack.date && (
                            <span className="text-[10px] font-mono font-bold text-[#EA580C]">
                              {hack.date}
                            </span>
                          )}
                        </div>

                        <div className="space-y-1">
                          <h3 className="font-serif font-bold text-xl text-[#1E293B] group-hover:text-[#EA580C] transition-colors">
                            {hack.name}
                          </h3>
                          {hack.organizer && (
                            <h4 className="font-mono text-xs font-bold uppercase text-[#C2410C]">
                              ORGANIZER: {hack.organizer}
                            </h4>
                          )}
                        </div>

                        {hack.projectName && (
                          <div className="p-3 border border-[#FDBA74] bg-white rounded-xl text-xs font-mono">
                            <span className="text-[#64748B] uppercase block text-[10px]">BUILD:</span>
                            <span className="font-bold text-[#1E293B]">{hack.projectName}</span>
                          </div>
                        )}

                        {hack.description && (
                          <p className="text-xs font-sans text-[#475569] leading-relaxed bg-white/80 p-3 rounded-xl border border-white">
                            {hack.description}
                          </p>
                        )}
                      </div>

                      <div className="pt-4 mt-6 border-t border-[#FDBA74]/50 flex items-center justify-between">
                        {hack.result ? (
                          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#EA580C]">
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
                            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#1E293B] hover:text-[#EA580C] hover:underline"
                          >
                            <span>View Certificate</span>
                            <ExternalLink className="w-3.5 h-3.5 text-[#EA580C]" />
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
