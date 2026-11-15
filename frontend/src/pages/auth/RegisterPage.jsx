
import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  User,
  Mail,
  School,
  Hash,
  Lock,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

import useAuth from '../../hooks/useAuth';
import Button from '../../components/ui/Button';

export const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const preselectedCompetition = searchParams.get('competition');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    studentId: '',
    institution: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const validate = () => {
    const errs = {};

    if (!formData.name.trim()) {
      errs.name = 'Nama lengkap wajib diisi.';
    }

    if (!formData.email.trim()) {
      errs.email = 'Alamat email wajib diisi.';
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      errs.email = 'Format alamat email tidak valid.';
    }

    if (!formData.studentId.trim()) {
      errs.studentId =
        'Nomor Identitas Mahasiswa / Pelajar (NIM/NISN) wajib diisi.';
    }

    if (!formData.institution.trim()) {
      errs.institution =
        'Asal perguruan tinggi atau sekolah wajib diisi.';
    }

    if (!formData.password) {
      errs.password = 'Kata sandi wajib diisi.';
    } else if (formData.password.length < 6) {
      errs.password = 'Kata sandi minimal 6 karakter.';
    }

    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Konfirmasi kata sandi tidak cocok.';
    }

    if (!formData.termsAccepted) {
      errs.termsAccepted =
        'Anda harus menyetujui syarat & ketentuan perlombaan.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) return;

    setLoading(true);

    try {
      await register({
        name: formData.name,
        email: formData.email,
        studentId: formData.studentId,
        institution: formData.institution,
        password: formData.password,
      });

      navigate('/participant/dashboard', { replace: true });
    } catch (err) {
      setServerError(
        err.response?.data?.message ||
          err.message ||
          'Pendaftaran gagal. Silakan periksa kembali data Anda.'
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full text-sm pl-10 pr-4 py-3 rounded-xl bg-white border ${
      errors[field]
        ? 'border-rose-400'
        : 'border-slate-200 hover:border-yellow-400'
    } text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/40 focus:border-yellow-500 transition-all`;

  const labelClass =
    'text-xs font-semibold text-slate-600 uppercase tracking-wide block';

  const iconClass =
    'w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2';

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col justify-center relative overflow-hidden py-12">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* Left Column */}
          <div className="hidden lg:block lg:col-span-5 space-y-8 pr-4">
            <Link to="/" className="inline-flex items-center space-x-3 group">
              <div className="w-12 h-12 rounded-2xl bg-yellow-400 flex items-center justify-center text-slate-900 font-black text-2xl shadow-md group-hover:scale-105 transition-transform">
                N
              </div>

              <div>
                <span className="text-2xl font-black tracking-tight text-slate-900 block leading-tight">
                  NEXUS <span className="text-yellow-600">ITC</span>
                </span>

                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                  EDITION 2026 // REGISTRATION
                </span>
              </div>
            </Link>

            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-100 text-yellow-800 text-xs font-bold">
                <ShieldCheck className="w-4 h-4" />
                REGISTRASI PESERTA
              </span>

              <h1 className="text-4xl xl:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                Mulai Perjalanan
                <br />
                <span className="text-yellow-600">
                  Kompetisi Digital Anda.
                </span>
              </h1>

              <p className="text-base text-slate-600 leading-relaxed">
                Buat akun peserta resmi untuk mendaftarkan tim, memilih
                cabang lomba, mengunggah karya, dan memantau status evaluasi
                secara real-time.
              </p>
            </div>

            {preselectedCompetition && (
              <div className="p-5 rounded-2xl bg-yellow-50 border border-yellow-200 space-y-2">
                <span className="text-xs font-bold text-yellow-700 uppercase tracking-wide">
                  Cabang Lomba Terpilih
                </span>

                <p className="text-base font-bold text-slate-800">
                  {preselectedCompetition}
                </p>
              </div>
            )}

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <p className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-yellow-600" />
                Panduan Kepesertaan
              </p>

              <div className="space-y-3 text-sm text-slate-600">
                <p className="flex gap-3">
                  <span className="text-yellow-600 font-bold">01.</span>
                  Pendaftaran akun publik otomatis berstatus Peserta.
                </p>

                <p className="flex gap-3">
                  <span className="text-yellow-600 font-bold">02.</span>
                  Data akun tersimpan pada sesi browser prototipe.
                </p>

                <p className="flex gap-3">
                  <span className="text-yellow-600 font-bold">03.</span>
                  Anggota tim dapat ditambahkan setelah akun ketua tim aktif.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Registration Form */}
          <div className="lg:col-span-7 max-w-xl w-full mx-auto">

            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-6">
              <Link to="/" className="inline-flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center text-slate-900 font-black text-xl shadow-sm">
                  N
                </div>

                <span className="text-xl font-bold text-slate-900">
                  NEXUS <span className="text-yellow-600">ITC</span>
                </span>
              </Link>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-9 shadow-xl shadow-slate-200/60 space-y-6">

              {/* Form Heading */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-yellow-700 uppercase tracking-wider">
                  Create Your Account
                </span>

                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Pendaftaran Peserta
                </h2>

                <p className="text-sm text-slate-500">
                  Lengkapi data diri ketua tim untuk membuat akun kompetisi.
                </p>
              </div>

              {/* Server Error */}
              {serverError && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                  {serverError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Full Name */}
                <div className="space-y-2">
                  <label className={labelClass}>
                    Nama Lengkap
                  </label>

                  <div className="relative">
                    <User className={iconClass} />

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Contoh: Budi Santoso"
                      className={inputClass('name')}
                    />
                  </div>

                  {errors.name && (
                    <p className="text-xs text-rose-500">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className={labelClass}>
                    Alamat Email Aktif
                  </label>

                  <div className="relative">
                    <Mail className={iconClass} />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="nama@email.com"
                      className={inputClass('email')}
                    />
                  </div>

                  {errors.email && (
                    <p className="text-xs text-rose-500">{errors.email}</p>
                  )}
                </div>

                {/* Student ID & Institution */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className={labelClass}>
                      NIM / NISN
                    </label>

                    <div className="relative">
                      <Hash className={iconClass} />

                      <input
                        type="text"
                        name="studentId"
                        value={formData.studentId}
                        onChange={handleChange}
                        placeholder="Contoh: 2301010045"
                        className={inputClass('studentId')}
                      />
                    </div>

                    {errors.studentId && (
                      <p className="text-xs text-rose-500">
                        {errors.studentId}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className={labelClass}>
                      Sekolah / Universitas
                    </label>

                    <div className="relative">
                      <School className={iconClass} />

                      <input
                        type="text"
                        name="institution"
                        value={formData.institution}
                        onChange={handleChange}
                        placeholder="Nama institusi"
                        className={inputClass('institution')}
                      />
                    </div>

                    {errors.institution && (
                      <p className="text-xs text-rose-500">
                        {errors.institution}
                      </p>
                    )}
                  </div>
                </div>

                {/* Password & Confirmation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className={labelClass}>
                      Kata Sandi
                    </label>

                    <div className="relative">
                      <Lock className={iconClass} />

                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Min. 6 karakter"
                        className="w-full text-sm pl-10 pr-11 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/40 focus:border-yellow-500 transition-all"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-yellow-600 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {errors.password && (
                      <p className="text-xs text-rose-500">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className={labelClass}>
                      Ulangi Kata Sandi
                    </label>

                    <div className="relative">
                      <Lock className={iconClass} />

                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Ulangi sandi"
                        className="w-full text-sm pl-10 pr-11 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/40 focus:border-yellow-500 transition-all"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-yellow-600 transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {errors.confirmPassword && (
                      <p className="text-xs text-rose-500">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="pt-1 space-y-2">
                  <label className="flex items-start gap-3 text-sm text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      name="termsAccepted"
                      checked={formData.termsAccepted}
                      onChange={handleChange}
                      className="mt-0.5 w-4 h-4 rounded border-slate-300 text-yellow-500 focus:ring-yellow-400"
                    />

                    <span>
                      Saya menyetujui seluruh ketentuan lomba, tata tertib
                      kompetisi, dan keaslian karya yang diajukan pada
                      HIMATIF ITC 2026.
                    </span>
                  </label>

                  {errors.termsAccepted && (
                    <p className="text-xs text-rose-500">
                      {errors.termsAccepted}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="glow"
                  loading={loading}
                  className="w-full py-3 text-sm font-bold gap-2 mt-2"
                >
                  <span>Daftar & Buka Dashboard Peserta</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>

              {/* Login Link */}
              <div className="text-center pt-3 border-t border-slate-100">
                <p className="text-sm text-slate-500">
                  Sudah memiliki akun?{' '}
                  <Link
                    to="/login"
                    className="text-yellow-700 hover:text-yellow-800 font-bold transition-colors"
                  >
                    Masuk ke sini
                  </Link>
                </p>
              </div>
            </div>

            <p className="text-center text-xs text-slate-400 mt-5">
              NEXUS ITC 2026 · Official Participant Registration
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
