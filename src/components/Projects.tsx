import React, { useState } from 'react';
import { projects } from '../data/portfolioData';
import type { Project } from '../data/portfolioData';
import {
  Sparkles,
  ArrowUpRight,
  Gauge,
  Layers,
  Zap,
  TrendingUp,
  Code2,
  CheckCircle2,
  ExternalLink,
  X,
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { motion, AnimatePresence } from 'framer-motion';

// Key architectural highlights mapped to projects
const projectHighlights: Record<string, { icon: React.ReactNode; text: string }[]> = {
  '1': [
    {
      icon: <Layers className="w-4 h-4 text-[#d8b46a]" />,
      text: 'Responsive catalog browsing, cart management & checkout for 50+ items',
    },
    {
      icon: <Zap className="w-4 h-4 text-sky-400" />,
      text: 'Client-side instant search & category sorting reducing drop-off by 30%',
    },
    {
      icon: <Code2 className="w-4 h-4 text-emerald-400" />,
      text: 'Connected RESTful APIs with structured React Hooks state management',
    },
    {
      icon: <TrendingUp className="w-4 h-4 text-purple-400" />,
      text: 'Next.js code splitting & lazy loading boosting First Contentful Paint by 28%',
    },
  ],
  '2': [
    {
      icon: <Layers className="w-4 h-4 text-[#d8b46a]" />,
      text: 'Commercial web platforms engineered in React & Next.js with 99.9% uptime',
    },
    {
      icon: <Zap className="w-4 h-4 text-sky-400" />,
      text: '100% pixel-perfect Figma translation across all mobile & desktop viewports',
    },
    {
      icon: <TrendingUp className="w-4 h-4 text-emerald-400" />,
      text: 'Smooth navigation menus & SCSS animations increasing session duration by 20%',
    },
    {
      icon: <Gauge className="w-4 h-4 text-purple-400" />,
      text: 'Core Web Vitals & semantic SEO architecture achieving 95+ Google Lighthouse',
    },
  ],
};

const metricBadges: Record<string, { label: string; value: string; color: string }> = {
  '1': {
    label: 'Performance Boost',
    value: '+28% FCP Speed',
    color: 'from-amber-500/20 to-[#d8b46a]/10 text-[#d8b46a] border-[#d8b46a]/30',
  },
  '2': {
    label: 'SEO & Quality',
    value: '95+ Lighthouse',
    color: 'from-emerald-500/20 to-teal-500/10 text-emerald-300 border-emerald-500/30',
  },
};

export const Projects: React.FC = () => {
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [mousePos, setMousePos] = useState<{ [key: string]: { x: number; y: number } }>({});
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos((prev) => ({
      ...prev,
      [id]: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      },
    }));
  };

  return (
    <section id="projects" className="py-24 sm:py-28 border-t border-white/10 bg-[#080c0e] text-white relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#d8b46a]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-purple-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-montserrat font-extrabold tracking-[0.16em] uppercase bg-[#d8b46a]/10 text-[#d8b46a] border border-[#d8b46a]/30 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Engineering Portfolio</span>
            </div>
            <h2 className="font-montserrat text-3xl sm:text-5xl font-black tracking-tight text-[#fffdf8]">
              Featured Projects
            </h2>
            <p className="mt-3 text-zinc-400 text-sm sm:text-base max-w-2xl font-normal leading-relaxed">
              Key production web applications and commercial platforms engineered with modern React, Next.js, and TypeScript architectures.
            </p>
          </div>

          <a
            href="https://github.com/Prince-123-code"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-montserrat font-bold text-zinc-200 hover:text-white transition-all self-start md:self-auto shrink-0"
          >
            <GithubIcon className="w-4 h-4 text-[#d8b46a]" />
            <span>View GitHub Profile</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
          </a>
        </div>

        {/* Featured Projects Grid (2 Big Showcase Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project: Project) => {
            const highlights = projectHighlights[project.id] || [];
            const metric = metricBadges[project.id];
            const currentMouse = mousePos[project.id] || { x: 0, y: 0 };
            const isHovered = hoveredId === project.id;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="h-full"
              >
                <div
                  onMouseMove={(e) => handleMouseMove(e, project.id)}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="relative h-full flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-[#0f131a]/90 hover:bg-[#131822]/95 border border-white/10 hover:border-[#d8b46a]/40 transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_60px_rgba(216,180,106,0.12)] group overflow-hidden"
                >
                  {/* Interactive Spotlight Glow */}
                  {isHovered && (
                    <div
                      className="pointer-events-none absolute -inset-px rounded-3xl transition duration-300 opacity-100"
                      style={{
                        background: `radial-gradient(420px circle at ${currentMouse.x}px ${currentMouse.y}px, rgba(216, 180, 106, 0.14), transparent 70%)`,
                      }}
                    />
                  )}

                  {/* Top Ambient Border Shimmer */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10 flex flex-col flex-1">
                    
                    {/* Header: Category & Metric Pill */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full text-[11px] font-montserrat font-extrabold tracking-wide uppercase bg-white/5 text-zinc-300 border border-white/10">
                        {project.category}
                      </span>
                      {metric && (
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-montserrat font-bold border bg-gradient-to-r ${metric.color}`}>
                          <Sparkles className="w-3 h-3" />
                          <span>{metric.value}</span>
                        </div>
                      )}
                    </div>

                    {/* Title & Tagline */}
                    <h3 className="font-montserrat text-2xl sm:text-3xl font-black text-white group-hover:text-[#fffdf8] transition-colors tracking-tight">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm font-medium text-[#d8b46a] leading-relaxed">
                      {project.tagline}
                    </p>

                    {/* Architectural Highlights */}
                    <div className="mt-6 space-y-2.5 flex-1">
                      {highlights.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 leading-normal">
                          <span className="mt-0.5 shrink-0">{item.icon}</span>
                          <span>{item.text}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="mt-6 pt-5 border-t border-white/[0.08] flex flex-wrap gap-1.5">
                      {project.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium bg-white/5 text-zinc-300 border border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                  </div>

                  {/* Card Actions */}
                  <div className="relative z-10 mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
                    <button
                      onClick={() => setActiveModalProject(project)}
                      className="inline-flex items-center gap-1.5 text-xs font-montserrat font-bold text-zinc-300 hover:text-white transition-colors py-2 px-3 rounded-xl hover:bg-white/5 cursor-pointer"
                    >
                      <span>Architecture Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#d8b46a]" />
                    </button>

                    <a
                      href={project.githubUrl || 'https://github.com/Prince-123-code'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#f6d98e] to-[#d3a956] text-zinc-950 font-montserrat text-xs font-black shadow-[0_4px_20px_rgba(216,180,106,0.25)] hover:shadow-[0_6px_25px_rgba(216,180,106,0.4)] transition-all cursor-pointer"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>View Code</span>
                    </a>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Deep-Dive Project Modal */}
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
              className="relative w-full max-w-xl rounded-3xl bg-[#0f131a] border border-white/15 p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.85)] z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalProject(null)}
                aria-label="Close modal"
                className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="pr-8 mb-5">
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold font-montserrat bg-[#d8b46a]/10 text-[#d8b46a] border border-[#d8b46a]/30 uppercase tracking-wider mb-2">
                  {activeModalProject.category} Architecture
                </span>
                <h3 className="font-montserrat font-black text-2xl sm:text-3xl text-white">
                  {activeModalProject.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-1 font-mono">
                  {activeModalProject.metrics}
                </p>
              </div>

              {/* Description Body */}
              <div className="space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin">
                <p className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-zinc-200">
                  {activeModalProject.description}
                </p>

                {/* Highlights List */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-montserrat font-bold text-white uppercase tracking-wider block mb-2">
                    Key Deliverables & Engineering Outcomes:
                  </span>
                  {(projectHighlights[activeModalProject.id] || []).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>

                {/* Technology Badges */}
                <div className="pt-3">
                  <span className="text-xs font-montserrat font-bold text-white uppercase tracking-wider block mb-2">
                    Technologies & Tools:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeModalProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-white/5 border border-white/10 text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between gap-3">
                <a
                  href={activeModalProject.githubUrl || 'https://github.com/Prince-123-code'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 hero-primary-button text-xs py-2.5"
                >
                  <GithubIcon className="w-4 h-4 mr-1.5" />
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                </a>

                <button
                  onClick={() => setActiveModalProject(null)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-montserrat font-bold text-zinc-300 hover:text-white transition-all cursor-pointer"
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
