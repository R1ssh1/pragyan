import React from "react";
import { PageMeta } from "../seo/PageMeta";
import { AboutHeroSection } from "../components/sections/about/AboutHeroSection";
import { DirectorDeskSection } from "../components/sections/about/DirectorDeskSection";
import { AboutOverviewSection } from "../components/sections/about/AboutOverviewSection";
import { JourneySection } from "../components/sections/about/JourneySection";
import { TimelineSection } from "../components/sections/about/TimelineSection";
import { LeadershipSection } from "../components/sections/about/LeadershipSection";
import { TrustedByBannerSection } from "../components/sections/about/TrustedByBannerSection";
import { FooterCTA } from "../components/sections/FooterCTA";

export const About: React.FC = () => (
  <>
    <PageMeta
      title="About Pragyan Steel & Engineering Co. — 30 Years of Steel Excellence"
      description="Learn about Pragyan Steel's three-decade journey from a Virar trading firm to a leading manufacturer of stainless steel pipes, tubes, fittings, and flanges — trusted by BARC, ISRO, NPCIL, DRDO, and more."
      canonical="https://pragyan-nine.vercel.app/about"
    />

    <main>
      {/* 1. Page Hero */}
      <AboutHeroSection />

      {/* 2. Director's Desk */}
      <DirectorDeskSection />

      {/* 3. Company Overview + Vision & Mission */}
      <AboutOverviewSection />

      {/* 4. Our Journey */}
      <JourneySection />

      {/* 4. The Steel Legacy Timeline (1994–2024) */}
      <TimelineSection />

      {/* 5. Leadership — Two Generations */}
      <LeadershipSection />

      {/* 6. Trusted By — Premier Institutions */}
      <TrustedByBannerSection />

      {/* 7. Footer CTA */}
      <FooterCTA />
    </main>
  </>
);
