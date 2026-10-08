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
        className={`bg-[#FAF7F2]/95 backdrop-blur-md border border-[#E6DEC8] rounded-full px-6 py-3 shadow-md transition-all duration-300 flex items-center justify-between ${
          scrolled ? 'border-[#C4B79C] shadow-lg' : ''
        }`}
      >
        {/* Brand Title */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="font-serif italic text-xl font-bold text-[#2B2522] group-hover:text-[#6E625A] transition-colors">
            Aiswarya
          </span>
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#6E625A] border-l border-[#D5C9B3] pl-2 hidden sm:inline-block">
            EDITORIAL 2026
          </span>
        </Link>

        {/* Desktop Links */}
        {isHome && (
          <nav className="hidden xl:flex items-center gap-5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-mono text-[10px] font-bold tracking-widest text-[#6E625A] hover:text-[#2B2522] transition-colors"
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
            className="btn-editorial-secondary text-[10px] px-3.5 py-1.5 border border-[#D5C9B3] rounded-full hover:border-[#2B2522]"
          >
            <Lock className="w-3 h-3 text-[#9E4933]" />
            <span>{isAuthenticated ? 'CMS' : 'ADMIN'}</span>
          </Link>

          {/* Mobile Menu Trigger */}
          {isHome && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-[#6E625A] hover:text-[#2B2522]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && isHome && (
        <div className="xl:hidden mt-3 bg-[#FAF7F2] border border-[#E6DEC8] rounded-3xl p-6 font-mono text-xs space-y-3 shadow-xl">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 px-3 bg-[#F4EFE6] border border-[#E2D6C3] rounded-xl text-[#2B2522] font-bold tracking-widest hover:border-[#2B2522] transition-all"
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
