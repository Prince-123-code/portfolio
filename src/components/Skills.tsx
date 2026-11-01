import React from 'react';
import { skillCategories } from '../data/portfolioData';
import { Code2, Palette, Database, Wrench, Server, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export const Skills: React.FC = () => {
  const getCategoryIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Palette className="w-5 h-5 text-[#d8b46a]" />;
      case 1:
        return <Code2 className="w-5 h-5 text-amber-400" />;
      case 2:
        return <Server className="w-5 h-5 text-sky-400" />;
      case 3:
        return <Database className="w-5 h-5 text-emerald-400" />;
      case 4:
        return <Wrench className="w-5 h-5 text-purple-400" />;
      case 5:
      default:
        return <Zap className="w-5 h-5 text-rose-400" />;
    }
  };

  return (
    <section id="skills" className="py-20 sm:py-24 border-t border-white/10 bg-[#080c0e] text-white">
      <div className="max-w-[1240px] mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col items-start mb-12">
          <span className="font-montserrat text-[#d8b46a] text-xs sm:text-sm font-extrabold tracking-[0.18em] uppercase mb-2">
            Technical Stack
          </span>
          <h2 className="font-montserrat text-3xl sm:text-5xl font-black tracking-tight text-[#fffdf8]">
            Skills & Proficiencies
          </h2>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base max-w-2xl">
            Core technologies, libraries, and tools utilized in architecting modern full-stack frontend applications.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((group, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 flex flex-col transition-all"
            >
              <div className="flex items-center gap-3 pb-4 mb-4 border-b border-white/10">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 shadow-xs">
                  {getCategoryIcon(idx)}
                </div>
                <h3 className="font-montserrat font-extrabold text-white text-base">
                  {group.category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.items.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="flex items-center justify-between gap-3 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-zinc-200 hover:border-[#d8b46a]/40 transition-colors"
                  >
                    <span>{skill.name}</span>
                    {skill.level && (
                      <span className="font-montserrat text-[10px] text-[#d8b46a] font-bold px-1.5 py-0.5 rounded bg-[#d8b46a]/10">
                        {skill.level}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
