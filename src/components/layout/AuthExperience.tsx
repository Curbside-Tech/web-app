import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, LogoMark, ShieldCheck } from '../icons';
import PageShell from './PageShell';

interface AuthExperienceProps {
  children: ReactNode;
  mode: 'signin' | 'signup';
}

const content = {
  signin: {
    eyebrow: 'Your care, in one place',
    title: <>The little things<br />matter to us.</>,
    copy: 'Your visits, messages, prescriptions, and care plans are here whenever you need them.',
  },
  signup: {
    eyebrow: 'A calmer way to begin',
    title: <>Care that starts<br />with listening.</>,
    copy: 'A few thoughtful steps now make it easier to get the right care when you need it.',
  },
};

export default function AuthExperience({ children, mode }: AuthExperienceProps) {
  const detail = content[mode];

  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        <div className="auth-experience">
          <aside className="auth-aside relative overflow-hidden rounded-[2rem] p-7 text-white sm:p-10">
            <div className="auth-aside-orb auth-aside-orb--one" />
            <div className="auth-aside-orb auth-aside-orb--two" />
            <div className="relative flex h-full flex-col">
              <Link to="/" className="flex w-fit items-center gap-2.5 text-white">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#bae6fd] text-[#123b56]"><LogoMark className="h-5 w-5" /></span>
                <span className="text-lg font-bold tracking-tight">Curbside Health</span>
              </Link>
              <div className="mt-auto pt-20 lg:pt-0">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.17em] text-[#bae6fd]">{detail.eyebrow}</p>
                <h1 className="mt-5 text-4xl font-extrabold leading-[1.03] tracking-[-0.055em] sm:text-5xl">{detail.title}</h1>
                <p className="mt-5 max-w-sm text-base leading-relaxed text-white/72">{detail.copy}</p>
                <div className="mt-9 space-y-3 border-t border-white/15 pt-7">
                  <p className="flex items-center gap-2 text-sm font-semibold text-white/90"><CheckCircle className="h-4 w-4 text-[#bae6fd]" />Licensed clinicians, always</p>
                  <p className="flex items-center gap-2 text-sm font-semibold text-white/90"><ShieldCheck className="h-4 w-4 text-[#bae6fd]" />Private and secure by design</p>
                </div>
              </div>
            </div>
          </aside>
          <section className="auth-form-area">{children}</section>
        </div>
      </div>
    </PageShell>
  );
}
