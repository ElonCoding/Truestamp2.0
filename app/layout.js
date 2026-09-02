import './globals.css';
import { ThemeProvider } from '../src/providers/ThemeProvider';
import { Web3Provider } from '../src/providers/Web3Provider';
import { AuthProvider } from '../src/providers/AuthProvider';
import Navbar from '../src/components/layout/Navbar';
import SmoothScroll from '../src/components/motion/SmoothScroll';
import Footer from '../src/components/layout/Footer';
import TransactionStatus from '../src/components/shared/TransactionStatus';

export const metadata = {
  title: 'SAHYOG — Automated Blockchain Intelligence & VASP Attribution Engine',
  description: 'National multi-chain cryptocurrency tracing, exchange attribution, and lawful asset freezing engine for Indian Law Enforcement Agencies.',
  keywords: 'sahyog, blockchain intelligence, VASP attribution, crypto tracing, LEA, cybercrime, bitcoin, ethereum, tron, solana',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#05070E] text-slate-100 antialiased min-h-screen selection:bg-purple-500 selection:text-white">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <AuthProvider>
            <Web3Provider>
              <SmoothScroll>
                <div className="relative flex flex-col min-h-screen bg-black">
                  <main className="flex-1 relative z-10">
                    {children}
                  </main>
                  <Footer />
                  <TransactionStatus />
                </div>
              </SmoothScroll>
            </Web3Provider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
