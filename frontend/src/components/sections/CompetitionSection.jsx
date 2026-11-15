
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layout,
  Code2,
  Terminal,
  ShieldCheck,
  BarChart3,
  BookOpen,
  ArrowRight,
  Trophy,
  Users,
  ArrowUpRight,
} from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import { COMPETITIONS_DATA } from '../../data/festivalData';

const iconMap = {
  Layout,
  Code2,
  Terminal,
  ShieldCheck,
  BarChart3,
  BookOpen,
};

export const CompetitionSection = () => {
  const [filter, setFilter] = useState('all');

  const filterTabs = [
    { id: 'all', label: 'Semua Lomba' },
    { id: 'mahasiswa', label: 'Jenjang Mahasiswa' },
    { id: 'sma', label: 'Jenjang SMA/SMK' },
  ];

  const filteredCompetitions = COMPETITIONS_DATA.filter((comp) => {
    if (filter === 'all') return true;
    if (filter === 'mahasiswa') {
      return comp.target_level === 'mahasiswa' || comp.target_level === 'all';
    }
    if (filter === 'sma') {
      return comp.target_level === 'sma' || comp.target_level === 'all';
    }
    return true;
  });

  return (
    <section
      id="competitions"
      className="relative overflow-hidden border-b border-slate-200 bg-slate-50 py-24 sm:py-32"
    >
      {/* Decorative Background */}
      <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-yellow-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-yellow-100/50 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl space-y-14 px-4 sm:px-6 lg:px-8">

        {/* Section Heading & Filter */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            badge="// 03. COMPETITIONS"
            title="Cabang Lomba"
            highlight="Resmi 2026"
            description="Pilih cabang kompetisi sesuai minat keahlian dan jenjang pendidikan Anda. Seluruh cabang menyediakan panduan teknis dan rubrik terbuka."
            align="left"
          />

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 self-start rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm md:self-end">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`rounded-xl px-4 py-2.5 text-xs font-semibold transition-all duration-200 sm:text-sm ${
                  filter === tab.id
                    ? 'bg-yellow-400 text-slate-950 shadow-sm'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Competition Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredCompetitions.map((comp) => {
              const IconComponent = iconMap[comp.icon] || Layout;

              return (
                <motion.div
                  key={comp.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400 hover:shadow-xl sm:p-7"
                >
                  {/* Decorative Corner */}
                  <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-yellow-100/70 transition-transform duration-300 group-hover:scale-125" />

                  <div className="relative z-10">
                    {/* Top Meta */}
                    <div className="mb-6 flex items-center justify-between gap-2">
                      <span className="rounded-lg border border-yellow-200 bg-yellow-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-yellow-800">
                        {comp.category_label}
                      </span>

                      <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-semibold text-slate-600">
                        {comp.target_level_label}
                      </span>
                    </div>

                    {/* Icon & Title */}
                    <div className="mb-4 flex items-start gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-yellow-200 bg-yellow-100 text-yellow-700 transition-all duration-300 group-hover:border-yellow-400 group-hover:bg-yellow-400 group-hover:text-slate-950">
                        <IconComponent className="h-6 w-6" />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-xl font-bold leading-snug text-slate-900 transition-colors group-hover:text-yellow-700">
                          {comp.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-slate-600">
                      {comp.shortDescription}
                    </p>
                  </div>

                  {/* Bottom Stats & Action */}
                  <div className="relative z-10 space-y-4 border-t border-slate-100 pt-4">
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-1.5 font-semibold text-yellow-700">
                        <Trophy className="h-4 w-4 text-yellow-500" />
                        <span>Hadiah: {comp.prizePool}</span>
                      </div>

                      <div className="flex items-center gap-1 text-slate-500">
                        <Users className="h-4 w-4" />
                        <span>{comp.team_format}</span>
                      </div>
                    </div>

                    {/* Detail Link */}
                    <Link
                      to={`/competitions/${comp.slug}`}
                      className="group/btn inline-flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-700 transition-all duration-200 hover:border-yellow-400 hover:bg-yellow-400 hover:text-slate-950 sm:text-sm"
                    >
                      <span>Lihat Rincian & Ketentuan</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredCompetitions.length === 0 && (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-16 text-center">
            <p className="font-semibold text-slate-700">
              Belum ada kompetisi untuk kategori ini.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Silakan pilih kategori lainnya.
            </p>
          </div>
        )}

        {/* Secondary Action */}
        <div className="pt-4 text-center">
          <Link to="/competitions">
            <Button
              variant="secondary"
              size="md"
              className="gap-2 border border-slate-300 bg-white text-slate-800 transition-all hover:border-yellow-400 hover:bg-yellow-50"
            >
              <span>Buka Katalog Lengkap 6 Cabang Lomba</span>
              <ArrowRight className="h-4 w-4 text-yellow-600" />
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default CompetitionSection;
