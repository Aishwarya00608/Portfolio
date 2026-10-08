import React, { useState } from 'react';
import { getCertificateViewUrl } from '../services/api';
import { X, ExternalLink, Award } from 'lucide-react';

interface CertificateViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  certificateUrl: string | null | undefined;
}

export const CertificateViewerModal: React.FC<CertificateViewerModalProps> = ({
  isOpen,
  onClose,
  title,
  certificateUrl,
}) => {
  const [loading, setLoading] = useState(true);

  if (!isOpen || !certificateUrl) return null;

  const viewUrl = getCertificateViewUrl(certificateUrl);

  const isPdf =
    certificateUrl.toLowerCase().includes('.pdf') ||
    certificateUrl.toLowerCase().includes('/raw/upload/') ||
    !certificateUrl.match(/\.(png|jpg|jpeg|webp)$/i);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn font-sans">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white border border-[#1C1B1A] shadow-editorial-hover flex flex-col overflow-hidden">
        {/* Editorial Title Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#FAF8F5] border-b border-[#1C1B1A]/20">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#A63A24]" />
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#1C1B1A] line-clamp-1">
              VERIFIED CREDENTIAL: {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 border border-[#1C1B1A]/30 hover:border-[#1C1B1A] text-[#1C1B1A] hover:bg-[#F4F0E8] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Certificate Display Window */}
        <div className="relative flex-1 min-h-[450px] bg-[#FAF8F5] p-3 overflow-auto flex items-center justify-center">
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#FAF8F5] z-10 font-mono text-xs text-[#1C1B1A]/60">
              <div className="w-8 h-8 border-2 border-[#1C1B1A] border-t-transparent animate-spin mb-3" />
              <p className="tracking-widest">LOADING CERTIFICATE FILE...</p>
            </div>
          )}

          {isPdf ? (
            <iframe
              src={viewUrl}
              title={`Certificate - ${title}`}
              className="w-full h-[65vh] border border-[#1C1B1A]/20 bg-white"
              onLoad={() => setLoading(false)}
            />
          ) : (
            <img
              src={viewUrl}
              alt={`Certificate for ${title}`}
              className="max-w-full max-h-[65vh] object-contain border border-[#1C1B1A]/20 shadow-editorial"
              onLoad={() => setLoading(false)}
              onError={() => setLoading(false)}
            />
          )}
        </div>

        {/* Footer Bar */}
        <div className="flex items-center justify-between px-6 py-3 bg-[#FAF8F5] border-t border-[#1C1B1A]/20 font-mono text-[10px] uppercase tracking-widest text-[#1C1B1A]/70">
          <span>MODE: INLINE PREVIEW (APPLICATION/PDF)</span>
          <a
            href={viewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-bold text-[#A63A24] hover:underline"
          >
            <span>OPEN ORIGINAL IN TAB</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
