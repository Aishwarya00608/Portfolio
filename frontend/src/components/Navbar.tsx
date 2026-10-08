import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Lock, Menu, X, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'ABOUT', href: '#about' },
    { name: 'WORK', href: '#projects' },
    { name: 'SKILLS', href: '#skills' },
    { name: 'EXPERIENCE', href: '#experience' },
    { name: 'CERTIFICATIONS', href: '#certifications' },
    { name: 'HACKATHONS', href: '#hackathons' },
    { name: 'ACHIEVEMENTS', href: '#achievements' },
    { name: 'CONTACT', href: '#contact' },
  ];

  const isHome = location.pathname === '/';

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 max-w-7xl mx-auto">
      <div
        className={`bg-[#FAF7F2]/95 backdrop-blur-md border-2 border-[#CBD5E1] rounded-full px-5 py-2.5 shadow-window transition-all duration-300 flex items-center justify-between ${
          scrolled ? 'border-[#94A3B8] shadow-window-lg' : ''
        }`}
      >
        {/* Brand & Address Bar */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 hidden sm:flex">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
          </div>

          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-serif italic text-lg font-bold text-[#1E293B] group-hover:text-[#EC4899] transition-colors">
              Aiswarya
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#0369A1] bg-[#E0F2FE] border border-[#BAE6FD] px-2.5 py-0.5 rounded-full hidden md:inline-block">
              aishwaryabulusu2006@gmail.com
            </span>
          </Link>
        </div>

        {/* Desktop Links */}
        {isHome && (
          <nav className="hidden xl:flex items-center gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-mono text-[10px] font-bold tracking-widest text-[#64748B] hover:text-[#1E293B] transition-colors px-2 py-1 rounded-md hover:bg-white/80"
              >
                {link.name}
              </a>
            ))}
          </nav>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <Link
            to={isAuthenticated ? '/admin/dashboard' : '/admin/login'}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#CBD5E1] rounded-full text-[10px] font-mono font-bold text-[#1E293B] hover:border-[#1E293B] shadow-sm transition-all"
          >
            <Lock className="w-3 h-3 text-[#EC4899]" />
            <span>{isAuthenticated ? 'CMS' : 'ADMIN'}</span>
          </Link>

          {/* Mobile Menu Trigger */}
          {isHome && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-[#64748B] hover:text-[#1E293B]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && isHome && (
        <div className="xl:hidden mt-3 bg-[#FAF7F2] border-2 border-[#CBD5E1] rounded-3xl p-6 font-mono text-xs space-y-3 shadow-window">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 px-3 bg-white border border-[#CBD5E1] rounded-xl text-[#1E293B] font-bold tracking-widest hover:border-[#1E293B] transition-all"
              >
                ✦ {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
