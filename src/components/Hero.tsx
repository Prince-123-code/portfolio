import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { Download, Award, CheckCircle2, ArrowRight, ArrowUpRight, X, Gauge } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { motion, AnimatePresence } from 'framer-motion';

export const Hero: React.FC = () => {
  const [showAuditModal, setShowAuditModal] = useState(false);

  const marqueeItems = [
    'React 19',
    'Next.js 15 (App Router)',
    'TypeScript',
    'Tailwind CSS',
    'RESTful APIs',
    'NestJS & Prisma ORM',
    '92+ Lighthouse Performance',
    'Context API & Hooks',
    'Core Web Vitals',
    'Mobile-First Architecture',
    'Nerdylabs Web Dev',
  ];

  const stats = [
    { label: 'Lighthouse Score', value: '92+' },
    { label: 'Production Sites', value: '33+' },
    { label: 'Reusable Primitives', value: '25+' },
    { label: 'Mobile Fidelity', value: '100%' },
  ];

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-between pt-20 sm:pt-24 lg:pt-28 pb-6 overflow-hidden bg-[#080c0e] text-white">
      {/* Dynamic Ambient Background Glow */}
      <div className="absolute top-1/4 -left-32 w-[550px] h-[550px] bg-gradient-to-tr from-[#d8b46a]/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] bg-gradient-to-bl from-[#d8b46a]/5 to-transparent rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-sky-500/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      {/* Main Integrated Hero Content */}
      <div className="max-w-[1240px] w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center relative z-10 mt-3 sm:mt-6 lg:mt-8 mb-6 sm:mb-8">
        
        {/* Left Column: Bold Typography & Actions (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-start pt-2 lg:pt-0">
          
          {/* Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-montserrat font-extrabold tracking-[0.16em] uppercase bg-white/5 text-[#d8b46a] border border-white/10 mb-4 sm:mb-5 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{personalInfo.badge}</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-300">Nerdylabs • Madurai</span>
          </motion.div>

          {/* Main Name & Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-2"
          >
            <h1 className="font-montserrat text-[clamp(2.4rem,7.5vw,5.4rem)] font-black text-[#fffdf8] leading-[0.95] tracking-tight">
              {personalInfo.name}
            </h1>
            <p className="font-montserrat text-lg sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f6d98e] via-[#d8b46a] to-[#d3a956] tracking-tight">
              Frontend Developer & Next.js Specialist
            </p>
          </motion.div>

          {/* Subtitle / Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-5 text-base sm:text-lg text-zinc-300 font-normal leading-relaxed max-w-[620px]"
          >
            Results-driven Frontend Developer with <strong className="text-white font-semibold">8 months of industry experience</strong> building responsive, user-friendly web applications across{' '}
            <strong className="text-white font-semibold">React.js</strong>,{' '}
            <strong className="text-white font-semibold">Next.js</strong>,{' '}
            <strong className="text-white font-semibold">TypeScript</strong>, and{' '}
            <strong className="text-white font-semibold">Tailwind CSS</strong>. Experienced in RESTful APIs, collaborating with backend engineers on{' '}
            <strong className="text-[#d8b46a] font-semibold">NestJS & Prisma ORM</strong>, and optimizing Core Web Vitals to{' '}
            <strong className="text-[#d8b46a] font-semibold">90+ Google Lighthouse scores</strong>.
          </motion.p>

          {/* Action Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            {/* Primary Liquid-Gold Button */}
            <a href="#projects" className="hero-primary-button group">
              Explore My Work
              <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </a>

            {/* Secondary Glass Pill */}
            <a href="#contact" className="hero-secondary-button">
              Let's Talk
            </a>

            {/* Direct CV Download */}
            <a
              href={personalInfo.resumeUrl}
              download="Prince_T_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-white font-medium text-sm transition-colors py-2 px-3"
            >
              <Download className="w-4 h-4 text-[#d8b46a]" />
              Download CV
            </a>

            {/* Social Links (GitHub & LinkedIn) */}
            <div className="flex items-center gap-2 pl-2 border-l border-white/10">
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 hover:border-[#d8b46a]/40 transition-all hover:scale-105"
                title="GitHub: Prince-123-code"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 hover:border-[#d8b46a]/40 transition-all hover:scale-105"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Integrated Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-10 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 w-full"
          >
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="font-montserrat text-2xl sm:text-3xl font-black text-[#fffdf8] tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs text-zinc-400 mt-1 font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

        </div>

        {/* Right Column: Seamless Natural Portrait (NO CARD CONTAINER, NO BORDER, NO CARD BACKGROUND) */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-end relative select-none">
          
          <div className="relative w-full max-w-[420px] sm:max-w-[460px] flex flex-col items-center">
            
            {/* Ambient Golden Halo Glow behind Portrait */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-gradient-to-tr from-[#d8b46a]/25 via-amber-500/15 to-transparent blur-[110px] pointer-events-none animate-pulse" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-gradient-to-b from-[#f6d98e]/15 to-transparent blur-[90px] pointer-events-none" />

            {/* Seamless Natural Portrait Image with Edge and Bottom Overlays */}
            <motion.div
              animate={{
                y: [-6, 6, -6],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative z-10 w-full flex items-end justify-center"
            >
              <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_bottom,black_86%,transparent_100%)]">
                <img
                  src="/prince-seamless.png"
                  alt="Prince T - Frontend Developer"
                  loading="eager"
                  className="w-full h-auto max-h-[600px] object-cover object-top select-none pointer-events-none filter contrast-[1.03] brightness-[1.01] drop-shadow-[0_20px_60px_rgba(216,180,106,0.22)]"
                />

                {/* Bottom Waistline Dissolve: Softens the bottom edge into #080c0e */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#080c0e] via-[#080c0e]/80 to-transparent pointer-events-none z-10" />
              </div>
            </motion.div>

            {/* Interactive Lighthouse Audit Pill (Placed cleanly below portrait, NOT pinning corners of a card) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              onClick={() => setShowAuditModal(true)}
              className="mt-3 w-full max-w-[360px] p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#d8b46a]/50 transition-all cursor-pointer group shadow-xl backdrop-blur-md"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#d8b46a]/15 border border-[#d8b46a]/30 flex items-center justify-center text-[#d8b46a] shrink-0 group-hover:scale-105 transition-transform">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-montserrat text-xs font-bold text-white flex items-center gap-1.5">
                      92+ Google Lighthouse
                    </div>
                    <div className="text-[11px] text-zinc-400">
                      Core Web Vitals • <span className="text-[#d8b46a] font-medium underline">View Audit</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[10px] font-bold font-montserrat px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shrink-0">
                  Top Speed
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </motion.div>

          </div>

        </div>

      </div>

      {/* Marquee Ticker */}
      <div className="mt-8 pt-6 border-t border-white/10 overflow-hidden relative select-none w-full">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#08090d] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#08090d] to-transparent z-10 pointer-events-none" />
        
        <div className="flex gap-8 whitespace-nowrap animate-marquee">
          {[...marqueeItems, ...marqueeItems].map((item, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-2 text-xs font-montserrat font-bold text-zinc-400 uppercase tracking-widest"
            >
              <span className="text-[#d8b46a]">✦</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Lighthouse Audit Modal */}
      <AnimatePresence>
        {showAuditModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md p-6 rounded-3xl bg-[#0d1016] border border-white/15 shadow-2xl text-white"
            >
              <button
                onClick={() => setShowAuditModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-[#d8b46a]/15 text-[#d8b46a]">
                  <Gauge className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-montserrat text-lg font-black text-white">
                    Google Lighthouse Audit
                  </h3>
                  <p className="text-xs text-zinc-400">Verified Production Metrics</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 my-5">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div className="font-montserrat text-3xl font-black text-emerald-400">92</div>
                  <div className="text-xs text-zinc-300 mt-1 font-semibold">Performance</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div className="font-montserrat text-3xl font-black text-emerald-400">96</div>
                  <div className="text-xs text-zinc-300 mt-1 font-semibold">Accessibility</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div className="font-montserrat text-3xl font-black text-emerald-400">95</div>
                  <div className="text-xs text-zinc-300 mt-1 font-semibold">Best Practices</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div className="font-montserrat text-3xl font-black text-emerald-400">100</div>
                  <div className="text-xs text-zinc-300 mt-1 font-semibold">SEO & Meta</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Sub-second initial paint, lazy asset minification, and zero layout shift.</span>
              </div>

              <button
                onClick={() => setShowAuditModal(false)}
                className="mt-5 w-full hero-primary-button"
              >
                Close Audit View
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
