import PageShell from '../components/layout/PageShell';
import GlassCard from '../components/GlassCard';
import { ShieldCheck } from '../components/icons';

const values = [
  {
    title: 'Accessible care',
    description: 'Quality healthcare should not require taking time off work or sitting in a waiting room.',
  },
  {
    title: 'Clinical excellence',
    description: 'Every visit is reviewed by a licensed, board-certified physician — not an algorithm.',
  },
  {
    title: 'Patient privacy',
    description: 'Your health information is protected with HIPAA-compliant security at every step.',
  },
];

const doctors = [
  {
    name: 'Abdul Sattar',
    specialty: 'Family Medicine',
    image:
      'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80',
      
    description:
      'Dr. Abdul Sattar focuses on preventive healthcare, long-term condition management, and patient-centered treatment planning.',
  },
  {
    name: 'Sushant Kapoor',
    specialty: 'Internal Medicine',
    image:
      'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80',
    description:
      'Dr. Sushant Kapoor helps patients navigate chronic conditions with a practical, evidence-based approach to everyday wellness.',
  },
  {
    name: 'Jaffer Ahmad',
    specialty: 'General Practice',
    image:
      'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80',
    description:
      'Dr. Jaffer Ahmad provides thoughtful, personalized care for acute concerns and routine follow-up support for lasting health outcomes.',
  },
];

export default function About() {
  return (
    <PageShell>
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="text-center">
          <span className="section-eyebrow">Our story</span>
          <h1 className="section-heading">About Curbside Health</h1>
          <p className="section-subheading mx-auto max-w-2xl">
            We believe everyday healthcare should be convenient, trustworthy, and clinician-led.
          </p>
        </div>

        <GlassCard padding="lg" className="mt-10">
          <h2 className="text-xl font-bold text-slate-800">Our mission</h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            Curbside Health was founded to bridge the gap between needing care and getting it. Too many
            people delay treatment for common conditions because scheduling a doctor visit is inconvenient.
            We connect patients with licensed physicians through async and video consultations — so you can
            get expert care on your schedule.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            Our platform handles conditions ranging from UTIs and respiratory infections to ongoing
            subscription-based care like birth control and weight management. Every interaction is
            reviewed by a real doctor who can prescribe, refer, or recommend follow-up as needed.
          </p>
        </GlassCard>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {values.map((value) => (
            <GlassCard key={value.title} padding="md">
              <h3 className="font-semibold text-slate-800">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{value.description}</p>
            </GlassCard>
          ))}
        </div>

        <GlassCard padding="lg" className="mt-10">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-slate-800">Meet our doctors</h2>
            <span className="rounded-full border border-teal-accent/20 bg-teal-accent/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-teal-accent">
              Trusted care team
            </span>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {doctors.map((doctor) => (
              <div
                key={doctor.name}
                className="group overflow-hidden rounded-[28px] border border-white/60 bg-white/40 shadow-[0_18px_45px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(15,23,42,0.12)]"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 rounded-full border border-white/50 bg-white/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                    {doctor.specialty}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-800">{doctor.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{doctor.description}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard padding="lg" className="mt-10">
          <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-teal-accent/10">
              <ShieldCheck className="h-7 w-7 text-teal-accent" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">Our doctors are licensed and vetted</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Every physician on our platform holds an active U.S. medical license. We verify
                credentials, review malpractice history, and continuously monitor quality metrics.
                You can trust that a real, qualified doctor is reviewing your case — every time.
              </p>
            </div>
          </div>
        </GlassCard>

        <GlassCard padding="lg" className="mt-10">
          <h2 className="text-xl font-bold text-slate-800">How the platform works</h2>
          <div className="mt-6 space-y-4">
            <div className="rounded-xl border border-white/50 bg-white/30 p-4">
              <h3 className="font-semibold text-slate-800">Async consultations</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                Complete a health questionnaire at your convenience. A doctor reviews your responses,
                medical history, and any uploaded images, then sends you a care plan — usually within
                a few hours.
              </p>
            </div>
            <div className="rounded-xl border border-white/50 bg-white/30 p-4">
              <h3 className="font-semibold text-slate-800">Video visits</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                For conditions that benefit from a live conversation — like rash evaluation or medication
                consultations — schedule a secure video visit with a licensed physician.
              </p>
            </div>
            <div className="rounded-xl border border-white/50 bg-white/30 p-4">
              <h3 className="font-semibold text-slate-800">Subscription care</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                Some treatments require ongoing management. Subscription plans include regular check-ins,
                prescription refills, and messaging with your care team.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </PageShell>
  );
}
