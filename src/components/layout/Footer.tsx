import { Link } from 'react-router-dom';
import { LogoMark } from '../icons';

const footerLinks = {
  product: [
    { to: '/how-it-works', label: 'How it works' },
    { to: '/treatments', label: 'Treatments' },
    { to: '/faq', label: 'FAQ' },
  ],
  company: [
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact' },
  ],
  legal: [
    { to: '/terms', label: 'Terms & Conditions' },
    { to: '/privacy', label: 'Privacy Policy' },
  ],
};

export default function Footer() {
  return (
    <footer className="px-4 pb-8 pt-12 sm:px-6">
      <div className="glass-panel mx-auto max-w-6xl px-6 py-10 sm:px-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-teal-accent to-teal-glow">
                <LogoMark className="h-4 w-4 text-white" />
              </div>
              <p className="text-lg font-bold text-slate-deep">
                Curbside<span className="gradient-text"> Health</span>
              </p>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-500">
              Convenient, clinician-led telehealth for everyday health concerns — from the comfort of home.
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Product</p>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.product.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-slate-500 transition-colors hover:text-teal-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Company</p>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-slate-500 transition-colors hover:text-teal-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Legal</p>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-slate-500 transition-colors hover:text-teal-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/50 pt-6 sm:flex-row">
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} Curbside Health. All rights reserved.
          </p>
          <a
            href="mailto:support@curbsidehealth.com"
            className="text-xs text-slate-400 transition-colors hover:text-teal-accent"
          >
            support@curbsidehealth.com
          </a>
        </div>
      </div>
    </footer>
  );
}
