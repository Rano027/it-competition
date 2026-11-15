
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  MessageCircle,
  FileText,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import { FAQ_DATA, FESTIVAL_INFO } from '../../data/festivalData';
import { useWebsiteConfig } from '../../context/WebsiteConfigContext';

export const FAQSection = () => {
  const { config } = useWebsiteConfig();
  const dynamicFaqs = config?.faqs || [];
  const general = config?.general || {};

  const categories = useMemo(() => {
    if (dynamicFaqs.length === 0) {
      return FAQ_DATA.map((category) => category.category);
    }

    const cats = new Set(
      dynamicFaqs.map((faq) => {
        const category = faq.category || 'umum';
        return category.charAt(0).toUpperCase() + category.slice(1);
      })
    );

    return ['Semua', ...Array.from(cats)];
  }, [dynamicFaqs]);

  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState(0);

  const currentQuestions = useMemo(() => {
    if (dynamicFaqs.length === 0) {
      return FAQ_DATA[activeCategoryIndex]?.questions || [];
    }

    const selectedCategory = categories[activeCategoryIndex];

    if (selectedCategory === 'Semua') {
      return dynamicFaqs.map((faq) => ({
        q: faq.question,
        a: faq.answer,
      }));
    }

    return dynamicFaqs
      .filter(
        (faq) =>
          (faq.category || 'umum').toLowerCase() ===
          selectedCategory.toLowerCase()
      )
      .map((faq) => ({
        q: faq.question,
        a: faq.answer,
      }));
  }, [dynamicFaqs, categories, activeCategoryIndex]);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const whatsappNumber = FESTIVAL_INFO.contactWhatsapp.replace(
    /[^0-9]/g,
    ''
  );

  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <section
      id="faq"
      className="relative overflow-hidden border-b border-slate-200 bg-white py-24 sm:py-32"
    >
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-yellow-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-yellow-50 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl space-y-12 px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <SectionHeading
          badge="// 05. FREQUENTLY ASKED"
          title="Pertanyaan yang Sering"
          highlight="Diajukan"
          description="Temukan jawaban seputar persyaratan pendaftaran, berkas administrasi, dan sistem perlombaan NEXUS ITC 2026."
        />

        {/* FAQ Introduction */}
        <div className="mx-auto flex max-w-xl items-center justify-center gap-3 text-center">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-100 text-yellow-700">
            <HelpCircle className="h-5 w-5" />
          </div>

          <p className="text-left text-sm leading-relaxed text-slate-500">
            Pilih kategori pertanyaan di bawah ini untuk menemukan informasi
            yang Anda butuhkan.
          </p>
        </div>

        {/* Category Selector */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category, index) => (
            <button
              key={category}
              type="button"
              onClick={() => {
                setActiveCategoryIndex(index);
                setOpenIndex(0);
              }}
              className={`rounded-full border px-5 py-2.5 text-xs font-bold transition-all duration-200 sm:text-sm ${
                activeCategoryIndex === index
                  ? 'border-yellow-400 bg-yellow-400 text-slate-950 shadow-md shadow-yellow-200'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-yellow-300 hover:bg-yellow-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {currentQuestions.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={`${activeCategoryIndex}-${index}`}
                layout
                className={`overflow-hidden rounded-2xl border bg-white transition-all duration-200 ${
                  isOpen
                    ? 'border-yellow-400 shadow-lg shadow-yellow-100/70'
                    : 'border-slate-200 hover:border-yellow-300 hover:shadow-md'
                }`}
              >
                <button
                  id={`faq-question-${index}`}
                  type="button"
                  onClick={() => toggleQuestion(index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
                        isOpen
                          ? 'bg-yellow-400 text-slate-950'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      <span className="text-sm font-bold">
                        {(index + 1).toString().padStart(2, '0')}
                      </span>
                    </span>

                    <span
                      className={`text-sm font-bold leading-relaxed sm:text-base ${
                        isOpen ? 'text-slate-950' : 'text-slate-700'
                      }`}
                    >
                      {item.q}
                    </span>
                  </div>

                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
                      isOpen
                        ? 'rotate-180 bg-yellow-400 text-slate-950'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      role="region"
                      aria-labelledby={`faq-question-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.25,
                        ease: 'easeInOut',
                      }}
                      className="overflow-hidden"
                    >
                      <div className="ml-5 border-t border-slate-100 px-5 pb-6 pt-4 sm:ml-6 sm:px-6">
                        <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                          {item.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          {currentQuestions.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
              <HelpCircle className="mx-auto mb-3 h-8 w-8 text-slate-400" />
              <p className="font-semibold text-slate-700">
                Belum ada pertanyaan pada kategori ini.
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Silakan pilih kategori lainnya.
              </p>
            </div>
          )}
        </div>

        {/* Contact Support */}
        <div className="relative overflow-hidden rounded-3xl border border-yellow-200 bg-gradient-to-br from-yellow-50 via-white to-white p-6 shadow-sm sm:p-8">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-yellow-200/40" />

          <div className="relative flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
            <div className="max-w-lg space-y-2">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-800">
                <Sparkles className="h-3.5 w-3.5" />
                BUTUH BANTUAN?
              </div>

              <h3 className="text-xl font-black text-slate-900 sm:text-2xl">
                Masih Memiliki Pertanyaan Lain?
              </h3>

              <p className="text-sm leading-relaxed text-slate-600">
                Tim helpdesk resmi kami siap membantu Anda melalui WhatsApp
                dan menyediakan panduan lengkap mengenai kompetisi.
              </p>
            </div>

            <div className="relative flex flex-wrap justify-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="secondary"
                  size="sm"
                  className="gap-2 border-0 bg-yellow-400 text-slate-950 hover:bg-yellow-300"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Hubungi Panitia</span>
                </Button>
              </a>

              <a
                href={FESTIVAL_INFO.guidebookUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                >
                  <FileText className="h-4 w-4" />
                  <span>Guidebook PDF</span>
                </Button>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
