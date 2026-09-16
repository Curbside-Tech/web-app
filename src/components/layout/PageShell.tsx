import type { ReactNode } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

interface PageShellProps {
  children: ReactNode;
}

function LiquidBlobs() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* Mesh gradient base */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_5%_0%,rgba(186,230,253,0.58)_0%,transparent_43%),radial-gradient(ellipse_at_98%_18%,rgba(224,247,255,0.6)_0%,transparent_38%),radial-gradient(ellipse_at_50%_100%,rgba(207,238,253,0.45)_0%,transparent_48%)]" />

      {/* Floating blobs */}
      <div className="animate-blob absolute -left-20 top-16 h-[28rem] w-[28rem] rounded-full bg-[#c8effb]/45 blur-3xl" />
      <div className="animate-blob-delayed absolute -right-16 top-1/4 h-80 w-80 rounded-full bg-[#d7f3ff]/45 blur-3xl" />
      <div className="animate-blob absolute bottom-10 left-1/4 h-96 w-96 rounded-full bg-[#e0f7ff]/40 blur-3xl" />
      <div className="absolute right-1/3 top-2/3 h-64 w-64 rounded-full bg-[#c6e8f3]/30 blur-3xl" />
    </div>
  );
}

export default function PageShell({ children }: PageShellProps) {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#f4fbff]">
      <LiquidBlobs />
      <div className="relative z-10 flex min-h-screen flex-col">
        <NavBar />
        <main className="page-content flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
