import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-white/10 bg-[#080c0e] text-white">
      <div className="max-w-[1180px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center sm:items-start gap-1">
          <p className="font-montserrat text-sm font-bold text-[#fffdf8]">
            © {currentYear} {personalInfo.name}
          </p>
          <p className="text-xs text-zinc-400">
            {personalInfo.badge} • Madurai, Tamil Nadu, India
          </p>
        </div>

        {/* Socials & Back to Top */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 text-zinc-400 hover:text-white transition-colors"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 text-zinc-400 hover:text-white transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          </div>

          <div className="h-4 w-px bg-white/15" />

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            Top
            <ArrowUp className="w-3.5 h-3.5 text-[#d8b46a]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
