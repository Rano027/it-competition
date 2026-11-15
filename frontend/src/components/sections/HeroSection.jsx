import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  ChevronDown,
  Trophy,
  Users,
  Calendar,
  ShieldCheck,
} from 'lucide-react';
import { useWebsiteConfig } from '../../context/WebsiteConfigContext';

export const HeroSection = () => {
  const { config } = useWebsiteConfig();

  const hero = config?.hero || {};
  const general = config?.general || {};

  const scrollToSection = (id) => {
    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-white pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-yellow-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-yellow-100/50 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Main Hero */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">

          {/* LEFT CONTENT */}
          <div className="lg:col-span-7">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-600"
            >
              <span className="h-2 w-2 rounded-full bg-yellow-400" />

              <span>
                {hero.badgeText ||
                  general.editionTag ||
                  'EDITION 2026 // NATIONAL TECHFEST'}
              </span>

              <span className="hidden text-slate-300 sm:inline">
                //
              </span>

              <span className="hidden text-slate-400 sm:inline">
                {general.editionType || 'HYBRID FESTIVAL'}
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="max-w-4xl text-5xl font-black leading-[0.98] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl xl:text-8xl">

                {hero.headlineLine1 || 'SHAPE THE'}

                <br />

                {hero.headlineLine2 || 'FUTURE OF'}

                <br />

                <span className="relative inline-block">
                  <span className="relative z-10 text-slate-950">
                    {hero.headlineAccent || 'INNOVATION.'}
                  </span>

                  {/* Yellow Highlight */}
                  <span className="absolute bottom-1 left-0 right-0 -z-0 h-3 bg-yellow-300 sm:h-4" />
                </span>

              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg"
            >
              {hero.description ||
                'Kompetisi teknologi informasi dan festival inovasi digital bergengsi se-Indonesia. Kembangkan solusi digital berdampak tinggi, raih prize pool puluhan juta rupiah, dan perluas jejaring profesional.'}
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              {/* Primary CTA */}
              <Link
                to={hero.primaryCtaLink || '/register'}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-400 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-[0_8px_25px_rgba(250,204,21,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-yellow-300 hover:shadow-[0_12px_30px_rgba(250,204,21,0.35)] sm:w-auto"
              >
                <span>
                  {hero.primaryCtaText || 'Daftar Sekarang'}
                </span>

                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              {/* Secondary CTA */}
              <button
                type="button"
                onClick={() => {
                  if (hero.secondaryCtaLink?.startsWith('#')) {
                    scrollToSection(
                      hero.secondaryCtaLink.substring(1)
                    );
                  } else {
                    scrollToSection('competitions');
                  }
                }}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50 sm:w-auto"
              >
                <Sparkles className="h-4 w-4 text-yellow-500 transition-transform group-hover:rotate-12" />

                <span>
                  {hero.secondaryCtaText ||
                    'Eksplorasi Cabang Lomba'}
                </span>
              </button>
            </motion.div>

            {/* Trust / Status */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-500"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-yellow-500" />

                <span>
                  Terakreditasi Institusi Resmi
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />

                <span>
                  Portal Pendaftaran Aktif
                </span>
              </div>
            </motion.div>

          </div>

          {/* RIGHT VISUAL */}
          <div className="lg:col-span-5">

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative mx-auto max-w-lg"
            >

              {/* Main Visual Placeholder */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-xl">

                {/* Yellow Decorative Shape */}
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-yellow-300/70" />

                <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-yellow-200/60" />

                {/* Temporary Placeholder */}
                <div className="relative flex h-full flex-col items-center justify-center p-8 text-center">

                  <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-yellow-400 shadow-lg">
                    <span className="text-3xl font-black text-slate-950">
                      N
                    </span>
                  </div>

                  <p className="text-sm font-bold uppercase tracking-widest text-slate-400">
                    NEXUS ITC 2026
                  </p>

                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-500">
                    Visual event / campus photo akan ditempatkan di area ini.
                  </p>

                </div>
              </div>

              {/* Floating Info Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -bottom-5 -left-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-xl sm:-left-6"
              >
                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-100">
                    <Trophy className="h-5 w-5 text-yellow-600" />
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Total Prize Pool
                    </p>

                    <p className="text-base font-black text-slate-900">
                      {hero.highlightStats?.[0]?.value ||
                        'Rp 50.000.000+'}
                    </p>
                  </div>

                </div>
              </motion.div>

            </motion.div>

          </div>

        </div>

        {/* EVENT STATS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 gap-4 border-t border-slate-200 pt-8 lg:grid-cols-4 lg:gap-8"
        >

          {/* Stat 1 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:-translate-y-1 hover:shadow-md sm:p-5">
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              <Trophy className="h-4 w-4 text-yellow-500" />

              <span>
                {hero.highlightStats?.[0]?.label ||
                  'Total Hadiah'}
              </span>
            </div>

            <p className="text-xl font-black text-slate-900 sm:text-2xl">
              {hero.highlightStats?.[0]?.value ||
                'Rp 50.000.000+'}
            </p>
          </div>

          {/* Stat 2 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:-translate-y-1 hover:shadow-md sm:p-5">
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              <Users className="h-4 w-4 text-yellow-500" />

              <span>
                {hero.highlightStats?.[1]?.label ||
                  'Target Peserta'}
              </span>
            </div>

            <p className="text-xl font-black text-slate-900 sm:text-2xl">
              {hero.highlightStats?.[1]?.value ||
                '1.500+'}
            </p>
          </div>

          {/* Stat 3 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:-translate-y-1 hover:shadow-md sm:p-5">
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              <Calendar className="h-4 w-4 text-yellow-500" />

              <span>
                Periode Acara
              </span>
            </div>

            <p className="text-xl font-black text-slate-900 sm:text-2xl">
              {general.eventDates ||
                'November 2026'}
            </p>
          </div>

          {/* Stat 4 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:-translate-y-1 hover:shadow-md sm:p-5">
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              <Sparkles className="h-4 w-4 text-yellow-500" />

              <span>
                {hero.highlightStats?.[2]?.label ||
                  'Dewan Juri'}
              </span>
            </div>

            <p className="text-xl font-black text-slate-900 sm:text-2xl">
              {hero.highlightStats?.[2]?.value ||
                '12 Juri'}
            </p>
          </div>

        </motion.div>

        {/* Scroll Indicator */}
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => scrollToSection('about')}
            className="group flex flex-col items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-slate-400 transition-colors hover:text-slate-700"
            aria-label="Scroll to About section"
          >
            <span>Eksplorasi</span>

            <ChevronDown className="h-4 w-4 animate-bounce text-yellow-500 transition-colors group-hover:text-yellow-600" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;