import './globals.css';
import { ThemeProvider } from '../src/providers/ThemeProvider';
import { Web3Provider } from '../src/providers/Web3Provider';
import { AuthProvider } from '../src/providers/AuthProvider';
import Navbar from '../src/components/layout/Navbar';
import Footer from '../src/components/layout/Footer';
import TransactionStatus from '../src/components/shared/TransactionStatus';

export const metadata = {
  title: 'TrueStamp — Blockchain Document Verification on Polygon',
  description: 'Enterprise-grade blockchain document verification platform. Instantly authenticate, issue, and manage documents with cryptographic proofs on Polygon.',
  keywords: 'blockchain, document verification, polygon, IPFS, merkle tree, NFT, Web3',
  openGraph: {
    title: 'TrueStamp — Blockchain Document Verification',
    description: 'Instant cryptographic proof for every document. Built on Polygon.',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TrueStamp',
    description: 'Blockchain document verification on Polygon',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#080312] text-white antialiased min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <AuthProvider>
            <Web3Provider>
              <div className="relative flex flex-col min-h-screen">
                {/* Grid background */}
                <div className="fixed inset-0 grid-bg opacity-100 pointer-events-none" />
                {/* Hero glow */}
                <div className="fixed inset-0 bg-hero-glow pointer-events-none" />
                <Navbar />
                <main className="flex-1 relative z-10">
                  {children}
                </main>
                <Footer />
                <TransactionStatus />
              </div>
            </Web3Provider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
