
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Trophy,
  Calendar,
  FileText,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  AlertCircle,
  HelpCircle,
  Award,
  Sparkles,
  Users,
  Clock,
  ShieldCheck,
} from 'lucide-react';

import competitionService from '../../services/competitionService';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { COMPETITIONS_DATA, FESTIVAL_INFO } from '../../data/festivalData';

export const CompetitionDetailPage = () => {
  const { slug } = useParams();

  const [competition, setCompetition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await competitionService.getCompetitionBySlug(slug);

        if (res && res.success && res.data) {
          setCompetition(res.data);
          setLoading(false);
          return;
        }
      } catch (err) {
        // Fallback ke data lokal jika API gagal
      }

      const localComp = COMPETITIONS_DATA.find(
        (c) => c.slug === slug
      );

      if (localComp) {
        setCompetition(localComp);
      } else {
        setError('Cabang kompetisi tidak ditemukan atau URL tidak valid.');
      }

      setLoading(false);
    };

    fetchDetail();
  }, [slug]);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 bg-slate-50">
        <div className="w-12 h-12 border-4 border-yellow-200 border-t-yellow-400 rounded-full animate-spin" />
        <p className="text-sm font-semibold text-slate-500">
          Memuat informasi kompetisi...
        </p>
      </div>
    );
  }

  // Error State
  if (error || !competition) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-20 text-center gap-5 bg-slate-50">
        <div className="w-16 h-16 rounded-2xl bg-yellow-50 border border-yellow-200 text-yellow-600 flex items-center justify-center">
          <AlertCircle className="w-8 h-8" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          Cabang Kompetisi Tidak Ditemukan
        </h2>

        <p className="text-sm text-slate-500 max-w-md">
          {error || 'Informasi cabang kompetisi yang Anda cari belum tersedia.'}
        </p>

        <Link to="/competitions">
          <Button variant="primary">
            Kembali ke Daftar Lomba
          </Button>
        </Link>
      </div>
    );
  }

  // Competition Data
  const {
    title = competition.name,
    name = title,
    slug: competitionSlug,
    category_label = competition.category,
    target_level_label = 'Mahasiswa & SMA/SMK',
    theme,
    shortDescription = competition.description,
    description = shortDescription,
    overview,
    prizePool = 'Rp 10.000.000',
    prize_first,
    prize_second,
    prize_third,
    team_format = 'Tim (1 - 3 Anggota)',
    min_team_member = 1,
    max_team_member = 3,
    registration_fee = 50000,
    registration_fee_formatted = 'Rp 50.000',
    quota = 50,
    stages = [],
    eligibility = [],
    criteria = [],
    faqs = [],
    guidebook_url = FESTIVAL_INFO.guidebookUrl,
  } = competition;

  const formattedFee =
    typeof registration_fee === 'number' && registration_fee > 0
      ? new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          maximumFractionDigits: 0,
        }).format(registration_fee)
      : registration_fee_formatted || 'Gratis';

  return (
    <div className="relative min-h-screen bg-slate-50 py-24 sm:py-28 overflow-hidden">

      {/* Background Decoration */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-yellow-100/70 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 left-0 w-80 h-80 bg-amber-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Breadcrumb */}
        <nav className="flex items-center flex-wrap gap-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-amber-600 transition-colors">
            Beranda
          </Link>

          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />

          <Link to="/competitions" className="hover:text-amber-600 transition-colors">
            Kompetisi
          </Link>

          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />

          <span className="font-semibold text-amber-600 truncate max-w-[180px]">
            {title}
          </span>
        </nav>

        {/* Competition Hero */}
        <div className="relative bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm overflow-hidden">

          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-yellow-100/70 pointer-events-none" />
          <div className="absolute -bottom-24 -left-16 w-64 h-64 rounded-full bg-amber-50 pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-6">

            {/* Meta Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-yellow-50 border border-yellow-200 text-xs font-bold text-amber-700">
                {category_label}
              </span>

              <span className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600">
                {target_level_label}
              </span>

              <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700">
                Pendaftaran Terbuka
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              {title}
            </h1>

            {/* Competition Theme */}
            {theme && (
              <div className="inline-block bg-yellow-50 border border-yellow-200 px-4 py-3 rounded-xl">
                <span className="text-xs font-bold text-amber-700 block uppercase tracking-wide mb-1">
                  Tema Perlombaan
                </span>

                <span className="text-sm font-semibold text-slate-800">
                  {theme}
                </span>
              </div>
            )}

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
              {description}
            </p>

            {/* CTA */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link
                to={`/register?competition=${competitionSlug || slug}`}
                className="w-full sm:w-auto"
              >
                <Button
                  variant="glow"
                  size="lg"
                  className="w-full sm:w-auto gap-2 border-0 bg-yellow-400 text-slate-950 hover:bg-yellow-300"
                >
                  <span>Daftar Tim Sekarang</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>

              <a
                href={guidebook_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto gap-2 border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                >
                  <FileText className="w-4 h-4 text-amber-500" />
                  <span>Download Guidebook PDF</span>
                </Button>
              </a>
            </div>

          </div>
        </div>

        {/* Quick Information */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-semibold uppercase">Total Hadiah</span>
            </div>
            <p className="text-lg sm:text-2xl font-black text-amber-600">
              {prizePool}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <FileText className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-semibold uppercase">Biaya Registrasi</span>
            </div>
            <p className="text-lg sm:text-2xl font-black text-slate-900">
              {formattedFee}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <Users className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-semibold uppercase">Format Tim</span>
            </div>
            <p className="text-base sm:text-lg font-bold text-slate-900">
              {team_format}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-semibold uppercase">Kuota Peserta</span>
            </div>
            <p className="text-lg sm:text-2xl font-black text-slate-900">
              {quota} Tim
            </p>
          </div>

        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

          {/* Left Content */}
          <div className="lg:col-span-8 space-y-6">

            {/* Overview */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                Gambaran Umum Kompetisi
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {overview || description}
              </p>
            </div>

            {/* Timeline */}
            {stages && stages.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-500" />
                  Tahapan & Timeline Lomba
                </h3>

                <div className="space-y-3">
                  {stages.map((stage, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-50 border border-slate-200 p-4 sm:p-5 rounded-2xl space-y-2"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-bold text-slate-800 text-sm sm:text-base">
                          {idx + 1}. {stage.name}
                        </span>

                        <span className="text-xs font-semibold text-amber-700 bg-yellow-50 border border-yellow-200 px-3 py-1 rounded-full">
                          {stage.date}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                        {stage.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Eligibility */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-amber-500" />
                Ketentuan & Syarat Kelayakan Peserta
              </h3>

              <ul className="space-y-3 text-sm text-slate-600">
                {(eligibility.length > 0
                  ? eligibility
                  : [
                      'Peserta merupakan mahasiswa aktif (D3/D4/S1) atau siswa SMA/SMK se-Indonesia.',
                      'Setiap tim wajib mengunggah kartu identitas aktif (KTM / Kartu Pelajar).',
                      'Karya yang dilombakan harus orisinal dan belum pernah memenangkan kompetisi sejenis.',
                      'Keputusan dewan juri bersifat mutlak dan tidak dapat diganggu gugat.',
                    ]
                ).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Judging Criteria */}
            {criteria && criteria.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  Kriteria & Bobot Penilaian
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {criteria.map((crit, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex items-center justify-between gap-3"
                    >
                      <span className="text-sm font-semibold text-slate-700">
                        {crit.name}
                      </span>

                      <span className="text-xs font-bold text-amber-700 bg-yellow-50 border border-yellow-200 px-3 py-1 rounded-lg">
                        {crit.weight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Competition FAQ */}
            {faqs && faqs.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-amber-500" />
                  Pertanyaan Spesifik Cabang Lomba
                </h3>

                <div className="space-y-3">
                  {faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2"
                    >
                      <p className="text-sm font-bold text-slate-800">
                        {faq.q}
                      </p>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Registration Sidebar */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-5">

            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm space-y-6">

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                  Registrasi Tim // NEXUS 2026
                </span>

                <h4 className="text-xl font-black text-slate-900">
                  Siap Bersaing di Cabang Ini?
                </h4>

                <p className="text-sm text-slate-500">
                  Persiapkan tim terbaikmu dan tunjukkan kemampuan melalui kompetisi ini.
                </p>
              </div>

              {/* Prize Information */}
              {(prize_first || prizePool) && (
                <div className="bg-yellow-50 border border-yellow-200 p-5 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-700">
                    <Trophy className="w-4 h-4" />
                    HADIAH JUARA
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-500 mb-1">
                      Juara 1
                    </p>
                    <p className="text-sm font-black text-slate-900">
                      {prize_first || prizePool}
                    </p>
                  </div>

                  {prize_second && (
                    <div className="pt-3 border-t border-yellow-200">
                      <p className="text-xs font-semibold text-slate-500 mb-1">
                        Juara 2
                      </p>
                      <p className="text-sm font-bold text-slate-800">
                        {prize_second}
                      </p>
                    </div>
                  )}

                  {prize_third && (
                    <div className="pt-3 border-t border-yellow-200">
                      <p className="text-xs font-semibold text-slate-500 mb-1">
                        Juara 3
                      </p>
                      <p className="text-sm font-bold text-slate-800">
                        {prize_third}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Registration Information */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Biaya Registrasi</span>
                  <span className="font-bold text-slate-900">
                    {formattedFee}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Anggota Tim</span>
                  <span className="font-bold text-slate-900">
                    {min_team_member} - {max_team_member} Orang
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-3 pt-2">
                <Link
                  to={`/register?competition=${competitionSlug || slug}`}
                  className="block"
                >
                  <Button
                    variant="glow"
                    size="lg"
                    className="w-full gap-2 border-0 bg-yellow-400 text-slate-950 hover:bg-yellow-300"
                  >
                    Daftar Sekarang
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>

                <a
                  href={guidebook_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button
                    variant="secondary"
                    size="md"
                    className="w-full gap-2 border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  >
                    <FileText className="w-4 h-4 text-amber-500" />
                    Download Guidebook
                  </Button>
                </a>
              </div>

              {/* Helpdesk */}
              <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
                Butuh bantuan? Hubungi WhatsApp panitia di{' '}
                <span className="font-semibold text-amber-600">
                  {FESTIVAL_INFO.contactWhatsapp}
                </span>
              </div>

            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center">
              <Link
                to="/competitions"
                className="text-sm font-semibold text-slate-600 hover:text-amber-600 transition-colors"
              >
                <span className="inline-flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  Lihat Semua Cabang Lomba
                </span>
              </Link>
            </div>

          </aside>

        </div>

      </div>
    </div>
  );
};

export default CompetitionDetailPage;
