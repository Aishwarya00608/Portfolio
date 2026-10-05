import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Lock, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
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
    { name: 'WORK', href: '#projects' },
    { name: 'ABOUT', href: '#about' },
    { name: 'SKILLS', href: '#skills' },
    { name: 'EXPERIENCE', href: '#experience' },
    { name: 'CERTIFICATIONS', href: '#certifications' },
    { name: 'HACKATHONS', href: '#hackathons' },
    { name: 'ACHIEVEMENTS', href: '#achievements' },
    { name: 'CONTACT', href: '#contact' },
  ];

  const isHome = location.pathname === '/';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-[#1C1B1A]/15 dark:border-[#EAE7E1]/15 ${
        scrolled
          ? 'bg-[#FAF8F5]/90 dark:bg-[#141312]/90 backdrop-blur-md py-3'
          : 'bg-[#FAF8F5] dark:bg-[#141312] py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Title */}
        <Link
          to="/"
          className="flex items-center gap-3 text-[#1C1B1A] dark:text-[#EAE7E1] group"
        >
          <span className="font-display italic text-2xl sm:text-3xl font-bold tracking-tight">
            B. V. Aiswarya
          </span>
          <span className="hidden sm:inline-block text-[10px] font-mono tracking-widest border-l border-[#1C1B1A]/30 dark:border-[#EAE7E1]/30 pl-3 uppercase text-[#1C1B1A]/60 dark:text-[#EAE7E1]/60">
            VOL. 2026 • PORTFOLIO
          </span>
        </Link>

        {/* Desktop Navigation */}
        {isHome && (
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[11px] font-mono font-bold tracking-widest text-[#1C1B1A]/70 dark:text-[#EAE7E1]/70 hover:text-[#1C1B1A] dark:hover:text-[#EAE7E1] transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#1C1B1A] dark:after:bg-[#EAE7E1] hover:after:w-full after:transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>
        )}

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-none border border-[#1C1B1A]/20 dark:border-[#EAE7E1]/20 hover:border-[#1C1B1A] dark:hover:border-[#EAE7E1] transition-all text-[#1C1B1A] dark:text-[#EAE7E1]"
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          <Link
            to={isAuthenticated ? '/admin/dashboard' : '/admin/login'}
            className="text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1.5 border border-[#1C1B1A]/30 dark:border-[#EAE7E1]/30 hover:border-[#1C1B1A] dark:hover:border-[#EAE7E1] text-[#1C1B1A] dark:text-[#EAE7E1] flex items-center gap-1.5 transition-all"
          >
            <Lock className="w-3 h-3" />
            {isAuthenticated ? 'CMS DASHBOARD' : 'ADMIN'}
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 border border-[#1C1B1A]/20 dark:border-[#EAE7E1]/20 text-[#1C1B1A] dark:text-[#EAE7E1]"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 border border-[#1C1B1A]/20 dark:border-[#EAE7E1]/20 text-[#1C1B1A] dark:text-[#EAE7E1]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] dark:bg-[#141312] border-b border-[#1C1B1A]/20 dark:border-[#EAE7E1]/20 px-4 pt-4 pb-6 space-y-3 font-mono text-xs">
          {isHome &&
            navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-[#1C1B1A] dark:text-[#EAE7E1] font-bold border-b border-[#1C1B1A]/10 dark:border-[#EAE7E1]/10 tracking-widest"
              >
                {link.name}
              </a>
            ))}
          <div className="pt-2">
            <Link
              to={isAuthenticated ? '/admin/dashboard' : '/admin/login'}
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center gap-2 px-4 py-2 border border-[#1C1B1A] dark:border-[#EAE7E1] text-[#1C1B1A] dark:text-[#EAE7E1] font-bold text-xs uppercase"
            >
              <Lock className="w-3.5 h-3.5" />
              {isAuthenticated ? 'CMS Dashboard' : 'Admin Login'}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
