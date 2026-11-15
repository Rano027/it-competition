import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Terminal,
  Sparkles,
} from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import Button from '../../components/ui/Button';

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);

  const from = location.state?.from?.pathname;

  const validate = () => {
    const errs = {};

    if (!email.trim()) {
      errs.email = 'Alamat email wajib diisi.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Format alamat email tidak valid.';
    }

    if (!password) {
      errs.password = 'Kata sandi wajib diisi.';
    } else if (password.length < 6) {
      errs.password = 'Kata sandi minimal 6 karakter.';
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
      const user = await login({ email, password });

      if (from) {
        navigate(from, { replace: true });
      } else if (user.role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else if (user.role === 'judge') {
        navigate('/judge/dashboard', { replace: true });
      } else {
        navigate('/participant/dashboard', { replace: true });
      }
    } catch (err) {
      setServerError(
        err.response?.data?.message ||
        err.message ||
        'Kredensial tidak valid. Silakan gunakan salah satu akun demo di bawah.'
      );
    } finally {
      setLoading(false);
    }
  };

  const setPreset = (presetEmail, presetRole) => {
    setEmail(presetEmail);
    setPassword('password123');
    setErrors({});
    setServerError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center relative overflow-hidden">

      {/* Background Decoration */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-yellow-200/40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-yellow-100/60 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Left Branding Section */}
          <div className="hidden lg:block lg:col-span-6 space-y-8">

            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-14 h-14 rounded-2xl bg-yellow-400 flex items-center justify-center text-slate-950 font-black text-2xl shadow-lg shadow-yellow-400/20 group-hover:-translate-y-1 transition-transform">
                N
              </div>

              <div>
                <span className="text-2xl font-black tracking-tight text-slate-900 block leading-tight">
                  NEXUS <span className="text-yellow-600">ITC</span>
                </span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Edition 2026 // Portal
                </span>
              </div>
            </Link>

            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-yellow-100 border border-yellow-200 px-4 py-2 text-xs font-bold text-yellow-800">
                <Sparkles className="w-4 h-4" />
                NATIONAL IT COMPETITION 2026
              </div>

              <h1 className="text-4xl xl:text-5xl font-black tracking-tight leading-tight text-slate-900">
                Empowering Minds,
                <br />
                <span className="text-yellow-600">
                  Securing Innovations.
                </span>
              </h1>

              <p className="text-base text-slate-600 leading-relaxed max-w-lg">
                Masuk ke platform terintegrasi festival teknologi untuk
                memantau pendaftaran tim, pengumpulan karya ilmiah,
                maupun evaluasi dewan juri.
              </p>
            </div>

            {/* Information Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-7 space-y-5 shadow-sm">

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                  <div className="w-9 h-9 rounded-xl bg-yellow-100 flex items-center justify-center">
                    <Terminal className="w-5 h-5 text-yellow-700" />
                  </div>
                  Informasi Sistem
                </div>

                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Ready
                </span>
              </div>

              <div className="space-y-3 text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <p>Akses multi-peran: Admin, Dewan Juri, dan Peserta Kompetisi.</p>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <p>Platform untuk mengelola aktivitas dan informasi kompetisi.</p>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <p>Validasi data dan pengelolaan penilaian kompetisi.</p>
                </div>
              </div>
            </div>

            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-yellow-700 transition-colors"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Kembali ke Beranda
            </Link>
          </div>

          {/* Login Form */}
          <div className="lg:col-span-6 w-full max-w-md mx-auto">

            {/* Mobile Branding */}
            <div className="lg:hidden text-center mb-8">
              <Link to="/" className="inline-flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-yellow-400 flex items-center justify-center text-slate-950 font-black text-xl">
                  N
                </div>

                <span className="text-xl font-black text-slate-900">
                  NEXUS <span className="text-yellow-600">ITC</span>
                </span>
              </Link>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-7 sm:p-10 shadow-xl shadow-slate-200/60 space-y-6">

              {/* Form Heading */}
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-yellow-100 flex items-center justify-center mb-4">
                  <Lock className="w-6 h-6 text-yellow-700" />
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Welcome Back!
                </h2>

                <p className="text-sm text-slate-500">
                  Masuk untuk melanjutkan aktivitas Anda di NEXUS ITC 2026.
                </p>
              </div>

              {/* Server Error */}
              {serverError && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                  {serverError}
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 block">
                    Alamat Email
                  </label>

                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />

                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) {
                          setErrors({ ...errors, email: null });
                        }
                      }}
                      placeholder="nama@email.com"
                      className={`w-full text-sm pl-10 pr-4 py-3 rounded-xl bg-white border ${
                        errors.email
                          ? 'border-red-400'
                          : 'border-slate-200'
                      } text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 transition-all`}
                    />
                  </div>

                  {errors.email && (
                    <p className="text-xs text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-slate-700">
                      Kata Sandi
                    </label>

                    <Link
                      to="/forgot-password"
                      className="text-xs font-semibold text-yellow-700 hover:text-yellow-800 hover:underline"
                    >
                      Lupa kata sandi?
                    </Link>
                  </div>

                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />

                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password) {
                          setErrors({ ...errors, password: null });
                        }
                      }}
                      placeholder="Masukkan kata sandi"
                      className={`w-full text-sm pl-10 pr-11 py-3 rounded-xl bg-white border ${
                        errors.password
                          ? 'border-red-400'
                          : 'border-slate-200'
                      } text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 transition-all`}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                      aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                    >
                      {showPassword
                        ? <EyeOff className="w-4 h-4" />
                        : <Eye className="w-4 h-4" />
                      }
                    </button>
                  </div>

                  {errors.password && (
                    <p className="text-xs text-red-500">{errors.password}</p>
                  )}
                </div>

                {/* Remember Me */}
                <div className="flex items-center pt-1">
                  <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-yellow-500 focus:ring-yellow-400"
                    />
                    <span>Ingat saya di perangkat ini</span>
                  </label>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  variant="glow"
                  loading={loading}
                  className="!w-full !bg-yellow-400 !text-slate-950 hover:!bg-yellow-300 !border-0 !shadow-lg !shadow-yellow-400/20 py-3 text-sm font-bold gap-2"
                >
                  <span>Masuk ke Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>

              </form>

              {/* Demo Accounts */}
              <div className="pt-5 border-t border-slate-100 space-y-3">

                <p className="text-xs font-semibold text-slate-500 text-center">
                  Gunakan Akun Pengujian Demo
                </p>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    id="btn-demo-participant"
                    type="button"
                    onClick={() => setPreset('participant@example.com', 'participant')}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-yellow-50 text-slate-700 border border-slate-200 hover:border-yellow-400 text-xs font-semibold transition-all"
                  >
                    Peserta
                  </button>

                  <button
                    id="btn-demo-judge"
                    type="button"
                    onClick={() => setPreset('judge@example.com', 'judge')}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-yellow-50 text-slate-700 border border-slate-200 hover:border-yellow-400 text-xs font-semibold transition-all"
                  >
                    Juri
                  </button>

                  <button
                    id="btn-demo-admin"
                    type="button"
                    onClick={() => setPreset('admin@example.com', 'admin')}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-yellow-50 text-slate-700 border border-slate-200 hover:border-yellow-400 text-xs font-semibold transition-all"
                  >
                    Admin
                  </button>
                </div>

                <p className="text-xs text-slate-400 text-center">
                  Password demo: <span className="font-semibold text-slate-600">password123</span>
                </p>
              </div>

              {/* Register Link */}
              <div className="text-center pt-2">
                <p className="text-sm text-slate-500">
                  Belum memiliki akun peserta?{' '}
                  <Link
                    to="/register"
                    className="text-yellow-700 hover:text-yellow-800 font-bold hover:underline"
                  >
                    Daftar di sini
                  </Link>
                </p>
              </div>

            </div>

            <p className="text-center text-xs text-slate-400 mt-6">
              © 2026 NEXUS ITC. All Rights Reserved.
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;