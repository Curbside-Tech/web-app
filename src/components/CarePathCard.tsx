import type { ReactNode } from 'react';
import GlassCard from './GlassCard';

interface CarePathCardProps {
  icon: ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  detail: string;
}

export default function CarePathCard({ icon, eyebrow, title, description, detail }: CarePathCardProps) {
  return (
    <GlassCard interactive accent padding="lg" className="care-path-card h-full">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-accent-light text-teal-accent">
        {icon}
      </div>
      <p className="mt-8 text-[11px] font-extrabold uppercase tracking-[0.16em] text-teal-accent">{eyebrow}</p>
      <h3 className="mt-3 text-2xl font-extrabold tracking-[-0.035em] text-slate-deep">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">{description}</p>
      <p className="mt-6 border-t border-[#d6e8f1] pt-4 text-xs font-semibold leading-relaxed text-[#557184]">{detail}</p>
    </GlassCard>
  );
}
