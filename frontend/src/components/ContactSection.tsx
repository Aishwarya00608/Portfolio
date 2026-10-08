import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { submitContact } from '../services/api';
import { Mail, Send, CheckCircle, AlertCircle, Github, Linkedin } from 'lucide-react';

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
        particleCount: 80,
        spread: 70,
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
    <section id="contact" className="py-20 border-b border-[#1C1B1A]/20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 pb-4 border-b border-[#1C1B1A]/20 mb-8">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#A63A24]">
            SECTION N° 09
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1B1A]">
            Initiate Conversation
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-4">
          
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-display italic text-3xl sm:text-5xl text-[#1C1B1A] leading-tight">
              Have a research inquiry, technical project, or opportunity?
            </h3>
            
            <p className="text-sm font-sans text-[#1C1B1A]/80 leading-relaxed">
              I am open to engineering collaborations in AI/ML, Computer Vision, Data Science, and Full-Stack Engineering. Feel free to reach out directly.
            </p>

            <div className="p-6 border border-[#1C1B1A]/20 bg-white space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#1C1B1A]/50 block">
                DIRECT EMAIL ADDRESS
              </span>
              <a
                href="mailto:aishwaryabulusu2006@gmail.com"
                className="font-mono font-bold text-base sm:text-lg text-[#1C1B1A] hover:text-[#A63A24] transition-colors break-all block"
              >
                aishwaryabulusu2006@gmail.com
              </a>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://linkedin.com/in/aishwarya-bulusu"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-editorial-secondary text-xs"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LINKEDIN</span>
              </a>
              <a
                href="https://github.com/Aishwarya00608"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-editorial-secondary text-xs"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GITHUB</span>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="editorial-card p-6 sm:p-8"
            >
              {status && (
                <div
                  className={`mb-6 p-4 border text-xs font-mono flex items-center gap-2 ${
                    status.type === 'success'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                      : 'border-rose-600 bg-rose-50 text-rose-900'
                  }`}
                >
                  {status.type === 'success' ? (
                    <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  )}
                  <span>{status.message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-[#1C1B1A]/70 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-transparent border border-[#1C1B1A]/30 text-xs text-[#1C1B1A] focus:outline-none focus:border-[#1C1B1A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-[#1C1B1A]/70 mb-1">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-transparent border border-[#1C1B1A]/30 text-xs text-[#1C1B1A] focus:outline-none focus:border-[#1C1B1A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-[#1C1B1A]/70 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Project Inquiry / Opportunity"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-transparent border border-[#1C1B1A]/30 text-xs text-[#1C1B1A] focus:outline-none focus:border-[#1C1B1A]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-[#1C1B1A]/70 mb-1">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-transparent border border-[#1C1B1A]/30 text-xs text-[#1C1B1A] focus:outline-none focus:border-[#1C1B1A]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-editorial-primary w-full py-3.5"
                >
                  {loading ? (
                    <span>TRANSMITTING DISPATCH...</span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <span>SEND DISPATCH</span>
                      <Send className="w-3.5 h-3.5" />
                    </span>
                  )}
                </button>
              </form>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};
