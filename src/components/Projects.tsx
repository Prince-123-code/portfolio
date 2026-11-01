import React, { useState, useMemo } from 'react';
import { workedProjects } from '../data/workedProjects';
import type { WorkedProject } from '../data/workedProjects';
import {
  Search,
  ExternalLink,
  Sparkles,
  Filter,
  Globe,
  Copy,
  Check,
  Eye,
  X,
  ArrowUpRight,
  Gauge,
  ShieldCheck,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Helper to get monogram from project name (e.g. "Athidhi Aalayam" => "AA")
function getMonogram(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
}

// Helper to format clean domain hostname
function getHostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

// Single Interactive Project Card Component with Mouse-Tracking Spotlight
const InteractiveProjectCard: React.FC<{
  project: WorkedProject;
  onOpenModal: (project: WorkedProject) => void;
}> = ({ project, onOpenModal }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const hostname = getHostname(project.url);
  const monogram = getMonogram(project.name);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const copyUrl = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard.writeText(project.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Color scheme based on technology
  const techBadge = {
    'Next.js': {
      bg: 'bg-amber-400/10',
      text: 'text-[#d8b46a]',
      border: 'border-[#d8b46a]/30',
      label: 'Next.js',
    },
    'React': {
      bg: 'bg-cyan-400/10',
      text: 'text-cyan-300',
      border: 'border-cyan-400/30',
      label: 'React.js',
    },
    'HTML': {
      bg: 'bg-emerald-400/10',
      text: 'text-emerald-300',
      border: 'border-emerald-400/30',
      label: 'HTML5 / SCSS',
    },
  }[project.technology] || {
    bg: 'bg-white/10',
    text: 'text-white',
    border: 'border-white/20',
    label: project.technology,
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative h-full flex flex-col justify-between p-5 rounded-2xl bg-[#0f131a]/90 hover:bg-[#131822]/95 border border-white/[0.08] hover:border-[#d8b46a]/50 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(216,180,106,0.12)] group overflow-hidden hover:-translate-y-1.5"
      >
        {/* Dynamic Interactive Mouse-Tracking Spotlight */}
        {isHovered && (
          <div
            className="pointer-events-none absolute -inset-px rounded-2xl transition duration-300 opacity-100"
            style={{
              background: `radial-gradient(360px circle at ${mousePos.x}px ${mousePos.y}px, rgba(216, 180, 106, 0.16), transparent 70%)`,
            }}
          />
        )}

        {/* Ambient Top Subtle Shimmer */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Content Container */}
        <div className="relative z-10">
          
          {/* Top Row: Logo & Status Tags */}
          <div className="flex items-center justify-between gap-3 mb-4">
            {/* Logo Thumbnail Container */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white to-[#e4e7ee] p-1.5 shadow-md flex items-center justify-center shrink-0 border border-white/40 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(216,180,106,0.3)] transition-all duration-300">
              {project.logo ? (
                <img
                  src={project.logo}
                  alt={project.name}
                  loading="lazy"
                  className="w-full h-full object-contain rounded-md"
                />
              ) : (
                <div className="w-full h-full rounded-md bg-gradient-to-br from-[#181b22] to-[#0a0c10] flex items-center justify-center">
                  <span className="font-montserrat font-black text-xs text-[#d8b46a] tracking-wider">
                    {monogram}
                  </span>
                </div>
              )}
            </div>

            {/* Right Tags: Live Status & Technology Badge */}
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold font-montserrat bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live
              </span>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-black font-montserrat uppercase tracking-wider ${techBadge.bg} ${techBadge.text} border ${techBadge.border}`}>
                {techBadge.label}
              </span>
            </div>
          </div>

          {/* Project Title */}
          <h3 className="font-montserrat font-black text-base sm:text-lg text-[#fffdf8] group-hover:text-[#f6d98e] transition-colors leading-snug line-clamp-1">
            {project.name}
          </h3>

          {/* Category Pill / Tag */}
          <p className="mt-1 text-xs text-zinc-400 font-medium line-clamp-1">
            {project.category}
          </p>

          {/* Interactive Domain Pill with One-Click Copy */}
          <div className="mt-3 inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/5 text-[11px] font-mono text-zinc-400 group-hover:border-white/10 transition-colors">
            <Globe className="w-3 h-3 text-[#d8b46a]" />
            <span className="truncate max-w-[180px]">{hostname}</span>
            <button
              onClick={copyUrl}
              className="p-1 -mr-1 rounded hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              title="Copy URL"
            >
              {copied ? (
                <span className="text-emerald-400 flex items-center gap-1 text-[10px] font-sans font-bold">
                  <Check className="w-3 h-3" />
                  Copied
                </span>
              ) : (
                <Copy className="w-3 h-3" />
              )}
            </button>
          </div>

        </div>

        {/* Card Footer: Interactive Action Bar */}
        <div className="relative z-10 pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between gap-2">
          
          {/* Quick Preview Modal Trigger */}
          <button
            onClick={() => onOpenModal(project)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-400 hover:text-white transition-colors py-1 px-2 rounded-md hover:bg-white/5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#d8b46a]" />
            <span>Details</span>
          </button>

          {/* Direct External Link */}
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 group-hover:bg-[#d8b46a] text-zinc-200 group-hover:text-zinc-950 font-montserrat text-xs font-extrabold transition-all duration-300 shadow-sm"
          >
            <span>Visit Site</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

        </div>

      </div>
    </motion.div>
  );
};

export const Projects: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProject, setActiveModalProject] = useState<WorkedProject | null>(null);

  const techFilters = [
    { label: 'All', count: workedProjects.length },
    { label: 'Next.js', count: workedProjects.filter((p) => p.technology === 'Next.js').length },
    { label: 'React', count: workedProjects.filter((p) => p.technology === 'React').length },
    { label: 'HTML', count: workedProjects.filter((p) => p.technology === 'HTML').length },
  ];

  const filteredProjects = useMemo(() => {
    return workedProjects.filter((project) => {
      const matchesTech = selectedTech === 'All' || project.technology === selectedTech;
      const matchesSearch =
        searchQuery.trim() === '' ||
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.url.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTech && matchesSearch;
    });
  }, [selectedTech, searchQuery]);

  return (
    <section id="projects" className="py-24 border-t border-white/10 bg-[#080c0e] text-white relative">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#d8b46a]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-montserrat font-extrabold tracking-[0.16em] uppercase bg-[#d8b46a]/10 text-[#d8b46a] border border-[#d8b46a]/30 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Production Portfolio • 33+ Live Websites</span>
            </div>
            <h2 className="font-montserrat text-3xl sm:text-5xl font-black tracking-tight text-[#fffdf8]">
              Client & Production Websites
            </h2>
            <p className="mt-3 text-zinc-400 text-sm sm:text-base max-w-2xl font-normal leading-relaxed">
              Commercial web platforms, restaurant ordering engines, and business websites engineered across React.js, Next.js, and modern frontend architectures.
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search websites (e.g. HBK, Amudham)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-hidden focus:border-[#d8b46a] focus:ring-1 focus:ring-[#d8b46a] transition-all"
            />
          </div>
        </div>

        {/* Interactive Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 select-none scrollbar-none">
          <span className="text-xs font-montserrat font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5 mr-2">
            <Filter className="w-3.5 h-3.5 text-[#d8b46a]" />
            Filter:
          </span>
          {techFilters.map((filter) => (
            <button
              key={filter.label}
              onClick={() => setSelectedTech(filter.label)}
              className={`px-4 py-2 rounded-xl text-xs font-montserrat font-extrabold tracking-wide transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                selectedTech === filter.label
                  ? 'bg-gradient-to-r from-[#f6d98e] to-[#d3a956] text-zinc-950 shadow-[0_4px_20px_rgba(216,180,106,0.3)]'
                  : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              <span>{filter.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                selectedTech === filter.label
                  ? 'bg-black/20 text-zinc-900 font-black'
                  : 'bg-white/10 text-zinc-500'
              }`}>
                {filter.count}
              </span>
            </button>
          ))}
        </div>

        {/* Modern Interactive Grid (3 columns on desktop, 2 on tablet, 1 on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project: WorkedProject) => (
              <InteractiveProjectCard
                key={project.url}
                project={project}
                onOpenModal={(p) => setActiveModalProject(p)}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-zinc-400 text-sm">No websites found matching "{searchQuery}".</p>
            <button
              onClick={() => { setSelectedTech('All'); setSearchQuery(''); }}
              className="mt-3 text-xs font-bold font-montserrat text-[#d8b46a] hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Interactive Project Details Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg rounded-3xl bg-[#0f131a] border border-white/15 p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.8)] z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalProject(null)}
                aria-label="Close modal"
                className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header Info */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white to-[#dfe1e8] p-2 shadow-lg flex items-center justify-center shrink-0 border border-white/40">
                  {activeModalProject.logo ? (
                    <img
                      src={activeModalProject.logo}
                      alt={activeModalProject.name}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  ) : (
                    <span className="font-montserrat font-black text-sm text-zinc-900">
                      {getMonogram(activeModalProject.name)}
                    </span>
                  )}
                </div>

                <div className="pr-8">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-montserrat bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Verified Production App
                  </div>
                  <h3 className="font-montserrat font-black text-xl text-white">
                    {activeModalProject.name}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    {activeModalProject.category}
                  </p>
                </div>
              </div>

              {/* Interactive Spec Chips */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center gap-2 text-[#d8b46a] text-xs font-bold mb-1">
                    <Gauge className="w-4 h-4" />
                    <span>Performance</span>
                  </div>
                  <div className="font-montserrat font-extrabold text-sm text-white">
                    92+ Lighthouse
                  </div>
                  <div className="text-[10px] text-zinc-400 mt-0.5">Core Web Vitals Optimized</div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold mb-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Technology</span>
                  </div>
                  <div className="font-montserrat font-extrabold text-sm text-white">
                    {activeModalProject.technology}
                  </div>
                  <div className="text-[10px] text-zinc-400 mt-0.5">Responsive & Agile</div>
                </div>
              </div>

              {/* Live URL Display */}
              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-2 min-w-0">
                  <Globe className="w-4 h-4 text-[#d8b46a] shrink-0" />
                  <span className="font-mono text-xs text-zinc-300 truncate">
                    {activeModalProject.url}
                  </span>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(activeModalProject.url);
                  }}
                  className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors shrink-0 cursor-pointer"
                >
                  Copy
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <a
                  href={activeModalProject.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 hero-primary-button text-xs py-3 group"
                >
                  <span>Open Live Website</span>
                  <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-montserrat font-bold text-zinc-300 hover:text-white transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
