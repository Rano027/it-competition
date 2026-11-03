```jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import Button from '../ui/Button';
import { useWebsiteConfig } from '../../context/WebsiteConfigContext';

export const Navbar = () => {
  const { user, isAuthenticated, logout, role } = useAuth();
  const { config } = useWebsiteConfig();
  const general = config?.general || {};

  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const getDashboardPath = () => {
    if (role === 'admin') return '/admin';
    if (role === 'judge') return '/judge';

    return '/dashboard';
  };

  const isHome = location.pathname === '/';

  const handleNavClick = (to, hashId) => {
    setMobileMenuOpen(false);

    if (isHome && hashId) {
      const el = document.getElementById(hashId);

      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    navigate(to);
  };

  const navLinks = [
    { label: 'Beranda', to: '/', hash: '' },
    { label: 'Tentang', to: '/about', hash: 'about' },
    { label: 'Kompetisi', to: '/competitions', hash: 'competitions' },
    { label: 'Timeline', to: '/timeline', hash: 'timeline' },
    { label: 'FAQ', to: '/faq', hash: 'faq' },
  ];

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300
        ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm py-3'
            : 'bg-white/90 backdrop-blur-sm border-b border-slate-100 py-4'
        }
      `}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">

          {/* BRAND */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none"
          >
            {/* Logo */}
            <div
              className="
                flex h-10 w-10 items-center justify-center
                rounded-xl
                bg-yellow-400
                text-slate-950
                text-lg font-black
                shadow-sm
                transition-transform
                group-hover:scale-105
              "
            >
              {general.siteName
                ? general.siteName.charAt(0)
                : 'N'}
            </div>

            {/* Brand Text */}
            <div>
              <span
                className="
                  block
                  text-base sm:text-lg
                  font-black
                  tracking-tight
                  text-slate-900
                  leading-tight
                "
              >
                {general.siteName || 'NEXUS ITC 2026'}
              </span>

              <span
                className="
                  block
                  mt-0.5
                  text-[9px] sm:text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.12em]
                  text-slate-500
                "
              >
                {general.editionTag || 'TECHFEST 2026'}
              </span>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav
            className="
              hidden md:flex
              items-center
              gap-1
              rounded-full
              border border-slate-200
              bg-slate-50
              px-2 py-1.5
            "
          >
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.to, link.hash)}
                className="
                  rounded-full
                  px-4 py-2
                  text-xs
                  font-semibold
                  text-slate-600
                  transition-all
                  hover:bg-white
                  hover:text-slate-950
                  hover:shadow-sm
                  focus:outline-none
                  focus:ring-2
                  focus:ring-yellow-300
                "
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* DESKTOP ACTIONS */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link to={getDashboardPath()}>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="
                      border border-slate-200
                      bg-white
                      text-slate-700
                      hover:bg-slate-50
                    "
                  >
                    Dashboard ({role})
                  </Button>
                </Link>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-slate-600 hover:text-slate-900"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="
                      text-slate-700
                      hover:bg-slate-100
                    "
                  >
                    Masuk
                  </Button>
                </Link>

                <Link to="/register">
                  <Button
                    variant="glow"
                    size="sm"
                    className="
                      gap-1.5
                      border-0
                      bg-yellow-400
                      text-slate-950
                      shadow-sm
                      hover:bg-yellow-300
                    "
                  >
                    <span>Daftar Sekarang</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="
                rounded-xl
                border border-slate-200
                bg-white
                p-2.5
                text-slate-800
                shadow-sm
                transition-colors
                hover:bg-slate-50
                focus:outline-none
                focus:ring-2
                focus:ring-yellow-300
              "
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div
          className="
            md:hidden
            border-t border-slate-200
            bg-white
            px-5
            py-5
            shadow-lg
          "
        >
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.to, link.hash)}
                className="
                  w-full
                  rounded-xl
                  px-4 py-3
                  text-left
                  text-sm
                  font-semibold
                  text-slate-700
                  transition-colors
                  hover:bg-slate-50
                  hover:text-slate-950
                "
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="mt-4 border-t border-slate-200 pt-4">
            {isAuthenticated ? (
              <div className="flex flex-col gap-2">
                <Link
                  to={getDashboardPath()}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button
                    className="
                      w-full
                      border border-slate-200
                      bg-white
                      text-slate-800
                    "
                    variant="secondary"
                    size="md"
                  >
                    Buka Dashboard ({role})
                  </Button>
                </Link>

                <Button
                  className="w-full text-slate-700"
                  variant="ghost"
                  size="md"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button
                    className="
                      w-full
                      border border-slate-200
                      bg-white
                      text-slate-800
                    "
                    variant="secondary"
                    size="md"
                  >
                    Masuk ke Akun
                  </Button>
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button
                    className="
                      w-full
                      border-0
                      bg-yellow-400
                      text-slate-950
                      hover:bg-yellow-300
                    "
                    variant="glow"
                    size="md"
                  >
                    Daftar Sekarang
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
```
