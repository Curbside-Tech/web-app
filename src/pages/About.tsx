import PageShell from '../components/layout/PageShell';
import GlassCard from '../components/GlassCard';

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
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="text-center">
          <span className="section-eyebrow">Our team</span>
          <h1 className="section-heading">Meet our doctors</h1>
          <p className="section-subheading mx-auto max-w-2xl">
            A licensed, patient-first care team helping people get answers and treatment without the waiting room hassle.
          </p>
        </div>

        <GlassCard padding="lg" className="mt-10">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-slate-800">Our clinicians</h2>
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
      </div>
    </PageShell>
  );
}
