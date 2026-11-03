import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Trophy,
  Users,
  Building2,
  Sparkles,
  Code2,
  Lightbulb,
} from 'lucide-react';
import { useWebsiteConfig } from '../../context/WebsiteConfigContext';

const HeroSection = () => {
  const { config } = useWebsiteConfig();

  const hero = config?.hero || {};
  const general = config?.general || {};

  const stats = [
    {
      icon: Trophy,
      value: '6',
      label: 'Cabang Kompetisi',
    },
    {
      icon: Users,
      value: '1.200+',
      label: 'Peserta Nasional',
    },
    {
      icon: Building2,
      value: '50+',
      label: 'Universitas & Sekolah',
    },
    {
      icon: Trophy,
      value: 'Rp 50.000.000+',
      label: 'Total Hadiah',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white pt-24 sm:pt-28">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 top-20 h-72 w-72 rounded-full bg-yellow-200/40 blur-3xl" />

        <div className="absolute -left-40 top-[45%] h-80 w-80 rounded-full bg-yellow-100/70 blur-3xl" />

        <div className="absolute right-[38%] top-24 h-24 w-24 rotate-12 bg-yellow-300/70" />

        <div className="absolute bottom-20 left-[8%] h-16 w-16 rotate-45 bg-yellow-200/60" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* ================= HERO ================= */}
        <div className="grid items-center gap-10 pb-12 pt-8 lg:grid-cols-12 lg:gap-8 lg:pb-16">

          {/* LEFT CONTENT */}
          <div className="lg:col-span-6">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.08em] text-slate-700 sm:text-sm"
            >
              <span className="h-1.5 w-8 bg-yellow-400" />
              <span>
                {hero.badgeText ||
                  general.editionTag ||
                  'National IT Competition'}
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-3xl text-4xl font-black leading-[1.02] tracking-[-0.04em] text-slate-950 sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl"
            >
              {hero.headlineLine1 || 'Build Ideas.'}
              <br />

              <span>
                {hero.headlineLine2 || 'Create Solutions.'}
              </span>

              <br />

              <span className="relative inline-block">
                <span className="relative z-10">
                  {hero.headlineAccent || 'Make an Impact.'}
                </span>

                {/* Yellow highlight */}
                <span className="absolute bottom-1 left-0 -z-0 h-3 w-full bg-yellow-400 sm:h-4 lg:h-5" />
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8"
            >
              {hero.description ||
                'Kompetisi teknologi informasi dan festival inovasi digital untuk generasi muda Indonesia.'}
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-7 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                to={hero.primaryCtaLink || '/register'}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-yellow-400 px-7 py-3.5 text-sm font-bold text-slate-950 shadow-[0_8px_25px_rgba(250,204,21,0.25)] transition-all hover:-translate-y-0.5 hover:bg-yellow-300 hover:shadow-[0_12px_30px_rgba(250,204,21,0.35)] sm:w-auto"
              >
                {hero.primaryCtaText || 'Daftar Sekarang'}

                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to={hero.secondaryCtaLink || '/competitions'}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-slate-900 bg-white px-7 py-3.5 text-sm font-bold text-slate-900 transition-all hover:-translate-y-0.5 hover:bg-slate-50 sm:w-auto"
              >
                <Sparkles className="h-4 w-4 text-yellow-500" />

                {hero.secondaryCtaText || 'Lihat Kompetisi'}
              </Link>
            </motion.div>
          </div>

          {/* RIGHT VISUAL */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative lg:col-span-6"
          >
            <div className="relative mx-auto max-w-xl">

              {/* Yellow geometric background */}
              <div className="absolute right-4 top-0 h-full w-[78%] bg-yellow-400 sm:right-8" />

              <div className="absolute -left-3 bottom-8 z-20 h-20 w-20 rotate-45 bg-yellow-300 sm:h-28 sm:w-28" />

              {/* Main image frame */}
              <div className="relative z-10 ml-auto aspect-[4/4.2] w-[88%] overflow-hidden rounded-[2rem] bg-slate-200 shadow-2xl sm:rounded-[2.5rem]">

                {/* Temporary placeholder */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-200 via-slate-100 to-white text-center">
                  <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-yellow-400 shadow-lg">
                    <Code2 className="h-10 w-10 text-slate-950" />
                  </div>

                  <p className="text-lg font-black text-slate-900">
                    ITC'26
                  </p>

                  <p className="mt-1 text-xs font-medium uppercase tracking-widest text-slate-500">
                    Future Campus
                  </p>
                </div>

                {/* Real hero image — upload later */}
                <img
                  src="/images/hero.jpg"
                  alt="IT Competition participant"
                  className="absolute inset-0 h-full w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.style.display = 'none';
                  }}
                />

                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-white/10" />
              </div>

              {/* Floating ITC card */}
              <div className="absolute bottom-7 left-0 z-30 rounded-2xl bg-white px-5 py-4 shadow-xl sm:bottom-10 sm:left-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-400">
                    <Lightbulb className="h-5 w-5 text-slate-950" />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-900">
                      ITC'26
                    </p>

                    <p className="text-[10px] text-slate-500">
                      IT Competition
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating code card */}
              <div className="absolute right-0 top-8 z-30 flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-300 shadow-lg sm:right-2 sm:top-12">
                <Code2 className="h-6 w-6 text-slate-950" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* ================= STATS ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-20 mb-12 grid grid-cols-2 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.08)] lg:grid-cols-4"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className={`flex items-center gap-3 px-4 py-5 sm:px-6 sm:py-6 ${
                  index !== 0
                    ? 'border-t border-slate-100 lg:border-l lg:border-t-0'
                    : ''
                } ${
                  index === 2
                    ? 'lg:border-l'
                    : ''
                }`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-100 sm:h-11 sm:w-11">
                  <Icon className="h-5 w-5 text-yellow-700" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-base font-black text-slate-950 sm:text-xl">
                    {stat.value}
                  </p>

                  <p className="mt-0.5 text-[10px] font-medium text-slate-500 sm:text-xs">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>

      </div>

      {/* Bottom decorative shape */}
      <div className="absolute bottom-0 right-0 h-24 w-24 translate-x-10 translate-y-10 rotate-45 bg-yellow-300/70" />
    </section>
  );
};

export default HeroSection;
