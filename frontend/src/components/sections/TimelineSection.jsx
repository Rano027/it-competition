
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle, Clock } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { TIMELINE_STAGES } from '../../data/festivalData';

export const TimelineSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  const activeStage = TIMELINE_STAGES[activeStep];

  return (
    <section
      id="timeline"
      className="relative overflow-hidden border-b border-slate-200 bg-white py-24 sm:py-32"
    >
      {/* Decorative Background */}
      <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-yellow-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-yellow-100/50 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <SectionHeading
          badge="// 04. TIMELINE"
          title="Jadwal & Milestone"
          highlight="Pelaksanaan 2026"
          description="Ikuti rangkaian tahapan resmi kompetisi, mulai dari pembukaan pendaftaran hingga malam penganugerahan pemenang."
        />

        {/* Desktop Interactive Timeline */}
        <div className="hidden space-y-10 lg:block">

          {/* Timeline Navigation */}
          <div className="relative px-6">

            {/* Connecting Line */}
            <div className="absolute left-12 right-12 top-6 h-1 rounded-full bg-slate-200" />

            {/* Progress Line */}
            <div
              className="absolute left-12 top-6 h-1 rounded-full bg-yellow-400 transition-all duration-500"
              style={{
                width: `${
                  TIMELINE_STAGES.length > 1
                    ? (activeStep / (TIMELINE_STAGES.length - 1)) * 88
                    : 0
                }%`,
              }}
            />

            <div
              className="relative z-10 grid gap-3"
              style={{
                gridTemplateColumns: `repeat(${TIMELINE_STAGES.length}, minmax(0, 1fr))`,
              }}
            >
              {TIMELINE_STAGES.map((stage, idx) => {
                const isActive = activeStep === idx;
                const isCurrent = stage.status === 'current';

                return (
                  <button
                    key={stage.step}
                    onClick={() => setActiveStep(idx)}
                    className="group flex flex-col items-center text-center focus:outline-none"
                  >
                    {/* Timeline Node */}
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl border-2 text-sm font-bold transition-all duration-300 ${
                        isActive
                          ? 'scale-110 border-yellow-400 bg-yellow-400 text-slate-950 shadow-lg shadow-yellow-200'
                          : isCurrent
                          ? 'border-yellow-400 bg-yellow-50 text-yellow-700'
                          : 'border-slate-200 bg-white text-slate-400 group-hover:border-yellow-400 group-hover:text-yellow-700'
                      }`}
                    >
                      {stage.step}
                    </div>

                    {/* Stage Information */}
                    <div className="mt-4 space-y-1">
                      <p
                        className={`line-clamp-2 text-xs font-bold transition-colors ${
                          isActive
                            ? 'text-yellow-700'
                            : 'text-slate-700 group-hover:text-yellow-700'
                        }`}
                      >
                        {stage.title}
                      </p>

                      <span className="block text-[10px] text-slate-400">
                        {stage.dates}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Stage Detail */}
          {activeStage && (
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm sm:p-10"
            >
              {/* Decorative Circle */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-yellow-100/70" />

              <div className="relative z-10 grid grid-cols-1 items-center gap-8 md:grid-cols-12">

                {/* Stage Description */}
                <div className="space-y-4 md:col-span-8">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-yellow-200 bg-yellow-100 px-3 py-1.5 text-xs font-bold text-yellow-800">
                      TAHAP {activeStage.step}
                    </span>

                    <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                      <Calendar className="h-4 w-4 text-yellow-600" />
                      {activeStage.dates}
                    </span>

                    {activeStage.status === 'current' && (
                      <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-semibold text-emerald-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Sedang Berlangsung
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-black leading-tight text-slate-900 sm:text-3xl">
                    {activeStage.title}
                  </h3>

                  <p className="font-semibold text-yellow-700">
                    {activeStage.subtitle}
                  </p>

                  <p className="max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                    {activeStage.description}
                  </p>
                </div>

                {/* Activity Highlights */}
                <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 md:col-span-4">
                  <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <Clock className="h-4 w-4 text-yellow-600" />
                    Fokus Aktivitas
                  </h4>

                  <ul className="space-y-3">
                    {activeStage.highlights.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs leading-relaxed text-slate-600"
                      >
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </motion.div>
          )}
        </div>

        {/* Mobile & Tablet Vertical Timeline */}
        <div className="relative space-y-6 lg:hidden">

          {/* Vertical Connecting Line */}
          <div className="absolute bottom-6 left-6 top-6 w-0.5 bg-slate-200" />

          {TIMELINE_STAGES.map((stage) => {
            const isCurrent = stage.status === 'current';

            return (
              <div
                key={stage.step}
                className="relative z-10 flex items-start gap-4"
              >
                {/* Timeline Node */}
                <div
                  className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border-2 text-sm font-bold ${
                    isCurrent
                      ? 'border-yellow-400 bg-yellow-400 text-slate-950 shadow-md shadow-yellow-200'
                      : 'border-slate-200 bg-white text-slate-500'
                  }`}
                >
                  {stage.step}
                </div>

                {/* Stage Card */}
                <div className="flex-1 space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-yellow-300 hover:shadow-md">

                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-yellow-700">
                      <Calendar className="h-3.5 w-3.5" />
                      {stage.dates}
                    </span>

                    {isCurrent && (
                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                        Sedang Berlangsung
                      </span>
                    )}
                  </div>

                  <h4 className="text-base font-bold text-slate-900">
                    {stage.title}
                  </h4>

                  {stage.subtitle && (
                    <p className="text-xs font-semibold text-yellow-700">
                      {stage.subtitle}
                    </p>
                  )}

                  <p className="text-xs leading-relaxed text-slate-600">
                    {stage.description}
                  </p>

                  {/* Activity Highlights */}
                  {stage.highlights?.length > 0 && (
                    <div className="border-t border-slate-100 pt-3">
                      <p className="mb-2 text-xs font-bold text-slate-700">
                        Fokus Aktivitas:
                      </p>

                      <ul className="space-y-2">
                        {stage.highlights.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-xs text-slate-500"
                          >
                            <CheckCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-yellow-600" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default TimelineSection;
