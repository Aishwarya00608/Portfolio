import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowDown,
  Github,
  Linkedin,
  Mail,
  Brain,
  Code2,
  Cpu,
  BarChart,
} from 'lucide-react';
import { Profile, SocialLink } from '../types';

interface HeroProps {
  profile: Profile | null;
  socialLinks: SocialLink[];
}

export const Hero: React.FC<HeroProps> = ({ profile, socialLinks }) => {
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return <Github className="w-5 h-5" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      case 'email':
      case 'mail':
        return <Mail className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  const name = profile?.fullName || 'Bulusu Vyaghri Aiswarya';
  const headline = profile?.headline || 'Computer Science Engineer | Data Science & AI/ML Enthusiast';
  const bio = profile?.shortBio || '4th-year B.Tech Computer Science and Engineering student interested in Data Science, AI/ML, Computer Vision, Data Analytics, Full-Stack Engineering, and Cyber Security.';

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Decorative Pastel Background Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-pink-200/40 via-purple-200/30 to-indigo-200/40 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-slate-900/10 rounded-full blur-3xl -z-10 animate-pulse-slow" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-pink-100/50 dark:bg-pink-900/10 rounded-full blur-2xl -z-10 animate-float" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-purple-100/50 dark:bg-purple-900/10 rounded-full blur-2xl -z-10 animate-float" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTAs */}
          <motion.div
            className="lg:col-span-7 text-center lg:text-left space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Cute Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100/80 dark:bg-slate-800/80 border border-pink-200 dark:border-slate-700 text-pink-700 dark:text-pink-300 text-xs font-semibold tracking-wide shadow-sm">
              <Code2 className="w-4 h-4 text-pink-500" />
              <span>Building things, learning things • 4th-Year CSE</span>
            </div>

            {/* Main Name */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-serif tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Hi, I'm <span className="gradient-text">{name}</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-lg sm:text-xl font-semibold text-purple-700 dark:text-purple-300">
              {headline}
            </p>

            {/* Short Introduction */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {bio}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a href="#projects" className="btn-cute-primary">
                View My Work
                <ArrowDown className="w-4 h-4" />
              </a>
            </div>

            {/* Dynamic Social Links */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-4">
              <span className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Connect:
              </span>
              <div className="flex items-center gap-3">
                {socialLinks.length > 0 ? (
                  socialLinks.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-pink-500 dark:hover:text-pink-400 hover:border-pink-300 dark:hover:border-pink-500 hover:scale-110 transition-all shadow-sm"
                      title={link.platform}
                    >
                      {getSocialIcon(link.platform)}
                    </a>
                  ))
                ) : (
                  <>
                    <a
                      href="https://github.com/Aishwarya00608"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-pink-500 hover:scale-110 transition-all"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href="https://linkedin.com/in/aishwarya-bulusu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-pink-500 hover:scale-110 transition-all"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href="mailto:aishwarya.bulusu@gmail.com"
                      className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-pink-500 hover:scale-110 transition-all"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Animated AI / Tech Avatar Showcase */}
          <motion.div
            className="lg:col-span-5 relative flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-72 h-72 sm:w-88 sm:h-88 lg:w-96 lg:h-96">
              {/* Outer Decorative Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-300 via-purple-300 to-indigo-300 dark:from-purple-600 dark:via-pink-500 dark:to-indigo-500 p-1.5 shadow-cute animate-spin-slow opacity-80" />

              {/* Inner Profile Image Frame */}
              <div className="absolute inset-2 rounded-full overflow-hidden bg-white dark:bg-slate-900 border-4 border-white dark:border-slate-800 shadow-inner">
                <img
                  src={
                    profile?.profileImage ||
                    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop'
                  }
                  alt={name}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Floating Tech Skill Badges */}
              <div className="absolute -top-3 -right-2 px-3 py-1.5 rounded-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-pink-200 dark:border-slate-700 shadow-cute flex items-center gap-2 animate-float">
                <Brain className="w-4 h-4 text-purple-500" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">AI / ML</span>
              </div>

              <div
                className="absolute top-1/2 -left-6 px-3 py-1.5 rounded-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-purple-200 dark:border-slate-700 shadow-cute flex items-center gap-2 animate-float"
                style={{ animationDelay: '1.5s' }}
              >
                <Cpu className="w-4 h-4 text-pink-500" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Computer Vision</span>
              </div>

              <div
                className="absolute -bottom-2 right-4 px-3 py-1.5 rounded-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-indigo-200 dark:border-slate-700 shadow-cute flex items-center gap-2 animate-float"
                style={{ animationDelay: '3s' }}
              >
                <Code2 className="w-4 h-4 text-indigo-500" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Full-Stack Dev</span>
              </div>

              <div
                className="absolute top-1/4 -right-6 px-2.5 py-1 rounded-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-rose-200 dark:border-slate-700 shadow-sm flex items-center gap-1.5 animate-float"
                style={{ animationDelay: '2.5s' }}
              >
                <BarChart className="w-3.5 h-3.5 text-rose-500" />
                <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">Data Analytics</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
