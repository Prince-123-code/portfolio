import React, { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';
import { Menu, X, Download, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#080c0e]/95 backdrop-blur-xl border-b border-white/10 py-2 sm:py-2.5 px-4 sm:px-6 shadow-[0_8px_32px_rgba(0,0,0,0.6)]'
          : 'bg-transparent py-3 sm:py-4 px-4 sm:px-6'
      }`}
    >
      <div
        className={`max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-2 rounded-full transition-all duration-300 ${
          scrolled
            ? 'bg-white/[0.04] border border-white/10 shadow-sm'
            : 'bg-[#0f131a]/85 backdrop-blur-xl border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
        }`}
      >
        {/* Logo / Monogram */}
        <a
          href="#"
          className="group flex items-center gap-2.5 text-white font-medium text-sm tracking-tight shrink-0"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-amber-500 text-zinc-950 flex items-center justify-center font-black text-xs tracking-wider shadow-sm group-hover:scale-105 transition-transform">
            {personalInfo.initials}
          </div>
          <div className="flex flex-col">
            <span className="font-montserrat font-extrabold text-white tracking-tight leading-none text-sm">
              {personalInfo.name}
            </span>
            <span className="text-[10px] text-zinc-400 font-mono leading-tight mt-0.5">
              Frontend Dev
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 text-xs font-semibold tracking-wide text-zinc-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Status Dot */}
          <span className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Available for hire
          </span>

          {/* GitHub Link */}
          <a
            href={personalInfo.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="hidden sm:inline-flex p-2 text-zinc-400 hover:text-white transition-colors"
            title="GitHub: Prince-123-code"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          {/* Resume Link */}
          <a
            href={personalInfo.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-white/10 transition-all hover:border-white/20"
          >
            <Download className="w-3 h-3 text-amber-400" />
            CV
          </a>

          {/* Quick CTA */}
          <a
            href="#contact"
            className="inline-flex items-center gap-1 px-3.5 sm:px-4 py-1.5 text-xs font-bold rounded-full bg-amber-400 text-zinc-950 hover:bg-amber-300 transition-all shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_rgba(251,191,36,0.5)] active:scale-95 font-montserrat"
          >
            Let's Talk
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="md:hidden p-1.5 rounded-full text-zinc-300 hover:bg-white/5 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2.5 max-w-6xl mx-auto rounded-3xl border border-white/10 bg-[#0c1015]/95 backdrop-blur-2xl p-5 shadow-2xl transition-all">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-zinc-200 hover:bg-white/5 transition-colors"
              >
                {link.name}
              </a>
            ))}

            <div className="pt-3 mt-1 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available for hire
              </span>

              <div className="flex items-center gap-2">
                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="p-2 rounded-lg bg-white/5 text-zinc-300 hover:text-white"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="p-2 rounded-lg bg-white/5 text-zinc-300 hover:text-white"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href={personalInfo.resumeUrl}
                  download="Prince_T_Resume.pdf"
                  className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-200 border border-white/10"
                >
                  <Download className="w-3 h-3 text-amber-400" />
                  CV
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
