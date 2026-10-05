import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Certification, DOMAIN_CATEGORIES } from '../types';
import { ExternalLink } from 'lucide-react';
import { getCertificateViewUrl } from '../services/api';

interface CertificationsSectionProps {
  certifications: Certification[];
  loading?: boolean;
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({ certifications, loading }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'AI / ML', 'Data', 'Programming', 'Development', 'Business', 'Other'];

  const filteredCerts =
    selectedCategory === 'All'
      ? certifications
      : certifications.filter((c) => c.category.toLowerCase() === selectedCategory.toLowerCase());

  const handleViewCert = (url?: string) => {
    if (!url) return;
    const viewUrl = getCertificateViewUrl(url);
    window.open(viewUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="certifications" className="py-20 border-b border-[#1C1B1A]/15 dark:border-[#EAE7E1]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 pb-4 border-b border-[#1C1B1A]/20 dark:border-[#EAE7E1]/20 mb-8">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#1C1B1A]/60 dark:text-[#EAE7E1]/60">
            SECTION 05
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1B1A] dark:text-[#EAE7E1]">
            Verified Certifications & Credentials
          </h2>
        </div>

        <p className="text-sm font-sans text-[#1C1B1A]/70 dark:text-[#EAE7E1]/70 max-w-2xl mb-10">
          Industry credentials from Google, IBM, Cisco, Simplilearn, Anthropic, and ThinkQbator.
        </p>

        {/* Category Filter Tags */}
        <div className="flex flex-wrap gap-2 mb-12 pb-6 border-b border-[#1C1B1A]/15 dark:border-[#EAE7E1]/15">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-[11px] font-mono font-bold tracking-widest uppercase px-3.5 py-1.5 border transition-all ${
                selectedCategory.toLowerCase() === cat.toLowerCase()
                  ? 'bg-[#1C1B1A] text-[#FAF8F5] dark:bg-[#EAE7E1] dark:text-[#141312] border-[#1C1B1A] dark:border-[#EAE7E1]'
                  : 'border-[#1C1B1A]/20 dark:border-[#EAE7E1]/20 text-[#1C1B1A]/70 dark:text-[#EAE7E1]/70 hover:border-[#1C1B1A] dark:hover:border-[#EAE7E1]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Certifications Editorial Grid */}
        {loading ? (
          <div className="text-center py-12 font-mono text-xs text-[#1C1B1A]/60 dark:text-[#EAE7E1]/60">
            LOADING CERTIFICATIONS INDEX...
          </div>
        ) : filteredCerts.length === 0 ? (
          <div className="text-center py-12 font-mono text-xs border border-dashed border-[#1C1B1A]/20 dark:border-[#EAE7E1]/20">
            NO CERTIFICATIONS RECORDED IN THIS CATEGORY.
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
                  className="editorial-card p-6 flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="editorial-tag">{cert.category}</span>
                      {cert.issueDate && (
                        <span className="text-[10px] font-mono text-[#1C1B1A]/50 dark:text-[#EAE7E1]/50">
                          {cert.issueDate}
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif font-bold text-lg text-[#1C1B1A] dark:text-[#EAE7E1] group-hover:text-[#A63A24] dark:group-hover:text-amber-400 transition-colors">
                      {cert.name}
                    </h3>

                    <h4 className="font-mono text-xs uppercase tracking-wider text-[#1C1B1A]/70 dark:text-[#EAE7E1]/70">
                      {cert.organization}
                    </h4>

                    {cert.description && (
                      <p className="text-xs font-sans text-[#1C1B1A]/70 dark:text-[#EAE7E1]/70 leading-relaxed">
                        {cert.description}
                      </p>
                    )}
                  </div>

                  {/* View Certificate Button (Requirement 9) */}
                  <div className="pt-4 mt-4 border-t border-[#1C1B1A]/15 dark:border-[#EAE7E1]/15 flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                      ✓ VERIFIED CREDENTIAL
                    </span>
                    {certTargetUrl && (
                      <button
                        onClick={() => handleViewCert(certTargetUrl)}
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
