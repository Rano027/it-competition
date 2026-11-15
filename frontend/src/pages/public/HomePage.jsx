
import React, { useMemo } from 'react';
import { useWebsiteConfig } from '../../context/WebsiteConfigContext';

import HeroSection from '../../components/sections/HeroSection';
import AboutSection from '../../components/sections/AboutSection';
import BenefitsSection from '../../components/sections/BenefitsSection';
import CompetitionSection from '../../components/sections/CompetitionSection';
import TimelineSection from '../../components/sections/TimelineSection';
import PrizePoolSection from '../../components/sections/PrizePoolSection';
import FAQSection from '../../components/sections/FAQSection';
import SponsorsSection from '../../components/sections/SponsorsSection';
import FinalCTASection from '../../components/sections/FinalCTASection';

const SECTION_COMPONENTS = {
  hero: HeroSection,
  about: AboutSection,
  benefits: BenefitsSection,
  competitions: CompetitionSection,
  timeline: TimelineSection,
  prizePool: PrizePoolSection,
  faq: FAQSection,
  sponsors: SponsorsSection,
  finalCta: FinalCTASection,
};

export const HomePage = () => {
  const { config } = useWebsiteConfig();

  const orderedSections = useMemo(() => {
    if (!config?.sections || !Array.isArray(config.sections)) {
      return Object.keys(SECTION_COMPONENTS).map((key) => ({
        key,
        enabled: true,
      }));
    }

    return [...config.sections]
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .filter((section) => section.enabled !== false);
  }, [config?.sections]);

  return (
    <div className="relative overflow-hidden bg-white">
      {orderedSections.map((section) => {
        const Component =
          SECTION_COMPONENTS[section.key || section.id];

        if (!Component) return null;

        return (
          <Component
            key={section.id || section.key}
            sectionConfig={section}
          />
        );
      })}
    </div>
  );
};

export default HomePage;
