import React from 'react';
import { motion } from 'framer-motion';
import { Hackathon } from '../types';
import { ExternalLink } from 'lucide-react';
import { getCertificateViewUrl } from '../services/api';

interface HackathonsSectionProps {
  hackathons: Hackathon[];
  loading?: boolean;
}

export const HackathonsSection: React.FC<HackathonsSectionProps> = ({ hackathons, loading }) => {
  if (!loading && hackathons.length === 0) return null;

  const handleViewCert = (url?: string) => {
    if (!url) return;
    const viewUrl = getCertificateViewUrl(url);
    window.open(viewUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="hackathons" className="py-20 border-b border-[#1C1B1A]/15 dark:border-[#EAE7E1]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 pb-4 border-b border-[#1C1B1A]/20 dark:border-[#EAE7E1]/20 mb-8">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#1C1B1A]/60 dark:text-[#EAE7E1]/60">
            SECTION 06
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1B1A] dark:text-[#EAE7E1]">
            Hackathons & Coding Competitions
          </h2>
        </div>

        <p className="text-sm font-sans text-[#1C1B1A]/70 dark:text-[#EAE7E1]/70 max-w-2xl mb-12">
          Competitive innovation, rapid prototyping sprints, and high-intensity software hackathons.
        </p>

        {loading ? (
          <div className="text-center py-12 font-mono text-xs text-[#1C1B1A]/60 dark:text-[#EAE7E1]/60">
            LOADING HACKATHONS LOG...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hackathons.map((hack, idx) => {
              const certUrl = hack.certificateUrl || hack.projectUrl;

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
                        <span className="text-[10px] font-mono text-[#1C1B1A]/50 dark:text-[#EAE7E1]/50">
                          {hack.date}
                        </span>
                      )}
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-serif font-bold text-xl text-[#1C1B1A] dark:text-[#EAE7E1] group-hover:text-[#A63A24] dark:group-hover:text-amber-400 transition-colors">
                        {hack.name}
                      </h3>
                      {hack.organizer && (
                        <h4 className="font-mono text-xs uppercase text-[#1C1B1A]/60 dark:text-[#EAE7E1]/60">
                          {hack.organizer}
                        </h4>
                      )}
                    </div>

                    {hack.projectName && (
                      <div className="p-2 border border-[#1C1B1A]/15 dark:border-[#EAE7E1]/15 text-xs font-mono">
                        <span className="text-[#1C1B1A]/50 dark:text-[#EAE7E1]/50 uppercase block text-[10px]">BUILD:</span>
                        <span className="font-bold text-[#1C1B1A] dark:text-[#EAE7E1]">{hack.projectName}</span>
                      </div>
                    )}

                    {hack.description && (
                      <p className="text-xs font-sans text-[#1C1B1A]/75 dark:text-[#EAE7E1]/75 leading-relaxed">
                        {hack.description}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 mt-6 border-t border-[#1C1B1A]/15 dark:border-[#EAE7E1]/15 flex items-center justify-between">
                    {hack.result ? (
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        ★ {hack.result}
                      </span>
                    ) : <span />}

                    {/* View Certificate / Badge Button (Requirement 9) */}
                    {certUrl && (
                      <button
                        onClick={() => handleViewCert(certUrl)}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#1C1B1A] dark:text-[#EAE7E1] hover:underline"
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
    </section>
  );
};
