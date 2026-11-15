
import React, { useState, useEffect, useCallback } from 'react';
import { Search, RotateCcw, Sparkles, Trophy } from 'lucide-react';
import competitionService from '../../services/competitionService';
import CompetitionCard from '../../components/competition/CompetitionCard';
import Button from '../../components/ui/Button';
import SectionHeading from '../../components/ui/SectionHeading';
import { COMPETITIONS_DATA } from '../../data/festivalData';

export const CompetitionsPage = () => {
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters state
  const [targetLevel, setTargetLevel] = useState('all');
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const fetchCompetitions = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = {};

      if (targetLevel !== 'all') {
        params.target_level = targetLevel;
      }

      if (search.trim()) {
        params.search = search.trim();
      }

      const res = await competitionService.getCompetitions(params);

      if (res && res.success && res.data) {
        const items = Array.isArray(res.data?.data)
          ? res.data.data
          : Array.isArray(res.data)
          ? res.data
          : [];

        if (items.length > 0) {
          setCompetitions(items);
          setLoading(false);
          return;
        }
      }
    } catch (err) {
      // Graceful fallback to local data
    }

    // Filter local COMPETITIONS_DATA
    let filtered = COMPETITIONS_DATA;

    if (targetLevel === 'mahasiswa') {
      filtered = filtered.filter(
        (c) => c.target_level === 'mahasiswa' || c.target_level === 'all'
      );
    } else if (targetLevel === 'sma') {
      filtered = filtered.filter(
        (c) => c.target_level === 'sma' || c.target_level === 'all'
      );
    }

    if (search.trim()) {
      const q = search.toLowerCase();

      filtered = filtered.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.category_label.toLowerCase().includes(q) ||
          c.shortDescription.toLowerCase().includes(q)
      );
    }

    setCompetitions(filtered);
    setLoading(false);
  }, [targetLevel, search]);

  useEffect(() => {
    fetchCompetitions();
  }, [fetchCompetitions]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(searchInput);
  };

  const handleResetFilters = () => {
    setTargetLevel('all');
    setSearch('');
    setSearchInput('');
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 py-24 sm:py-28">

      {/* Background Decoration */}
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-yellow-200/40 blur-3xl pointer-events-none" />
      <div className="absolute top-[45%] -left-40 h-96 w-96 rounded-full bg-yellow-100/50 blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">

        {/* Page Heading */}
        <SectionHeading
          badge="KOMPETISI // 2026"
          title="Temukan Cabang"
          highlight="Lomba Pilihanmu"
          description="Jelajahi berbagai kompetisi nasional di bidang teknologi, kreativitas, dan inovasi. Pilih kategori yang sesuai dengan minat dan jenjang pendidikanmu."
        />

        {/* Competition Information */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-200 bg-yellow-50 px-4 py-2 text-xs font-semibold text-yellow-800">
            <Trophy className="h-4 w-4" />
            Kompetisi Nasional 2026
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600">
            <Sparkles className="h-4 w-4 text-yellow-500" />
            Terbuka untuk Mahasiswa dan Pelajar
          </div>
        </div>

        {/* Filter and Search */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            {/* Education Level Filter */}
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Pilih Jenjang Pendidikan
              </p>

              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'Semua Jenjang' },
                  { id: 'mahasiswa', label: 'Mahasiswa' },
                  { id: 'sma', label: 'SMA / SMK' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setTargetLevel(tab.id)}
                    className={`rounded-xl border px-4 py-2.5 text-xs font-semibold transition-all duration-200 sm:text-sm ${
                      targetLevel === tab.id
                        ? 'border-yellow-400 bg-yellow-400 text-slate-950 shadow-sm'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-yellow-300 hover:bg-yellow-50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Form */}
            <form
              onSubmit={handleSearchSubmit}
              className="flex w-full gap-2 lg:max-w-md"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Cari nama atau kategori lomba..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-yellow-400 focus:bg-white focus:ring-2 focus:ring-yellow-100"
                />
              </div>

              <Button type="submit" size="md" variant="primary">
                Cari
              </Button>

              {(search || targetLevel !== 'all') && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  title="Reset Filter"
                  className="flex items-center justify-center rounded-xl border border-slate-200 px-3 text-slate-500 transition hover:border-yellow-300 hover:bg-yellow-50 hover:text-yellow-700"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              )}
            </form>

          </div>
        </div>

        {/* Result Information */}
        {!loading && (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Daftar Cabang Kompetisi
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Temukan kompetisi yang sesuai dengan kemampuanmu.
              </p>
            </div>

            <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600">
              {competitions.length} Kompetisi Ditemukan
            </span>
          </div>
        )}

        {/* Competition Grid */}
        {loading ? (
          <div className="rounded-3xl border border-slate-200 bg-white py-24 text-center shadow-sm">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-yellow-100 border-t-yellow-400" />
            <p className="text-sm font-semibold text-slate-600">
              Sedang memuat data kompetisi...
            </p>
          </div>
        ) : competitions.length === 0 ? (
          <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm sm:p-16">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-50 text-yellow-600">
              <Search className="h-7 w-7" />
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              Tidak Ada Cabang Lomba yang Cocok
            </h3>

            <p className="mx-auto max-w-md text-sm leading-relaxed text-slate-500">
              Kami belum menemukan kompetisi yang sesuai dengan pencarianmu.
              Coba gunakan kata kunci lain atau reset filter.
            </p>

            <Button variant="secondary" onClick={handleResetFilters}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset Filter Pencarian
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {competitions.map((comp) => (
              <CompetitionCard
                key={comp.id || comp.slug}
                competition={comp}
              />
            ))}
          </div>
        )}

        {/* Bottom Information */}
        <div className="rounded-3xl border border-yellow-200 bg-yellow-50/70 p-6 text-center sm:p-8">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400 text-slate-950">
            <Sparkles className="h-5 w-5" />
          </div>

          <h3 className="text-lg font-bold text-slate-900">
            Siapkan Ide dan Tunjukkan Karyamu!
          </h3>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-slate-600">
            Jadilah bagian dari generasi inovator muda Indonesia melalui
            kompetisi dan pengalaman yang membangun kemampuanmu.
          </p>
        </div>

      </div>
    </div>
  );
};

export default CompetitionsPage;
