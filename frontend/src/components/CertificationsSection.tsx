import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Certification } from '../types';
import { CertificateViewerModal } from './CertificateViewerModal';
import { ExternalLink } from 'lucide-react';

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
    <section id="certifications" className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Certifications Panel */}
        <div className="editorial-panel-certifications">
          
          {/* Section Marker */}
          <div className="flex items-center gap-3 pb-6 border-b border-[#ECCECE] font-mono text-xs uppercase tracking-widest text-[#6E625A]">
            <span className="text-[#945353] font-bold">05 /</span>
            <span>VERIFIED CERTIFICATIONS & CREDENTIALS</span>
          </div>

          <div className="pt-8 space-y-6">
            <h2 className="font-serif italic text-3xl sm:text-4xl text-[#945353]">
              Credentials
            </h2>

            <p className="text-sm font-sans text-[#473B35] max-w-2xl">
              Industry credentials and verified certifications from Google, IBM, Cisco, Simplilearn, Anthropic, and ThinkQbator.
            </p>

            {/* Category Filter Tags */}
            <div className="flex flex-wrap gap-2 pb-6 border-b border-[#ECCECE]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-[10px] font-mono font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full border transition-all ${
                    selectedCategory.toLowerCase() === cat.toLowerCase()
                      ? 'bg-[#2B2522] text-[#FAF7F2] border-[#2B2522]'
                      : 'border-[#DDBABA] bg-[#F7EBEB] text-[#703A3A] hover:border-[#2B2522]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Certifications Grid */}
            {loading ? (
              <div className="text-center py-12 font-mono text-xs text-[#6E625A]">
                LOADING CERTIFICATIONS INDEX...
              </div>
            ) : filteredCerts.length === 0 ? (
              <div className="text-center py-12 font-mono text-xs border border-dashed border-[#ECCECE] rounded-2xl text-[#6E625A]">
                NO CERTIFICATIONS RECORDED IN THIS CATEGORY.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                {filteredCerts.map((cert, idx) => {
                  const certTargetUrl = cert.certificateUrl || cert.credentialUrl;
                  const hasCertificate = Boolean(certTargetUrl && certTargetUrl.trim() !== '');

                  return (
                    <motion.div
                      key={cert.id}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.08 }}
                      className="editorial-card-pink p-6 flex flex-col justify-between group"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="editorial-tag-pink text-[9px] px-2 py-0.5">{cert.category}</span>
                          {cert.issueDate && (
                            <span className="text-[10px] font-mono text-[#945353]">
                              {cert.issueDate}
                            </span>
                          )}
                        </div>

                        <h3 className="font-serif font-bold text-lg text-[#2B2522] group-hover:text-[#945353] transition-colors">
                          {cert.name}
                        </h3>

                        <h4 className="font-mono text-xs uppercase tracking-wider text-[#945353]">
                          {cert.organization}
                        </h4>

                        {cert.description && (
                          <p className="text-xs font-sans text-[#473B35] leading-relaxed">
                            {cert.description}
                          </p>
                        )}
                      </div>

                      {/* View Certificate Action Button (Only shown if certificate exists) */}
                      <div className="pt-4 mt-4 border-t border-[#E2CDCD] flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#945353] font-bold">
                          ✓ VERIFIED
                        </span>
                        {hasCertificate && (
                          <button
                            onClick={() =>
                              setSelectedCert({
                                url: certTargetUrl!,
                                title: `${cert.name} - ${cert.organization}`,
                              })
                            }
                            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#2B2522] hover:text-[#945353] hover:underline"
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
