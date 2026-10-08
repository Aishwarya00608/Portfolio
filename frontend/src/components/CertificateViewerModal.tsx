import React, { useState } from 'react';
import { getCertificateViewUrl } from '../services/api';
import { playSelectSound } from '../utils/sound';

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

  const handleClose = () => {
    playSelectSound();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#121026] border-4 border-[#00FF66] shadow-[8px_8px_0px_0px_#000] flex flex-col overflow-hidden">
        {/* Retro Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#1E1A3C] border-b-4 border-black">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#FF2E93] border border-black inline-block" />
            <span className="w-3 h-3 bg-[#FFD700] border border-black inline-block" />
            <span className="w-3 h-3 bg-[#00FF66] border border-black inline-block" />
            <h3 className="font-pixel text-xs text-[#00FF66] ml-2 line-clamp-1">
              📜 CERTIFICATE: {title}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="px-3 py-1 font-pixel text-xs bg-[#FF2E93] text-white border-2 border-black hover:bg-[#E0257F] shadow-[2px_2px_0px_0px_#000] active:translate-x-[1px] active:translate-y-[1px]"
          >
            [ X CLOSE ]
          </button>
        </div>

        {/* Certificate Display Window */}
        <div className="relative flex-1 min-h-[450px] bg-[#0A0817] p-2 overflow-auto flex items-center justify-center">
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0A0817] z-10">
              <div className="w-10 h-10 border-4 border-[#FF2E93] border-t-transparent animate-spin mb-3" />
              <p className="font-pixel text-xs text-[#00FF66] animate-pulse">
                LOADING CERTIFICATE DATA...
              </p>
            </div>
          )}

          {isPdf ? (
            <iframe
              src={viewUrl}
              title={`Certificate - ${title}`}
              className="w-full h-[65vh] border-2 border-black bg-white"
              onLoad={() => setLoading(false)}
            />
          ) : (
            <img
              src={viewUrl}
              alt={`Certificate for ${title}`}
              className="max-w-full max-h-[65vh] object-contain border-2 border-black shadow-[4px_4px_0px_0px_#000]"
              onLoad={() => setLoading(false)}
              onError={() => setLoading(false)}
            />
          )}
        </div>

        {/* Footer Bar with direct fallback button */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#1E1A3C] border-t-4 border-black text-xs font-pixel">
          <span className="text-[#8B8BAE] text-[10px]">
            MODE: VERIFIED INLINE PREVIEW
          </span>
          <a
            href={viewUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playSelectSound()}
            className="text-[#00F0FF] hover:underline hover:text-[#00FF66] text-[10px]"
          >
            [ 🔗 OPEN ORIGINAL IN TAB ]
          </a>
        </div>
      </div>
    </div>
  );
};
