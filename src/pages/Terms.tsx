import PageShell from '../components/layout/PageShell';
import GlassCard from '../components/GlassCard';
import { termsSections } from '../data/terms';

export default function Terms() {
  return (
    <PageShell>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="text-center">
          <h1 className="section-heading">Terms &amp; Conditions</h1>
          <p className="section-subheading">Last updated: August 2026</p>
        </div>
        <GlassCard padding="lg" className="mt-10">
          <div className="space-y-6">
            {termsSections.map((section) => (
              <div key={section.title}>
                <h2 className="text-base font-semibold text-slate-800">{section.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{section.content}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </PageShell>
  );
}
