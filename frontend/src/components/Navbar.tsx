import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Lock, Menu, X } from 'lucide-react';
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
        className={`bg-[#111111]/90 backdrop-blur-md border border-[#262626] rounded-full px-6 py-3 shadow-panel transition-all duration-300 flex items-center justify-between ${
          scrolled ? 'border-[#333333] shadow-card-glow' : ''
        }`}
      >
        {/* Brand Title */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="font-serif italic text-xl font-bold text-white group-hover:text-[#A0A0A0] transition-colors">
            Aiswarya
          </span>
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#A0A0A0] border-l border-[#333333] pl-2 hidden sm:inline-block">
            2026 EDITION
          </span>
        </Link>

        {/* Desktop Links */}
        {isHome && (
          <nav className="hidden xl:flex items-center gap-5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-mono text-[10px] font-bold tracking-widest text-[#A0A0A0] hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <Link
            to={isAuthenticated ? '/admin/dashboard' : '/admin/login'}
            className="btn-black-ghost text-[10px] px-3 py-1.5 border border-[#333333] rounded-full hover:border-white"
          >
            <Lock className="w-3 h-3" />
            <span>{isAuthenticated ? 'CMS' : 'ADMIN'}</span>
          </Link>

          {/* Mobile Menu Trigger */}
          {isHome && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-[#A0A0A0] hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && isHome && (
        <div className="xl:hidden mt-3 bg-[#111111] border border-[#262626] rounded-3xl p-6 font-mono text-xs space-y-3 animate-fadeIn shadow-panel">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 px-3 bg-[#181818] border border-[#262626] rounded-xl text-white font-bold tracking-widest hover:border-white transition-all"
              >
                ▶ {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
