import React from 'react';
import { X, Download, ExternalLink, FileText } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeUrl?: string;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, resumeUrl }) => {
  if (!isOpen) return null;

  const validUrl = resumeUrl || 'https://aishwarya00608.github.io/FlyRank_Assignment/';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full h-[85vh] flex flex-col shadow-2xl border border-pink-100 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-pink-50/50 to-purple-50/50 dark:from-slate-800 dark:to-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-slate-700 flex items-center justify-center text-pink-500">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg">
                Curriculum Vitae — Bulusu Vyaghri Aiswarya
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Official PDF Document
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={validUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cute-secondary text-xs px-3 py-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              Download PDF
            </a>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Viewer */}
        <div className="flex-1 bg-slate-100 dark:bg-slate-950 p-2 overflow-hidden flex items-center justify-center">
          {validUrl.endsWith('.pdf') ? (
            <iframe
              src={validUrl}
              title="Aishwarya Resume"
              className="w-full h-full rounded-xl border border-slate-200 dark:border-slate-800"
            />
          ) : (
            <div className="text-center p-8 max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
              <FileText className="w-12 h-12 text-pink-400 mx-auto mb-3 animate-bounce" />
              <h4 className="font-bold text-slate-800 dark:text-slate-200 text-lg mb-2">
                Resume Document Link
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                Click below to view or download the complete resume document.
              </p>
              <div className="flex gap-3 justify-center">
                <a
                  href={validUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cute-primary text-xs"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open Resume Document
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
