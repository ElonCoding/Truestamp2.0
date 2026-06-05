import Hero from '../src/components/landing/Hero';
import Features from '../src/components/landing/Features';
import HowItWorks from '../src/components/landing/HowItWorks';
import TrustBanner from '../src/components/landing/TrustBanner';

export const metadata = {
  title: 'TrueStamp — Blockchain Document Verification on Polygon',
  description: 'Instantly verify document authenticity with cryptographic Merkle proofs on Polygon.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <TrustBanner />
    </>
  );
}
