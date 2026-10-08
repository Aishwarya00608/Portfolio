import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { submitContact } from '../services/api';
import { Mail, Send, CheckCircle, AlertCircle, Github, Linkedin } from 'lucide-react';
import { PixelHeart, PixelTrophy, PixelStar } from './pixel/PixelDecorations';
import { playSelectSound } from '../utils/sound';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playSelectSound();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: 'Please fill in all required fields.' });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const res = await submitContact(formData);
      setStatus({ type: 'success', message: res.message });
      setFormData({ name: '', email: '', subject: '', message: '' });

      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch (err: any) {
      setStatus({
        type: 'error',
        message: err.response?.data?.message || 'Failed to send message. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 border-b-4 border-[#2A2650]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Level Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 p-3 bg-[#121026] border-4 border-black shadow-[4px_4px_0px_0px_#000] font-pixel text-xs">
          <div className="flex items-center gap-2 text-[#00FF66]">
            <span>FINAL LEVEL</span>
            <span className="text-[#8B8BAE]">•</span>
            <span className="text-[#FF2E93]">LET'S BUILD SOMETHING</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-[#FFD700]">
            <PixelHeart size={16} /> CONTACT DISPATCH
          </div>
        </div>

        {/* Final Level Card Banner */}
        <div className="pixel-card p-6 sm:p-8 bg-[#121026] text-center mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1E1A3C] text-[#FFD700] border-2 border-black font-pixel text-xs">
            <PixelTrophy size={14} /> CONGRATULATIONS! YOU REACHED THE FINAL LEVEL
          </div>

          <h2 className="font-pixel text-2xl sm:text-4xl text-[#00FF66] drop-shadow-[3px_3px_0px_#000]">
            LET'S BUILD SOMETHING GREAT
          </h2>

          <p className="font-pixel text-xs text-[#E0E7FF] max-w-2xl mx-auto leading-relaxed">
            HAVE A RESEARCH INQUIRY, AI/ML PROJECT, OR COLLABORATION OPPORTUNITY? FEEL FREE TO REACH OUT DIRECTLY OR SEND A DISPATCH MESSAGE BELOW.
          </p>

          {/* Contact Direct Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 font-pixel text-xs">
            <a
              href="mailto:aishwaryabulusu2006@gmail.com"
              onClick={() => playSelectSound()}
              className="btn-pixel-primary text-xs"
            >
              <Mail className="w-4 h-4" />
              <span>EMAIL: aishwaryabulusu2006@gmail.com</span>
            </a>
            <a
              href="https://linkedin.com/in/aishwarya-bulusu"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playSelectSound()}
              className="btn-pixel-secondary text-xs"
            >
              <Linkedin className="w-4 h-4" />
              <span>LINKEDIN</span>
            </a>
            <a
              href="https://github.com/Aishwarya00608"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playSelectSound()}
              className="btn-pixel-gold text-xs"
            >
              <Github className="w-4 h-4" />
              <span>GITHUB</span>
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="pixel-card p-6 sm:p-8 bg-[#121026]"
          >
            <div className="flex items-center gap-2 pb-3 mb-6 border-b-2 border-black font-pixel text-xs text-[#00F0FF]">
              <PixelStar size={16} /> SEND DISPATCH MESSAGE
            </div>

            {status && (
              <div
                className={`mb-6 p-4 border-2 border-black font-pixel text-xs flex items-center gap-2 ${
                  status.type === 'success'
                    ? 'bg-[#00FF66] text-black shadow-[3px_3px_0px_#000]'
                    : 'bg-[#FF2E93] text-white shadow-[3px_3px_0px_#000]'
                }`}
              >
                {status.type === 'success' ? (
                  <CheckCircle className="w-5 h-5 shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 shrink-0" />
                )}
                <span>{status.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 font-sans text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-pixel text-[10px] uppercase text-[#00FF66] mb-1.5">
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0A0817] border-2 border-black text-xs text-white focus:outline-none focus:border-[#FF2E93]"
                  />
                </div>

                <div>
                  <label className="block font-pixel text-[10px] uppercase text-[#00FF66] mb-1.5">
                    YOUR EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0A0817] border-2 border-black text-xs text-white focus:outline-none focus:border-[#FF2E93]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-pixel text-[10px] uppercase text-[#00FF66] mb-1.5">
                  SUBJECT
                </label>
                <input
                  type="text"
                  placeholder="Project Inquiry / AI Opportunity"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0A0817] border-2 border-black text-xs text-white focus:outline-none focus:border-[#FF2E93]"
                />
              </div>

              <div>
                <label className="block font-pixel text-[10px] uppercase text-[#00FF66] mb-1.5">
                  MESSAGE *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Write your message..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0A0817] border-2 border-black text-xs text-white focus:outline-none focus:border-[#FF2E93]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-pixel-primary w-full py-4 text-xs font-pixel"
              >
                {loading ? (
                  <span>TRANSMITTING DISPATCH...</span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <span>TRANSMIT DISPATCH</span>
                    <Send className="w-4 h-4" />
                  </span>
                )}
              </button>
            </form>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
