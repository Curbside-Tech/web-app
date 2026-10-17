import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/layout/PageShell';
import EmergencyBanner from '../components/EmergencyBanner';
import GlassCard from '../components/GlassCard';
import { AsyncIcon, VideoIcon, CheckCircle, ShieldCheck } from '../components/icons';
import { treatments } from '../data/treatments';

export default function GetStarted() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'async' | 'video' | 'subscription'>('all');

  const filteredTreatments = treatments.filter((item) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'async') return item.mode === 'async';
    if (selectedFilter === 'video') return item.mode === 'video';
    if (selectedFilter === 'subscription') return item.mode === 'subscription' || item.subscriptionRequired;
    return true;
  });

  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="pt-2">
          <EmergencyBanner />
        </div>

        {/* HERO SECTION */}
        <section className="py-14 sm:py-20 text-center">
          <span className="section-eyebrow">Get Started</span>
          <h1 className="mt-4 max-w-3xl mx-auto text-4xl font-extrabold tracking-[-0.045em] text-slate-deep sm:text-6xl">
            Choose a service. <span className="gradient-text">Care in minutes.</span>
          </h1>
          <p className="section-subheading mx-auto max-w-2xl">
            Transparent flat fees with guaranteed clinician review time. Select your concern to begin your confidential intake.
          </p>

          {/* FILTER TABS */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'all', label: 'All Services' },
              { id: 'async', label: 'Async Visits ($39–$49)' },
              { id: 'video', label: 'Video Consults ($69)' },
              { id: 'subscription', label: 'Ongoing Programs ($49/mo)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id as typeof selectedFilter)}
                className={`rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
                  selectedFilter === tab.id
                    ? 'bg-teal-accent text-white shadow-md shadow-teal-accent/25'
                    : 'bg-white/80 text-slate-600 hover:bg-white hover:text-slate-900 border border-slate-200/80'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        {/* SERVICES BREAKDOWN GRID */}
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTreatments.map((service) => {
            const isVideo = service.mode === 'video';
            const isSub = service.mode === 'subscription' || service.subscriptionRequired;

            return (
              <GlassCard
                key={service.id}
                padding="lg"
                interactive
                accent
                className="flex flex-col justify-between relative overflow-hidden"
              >
                <div>
                  {/* Top Badges & Pricing Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
                          isVideo
                            ? 'bg-sky-100 text-sky-700'
                            : isSub
                            ? 'bg-violet-100 text-violet-700'
                            : 'bg-teal-accent-light text-teal-accent'
                        }`}
                      >
                        {isVideo ? <VideoIcon /> : <AsyncIcon />}
                        {isVideo ? 'Video Visit' : isSub ? 'Subscription' : 'Async Visit'}
                      </span>
                      {service.category && (
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                          {service.category}
                        </span>
                      )}
                    </div>

                    <div className="text-right">
                      <span className="text-2xl font-black text-slate-deep tracking-tight">
                        {service.price}
                      </span>
                      <span className="block text-[10px] font-semibold text-slate-400">
                        Upfront flat fee
                      </span>
                    </div>
                  </div>

                  {/* Committed Minutes Badge */}
                  <div className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-teal-accent/20 bg-[#e7f6fd] px-3 py-1.5 text-xs font-bold text-teal-accent">
                    <span>⏱</span>
                    <span>{service.durationMinutes || '15 min dedicated physician review'}</span>
                  </div>

                  {/* Title & Description */}
                  <h2 className="mt-4 text-xl font-extrabold text-slate-deep">
                    {service.name}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {service.description}
                  </p>

                  {/* What is Offered Details */}
                  {service.details && service.details.length > 0 && (
                    <div className="mt-6 border-t border-slate-100 pt-4">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        What is included &amp; offered:
                      </p>
                      <ul className="mt-3 space-y-2">
                        {service.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 leading-normal">
                            <CheckCircle className="h-4 w-4 text-teal-accent shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Bottom Actions */}
                <div className="mt-8 pt-4 border-t border-slate-100">
                  <Link
                    to={`/booking?treatment=${service.id}`}
                    state={{ treatment: service }}
                    className="btn-primary w-full text-sm font-bold py-3 flex items-center justify-center gap-2"
                  >
                    <span>Start {service.name.split(' ')[0]} Check-in</span>
                    <span>→</span>
                  </Link>
                  <p className="mt-2 text-center text-[11px] text-slate-400">
                    Protected by Healthie EMR &amp; 256-bit encryption
                  </p>
                </div>
              </GlassCard>
            );
          })}
        </section>

        {/* COST & TRANSPARENCY GUARANTEE BANNER */}
        <section className="mt-16 grid gap-6 rounded-[2rem] bg-[#e7f5fb] px-6 py-10 sm:px-10 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-accent">
              <ShieldCheck className="h-4 w-4" />
              Transparent Care Guarantee
            </div>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-deep sm:text-3xl">
              Zero surprise billing. Zero insurance runarounds.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Unlike traditional clinics that send unexpected hospital facility fees months later, Curbside Health is 100% flat fee. You know the exact cost before answering a single question. Eligible for HSA/FSA reimbursement.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200/60">
            <h3 className="font-bold text-sm text-slate-800">What happens next?</h3>
            <ol className="mt-3 space-y-2 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-accent-light font-bold text-teal-accent">1</span>
                <span>Complete the clinical questionnaire in 5 minutes</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-accent-light font-bold text-teal-accent">2</span>
                <span>Sign in or create your free Healthie EMR portal</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-accent-light font-bold text-teal-accent">3</span>
                <span>Doctor reviews your case and sends Rx to your pharmacy</span>
              </li>
            </ol>
            <Link to="/how-it-works" className="mt-4 inline-block text-xs font-bold text-teal-accent hover:underline">
              Review our complete clinical process →
            </Link>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
