
import React from 'react';
import { motion } from 'framer-motion';
import {
  Cpu,
  Sparkles,
  Users,
  Rocket,
  Terminal,
  ArrowUpRight,
} from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const benefits = [
  {
    number: '01',
    category: 'TECHNICAL SKILL',
    title: 'Akselerasi Keterampilan Teknis Nyata',
    description:
      'Tantangan dirancang menyerupai benchmark industri global. Uji keahlian rekayasa algoritma, arsitektur web modern, eksploitasi keamanan siber, dan analisis data cerdas dengan evaluasi langsung dari para praktisi senior.',
    icon: Cpu,
    size: 'md:col-span-7',
    featured: true,
  },
  {
    number: '02',
    category: 'PORTFOLIO',
    title: 'Portofolio Nasional Kredibel',
    description:
      'Karya dan pencapaian Anda terdokumentasi dalam rekam jejak resmi tingkat nasional, memperkuat portofolio bagi rekruter dan universitas terkemuka.',
    icon: Sparkles,
    size: 'md:col-span-5',
  },
  {
    number: '03',
    category: 'COLLABORATION',
    title: 'Jejaring Kolaboratif',
    description:
      'Bangun relasi dengan ratusan talenta muda potensial, alumni berprestasi, dan komunitas pengembang se-Indonesia.',
    icon: Users,
    size: 'md:col-span-4',
  },
  {
    number: '04',
    category: 'REAL IMPACT',
    title: 'Solusi Dampak Nyata',
    description:
      'Setiap tema lomba merespon kebutuhan riil transformasi kota cerdas, efisiensi data, dan ketahanan siber publik.',
    icon: Rocket,
    size: 'md:col-span-4',
  },
  {
    number: '05',
    category: 'TECHNOLOGY',
    title: 'Wawasan Teknologi Terkini',
    description:
      'Dapatkan akses langsung ke metodologi pengembangan masa kini: AI tooling, secure code pipelines, dan scalable design systems.',
    icon: Terminal,
    size: 'md:col-span-4',
  },
];

export const BenefitsSection = () => {
  return (
    <section
      className="relative overflow-hidden border-b border-slate-200 bg-white py-20 sm:py-24 lg:py-28"
    >
      {/* Decorative Background */}
      <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-yellow-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-yellow-200/30 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:space-y-16 lg:px-8">

        {/* Section Heading */}
        <SectionHeading
          badge="// 02. WHY PARTICIPATE"
          title="Keunggulan Mengikuti"
          highlight="Kompetisi Ini"
          description="Bukan sekadar ajang perlombaan, melainkan akselerator karir dan platform pembuktian kompetensi teknologi terstandarisasi."
        />

        {/* Benefits Bento Grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-12">

          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <motion.div
                key={benefit.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className={`${benefit.size} group relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-300 hover:bg-white hover:shadow-xl sm:p-8 ${
                  benefit.featured ? 'md:p-10' : ''
                }`}
              >
                {/* Decorative Circle */}
                <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-yellow-100/50 transition-transform duration-500 group-hover:scale-150" />

                <div className="relative z-10 flex h-full flex-col justify-between gap-8">

                  {/* Card Top */}
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-100 text-yellow-700 transition-all duration-300 group-hover:bg-yellow-400 group-hover:text-slate-950">
                      <Icon className="h-6 w-6" />
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-bold tracking-wider text-slate-500">
                        {benefit.category}
                      </span>

                      <span className="text-sm font-black text-slate-300">
                        {benefit.number}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <h3
                        className={`font-black leading-tight text-slate-900 transition-colors group-hover:text-yellow-700 ${
                          benefit.featured
                            ? 'max-w-xl text-2xl sm:text-3xl'
                            : 'text-xl'
                        }`}
                      >
                        {benefit.title}
                      </h3>

                      <ArrowUpRight className="mt-1 h-5 w-5 flex-shrink-0 text-slate-300 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-yellow-600" />
                    </div>

                    <p
                      className={`leading-relaxed text-slate-600 ${
                        benefit.featured
                          ? 'max-w-2xl text-base'
                          : 'text-sm'
                      }`}
                    >
                      {benefit.description}
                    </p>
                  </div>

                  {/* Bottom Accent */}
                  <div className="h-1 w-12 rounded-full bg-yellow-300 transition-all duration-300 group-hover:w-24 group-hover:bg-yellow-500" />

                </div>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
