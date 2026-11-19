import React from 'react';
import Ticker from '@/components/landing/Ticker';
import Hero from '@/components/landing/Hero';
import StatStrip from '@/components/landing/StatStrip';
import Problem from '@/components/landing/Problem';
import BeforeAfter from '@/components/landing/BeforeAfter';
import HowItWorks from '@/components/landing/HowItWorks';
import Showcase from '@/components/landing/Showcase';
import RulesGrid from '@/components/landing/RulesGrid';
import RoiCalculator from '@/components/landing/RoiCalculator';
import FaqSection from '@/components/landing/FaqSection';
import Testimonials from '@/components/landing/Testimonials';
import FinalCta from '@/components/landing/FinalCta';

export default function MarketingLandingPage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20 overflow-hidden">
      <Ticker />
      <Hero />
      <StatStrip />
      <Problem />
      <BeforeAfter />
      <HowItWorks />
      <Showcase />
      <RulesGrid />
      <RoiCalculator />
      <FaqSection />
      <Testimonials />
      <FinalCta />
    </div>
  );
}
