import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Certification } from '../types';
import { CertificateViewerModal } from './CertificateViewerModal';
import { ExternalLink, Award } from 'lucide-react';

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
        
        {/* Certifications Window */}
        <div className="bg-[#FAF7F2] border-2 border-[#CBD5E1] rounded-3xl p-6 sm:p-10 shadow-window relative overflow-hidden">
          
          {/* Window Header */}
          <div className="flex items-center justify-between pb-6 border-b border-[#CBD5E1] font-mono text-xs text-[#64748B]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
              <span className="bg-[#FCE7F3] border border-[#F472B6] text-[#BE185D] px-3 py-0.5 rounded-full font-bold text-[10px] ml-2">
                verified_credentials.cert
              </span>
            </div>
            <div className="font-mono text-xs font-bold text-[#1E293B]">
              05 / CERTIFICATIONS
            </div>
          </div>

          <div className="pt-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h2 className="font-serif italic text-3xl sm:text-4xl text-[#BE185D]">
                  Certifications
                </h2>
                <p className="text-sm font-sans text-[#475569] max-w-2xl mt-1">
                  Industry credentials and verified certifications from Google, IBM, Cisco, Simplilearn, Anthropic, and ThinkQbator.
                </p>
              </div>

              <div className="font-hand font-bold text-base text-[#BE185D] bg-[#FCE7F3] border border-[#F472B6] px-3.5 py-1 rounded-full shadow-sticker self-start sm:self-auto">
                ✦ Verified Badges & PDFs
              </div>
            </div>

            {/* Category Filter Tags */}
            <div className="flex flex-wrap gap-2 pb-6 border-b border-[#CBD5E1]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-[10px] font-mono font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full border transition-all ${
                    selectedCategory.toLowerCase() === cat.toLowerCase()
                      ? 'bg-[#BE185D] text-white border-[#BE185D] shadow-sm'
                      : 'border-[#CBD5E1] bg-white text-[#64748B] hover:border-[#BE185D] hover:text-[#BE185D]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Certifications Grid */}
            {loading ? (
              <div className="text-center py-12 font-mono text-xs text-[#64748B]">
                LOADING CERTIFICATIONS INDEX...
              </div>
            ) : filteredCerts.length === 0 ? (
              <div className="text-center py-12 font-mono text-xs border-2 border-dashed border-[#CBD5E1] rounded-2xl text-[#64748B]">
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
                      className="bg-[#FCE7F3] border-2 border-[#F472B6] rounded-2xl p-6 flex flex-col justify-between group shadow-sticker"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-white text-[#BE185D] border border-[#F472B6]">
                            {cert.category}
                          </span>
                          {cert.issueDate && (
                            <span className="text-[10px] font-mono font-bold text-[#BE185D]">
                              {cert.issueDate}
                            </span>
                          )}
                        </div>

                        <h3 className="font-serif font-bold text-lg text-[#1E293B] group-hover:text-[#BE185D] transition-colors">
                          {cert.name}
                        </h3>

                        <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#9D174D]">
                          {cert.organization}
                        </h4>

                        {cert.description && (
                          <p className="text-xs font-sans text-[#475569] leading-relaxed bg-white/80 p-3 rounded-xl border border-white">
                            {cert.description}
                          </p>
                        )}
                      </div>

                      {/* View Certificate Action Button (Only shown if certificate exists) */}
                      <div className="pt-4 mt-4 border-t border-[#F472B6]/40 flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#BE185D]">
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
                            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#1E293B] hover:text-[#BE185D] hover:underline"
                          >
                            <span>View Certificate</span>
                            <ExternalLink className="w-3.5 h-3.5 text-[#BE185D]" />
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
