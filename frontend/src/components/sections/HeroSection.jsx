```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ChevronDown,
  Trophy,
  Users,
  Calendar,
  Sparkles,
} from 'lucide-react';
import Button from '../ui/Button';
import { useWebsiteConfig } from '../../context/WebsiteConfigContext';

export const HeroSection = () => {
  const { config } = useWebsiteConfig();
  const hero = config?.hero || {};
  const general = config?.general || {};

  const scrollToSection = (id) => {
    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-white pt-24 pb-12 sm:pt-28 sm:pb-16">
      {/* Soft decorative shapes */}
      <div className="absolute -top-32 -right-32 h-72 w-72 rounded-full bg-yellow-300/30 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-32 h-64 w-64 rounded-full bg-yellow-200/30 blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Main Hero */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">

          {/* LEFT — Content */}
          <div className="lg:col-span-6 xl:col-span-6">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold uppercase tracking-wide text-slate-700"
            >
              <span className="h-2 w-2 rounded-full bg-yellow-400" />
              {hero.badgeText || general.editionTag || 'National IT Competition 2026'}
            </motion.div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl">
                {hero.headlineLine1 || 'BUILD THE'}
                <br />

                <span className="relative inline-block">
                  <span className="relative z-10">
                    {hero.headlineLine2 || 'FUTURE.'}
                  </span>

                  {/* Yellow highlight */}
                  <span className="absolute bottom-1 left-0 -z-0 h-3 w-full bg-yellow-300 sm:h-4" />
                </span>

                <br />

                <span className="text-slate-500">
                  {hero.headlineAccent || 'CREATE THE IMPACT.'}
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg"
            >
              {hero.description ||
                'Wadah bagi mahasiswa dan pelajar untuk berkompetisi, berinovasi, dan menciptakan solusi teknologi untuk masa depan.'}
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                to={hero.primaryCtaLink || '/register'}
                className="w-full sm:w-auto"
              >
                <Button
                  variant="glow"
                  size="lg"
                  className="w-full gap-2 border-0 bg-yellow-400 text-slate-950 shadow-[0_8px_25px_rgba(250,204,21,0.25)] transition-all hover:bg-yellow-300 hover:shadow-[0_10px_30px_rgba(250,204,21,0.35)] sm:w-auto"
                >
                  <span>
                    {hero.primaryCtaText || 'Daftar Sekarang'}
                  </span>

                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>

              <Button
                variant="secondary"
                size="lg"
                onClick={() => {
                  if (hero.secondaryCtaLink?.startsWith('#')) {
                    scrollToSection(
                      hero.secondaryCtaLink.substring(1)
                    );
                  } else {
                    scrollToSection('competitions');
                  }
                }}
                className="w-full border border-slate-300 bg-white text-slate-800 transition-all hover:border-slate-400 hover:bg-slate-50 sm:w-auto"
              >
                <Sparkles className="h-4 w-4 text-yellow-500" />

                <span>
                  {hero.secondaryCtaText ||
                    'Eksplorasi Cabang Lomba'}
                </span>
              </Button>
            </motion.div>

            {/* Small information */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-500
