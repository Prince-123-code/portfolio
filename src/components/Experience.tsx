import React from 'react';
import { experiences } from '../data/portfolioData';
import { Calendar, MapPin, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 sm:py-24 border-t border-white/10 bg-[#080c0e] text-white">
      <div className="max-w-[1180px] mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col items-start mb-12">
          <span className="font-montserrat text-[#d8b46a] text-xs sm:text-sm font-extrabold tracking-[0.18em] uppercase mb-2">
            Work Experience
          </span>
          <h2 className="font-montserrat text-3xl sm:text-5xl font-black tracking-tight text-[#fffdf8]">
            Industry Experience & Milestones
          </h2>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base max-w-2xl">
            Track record of shipping production-ready web interfaces, connecting RESTful APIs, and optimizing Core Web Vitals to 90+ Lighthouse audits.
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-3 sm:before:left-4 before:w-0.5 before:bg-white/10">
          {experiences.map((exp) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative pl-8 sm:pl-12 group"
            >
              {/* Timeline Indicator */}
              <div className="absolute left-1.5 sm:left-2.5 top-3 -translate-x-1/2 w-4 h-4 rounded-full bg-[#080c0e] border-2 border-[#d8b46a] group-hover:scale-125 transition-transform shadow-[0_0_12px_rgba(216,180,106,0.6)]" />

              <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all">
                {/* Header Info */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  <div>
                    <h3 className="font-montserrat text-lg sm:text-2xl font-black text-white flex flex-wrap items-center gap-2">
                      <Briefcase className="w-5 h-5 text-[#d8b46a] shrink-0" />
                      <span>{exp.role}</span>
                      <span className="text-zinc-500 font-normal">@</span>
                      <span className="text-[#d8b46a]">{exp.company}</span>
                    </h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-semibold text-zinc-400 font-mono">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#d8b46a]" />
                      {exp.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#d8b46a]" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Bullets */}
                <ul className="mt-5 space-y-3 text-sm text-zinc-300">
                  {exp.description.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 leading-relaxed">
                      <span className="text-[#d8b46a] text-lg leading-none select-none mt-0.5">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Skills tags */}
                <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap gap-2">
                  {exp.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg text-xs font-medium bg-white/5 text-zinc-200 border border-white/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
