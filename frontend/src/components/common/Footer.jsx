
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  ArrowUpRight,
  MapPin,
  Instagram,
  Linkedin,
  Youtube,
  Clock3,
} from 'lucide-react';

import { FESTIVAL_INFO, COMPETITIONS_DATA } from '../../data/festivalData';
import { useWebsiteConfig } from '../../context/WebsiteConfigContext';

export const Footer = () => {
  const { config } = useWebsiteConfig();
  const general = config?.general || {};
  const footer = config?.footer || {};

  const socialLinks = [
    {
      name: 'Instagram',
      url: general.instagramUrl,
      icon: Instagram,
    },
    {
      name: 'LinkedIn',
      url: general.linkedinUrl,
      icon: Linkedin,
    },
    {
      name: 'YouTube',
      url: general.youtubeUrl,
      icon: Youtube,
    },
  ].filter((item) => item.url);

  const regions = [
    'Cirebon',
    'Indramayu',
    'Majalengka',
    'Kuningan',
  ];

  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-white text-slate-600">

      {/* Decorative Background */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-yellow-100/70 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-yellow-50 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl space-y-12 px-4 py-16 sm:px-6 lg:px-8">

        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">

          {/* Branding */}
          <div className="space-y-5 lg:col-span-4">

            <Link to="/" className="group flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400 text-xl font-black text-slate-950 shadow-md shadow-yellow-200 transition-transform group-hover:-translate-y-1">
                {general.siteName
                  ? general.siteName.charAt(0)
                  : 'N'}
              </div>

              <div>
                <span className="block text-lg font-black tracking-tight text-slate-900">
                  {general.siteName || 'NEXUS ITC'}
                </span>

                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {general.editionTag || 'EDITION 2026 // TECH FESTIVAL'}
                </span>
              </div>
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-slate-500">
              {footer.bioText ||
                'Festival kompetisi teknologi tahunan persembahan HIMATIF. Wadah pembuktian inovasi, karya rekayasa perangkat lunak, dan keunggulan digital bagi talenta muda Indonesia.'}
            </p>

            {/* Region */}
            <div className="flex flex-wrap gap-2">
              {regions.map((region) => (
                <span
                  key={region}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600"
                >
                  {region}
                </span>
              ))}
            </div>

            {/* Social Media */}
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-3 pt-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-all hover:-translate-y-1 hover:border-yellow-400 hover:bg-yellow-50 hover:text-yellow-700"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            )}

          </div>

          {/* Navigation */}
          <div className="space-y-4 lg:col-span-2">

            <h4 className="text-sm font-bold text-slate-900">
              Navigasi
            </h4>

            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="transition-colors hover:text-yellow-600">
                  Beranda
                </Link>
              </li>

              <li>
                <Link to="/about" className="transition-colors hover:text-yellow-600">
                  Tentang Acara
                </Link>
              </li>

              <li>
                <Link to="/competitions" className="transition-colors hover:text-yellow-600">
                  Daftar Lomba
                </Link>
              </li>

              <li>
                <Link to="/timeline" className="transition-colors hover:text-yellow-600">
                  Timeline Resmi
                </Link>
              </li>

              <li>
                <Link to="/faq" className="transition-colors hover:text-yellow-600">
                  Pusat Bantuan (FAQ)
                </Link>
              </li>
            </ul>

          </div>

          {/* Competition */}
          <div className="space-y-4 lg:col-span-3">

            <h4 className="text-sm font-bold text-slate-900">
              Cabang Lomba
            </h4>

            <ul className="space-y-3 text-sm">
              {COMPETITIONS_DATA.slice(0, 6).map((comp) => (
                <li key={comp.slug}>
                  <Link
                    to={`/competitions/${comp.slug}`}
                    className="group flex items-center justify-between gap-2 transition-colors hover:text-yellow-700"
                  >
                    <span className="line-clamp-1">
                      {comp.title}
                    </span>

                    <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-slate-300 opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-yellow-600 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>

          </div>

          {/* Contact */}
          <div className="space-y-4 lg:col-span-3">

            <h4 className="text-sm font-bold text-slate-900">
              Sekretariat
            </h4>

            <div className="space-y-4 text-sm">

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-yellow-100 text-yellow-700">
                  <MapPin className="h-4 w-4" />
                </div>

                <p className="leading-relaxed text-slate-500">
                  {general.address ||
                    'Gedung HIMATIF Center, Ciayumajakuning, Jawa Barat'}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-yellow-100 text-yellow-700">
                  <Mail className="h-4 w-4" />
                </div>

                <span className="break-all text-slate-500">
                  {general.contactEmail || FESTIVAL_INFO.contactEmail}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-yellow-100 text-yellow-700">
                  <Phone className="h-4 w-4" />
                </div>

                <span className="text-slate-500">
                  {general.contactPhone || FESTIVAL_INFO.contactWhatsapp}
                </span>
              </div>

            </div>

            {/* Guidebook - Coming Soon */}
            <div className="inline-flex cursor-default items-center gap-2 rounded-xl border border-yellow-200 bg-yellow-50 px-4 py-2.5 text-xs font-bold text-yellow-800">
              <Clock3 className="h-4 w-4" />
              <span>Guidebook Segera Hadir</span>
            </div>

          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 text-center sm:flex-row sm:text-left">

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />

            <span>
              NEXUS ITC 2026 · Official Competition Website
            </span>
          </div>

          <p className="text-xs text-slate-400">
            {footer.copyrightText ||
              '© 2026 HIMATIF IT Competition. All Rights Reserved.'}
          </p>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
