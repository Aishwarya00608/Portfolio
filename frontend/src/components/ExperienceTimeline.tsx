import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Internship } from '../types';
import { CertificateViewerModal } from './CertificateViewerModal';
import { ExternalLink, Award } from 'lucide-react';

interface ExperienceTimelineProps {
  internships: Internship[];
  loading?: boolean;
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ internships, loading }) => {
  const [selectedCert, setSelectedCert] = useState<{ url: string; title: string } | null>(null);

  return (
    <section id="experience" className="py-20 border-b border-[#1C1B1A]/20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 pb-4 border-b border-[#1C1B1A]/20 mb-8">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#A63A24]">
            SECTION N° 04
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1B1A]">
            Where I've Worked & Internships
          </h2>
        </div>

        <p className="text-sm font-sans text-[#1C1B1A]/70 max-w-2xl mb-12">
          Applied engineering engagements in artificial intelligence, natural language search analytics, and enterprise Generative AI systems.
        </p>

        {loading ? (
          <div className="text-center py-12 font-mono text-xs text-[#1C1B1A]/60">
            LOADING EXPERIENCE LOG...
          </div>
        ) : internships.length === 0 ? (
          <div className="text-center py-12 font-mono text-xs border border-dashed border-[#1C1B1A]/20">
            NO EXPERIENCE RECORDS FOUND.
          </div>
        ) : (
          <div className="space-y-8">
            {internships.map((item, idx) => {
              const dateDisplay =
                item.company.toLowerCase().includes('flyrank')
                  ? 'July 2026 – September 2026'
                  : `${item.startDate} – ${item.endDate}`;

              const hasCertificate = Boolean(item.certificateUrl && item.certificateUrl.trim() !== '');

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="editorial-card p-6 sm:p-8"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    {/* Role & Company Header */}
                    <div className="lg:col-span-4 space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#1C1B1A]/50 block">
                        {dateDisplay} • {item.location || 'REMOTE'}
                      </span>
                      <h3 className="font-serif font-bold text-2xl text-[#1C1B1A]">
                        {item.role}
                      </h3>
                      <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#A63A24]">
                        {item.company}
                      </h4>
                    </div>

                    {/* Description & Deliverables */}
                    <div className="lg:col-span-8 space-y-4">
                      <p className="text-sm font-sans text-[#1C1B1A]/80 leading-relaxed">
                        {item.description}
                      </p>

                      {item.achievements && (
                        <div className="p-4 border-l-2 border-[#1C1B1A] bg-[#FAF8F5] text-xs font-sans text-[#1C1B1A]/80">
                          <strong className="font-mono uppercase text-[10px] tracking-widest block text-[#1C1B1A]/60 mb-1">
                            KEY CAPSTONE / DELIVERABLE
                          </strong>
                          {item.achievements}
                        </div>
                      )}

                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {(item.technologiesList || []).map((tech) => (
                          <span key={tech} className="editorial-tag">
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Certificate Viewing Button */}
                      {hasCertificate && (
                        <div className="pt-2">
                          <button
                            onClick={() =>
                              setSelectedCert({
                                url: item.certificateUrl!,
                                title: `${item.role} - ${item.company}`,
                              })
                            }
                            className="btn-editorial-secondary text-xs"
                          >
                            <Award className="w-3.5 h-3.5" />
                            <span>VIEW CERTIFICATE</span>
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
