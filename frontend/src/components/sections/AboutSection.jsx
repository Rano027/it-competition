
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Layers, Award, Terminal, Cpu } from 'lucide-react';
import { useWebsiteConfig } from '../../context/WebsiteConfigContext';

export const AboutSection = () => {
  const { config } = useWebsiteConfig();
  const about = config?.about || {};
  const general = config?.general || {};

  const statIcons = [Layers, Award, Cpu, Terminal];

  const defaultStats = [
    { value: '6+', label: 'Kompetisi Terbuka' },
    { value: '80+', label: 'Institusi Partisipan' },
    { value: 'Rp 45JT', label: 'Total Hadiah & Dana Hibah' },
    { value: 'Ke-7', label: 'Tahun Penyelenggaraan' },
  ];

  const stats = about.stats?.length === 4
    ? about.stats
    : defaultStats;

  const highlights = [
    'Standar rubrik evaluasi oleh dewan juri pakar dan praktisi',
    'Penyelenggaraan format hybrid untuk peserta seluruh Indonesia',
    'Kesempatan belajar dan berjejaring dengan praktisi industri',
  ];

  return (
    <section
      id="about"
      className="relative overflow-hidden border-b border-slate-200 bg-slate-50 py-20 sm:py-24 lg:py-28"
    >
      {/* Decorative Background */}
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-yellow-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-yellow-100/40 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">

          {/* Left Column: About Content */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 lg:col-span-7"
          >
            {/* Section Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-600 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-yellow-400" />
              {about.badge || '01. ABOUT THE EVENT'}
            </div>

            {/* Heading */}
            <h2 className="max-w-3xl text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              {about.title || (
                <>
                  Mewadahi Inovasi Digital Generasi Muda Menuju{' '}
                  <span className="relative inline-block">
                    <span className="relative z-10">
                      Masa Depan Teknologi.
                    </span>
                    <span className="absolute bottom-1 left-0 -z-0 h-3 w-full bg-yellow-300 sm:h-4" />
                  </span>
                </>
              )}
            </h2>

            {/* Main Description */}
            <p className="max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              {about.story ||
                'HIMATIF IT Competition (NEXUS TechFest 2026) merupakan festival kompetisi teknologi informasi terbesar se-wilayah Cirebon, Indramayu, Majalengka, Kuningan (Ciayumajakuning) dan terbuka secara nasional.'}
            </p>

            <p className="max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base">
              Dirancang untuk menjembatani ide-ide teoritis civitas akademika
              dengan tantangan nyata industri digital. Melalui berbagai
              kompetisi, peserta ditantang untuk mengembangkan kemampuan
              pemecahan masalah, perancangan antarmuka, keamanan siber,
              dan rekayasa perangkat lunak.
            </p>

            {/* Highlights */}
            <div className="space-y-4 border-t border-slate-200 pt-6">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100 text-yellow-700">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>

                  <span className="text-sm font-medium leading-relaxed text-slate-700 sm:text-base">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

              {/* Decorative Element */}
              <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-yellow-100/80" />
              <div className="absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-yellow-50" />

              <div className="relative z-10 space-y-6">

                {/* Card Heading */}
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-yellow-600">
                      NEXUS ITC 2026
                    </p>
                    <h3 className="mt-2 text-xl font-extrabold text-slate-900 sm:text-2xl">
                      Sekilas Tentang Kami
                    </h3>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400 text-xl font-black text-slate-900 shadow-sm">
                    N
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-slate-500">
                  Membangun ruang kolaborasi, kreativitas, dan inovasi
                  teknologi bagi generasi muda Indonesia.
                </p>

                {/* Statistics Grid */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {stats.map((stat, index) => {
                    const IconComp = statIcons[index] || Layers;

                    return (
                      <div
                        key={index}
                        className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-300 hover:bg-yellow-50/50 hover:shadow-md sm:p-5"
                      >
                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-100 text-yellow-700">
                          <IconComp className="h-5 w-5" />
                        </div>

                        <div className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                          {stat.value}
                        </div>

                        <div className="mt-2 text-xs font-semibold leading-relaxed text-slate-500">
                          {stat.label}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Organizer Information */}
                <div className="flex flex-col gap-2 border-t border-slate-200 pt-5 text-xs sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-slate-500">
                    Penyelenggara:{' '}
                    <strong className="text-slate-800">
                      {general.siteName
                        ? general.siteName.split(' ')[0]
                        : 'HIMATIF'}
                    </strong>
                  </span>

                  <span className="font-semibold text-yellow-700">
                    {general.editionTag || 'Official Edition 2026'}
                  </span>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
