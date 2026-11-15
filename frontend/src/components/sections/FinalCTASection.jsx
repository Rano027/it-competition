
import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Rocket,
  Trophy,
} from 'lucide-react';

export const FinalCTASection = () => {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50 py-24 sm:py-32">

      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-yellow-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-32 h-[450px] w-[450px] rounded-full bg-yellow-100/70 blur-3xl" />

      {/* Main CTA Container */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        <div className="relative overflow-hidden rounded-[2rem] border border-yellow-300 bg-white px-6 py-16 text-center shadow-xl shadow-yellow-100/50 sm:px-12 sm:py-20 lg:px-20">

          {/* Decorative Shapes */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-yellow-100/80" />
          <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-yellow-50" />

          <div className="relative z-10 space-y-8">

            {/* Edition Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-200 bg-yellow-50 px-4 py-2 text-xs font-bold tracking-wider text-yellow-800">
              <Rocket className="h-4 w-4 text-yellow-600" />
              <span>JOIN THE FUTURE OF TECH // 2026</span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h2 className="text-4xl font-black leading-[1.1] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
                YOUR NEXT BIG IDEA
                <br />

                <span className="relative inline-block text-yellow-600">
                  STARTS HERE.
                  <span className="absolute -bottom-1 left-0 h-2 w-full rounded-full bg-yellow-300/70" />
                </span>
              </h2>
            </div>

            {/* Description */}
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Jangan lewatkan kesempatan menguji kapabilitas,
              memperluas wawasan inovasi, dan membawa pulang
              total hadiah puluhan juta rupiah.
            </p>

            {/* Highlight Information */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">

              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-600">
                <Trophy className="h-4 w-4 text-yellow-600" />
                Total Hadiah Puluhan Juta
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-600">
                <Sparkles className="h-4 w-4 text-yellow-600" />
                Kompetisi Nasional 2026
              </div>

            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col items-center justify-center gap-4 pt-3 sm:flex-row">

              <Link
                to="/register"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-400 px-8 py-4 text-sm font-bold text-slate-950 shadow-lg shadow-yellow-200/70 transition-all duration-200 hover:-translate-y-1 hover:bg-yellow-300 hover:shadow-xl sm:w-auto"
              >
                <span>Daftar Sekarang</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to="/competitions"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-8 py-4 text-sm font-bold text-slate-700 transition-all duration-200 hover:-translate-y-1 hover:border-yellow-400 hover:bg-yellow-50 sm:w-auto"
              >
                <Sparkles className="h-4 w-4 text-yellow-600" />
                <span>Eksplorasi Cabang Lomba</span>
              </Link>

            </div>

            {/* Registration Information */}
            <div className="border-t border-slate-100 pt-8">
              <p className="text-xs font-semibold tracking-wide text-slate-400">
                REGISTRATION DEADLINE: 25 MARET 2026 // SLOTS LIMITED
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
