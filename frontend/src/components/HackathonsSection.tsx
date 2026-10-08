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
    <section id="hackathons" className="py-20 border-b border-[#1C1B1A]/20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 pb-4 border-b border-[#1C1B1A]/20 mb-8">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#A63A24]">
            SECTION N° 06
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1B1A]">
            Field Notes & Hackathons
          </h2>
        </div>

        <p className="text-sm font-sans text-[#1C1B1A]/70 max-w-2xl mb-12">
          Competitive innovation sprints, rapid prototyping, and high-intensity coding competitions.
        </p>

        {loading ? (
          <div className="text-center py-12 font-mono text-xs text-[#1C1B1A]/60">
            LOADING HACKATHONS LOG...
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
                  className="editorial-card p-6 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="editorial-tag">COMPETITIVE SPRINT</span>
                      {hack.date && (
                        <span className="text-[10px] font-mono text-[#1C1B1A]/50">
                          {hack.date}
                        </span>
                      )}
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-serif font-bold text-xl text-[#1C1B1A] group-hover:text-[#A63A24] transition-colors">
                        {hack.name}
                      </h3>
                      {hack.organizer && (
                        <h4 className="font-mono text-xs uppercase text-[#1C1B1A]/60">
                          ORGANIZER: {hack.organizer}
                        </h4>
                      )}
                    </div>

                    {hack.projectName && (
                      <div className="p-3 border border-[#1C1B1A]/15 bg-[#FAF8F5] text-xs font-mono">
                        <span className="text-[#1C1B1A]/50 uppercase block text-[10px]">BUILD:</span>
                        <span className="font-bold text-[#1C1B1A]">{hack.projectName}</span>
                      </div>
                    )}

                    {hack.description && (
                      <p className="text-xs font-sans text-[#1C1B1A]/75 leading-relaxed">
                        {hack.description}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 mt-6 border-t border-[#1C1B1A]/15 flex items-center justify-between">
                    {hack.result ? (
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#A63A24]">
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
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#1C1B1A] hover:underline"
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
