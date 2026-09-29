import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogoMark } from '../icons';

interface NavBarProps {
  onNavigate?: () => void;
}

const navLinks = [
  { to: '/how-it-works', label: 'How it works' },
  { to: '/treatments', label: 'Treatments' },
  { to: '/why-choose-us', label: 'Why choose us' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' }
];

export default function NavBar({ onNavigate }: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const closeMenu = () => {
    setIsOpen(false);
    onNavigate?.();
  };

  return (
    <header className="sticky top-0 z-50 px-3 py-3 sm:px-6 sm:py-4">
      <nav className="glass-panel mx-auto max-w-6xl px-4 py-2.5 sm:px-6">
        <div className="relative flex items-center justify-between">
          <Link to="/" onClick={closeMenu} className="group flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-accent to-teal-glow shadow-md shadow-teal-accent/20 transition-transform group-hover:scale-105">
              <LogoMark className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-deep">Curbside<span className="gradient-text"> Health</span></span>
          </Link>

          <div className="hidden items-center gap-1 md:absolute md:left-1/2 md:-translate-x-1/2 md:flex">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} onClick={closeMenu} className={`rounded-xl px-3.5 py-2 text-sm font-semibold transition-colors hover:bg-[#e7f6fd] hover:text-teal-accent ${pathname === link.to ? 'bg-[#e7f6fd] text-teal-accent' : 'text-slate-600'}`}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* <div className="hidden items-center gap-2 sm:flex sm:gap-2.5">
            <Link to="/sign-in" onClick={closeMenu} className="btn-secondary px-4 py-2 text-xs sm:px-5 sm:text-sm">Sign in</Link>
            <Link to="/sign-up" onClick={closeMenu} className="btn-primary px-4 py-2 text-xs sm:px-5 sm:text-sm">Sign up</Link>
          </div> */}

          <button type="button" onClick={() => setIsOpen((open) => !open)} className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-700 transition-colors hover:bg-[#e7f6fd] md:hidden" aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={isOpen}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
              {isOpen ? <path strokeLinecap="round" d="m6 6 12 12M18 6 6 18" /> : <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>

        {isOpen && <div className="mt-3 border-t border-slate-100 pt-3 md:hidden">
          <div className="grid gap-1">
            {navLinks.map((link) => <Link key={link.to} to={link.to} onClick={closeMenu} className="rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-[#e7f6fd] hover:text-teal-accent">{link.label}</Link>)}
          </div>
        </div>}
      </nav>
    </header>
  );
}
