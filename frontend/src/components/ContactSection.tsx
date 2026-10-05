import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { submitContact } from '../services/api';
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';

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
    <section id="contact" className="py-20 border-b border-[#1C1B1A]/15 dark:border-[#EAE7E1]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 pb-4 border-b border-[#1C1B1A]/20 dark:border-[#EAE7E1]/20 mb-8">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#1C1B1A]/60 dark:text-[#EAE7E1]/60">
            SECTION 09
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1B1A] dark:text-[#EAE7E1]">
            Initiate Conversation
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-4">
          
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-display italic text-3xl sm:text-4xl text-[#1C1B1A] dark:text-[#EAE7E1] leading-tight">
              Have a research inquiry, technical project, or opportunity?
            </h3>
            
            <p className="text-sm font-sans text-[#1C1B1A]/80 dark:text-[#EAE7E1]/80 leading-relaxed">
              I am open to collaborations in AI/ML, Computer Vision, Data Science, and Full-Stack Engineering. Feel free to reach out directly.
            </p>

            <div className="p-6 border border-[#1C1B1A]/20 dark:border-[#EAE7E1]/20 bg-[#FAF8F5] dark:bg-[#191817] space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#1C1B1A]/50 dark:text-[#EAE7E1]/50 block">
                DIRECT EMAIL ADDRESS
              </span>
              <a
                href="mailto:aishwaryabulusu2006@gmail.com"
                className="font-mono font-bold text-base sm:text-lg text-[#1C1B1A] dark:text-[#EAE7E1] hover:underline break-all block"
              >
                aishwaryabulusu2006@gmail.com
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
                      ? 'border-emerald-600 bg-emerald-50/50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200'
                      : 'border-rose-600 bg-rose-50/50 text-rose-900 dark:bg-rose-950/40 dark:text-rose-200'
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
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-[#1C1B1A]/70 dark:text-[#EAE7E1]/70 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-transparent border border-[#1C1B1A]/30 dark:border-[#EAE7E1]/30 text-xs text-[#1C1B1A] dark:text-[#EAE7E1] focus:outline-none focus:border-[#1C1B1A] dark:focus:border-[#EAE7E1]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-[#1C1B1A]/70 dark:text-[#EAE7E1]/70 mb-1">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-transparent border border-[#1C1B1A]/30 dark:border-[#EAE7E1]/30 text-xs text-[#1C1B1A] dark:text-[#EAE7E1] focus:outline-none focus:border-[#1C1B1A] dark:focus:border-[#EAE7E1]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-[#1C1B1A]/70 dark:text-[#EAE7E1]/70 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Project Inquiry / Opportunity"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-transparent border border-[#1C1B1A]/30 dark:border-[#EAE7E1]/30 text-xs text-[#1C1B1A] dark:text-[#EAE7E1] focus:outline-none focus:border-[#1C1B1A] dark:focus:border-[#EAE7E1]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-[#1C1B1A]/70 dark:text-[#EAE7E1]/70 mb-1">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-transparent border border-[#1C1B1A]/30 dark:border-[#EAE7E1]/30 text-xs text-[#1C1B1A] dark:text-[#EAE7E1] focus:outline-none focus:border-[#1C1B1A] dark:focus:border-[#EAE7E1]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-editorial-primary w-full py-3"
                >
                  {loading ? (
                    <span>SENDING MESSAGE...</span>
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
