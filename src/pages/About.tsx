import { Link } from 'react-router-dom';
import PageShell from '../components/layout/PageShell';
import GlassCard from '../components/GlassCard';
import { ShieldCheck, CheckCircle } from '../components/icons';

const doctors = [
  {
    name: 'Dr. Abdul Sattar',
    credentials: 'MD',
    specialty: 'Family Medicine',
    role: 'Co-Founder & Clinical Physician',
    image:
      'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=900&q=80',
    description:
      'Dr. Abdul Sattar focuses on preventive healthcare, acute illness triage, and patient-centered treatment planning. He believes clinical care should be accessible the moment symptoms arise, without clinic delays.',
    badges: ['Family Medicine', 'Preventive Care', 'Acute Triage'],
  },
  {
    name: 'Dr. Sushant Kapoor',
    credentials: 'MD',
    specialty: 'Internal Medicine',
    role: 'Co-Founder & Clinical Physician',
    image:
      'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=900&q=80',
    description:
      'Dr. Sushant Kapoor helps patients navigate everyday medical concerns and chronic wellness with an unhurried, evidence-based approach. He emphasizes clear communication and straightforward next steps.',
    badges: ['Internal Medicine', 'Diagnostic Review', 'Evidence-Based Care'],
  },
  {
    name: 'Dr. Jaffer Ahmad',
    credentials: 'MD',
    specialty: 'General Practice',
    role: 'Co-Founder & Clinical Physician',
    image:
      'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=900&q=80',
    description:
      'Dr. Jaffer Ahmad provides thoughtful, personalized care for acute infections and ongoing primary health concerns, ensuring every patient leaves with an actionable care plan and pharmacy coordination.',
    badges: ['General Practice', 'Infection Triage', 'Patient Continuity'],
  },
];

const pillars = [
  {
    icon: (
      <svg className="h-6 w-6 text-teal-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    title: 'Physician-Led Care',
    description: 'Every intake is reviewed directly by a licensed, board-certified physician — never an automated algorithm or chatbot.',
  },
  {
    icon: (
      <svg className="h-6 w-6 text-teal-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Zero Waiting Rooms',
    description: 'Get evaluated on your schedule from your phone or laptop. Fast turnaround without missing work or sitting in waiting rooms.',
  },
  {
    icon: (
      <svg className="h-6 w-6 text-teal-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'HIPAA & Healthie EMR',
    description: 'Your health records and prescriptions are securely stored and encrypted in partnership with Healthie EMR.',
  },
  {
    icon: (
      <svg className="h-6 w-6 text-teal-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: '100% Upfront Pricing',
    description: 'Clear, predictable flat rates with zero unexpected facility fees, zero surprise insurance bills, and HSA/FSA acceptance.',
  },
];

export default function About() {
  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        {/* ABOUT SECTION (TOP) */}
        <section className="text-center">
          <span className="section-eyebrow">About Curbside Health</span>
          <h1 className="section-heading mx-auto max-w-3xl">
            Modern healthcare, <span className="gradient-text">physician-founded &amp; patient-first</span>.
          </h1>
          <p className="section-subheading mx-auto max-w-2xl">
            We started Curbside Health because everyday healthcare should fit seamlessly into your life — not require days of waiting or crowded waiting rooms.
          </p>
        </section>

        {/* MISSION & STORY CARD */}
        <section className="mt-12">
          <GlassCard padding="lg" className="relative overflow-hidden">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-teal-accent">
                  Our Mission &amp; Story
                </span>
                <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-deep sm:text-3xl">
                  Closing the gap between feeling sick and getting trusted clinical care.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  As practicing physicians, we routinely witnessed patients delaying care for common, highly treatable conditions — such as urinary tract infections, respiratory symptoms, and intimate health concerns — simply because getting a standard doctor&apos;s appointment took days or required hours in a germ-filled urgent care waiting room.
                </p>
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  We built <strong>Curbside Health</strong> to bridge that gap. By combining intelligent asynchronous intakes and secure video consultations with accredited Electronic Medical Records (EMR), we deliver board-certified medical attention directly to patients on their terms.
                </p>

                <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold text-slate-700">
                  <span className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-teal-accent" /> Board-certified U.S. physicians
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-teal-accent" /> Safe clinical triage algorithms
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-teal-accent" /> Prescriptions sent directly to pharmacy
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-teal-accent/20 bg-gradient-to-br from-teal-accent-light/80 to-white/90 p-6 sm:p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-accent text-white shadow-md shadow-teal-accent/20">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-deep">Our Clinical Promise</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  We maintain strict clinical boundaries. If your symptoms ever indicate a higher-acuity issue requiring in-person examination or emergency intervention, our protocol immediately guides you to the nearest emergency room or clinic. Patient safety is always our first priority.
                </p>
                <div className="mt-6 border-t border-teal-accent/15 pt-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-teal-accent">Electronic Medical Record</div>
                  <p className="mt-1 text-xs text-slate-500">
                    Integrated with Healthie EMR for encrypted records &amp; secure communication.
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>
        </section>

        {/* 4 CORE PILLARS */}
        <section className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <GlassCard key={pillar.title} padding="md" className="flex flex-col">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-accent/10">
                {pillar.icon}
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-800">{pillar.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">{pillar.description}</p>
            </GlassCard>
          ))}
        </section>

        {/* PROFILES AND PICTURES SECTION (BOTTOM) */}
        <section className="mt-20">
          <div className="text-center">
            <span className="section-eyebrow">Our Leadership &amp; Clinicians</span>
            <h2 className="section-heading">Our profiles and pictures</h2>
            <p className="section-subheading mx-auto max-w-2xl">
              Meet the licensed, board-certified clinicians behind Curbside Health.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {doctors.map((doctor) => (
              <GlassCard
                key={doctor.name}
                padding="none"
                interactive
                accent
                className="group flex flex-col overflow-hidden"
              >
                <div className="relative h-72 w-full overflow-hidden bg-slate-100">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="rounded-full border border-white/40 bg-white/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                      {doctor.specialty}
                    </span>
                    <h3 className="mt-2 text-xl font-extrabold text-white">
                      {doctor.name}, <span className="text-teal-glow">{doctor.credentials}</span>
                    </h3>
                    <p className="text-xs font-semibold text-white/80">{doctor.role}</p>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="text-sm leading-relaxed text-slate-600">
                    {doctor.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                    {doctor.badges.map((badge) => (
                      <span
                        key={badge}
                        className="rounded-lg bg-teal-accent-light px-2.5 py-1 text-[11px] font-semibold text-teal-accent"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>Board Certified</span>
                    <span className="font-semibold text-teal-accent">U.S. Licensed</span>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-teal-accent/20 bg-[#e7f6fd]/80 p-6 text-center">
            <p className="text-sm font-semibold text-slate-700">
              Have questions for our clinical team or want to request care?
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <Link to="/why-choose-us" className="btn-secondary text-xs sm:text-sm">
                Why Choose Us →
              </Link>
              <Link to="/get-started" className="btn-primary text-xs sm:text-sm">
                Get Started with a Visit
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}

