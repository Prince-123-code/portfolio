import React from 'react';
import { personalInfo, education } from '../data/portfolioData';
import { Zap, ShieldCheck, Code2, Server } from 'lucide-react';
import { GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
  const pillars = [
    {
      icon: <Zap className="w-5 h-5 text-[#d8b46a]" />,
      title: 'Performance & Web Vitals',
      description: 'Proven track record of optimizing page speed and Core Web Vitals to 90+ Google Lighthouse scores using lazy loading, asset minification, and code splitting.',
    },
    {
      icon: <Code2 className="w-5 h-5 text-sky-400" />,
      title: 'Modular React & Next.js',
      description: 'Built 25+ modular, reusable React UI components with React Hooks, Context API, and TypeScript, accelerating delivery cycles by 25%.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      title: 'RESTful API Integration',
      description: 'Integrated 10+ RESTful API endpoints using Axios and Fetch API with comprehensive error boundaries and structured client-server data flow.',
    },
    {
      icon: <Server className="w-5 h-5 text-indigo-400" />,
      title: 'Full-Stack Collaboration',
      description: 'Partnered with backend engineers on NestJS, Prisma ORM, and MySQL architectures to understand API workflows and support full-stack delivery.',
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-24 border-t border-white/10 bg-[#080c0e] text-white">
      <div className="max-w-[1180px] mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col items-start mb-10">
          <span className="font-montserrat text-[#d8b46a] text-xs sm:text-sm font-extrabold tracking-[0.18em] uppercase mb-2">
            Engineering Background
          </span>
          <h2 className="font-montserrat text-3xl sm:text-5xl font-black tracking-tight text-[#fffdf8]">
            About & Technical Pillars
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Narrative Column */}
          <div className="lg:col-span-7 space-y-5 text-zinc-300 text-base sm:text-lg leading-relaxed font-normal">
            <p className="text-[#edf1f4]">
              {personalInfo.bio}
            </p>
            <p className="text-zinc-400">
              Currently engineering web applications as a <strong className="text-white font-semibold">Trainee Web Developer at Nerdylabs</strong> in Madurai, converting complex design prototypes into accessible, high-performance web interfaces with 100% mobile-first fidelity and sub-second load times.
            </p>

            {/* Education Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 p-6 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#d8b46a]/15 border border-[#d8b46a]/30 text-[#d8b46a] shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-montserrat text-xs font-bold text-[#d8b46a] uppercase tracking-wider">
                    Education
                  </span>
                  <h3 className="font-montserrat text-base sm:text-lg font-bold text-white mt-0.5">
                    {education.degree}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                    {education.institution} • {education.location}
                  </p>
                </div>
              </div>
              <div className="sm:text-right shrink-0">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold font-montserrat bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {education.score}
                </span>
                <div className="text-xs text-zinc-500 mt-1 font-mono">{education.period}</div>
              </div>
            </motion.div>
          </div>

          {/* Pillars Column */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {pillar.icon}
                  </div>
                  <h3 className="font-montserrat font-bold text-white text-sm">
                    {pillar.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
