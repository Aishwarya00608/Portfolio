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
    <section id="contact" className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Contact Final Panel */}
        <div className="editorial-panel-contact">
          
          {/* Section Marker */}
          <div className="flex items-center gap-3 pb-6 border-b border-[#4A3B35] font-mono text-xs uppercase tracking-widest text-[#D9C8BC]">
            <span className="text-[#EAD5C6] font-bold">09 /</span>
            <span>LET'S BUILD SOMETHING</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pt-8">
            
            {/* Left: Oversized Typography & Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="font-serif italic text-4xl sm:text-6xl text-[#EAD5C6] block">
                  Let's Build
                </span>
                <h2 className="font-sans font-extrabold text-4xl sm:text-6xl text-[#FAF6F0] tracking-tighter uppercase leading-none">
                  SOMETHING.
                </h2>
              </div>
              
              <p className="text-sm font-sans text-[#D9C8BC] leading-relaxed">
                I am open to engineering collaborations in AI/ML, Computer Vision, Data Science, and Full-Stack Systems. Feel free to reach out directly.
              </p>

              <div className="bg-[#332A26] border border-[#4A3B35] rounded-2xl p-6 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#EAD5C6] block">
                  DIRECT EMAIL ADDRESS
                </span>
                <a
                  href="mailto:aishwaryabulusu2006@gmail.com"
                  className="font-mono font-bold text-base sm:text-lg text-[#FAF6F0] hover:text-[#EAD5C6] underline break-all block"
                >
                  aishwaryabulusu2006@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://linkedin.com/in/aishwarya-bulusu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FAF6F0] text-[#241E1B] text-xs font-mono font-bold uppercase rounded-full hover:bg-[#EAD5C6] transition-all"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LINKEDIN</span>
                </a>
                <a
                  href="https://github.com/Aishwarya00608"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FAF6F0] text-[#241E1B] text-xs font-mono font-bold uppercase rounded-full hover:bg-[#EAD5C6] transition-all"
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
                className="bg-[#332A26] border border-[#4A3B35] rounded-2xl p-6 sm:p-8"
              >
                {status && (
                  <div
                    className={`mb-6 p-4 rounded-xl border text-xs font-mono flex items-center gap-2 ${
                      status.type === 'success'
                        ? 'border-emerald-600 bg-emerald-950/60 text-emerald-200'
                        : 'border-rose-600 bg-rose-950/60 text-rose-200'
                    }`}
                  >
                    {status.type === 'success' ? (
                      <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
                    ) : (
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    )}
                    <span>{status.message}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 font-sans text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-[#EAD5C6] mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Jane Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FAF6F0] border border-[#E6DEC8] rounded-xl text-xs text-[#241E1B] focus:outline-none focus:border-[#EAD5C6] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-[#EAD5C6] mb-1.5">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="jane@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FAF6F0] border border-[#E6DEC8] rounded-xl text-xs text-[#241E1B] focus:outline-none focus:border-[#EAD5C6] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-[#EAD5C6] mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="Project Inquiry / Opportunity"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAF6F0] border border-[#E6DEC8] rounded-xl text-xs text-[#241E1B] focus:outline-none focus:border-[#EAD5C6] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-[#EAD5C6] mb-1.5">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Write your message here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAF6F0] border border-[#E6DEC8] rounded-xl text-xs text-[#241E1B] focus:outline-none focus:border-[#EAD5C6] transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 text-xs font-mono font-bold uppercase tracking-widest bg-[#EAD5C6] text-[#241E1B] rounded-full hover:bg-[#FAF6F0] transition-colors shadow-md"
                  >
                    {loading ? (
                      <span>TRANSMITTING DISPATCH...</span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
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

      </div>
    </section>
  );
};
