import { Link } from 'react-router-dom';
import PageShell from '../components/layout/PageShell';
import GlassCard from '../components/GlassCard';
import { ShieldCheck, CheckCircle } from '../components/icons';

const comparisons = [
  {
    feature: 'Wait Time',
    traditional: '3 to 14 days for an appointment slot',
    curbside: 'Start intake in 5 minutes; care plan in hours',
    curbsideBadge: 'Immediate',
  },
  {
    feature: 'Location & Commute',
    traditional: 'Drive, park, and wait in a crowded clinic',
    curbside: '100% virtual from your couch, desk, or bed',
    curbsideBadge: 'Anywhere',
  },
  {
    feature: 'Physician Review',
    traditional: 'Rushed 7-minute in-person visit',
    curbside: 'Dedicated review by board-certified doctors',
    curbsideBadge: '100% MD/DO',
  },
  {
    feature: 'Cost & Billing',
    traditional: 'Unexpected facility fees & bill surprises months later',
    curbside: 'Flat upfront rates ($39–$69); HSA/FSA accepted',
    curbsideBadge: 'Transparent',
  },
  {
    feature: 'Prescriptions',
    traditional: 'Paper scripts or pharmacy phone tag',
    curbside: 'Instant e-prescribing to your local pharmacy',
    curbsideBadge: 'Instant Rx',
  },
];

const visualSections = [
  {
    id: 'accessible',
    tag: 'Accessible Anywhere',
    title: 'Care on your schedule, not clinic hours',
    blurb: 'Healthcare should conform to your life. Fill out a secure clinical questionnaire whenever symptoms strike — day or night.',
    points: ['24/7 async intakes', 'No waiting rooms or commutes', 'Mobile, tablet, or laptop friendly'],
    graphic: (
      <div className="relative flex h-48 w-full items-center justify-center rounded-2xl bg-gradient-to-br from-[#e0f4fc] to-[#caedf9] p-4 overflow-hidden">
        <div className="absolute -right-6 -bottom-6 h-32 w-32 rounded-full bg-teal-accent/15" />
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg shadow-teal-accent/15">
            <svg className="h-7 w-7 text-teal-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-teal-accent shadow-sm">
            ⚡ Avg. Review: &lt; 2 Hours
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> Clinicians Active Now
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'physicians',
    tag: 'Board-Certified Care',
    title: '100% Licensed U.S. Physicians',
    blurb: 'Every visit is evaluated by real board-certified medical doctors. We never use diagnostic AI bots or substitute lower-tier care.',
    points: ['Rigorous state license verification', 'Active malpractice vetting', 'Evidence-based clinical guidelines'],
    graphic: (
      <div className="relative flex h-48 w-full items-center justify-center rounded-2xl bg-gradient-to-br from-[#d9f2fa] to-[#c1eaf7] p-4 overflow-hidden">
        <div className="absolute -left-6 -top-6 h-32 w-32 rounded-full bg-teal-glow/20" />
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-accent text-white shadow-lg shadow-teal-accent/25">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <div className="rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-slate-800 shadow-sm flex items-center gap-1">
            <span className="text-teal-accent">✓</span> Verified MD / DO Review
          </div>
          <span className="text-[11px] font-medium text-slate-600">Never an algorithm</span>
        </div>
      </div>
    ),
  },
  {
    id: 'privacy',
    tag: 'Bank-Grade Security',
    title: 'HIPAA-compliant & Healthie EMR',
    blurb: 'Your medical history and personal information are guarded with 256-bit encryption in partnership with Healthie EMR.',
    points: ['256-bit end-to-end encryption', 'Full HIPAA compliance', 'Confidential electronic records'],
    graphic: (
      <div className="relative flex h-48 w-full items-center justify-center rounded-2xl bg-gradient-to-br from-[#e8f7fd] to-[#d3effa] p-4 overflow-hidden">
        <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-sky-200/50" />
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg shadow-slate-900/10">
            <svg className="h-7 w-7 text-teal-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div className="rounded-full bg-teal-accent text-white px-3 py-1 text-xs font-bold shadow-sm">
            🔒 HIPAA Encrypted
          </div>
          <span className="text-[11px] font-medium text-slate-600">Healthie EMR Integrated</span>
        </div>
      </div>
    ),
  },
  {
    id: 'pricing',
    tag: 'Zero Surprise Bills',
    title: 'Upfront, transparent flat pricing',
    blurb: 'Know exactly what you pay before you begin. No insurance surprises, deductible gymnastics, or unexpected facility fees.',
    points: ['Flat visits starting at $39', 'HSA & FSA card eligible', 'Zero surprise hospital bills'],
    graphic: (
      <div className="relative flex h-48 w-full items-center justify-center rounded-2xl bg-gradient-to-br from-[#e3f5fc] to-[#c7e9f7] p-4 overflow-hidden">
        <div className="absolute -left-6 -bottom-6 h-32 w-32 rounded-full bg-teal-accent/20" />
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg shadow-teal-accent/15">
            <span className="text-2xl font-extrabold text-teal-accent">$39</span>
          </div>
          <div className="rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-slate-800 shadow-sm">
            Clear Flat Fee
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-600">
            <span>HSA / FSA Accepted</span>
          </div>
        </div>
      </div>
    ),
  },
];

export default function WhyChooseUs() {
  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        {/* HEADER */}
        <div className="text-center">
          <span className="section-eyebrow">Why Curbside Health</span>
          <h1 className="section-heading mx-auto max-w-3xl">
            A smarter, clearer way to <span className="gradient-text">access everyday care</span>.
          </h1>
          <p className="section-subheading mx-auto max-w-2xl">
            See how clinician-led virtual care transforms your healthcare experience from stressful to seamless.
          </p>
        </div>

        {/* QUICK STATS GRAPHIC BANNER */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          <GlassCard padding="sm" className="text-center">
            <span className="text-2xl font-extrabold text-teal-accent sm:text-3xl">&lt; 2 hrs</span>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">Avg. Care Plan</p>
          </GlassCard>
          <GlassCard padding="sm" className="text-center">
            <span className="text-2xl font-extrabold text-teal-accent sm:text-3xl">100%</span>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">Board-Certified</p>
          </GlassCard>
          <GlassCard padding="sm" className="text-center">
            <span className="text-2xl font-extrabold text-teal-accent sm:text-3xl">0 min</span>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">Waiting Room</p>
          </GlassCard>
          <GlassCard padding="sm" className="text-center">
            <span className="text-2xl font-extrabold text-teal-accent sm:text-3xl">$0</span>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">Hidden Fees</p>
          </GlassCard>
        </div>

        {/* COMPARISON GRAPHIC SECTION */}
        <section className="mt-14">
          <GlassCard padding="lg" className="overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-slate-100 pb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-teal-accent">Direct Comparison</span>
                <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-deep">Traditional Clinic vs. Curbside Health</h2>
              </div>
              <span className="rounded-full bg-teal-accent-light px-3.5 py-1 text-xs font-bold text-teal-accent w-fit">
                Modern Standard
              </span>
            </div>

            <div className="mt-6 divide-y divide-slate-100">
              {comparisons.map((item) => (
                <div key={item.feature} className="grid py-4 sm:grid-cols-[1.2fr_1.4fr_1.8fr] gap-3 items-center">
                  <span className="font-bold text-sm text-slate-800">{item.feature}</span>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600 font-bold text-[10px]">✕</span>
                    <span>{item.traditional}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2 rounded-xl bg-[#eaf6fd] px-3.5 py-2 text-xs font-semibold text-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-accent text-white font-bold text-[10px]">✓</span>
                      <span>{item.curbside}</span>
                    </div>
                    <span className="shrink-0 rounded-md bg-white px-2 py-0.5 text-[10px] font-extrabold text-teal-accent shadow-xs">
                      {item.curbsideBadge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </section>

        {/* VISUAL GRAPHIC CARDS GRID */}
        <section className="mt-16">
          <div className="text-center mb-10">
            <span className="section-eyebrow">Visual Highlights</span>
            <h2 className="section-heading">Designed for transparency and comfort</h2>
            <p className="section-subheading mx-auto max-w-xl">
              Every detail is engineered to make high-quality medical treatment effortless.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {visualSections.map((section) => (
              <GlassCard key={section.id} padding="lg" interactive accent className="flex flex-col justify-between">
                <div>
                  {section.graphic}
                  <div className="mt-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-teal-accent">
                      {section.tag}
                    </span>
                    <h3 className="mt-1 text-xl font-extrabold text-slate-deep">{section.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{section.blurb}</p>
                  </div>
                </div>

                <div className="mt-6 border-t border-slate-100 pt-4 space-y-2">
                  {section.points.map((pt) => (
                    <div key={pt} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <CheckCircle className="h-4 w-4 text-teal-accent shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* BOTTOM ACTION CTA */}
        <section className="mt-16 rounded-[2rem] bg-gradient-to-br from-slate-deep to-[#0b4d6e] p-8 text-center text-white sm:p-12 shadow-xl">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-teal-glow">
            Experience the difference
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Ready to see how simple healthcare can be?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
            Review how our clinical flow works or choose a treatment to get started now.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/how-it-works" className="btn-secondary bg-white text-slate-deep hover:bg-slate-100">
              How It Works →
            </Link>
            <Link to="/get-started" className="btn-primary">
              Get Started with Care
            </Link>
          </div>
        </section>
      </div>
    </PageShell>
  );
}

