import EvervaultHero from '../src/components/landing/EvervaultHero';
import TrustChainRow from '../src/components/landing/TrustChainRow';
import HeroFeatureCard from '../src/components/landing/HeroFeatureCard';
import EncryptSection from '../src/components/landing/EncryptSection';
import ProcessSection from '../src/components/landing/ProcessSection';
import ShareSection from '../src/components/landing/ShareSection';
import TestimonialSection from '../src/components/landing/TestimonialSection';
import CtaSection from '../src/components/landing/CtaSection';
import BackgroundGlows from '../src/components/motion/BackgroundGlows';
import SectionTransition from '../src/components/motion/SectionTransition';

export const metadata = {
  title: 'Evervault — Encryption Infrastructure for Developers',
  description: 'The encryption platform for developers to encrypt, process, and share sensitive customer data.',
};

export default function HomePage() {
  return (
    <div className="bg-black min-h-screen text-slate-100 relative overflow-x-hidden">
      {/* Background Ambient Multi-Layer Drift Glows */}
      <BackgroundGlows />

      {/* Main Content Sections with Seamless Fluid Transitions */}
      <div className="relative z-10 space-y-4 sm:space-y-8">
        <EvervaultHero />

        <SectionTransition enableScale={false}>
          <TrustChainRow />
        </SectionTransition>

        <SectionTransition>
          <HeroFeatureCard />
        </SectionTransition>

        <SectionTransition>
          <EncryptSection />
        </SectionTransition>

        <SectionTransition>
          <ProcessSection />
        </SectionTransition>

        <SectionTransition>
          <ShareSection />
        </SectionTransition>

        <SectionTransition>
          <TestimonialSection />
        </SectionTransition>

        <SectionTransition>
          <CtaSection />
        </SectionTransition>
      </div>
    </div>
  );
}
