
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckSquare,
  Palette,
  FileText,
  Code2,
  Image,
  Users,
  ClipboardCheck,
  Trophy,
} from 'lucide-react';

import useAuth from '../../hooks/useAuth';
import mockService from '../../services/mockService';
import PageHeader from '../../components/dashboard/PageHeader';
import StatusBadge from '../../components/dashboard/StatusBadge';
import EmptyState from '../../components/dashboard/EmptyState';
import Button from '../../components/ui/Button';

// Menentukan ikon berdasarkan kategori lomba
const getCompetitionIcon = (competition) => {
  const category = `${competition.category || ''} ${competition.category_label || ''} ${competition.name || ''}`.toLowerCase();

  if (category.includes('ui/ux') || category.includes('ui ux')) {
    return Palette;
  }

  if (category.includes('lkti') || category.includes('karya tulis')) {
    return FileText;
  }

  if (category.includes('web')) {
    return Code2;
  }

  if (category.includes('poster')) {
    return Image;
  }

  return Trophy;
};

export const JudgeCompetitionsPage = () => {
  const { user } = useAuth();

  const overview = useMemo(() => {
    return mockService.getJudgeOverview(user?.id || user?.email);
  }, [user?.id, user?.email]);

  const assignedCompetitions = overview.assignedCompetitions || [];

  return (
    <div className="space-y-8">

      <PageHeader
        title="Cabang Lomba Ditugaskan"
        description="Daftar cabang kompetisi yang didelegasikan kepada Anda sebagai dewan juri penilai."
        breadcrumbs={[
          { label: 'Juri', to: '/judge/dashboard' },
          { label: 'Lomba Ditugaskan', to: '/judge/competitions' },
        ]}
      />

      {/* Informasi Jumlah Penugasan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
            <Trophy className="w-6 h-6 text-yellow-700" />
          </div>

          <div>
            <p className="text-sm text-slate-500">Total Lomba Ditugaskan</p>
            <h3 className="text-2xl font-bold text-slate-900">
              {assignedCompetitions.length}
            </h3>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
            <ClipboardCheck className="w-6 h-6 text-blue-700" />
          </div>

          <div>
            <p className="text-sm text-slate-500">Status Penugasan</p>
            <h3 className="text-lg font-bold text-slate-900">
              {assignedCompetitions.length > 0 ? 'Aktif' : 'Belum Ada'}
            </h3>
          </div>
        </div>

      </div>

      {/* Daftar Kompetisi */}
      {assignedCompetitions.length === 0 ? (

        <EmptyState
          title="Belum Ada Penugasan Lomba"
          message="Administrator belum menugaskan cabang lomba untuk akun juri Anda."
        />

      ) : (

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {assignedCompetitions.map((comp) => {
            const submissions = mockService.registrations.filter(
              (r) =>
                r.competitionId === comp.id &&
                r.status === 'approved'
            );

            const evaluated = mockService.evaluations.filter(
              (e) =>
                e.competitionId === comp.id &&
                e.status === 'submitted'
            );

            const progress = submissions.length > 0
              ? Math.round((evaluated.length / submissions.length) * 100)
              : 0;

            const CompetitionIcon = getCompetitionIcon(comp);

            return (

              <div
                key={comp.id}
                className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-lg hover:border-yellow-400 transition-all duration-300 flex flex-col justify-between gap-6"
              >

                <div className="space-y-5">

                  {/* Header Card */}
                  <div className="flex items-start justify-between gap-3">

                    <div className="flex items-center gap-3">

                      <div className="w-12 h-12 rounded-2xl bg-yellow-100 flex items-center justify-center shrink-0">
                        <CompetitionIcon className="w-6 h-6 text-yellow-700" />
                      </div>

                      <div>
                        <span className="text-xs font-semibold text-yellow-700 uppercase tracking-wider">
                          {comp.category_label || comp.category || 'Kompetisi'}
                        </span>

                        <h3 className="text-lg font-bold text-slate-900 mt-1">
                          {comp.name}
                        </h3>
                      </div>

                    </div>

                    <StatusBadge
                      status={comp.status}
                      label={comp.status_label}
                    />

                  </div>

                  {/* Tema */}
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                    <p className="text-xs text-slate-500 mb-1">
                      Tema Kompetisi
                    </p>

                    <p className="text-sm font-semibold text-slate-800">
                      {comp.theme || 'Tema belum ditentukan'}
                    </p>
                  </div>

                  {/* Deskripsi */}
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {comp.description}
                  </p>

                  {/* Progress Penilaian */}
                  <div className="space-y-3">

                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          Progres Penilaian
                        </p>

                        <p className="text-xs text-slate-500 mt-1">
                          {evaluated.length} dari {submissions.length} karya telah dinilai
                        </p>
                      </div>

                      <span className="text-sm font-bold text-yellow-700">
                        {progress}%
                      </span>
                    </div>

                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                  </div>

                  {/* Statistik Peserta */}
                  <div className="grid grid-cols-2 gap-3">

                    <div className="bg-slate-50 rounded-xl p-3">
                      <div className="flex items-center gap-2 text-slate-500 mb-1">
                        <Users className="w-4 h-4" />
                        <span className="text-xs">Peserta Disetujui</span>
                      </div>

                      <p className="text-xl font-bold text-slate-900">
                        {submissions.length}
                      </p>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-3">
                      <div className="flex items-center gap-2 text-slate-500 mb-1">
                        <CheckSquare className="w-4 h-4" />
                        <span className="text-xs">Sudah Dinilai</span>
                      </div>

                      <p className="text-xl font-bold text-slate-900">
                        {evaluated.length}
                      </p>
                    </div>

                  </div>

                  {/* Rubrik Penilaian */}
                  <div className="border border-slate-200 rounded-2xl p-4 space-y-3">

                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        Rubrik Penilaian
                      </p>

                      <p className="text-xs text-slate-500 mt-1">
                        Kriteria dan bobot penilaian kompetisi
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">

                      {(comp.rubric || [
                        { id: '1', name: 'Teknis', weight: 40 },
                        { id: '2', name: 'Inovasi', weight: 30 },
                        { id: '3', name: 'Presentasi', weight: 20 },
                        { id: '4', name: 'Dokumen', weight: 10 },
                      ]).map((r) => (

                        <div
                          key={r.id}
                          className="flex items-center justify-between gap-2 text-sm"
                        >
                          <span className="text-slate-600">
                            {r.name}
                          </span>

                          <span className="font-bold text-slate-900">
                            {r.weight}%
                          </span>
                        </div>

                      ))}

                    </div>

                  </div>

                </div>

                {/* Footer Card */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">

                  <span className="text-xs text-slate-500">
                    {submissions.length} Peserta Terdaftar
                  </span>

                  <Link to="/judge/evaluations">
                    <Button
                      variant="primary"
                      className="text-xs flex items-center space-x-2"
                    >
                      <CheckSquare className="w-4 h-4" />
                      <span>Evaluasi Karya</span>
                    </Button>
                  </Link>

                </div>

              </div>

            );
          })}

        </div>

      )}

    </div>
  );
};

export default JudgeCompetitionsPage;
