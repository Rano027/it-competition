
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Trophy,
  Users,
  ArrowUpRight,
  Sparkles,
  Wallet,
} from 'lucide-react';
import Button from '../ui/Button';

export const CompetitionCard = ({ competition }) => {
  const {
    name = competition.title,
    title = name,
    slug,
    category_label = competition.category || 'Kompetisi',
    target_level_label = competition.target_level_label || 'Mahasiswa & SMA',
    theme,
    description = competition.shortDescription,
    registration_fee = 0,
    registration_fee_formatted,
    min_team_member = 1,
    max_team_member = 3,
    status = 'registration_open',
    status_label = 'Pendaftaran Dibuka',
    prizePool = 'Rp 10.000.000',
  } = competition;

  const formattedFee =
    registration_fee > 0
      ? new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          maximumFractionDigits: 0,
        }).format(registration_fee)
      : registration_fee_formatted || 'Gratis';

  const teamFormat =
    min_team_member === max_team_member
      ? `${min_team_member} Orang`
      : `${min_team_member}-${max_team_member} Orang`;

  const isOpen = status === 'registration_open';

  return (
    <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-yellow-300 hover:shadow-xl">

      {/* Decorative Background */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-yellow-100/70 transition-transform duration-500 group-hover:scale-125" />

      {/* Card Content */}
      <div className="relative z-10 space-y-5 p-6 sm:p-7">

        {/* Category and Level */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="rounded-lg border border-yellow-200 bg-yellow-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-yellow-800">
            {category_label}
          </span>

          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-semibold text-slate-600">
            {target_level_label}
          </span>
        </div>

        {/* Competition Icon */}
        <div className="flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-100 text-yellow-700 transition-all duration-300 group-hover:bg-yellow-400 group-hover:text-slate-950">
            <Trophy className="h-6 w-6" />
          </div>

          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold ${
              isOpen
                ? 'border border-emerald-200 bg-emerald-50 text-emerald-700'
                : 'border border-slate-200 bg-slate-100 text-slate-600'
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isOpen ? 'bg-emerald-500' : 'bg-slate-400'
              }`}
            />
            {status_label}
          </span>
        </div>

        {/* Title and Theme */}
        <div className="space-y-2">
          <h3 className="text-xl font-extrabold leading-snug text-slate-900 transition-colors group-hover:text-yellow-700">
            {title}
          </h3>

          {theme && (
            <p className="line-clamp-2 text-xs font-medium leading-relaxed text-yellow-700">
              Tema: {theme}
            </p>
          )}
        </div>

        {/* Description */}
        <p className="line-clamp-3 min-h-[60px] text-sm leading-relaxed text-slate-600">
          {description}
        </p>

        {/* Competition Specifications */}
        <div className="grid grid-cols-3 gap-3 border-t border-slate-100 pt-5">

          {/* Registration Fee */}
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-slate-400">
              <Wallet className="h-3.5 w-3.5" />
              <span className="text-[10px] font-semibold uppercase">
                Biaya
              </span>
            </div>

            <p className="break-words text-xs font-bold text-slate-900">
              {formattedFee}
            </p>
          </div>

          {/* Team Format */}
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-slate-400">
              <Users className="h-3.5 w-3.5" />
              <span className="text-[10px] font-semibold uppercase">
                Tim
              </span>
            </div>

            <p className="text-xs font-bold text-slate-900">
              {teamFormat}
            </p>
          </div>

          {/* Prize */}
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-slate-400">
              <Trophy className="h-3.5 w-3.5" />
              <span className="text-[10px] font-semibold uppercase">
                Hadiah
              </span>
            </div>

            <p className="break-words text-xs font-bold text-yellow-700">
              {prizePool}
            </p>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="relative z-10 flex gap-2 border-t border-slate-100 bg-slate-50/80 p-5">

        <Link
          to={`/competitions/${slug}`}
          className="flex-1"
        >
          <Button
            variant="secondary"
            size="sm"
            className="w-full gap-1 border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:border-yellow-300 hover:bg-yellow-50"
          >
            <span>Rincian</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Button>
        </Link>

        <Link
          to={`/register?competition=${slug}`}
          className="flex-1"
        >
          <Button
            variant="primary"
            size="sm"
            className="w-full gap-1 border-0 bg-yellow-400 text-xs font-bold text-slate-950 shadow-sm hover:bg-yellow-300"
          >
            <span>Daftar</span>
            <Sparkles className="h-3.5 w-3.5" />
          </Button>
        </Link>

      </div>
    </article>
  );
};

export default CompetitionCard;
