
import React, { useMemo } from 'react';
import SectionHeading from '../ui/SectionHeading';
import { SPONSORS_DATA } from '../../data/festivalData';
import { useWebsiteConfig } from '../../context/WebsiteConfigContext';
import { ExternalLink, Handshake, ArrowRight, Sparkles } from 'lucide-react';

export const SponsorsSection = () => {
  const { config } = useWebsiteConfig();

  const rawSponsors = config?.sponsors || [];
  const publishedSponsors = rawSponsors.filter(
    (sponsor) => sponsor.status !== 'draft'
  );

  const tierLabels = {
    platinum: 'Platinum Partners',
    gold: 'Gold Partners',
    silver: 'Silver Partners',
    partner: 'Community & Media Partners',
  };

  const dynamicTiers = useMemo(() => {
    if (publishedSponsors.length === 0) return null;

    const tiers = ['platinum', 'gold', 'silver', 'partner'];
    const groups = [];

    tiers.forEach((tier) => {
      const items = publishedSponsors.filter(
        (sponsor) => (sponsor.tier || 'partner').toLowerCase() === tier
      );

      if (items.length > 0) {
        groups.push({
          tier: tierLabels[tier] || tier.toUpperCase(),
          items: items.map((item) => ({
            name: item.name,
            role: item.tier
              ? `${item.tier.toUpperCase()} SPONSOR`
              : 'PARTNER',
            logoText:
              item.logoText || item.name.slice(0, 2).toUpperCase(),
            url: item.websiteUrl,
          })),
        });
      }
    });

    return groups.length > 0 ? groups : null;
  }, [publishedSponsors]);

  const displayTiers = dynamicTiers || SPONSORS_DATA;

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-white py-24 sm:py-28">

      {/* Background Decoration */}
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-yellow-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-yellow-50 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <SectionHeading
          badge="// 06. PARTNERS & ECOSYSTEM"
          title="Kolaborator &"
          highlight="Mitra Pendukung"
          description="Didukung oleh jaringan ekosistem teknologi, komunitas pengembang regional, dan institusi akademik yang mendukung perkembangan inovasi digital."
        />

        {/* Partnership Introduction */}
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-100 text-yellow-700">
            <Handshake className="h-6 w-6" />
          </div>

          <h3 className="text-lg font-bold text-slate-900">
            Bersama Membangun Inovasi
          </h3>

          <p className="text-sm leading-relaxed text-slate-500">
            Apresiasi untuk seluruh pihak yang telah menjadi bagian dari
            perjalanan NEXUS ITC 2026.
          </p>
        </div>

        {/* Sponsor Showcase */}
        <div className="space-y-12">
          {displayTiers.map((tierGroup, index) => (
            <div key={index} className="space-y-6">

              {/* Tier Heading */}
              <div className="flex items-center justify-center gap-4">
                <span className="h-px w-10 bg-slate-200" />

                <span className="rounded-full border border-yellow-200 bg-yellow-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-yellow-800">
                  {tierGroup.tier}
                </span>

                <span className="h-px w-10 bg-slate-200" />
              </div>

              {/* Partner Cards */}
              <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-4 sm:gap-5">

                {tierGroup.items.map((partner, partnerIndex) => {
                  const CardContent = (
                    <div className="group flex min-w-[220px] items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-yellow-300 hover:shadow-lg hover:shadow-yellow-100/70">

                      {/* Logo Placeholder */}
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-yellow-200 bg-yellow-50 text-sm font-black text-yellow-800 transition-colors duration-200 group-hover:bg-yellow-400 group-hover:text-slate-950">
                        {partner.logoText
                          ? partner.logoText.slice(0, 2)
                          : partner.name.charAt(0)}
                      </div>

                      {/* Partner Information */}
                      <div className="min-w-0 flex-1 text-left">
                        <p className="flex items-center gap-1.5 text-sm font-bold leading-tight text-slate-800 transition-colors group-hover:text-yellow-700">
                          <span>{partner.name}</span>

                          {partner.url && (
                            <ExternalLink className="h-3.5 w-3.5 shrink-0 text-slate-400 group-hover:text-yellow-600" />
                          )}
                        </p>

                        <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-slate-400">
                          {partner.role}
                        </p>
                      </div>
                    </div>
                  );

                  return partner.url ? (
                    <a
                      key={partnerIndex}
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                      {CardContent}
                    </a>
                  ) : (
                    <div key={partnerIndex}>{CardContent}</div>
                  );
                })}

              </div>
            </div>
          ))}
        </div>

        {/* Partnership Invitation */}
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-yellow-200 bg-gradient-to-br from-yellow-50 via-white to-white p-8 shadow-sm sm:p-10">

          <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-yellow-200/40" />

          <div className="relative flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">

            <div className="max-w-xl space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-800">
                <Sparkles className="h-3.5 w-3.5" />
                PARTNERSHIP OPPORTUNITY
              </div>

              <h3 className="text-xl font-black text-slate-900 sm:text-2xl">
                Tertarik Menjadi Bagian dari Festival Ini?
              </h3>

              <p className="text-sm leading-relaxed text-slate-600">
                Buka peluang kolaborasi sponsorship atau media partner
                dengan menghubungi sekretariat festival melalui email
                resmi panitia.
              </p>
            </div>

            <a
              href={`mailto:${config?.general?.contactEmail || 'contact@nexusitc2026.id'}`}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-yellow-400 px-6 py-3 text-sm font-bold text-slate-950 shadow-md shadow-yellow-200/60 transition-all hover:-translate-y-0.5 hover:bg-yellow-300"
            >
              <span>Hubungi Panitia</span>
              <ArrowRight className="h-4 w-4" />
            </a>

          </div>
        </div>

      </div>
    </section>
  );
};

export default SponsorsSection;
