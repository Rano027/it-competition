
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Trophy,
  Award,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import Button from '../ui/Button';
import { PRIZE_BREAKDOWN } from '../../data/festivalData';

export const PrizePoolSection = () => {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50 py-24 sm:py-32">

      {/* Decorative Background */}
      <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-yellow-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-yellow-100/60 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Main Prize Banner */}
        <div className="relative overflow-hidden rounded-[2rem] border border-yellow-200 bg-white p-8 shadow-sm sm:p-12 lg:p-14">

          {/* Decorative Shapes */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-yellow-100/80" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-yellow-50" />

          <div className="relative z-10 space-y-10">

            {/* Header */}
            <div className="mx-auto max-w-3xl space-y-5 text-center">

              <div className="inline-flex items-center gap-2 rounded-full border border-yellow-200 bg-yellow-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-yellow-800">
                <Trophy className="h-4 w-4 text-yellow-600" />
                <span>Total Prize Pool & Recognition</span>
              </div>

              {/* Total Prize Pool */}
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-3">
                  <Sparkles className="h-6 w-6 text-yellow-500 sm:h-8 sm:w-8" />

                  <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
                    Rp 50 Juta+
                  </h2>

                  <Sparkles className="h-6 w-6 text-yellow-500 sm:h-8 sm:w-8" />
                </div>

                <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                  Total dana pembinaan tunai, trofi kejuaraan,
                  sertifikat berstandar nasional, dan voucher cloud
                  infrastructure bagi para inovator terbaik.
                </p>
              </div>

              {/* Small Highlight */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-600">
                  <Trophy className="h-4 w-4 text-yellow-600" />
                  Hadiah Kompetisi
                </div>

                <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-600">
                  <Award className="h-4 w-4 text-yellow-600" />
                  Apresiasi Pemenang
                </div>
              </div>
            </div>

            {/* Prize Breakdown */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

              {PRIZE_BREAKDOWN.map((prize, idx) => (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400 hover:bg-white hover:shadow-lg"
                >
                  {/* Decorative Corner */}
                  <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-yellow-100/70 transition-transform duration-300 group-hover:scale-125" />

                  <div className="relative z-10 space-y-4">

                    {/* Rank Badge */}
                    <div className="flex items-center justify-between">
                      <span className="rounded-lg border border-yellow-200 bg-yellow-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-yellow-800">
                        {prize.badge}
                      </span>

                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-100 text-yellow-700 transition-colors group-hover:bg-yellow-400 group-hover:text-slate-950">
                        <Award className="h-5 w-5" />
                      </div>
                    </div>

                    {/* Prize Information */}
                    <div className="space-y-2">
                      <h3 className="text-xl font-black text-slate-900">
                        {prize.rank}
                      </h3>

                      <p className="text-sm font-bold text-yellow-700">
                        {prize.reward}
                      </p>

                      <p className="text-xs leading-relaxed text-slate-500">
                        {prize.description}
                      </p>
                    </div>

                    {/* Bottom Accent */}
                    <div className="h-1 w-10 rounded-full bg-yellow-400 transition-all duration-300 group-hover:w-20" />

                  </div>
                </div>
              ))}

            </div>

            {/* Action Buttons */}
            <div className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row">

              <Link to="/register" className="w-full sm:w-auto">
                <Button
                  variant="glow"
                  size="lg"
                  className="flex w-full items-center justify-center gap-2 border-0 bg-yellow-400 text-slate-950 shadow-md transition-all hover:bg-yellow-300 sm:w-auto"
                >
                  <span>Daftar Tim Sekarang</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>

              <Link to="/competitions" className="w-full sm:w-auto">
                <Button
                  variant="secondary"
                  size="lg"
                  className="flex w-full items-center justify-center gap-2 border border-slate-300 bg-white text-slate-700 hover:border-yellow-400 hover:bg-yellow-50 sm:w-auto"
                >
                  <span>Rincian Hadiah Tiap Kategori</span>
                </Button>
              </Link>

            </div>

            {/* Guarantee Information */}
            <div className="flex flex-col items-center justify-center gap-2 border-t border-slate-100 pt-6 text-center sm:flex-row">
              <ShieldCheck className="h-5 w-5 flex-shrink-0 text-yellow-600" />

              <p className="text-xs leading-relaxed text-slate-500">
                Seluruh finalis dan peserta mendapatkan E-Certificate
                resmi bernomor registrasi nasional.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default PrizePoolSection;
