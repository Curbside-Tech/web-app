import PageShell from '../components/layout/PageShell';
import FaqAccordion from '../components/FaqAccordion';
import { faqs } from '../data/faqs';
import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import { ShieldCheck } from '../components/icons';

export default function Faq() {
  return (
    <PageShell>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="text-center">
          <span className="section-eyebrow">Help center</span>
          <h1 className="section-heading">Frequently asked questions</h1>
          <p className="section-subheading">
            Everything you need to know about Curbside Health.
          </p>
        </div>
        <div className="mt-10">
          <FaqAccordion items={faqs} />
        </div>
        <section className="mt-12 grid gap-5 sm:grid-cols-2">
          <GlassCard padding="lg" className="bg-[#e7f6fd]"><ShieldCheck className="h-7 w-7 text-teal-accent" /><h2 className="mt-5 text-xl font-extrabold tracking-tight text-slate-deep">Your privacy comes first.</h2><p className="mt-3 text-sm leading-relaxed text-slate-600">Learn how we handle account and health information with care.</p><Link to="/privacy" className="mt-5 inline-block text-sm font-bold text-teal-accent">Read our privacy policy →</Link></GlassCard>
          <GlassCard padding="lg"><p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-teal-accent">Still need help?</p><h2 className="mt-4 text-xl font-extrabold tracking-tight text-slate-deep">Our support team is here.</h2><p className="mt-3 text-sm leading-relaxed text-slate-600">Send a question and we will point you in the right direction.</p><Link to="/contact" className="btn-primary mt-5">Contact support</Link></GlassCard>
        </section>
      </div>
    </PageShell>
  );
}
