import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/layout/PageShell';
import GlassCard from '../components/GlassCard';
import EmergencyBanner from '../components/EmergencyBanner';
import { CheckCircle, ShieldCheck, AsyncIcon, VideoIcon } from '../components/icons';

// Organ system services for the section underneath the video
const organServices = [
  {
    id: 'urinary',
    treatmentId: 'uti',
    organSystem: 'Urinary & Renal System',
    condition: 'UTI (Urinary Tract Infection)',
    timeCommitted: '15 min physician review',
    cost: '$39',
    format: 'Async visit',
    blurb:
      'Targeted clinical evaluation for painful urination, dysuria, urgency, and bladder pressure. A board-certified physician reviews your symptoms and issues antibiotic therapy or symptom relief directly to your pharmacy when appropriate.',
    treats: ['Dysuria & burning', 'Urinary frequency', 'Bladder discomfort', 'Uncomplicated cystitis'],
    graphic: (
      <svg className="h-16 w-16 text-teal-accent" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="30" className="fill-teal-accent/10 stroke-teal-accent/30" strokeWidth="1.5" />
        {/* Left Kidney */}
        <path
          d="M23 20c-4 4-5 11-2 16 3 5 8 5 9 1 1-3 0-6-1-8-1-3-2-6-6-9z"
          className="fill-teal-accent/25 stroke-teal-accent"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Right Kidney */}
        <path
          d="M41 20c4 4 5 11 2 16-3 5-8 5-9 1-1-3 0-6 1-8 1-3 2-6 6-9z"
          className="fill-teal-accent/25 stroke-teal-accent"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Ureters */}
        <path d="M28 34c1 4 2 8 3 12M36 34c-1 4-2 8-3 12" stroke="#0b6e9d" strokeWidth="1.5" strokeDasharray="2 2" />
        {/* Bladder */}
        <path
          d="M26 46c0-3 3-5 6-5s6 2 6 5c0 4-3 7-6 7s-6-3-6-7z"
          className="fill-teal-accent stroke-teal-accent"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
  {
    id: 'respiratory',
    treatmentId: 'uri',
    organSystem: 'Respiratory System',
    condition: 'URI (Upper Respiratory Infection)',
    timeCommitted: '15 min physician review',
    cost: '$39',
    format: 'Async visit',
    blurb:
      'Fast medical guidance for colds, sinus congestion, acute bronchitis, and sore throats. Clinicians review your symptom progression, rule out emergency complications, and send safe relief plans and prescriptions.',
    treats: ['Sinus pressure & pain', 'Acute cough & bronchitis', 'Sore throat & pharyngitis', 'Congestion & cold'],
    graphic: (
      <svg className="h-16 w-16 text-teal-accent" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="30" className="fill-teal-accent/10 stroke-teal-accent/30" strokeWidth="1.5" />
        {/* Trachea */}
        <path d="M32 16v12M30 19h4M30 23h4" stroke="#0b6e9d" strokeWidth="2" strokeLinecap="round" />
        {/* Left Bronchus & Lung */}
        <path
          d="M32 28c-4 3-7 6-9 8-4 4-5 12-1 16 3 3 8 2 10-2 2-4 1-9 0-14z"
          className="fill-teal-accent/25 stroke-teal-accent"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Right Bronchus & Lung */}
        <path
          d="M32 28c4 3 7 6 9 8 4 4 5 12 1 16-3 3-8 2-10-2-2-4-1-9 0-14z"
          className="fill-teal-accent/25 stroke-teal-accent"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 'sexual-health',
    treatmentId: 'sti',
    organSystem: 'Reproductive & Intimate Health',
    condition: 'STI Exposure & Screening',
    timeCommitted: '20 min physician review',
    cost: '$49',
    format: 'Async visit',
    blurb:
      'Completely private, judgment-free clinical intake for recent exposure concerns, asymptomatic testing, or discharge evaluation. Clinicians coordinate lab testing and prescribe treatments under strict medical confidentiality.',
    treats: ['Known exposure triage', 'Asymptomatic screening', 'Discharge concerns', 'Prophylaxis guidance'],
    graphic: (
      <svg className="h-16 w-16 text-teal-accent" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="30" className="fill-teal-accent/10 stroke-teal-accent/30" strokeWidth="1.5" />
        {/* Shield outline representing discreet protection */}
        <path
          d="M32 18l12 4v8c0 10-7 16-12 18-5-2-12-8-12-18v-8l12-4z"
          className="fill-teal-accent/20 stroke-teal-accent"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Caduceus / cross accent */}
        <path d="M32 26v12M26 32h12" stroke="#0b6e9d" strokeWidth="2" strokeLinecap="round" />
        <circle cx="32" cy="25" r="2" fill="#0b6e9d" />
      </svg>
    ),
  },
  {
    id: 'dermatology',
    treatmentId: 'video-consult',
    organSystem: 'Integumentary System (Skin)',
    condition: 'Dermatology & Rash Evaluation',
    timeCommitted: '25 min live physician visit',
    cost: '$69',
    format: 'Video or photo visit',
    blurb:
      'Visual examination of acute rashes, hives, contact dermatitis, eczema flare-ups, and localized skin infections. A doctor inspects the lesion, clarifies triggers, and provides topical or oral prescription therapies.',
    treats: ['Acute allergic rashes', 'Contact dermatitis / ivy', 'Eczema flare-ups', 'Insect bite reactions'],
    graphic: (
      <svg className="h-16 w-16 text-teal-accent" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="30" className="fill-teal-accent/10 stroke-teal-accent/30" strokeWidth="1.5" />
        {/* Epidermis & Dermis layers */}
        <path d="M18 28c4-2 8-2 14 0s10 2 14 0" stroke="#0b6e9d" strokeWidth="2" strokeLinecap="round" />
        <path d="M18 36c4-2 8-2 14 0s10 2 14 0" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
        <path d="M18 44c4-2 8-2 14 0s10 2 14 0" stroke="#0b6e9d" strokeWidth="1.5" strokeLinecap="round" />
        {/* Pore / Follicle mark */}
        <path d="M32 20v6" stroke="#0b6e9d" strokeWidth="2" strokeLinecap="round" />
        <circle cx="32" cy="18" r="2.5" className="fill-teal-accent" />
      </svg>
    ),
  },
  {
    id: 'metabolic',
    treatmentId: 'chronic-care',
    organSystem: 'Metabolic & Preventive Health',
    condition: 'Ongoing Wellness & Refills',
    timeCommitted: 'Continuous care oversight',
    cost: '$49 / mo',
    format: 'Subscription care',
    blurb:
      'Continuous doctor-led oversight for routine maintenance, recurring medication management, and preventive lifestyle goals. Keep your prescriptions active without repeated time off work.',
    treats: ['Routine refill renewals', 'Preventive health triage', 'Lifestyle & metabolic risk', 'Two-way doctor chat'],
    graphic: (
      <svg className="h-16 w-16 text-teal-accent" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="30" className="fill-teal-accent/10 stroke-teal-accent/30" strokeWidth="1.5" />
        {/* Heart & Vital rhythm */}
        <path
          d="M32 46s-14-8.5-14-17c0-4.5 3.5-8 8-8 3 0 5 1.5 6 3.5 1-2 3-3.5 6-3.5 4.5 0 8 3.5 8 8 0 8.5-14 17-14 17z"
          className="fill-teal-accent/20 stroke-teal-accent"
          strokeWidth="2"
        />
        {/* Pulse waveform */}
        <path d="M22 31h4l2-4 3 8 3-6 2 2h4" stroke="#0b6e9d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

// Cost table items
const costTableData = [
  {
    service: 'UTI (Urinary Tract Infection)',
    format: 'Async Consultation',
    timeCommitted: '15 min physician review',
    price: '$39',
    billing: 'Flat one-time fee',
    included: 'Online symptom intake, clinician evaluation, prescription sent to pharmacy, 48h follow-up window',
    treatmentId: 'uti',
  },
  {
    service: 'URI (Upper Respiratory Infection)',
    format: 'Async Consultation',
    timeCommitted: '15 min physician review',
    price: '$39',
    billing: 'Flat one-time fee',
    included: 'Cough/sinus triage, physician treatment plan, pharmacy routing, medical excuse note if clinically indicated',
    treatmentId: 'uri',
  },
  {
    service: 'STI Exposure & Screening',
    format: 'Async Consultation',
    timeCommitted: '20 min physician review',
    price: '$49',
    billing: 'Flat one-time fee',
    included: 'Confidential exposure assessment, lab order coordination (Quest/Labcorp), prescription if indicated, partner advice',
    treatmentId: 'sti',
  },
  {
    service: 'Live Doctor Video Consultation',
    format: 'Face-to-Face Video Visit',
    timeCommitted: '25 min live physician visit',
    price: '$69',
    billing: 'Flat one-time visit',
    included: '1-on-1 private video exam, visual rash inspection, comprehensive diagnosis, immediate e-prescription',
    treatmentId: 'video-consult',
  },
  {
    service: 'Ongoing Health & Wellness Management',
    format: 'Subscription Program',
    timeCommitted: 'Monthly doctor oversight',
    price: '$49 / mo',
    billing: 'Monthly recurring plan',
    included: 'Ongoing clinician oversight, scheduled refill renewals, unlimited secure portal messaging, cancel anytime',
    treatmentId: 'chronic-care',
  },
];

export default function HowItWorks() {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="pt-2">
          <EmergencyBanner />
        </div>

        {/* HERO SECTION */}
        <section className="py-14 text-center sm:py-20">
          <span className="section-eyebrow">Clear, Clinician-Led Care</span>
          <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-extrabold tracking-[-0.045em] text-slate-deep sm:text-6xl">
            From first symptom to personalized care plan, <span className="gradient-text">simply.</span>
          </h1>
          <p className="section-subheading mx-auto max-w-2xl">
            No crowded waiting rooms. No confusing surprise bills. A transparent walkthrough of how our licensed doctors deliver care on your schedule.
          </p>
        </section>

        {/* SECTION: HOW THE PLATFORM WORKS (Moved from Why Choose Us) */}
        <section className="mt-4">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-teal-accent">
              Platform Formats
            </span>
            <h2 className="mt-1 text-3xl font-extrabold text-slate-deep">How the platform works</h2>
            <p className="mt-2 text-sm text-slate-600 max-w-xl mx-auto">
              Choose the care style that best suits your comfort, symptom urgency, and personal schedule.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <GlassCard padding="lg" interactive accent className="flex flex-col">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-accent-light text-teal-accent">
                <AsyncIcon className="h-6 w-6" />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-deep">Async consultations</h3>
                <span className="rounded-full bg-teal-accent-light px-2.5 py-0.5 text-[11px] font-bold text-teal-accent">
                  On your time
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 flex-1">
                Complete a guided health questionnaire at your own convenience. A licensed board-certified physician reviews your responses, medical history, and photos, then sends you a comprehensive care plan and pharmacy prescriptions — typically within a couple of hours.
              </p>
              <div className="mt-6 border-t border-slate-100 pt-3 text-xs font-semibold text-slate-500">
                ⏱ 15–20 min dedicated physician review
              </div>
            </GlassCard>

            <GlassCard padding="lg" interactive accent className="flex flex-col">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                <VideoIcon className="h-6 w-6" />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-deep">Video visits</h3>
                <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-[11px] font-bold text-sky-700">
                  Face-to-face
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 flex-1">
                For conditions that benefit from a live visual examination — such as rash evaluations, throat checks, or complex medication discussions — schedule a secure, private HD video call directly with a licensed physician from your home.
              </p>
              <div className="mt-6 border-t border-slate-100 pt-3 text-xs font-semibold text-slate-500">
                ⏱ 25 min live 1-on-1 clinician visit
              </div>
            </GlassCard>

            <GlassCard padding="lg" interactive accent className="flex flex-col">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-deep">Subscription care</h3>
                <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-[11px] font-bold text-violet-700">
                  Ongoing support
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 flex-1">
                Some health concerns require ongoing management. Subscription plans include regular clinical check-ins, automatic prescription refills, and continuous secure messaging with your care team so you never run out of medication.
              </p>
              <div className="mt-6 border-t border-slate-100 pt-3 text-xs font-semibold text-slate-500">
                ⏱ Continuous monitoring &amp; priority check-ins
              </div>
            </GlassCard>
          </div>
        </section>

        {/* SECTION: VIDEO DEMO */}
        <section className="mt-20">
          <div className="text-center mb-8">
            <span className="section-eyebrow">Video Walkthrough</span>
            <h2 className="section-heading">Watch how Curbside works in 90 seconds</h2>
            <p className="section-subheading mx-auto max-w-xl">
              See the patient journey from symptom intake through clinician review and prescription fulfillment.
            </p>
          </div>

          <GlassCard padding="none" className="overflow-hidden border border-teal-accent/20 shadow-2xl">
            <div className="relative aspect-video w-full bg-gradient-to-br from-slate-900 via-slate-800 to-[#0b4d6e] flex items-center justify-center">
              {isPlayingVideo ? (
                <div className="relative h-full w-full flex flex-col items-center justify-center p-6 text-white text-center bg-slate-950">
                  <div className="max-w-md">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-accent text-white mb-4 animate-pulse">
                      <VideoIcon className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold">Curbside Patient Experience Walkthrough</h3>
                    <p className="mt-2 text-sm text-slate-300">
                      Demonstrating: 1) Private intake questionnaire, 2) Healthie EMR integration, 3) Physician review, and 4) Electronic pharmacy fulfillment.
                    </p>
                    <button
                      onClick={() => setIsPlayingVideo(false)}
                      className="mt-6 rounded-xl bg-white/20 px-4 py-2 text-xs font-bold text-white hover:bg-white/30 backdrop-blur"
                    >
                      Close Video Preview
                    </button>
                  </div>
                </div>
              ) : (
                <div className="group relative flex h-full w-full cursor-pointer items-center justify-center" onClick={() => setIsPlayingVideo(true)}>
                  {/* Decorative Video Backdrop */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-accent/30 via-slate-900/80 to-slate-950 opacity-90" />
                  
                  {/* Video Grid Lines Visual */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]" />

                  {/* Badges on Video */}
                  <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2">
                    <span className="flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                      <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
                      Platform Explainer
                    </span>
                    <span className="rounded-full bg-teal-accent/80 px-2.5 py-0.5 text-xs font-bold text-white backdrop-blur">
                      HD 1080p
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                    <span className="rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-slate-300 backdrop-blur">
                      ⏱ 1:30 min
                    </span>
                  </div>

                  {/* Big Play Button */}
                  <div className="relative z-10 flex flex-col items-center gap-4 transition-transform duration-300 group-hover:scale-105">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-teal-accent text-white shadow-2xl shadow-teal-accent/50 ring-8 ring-white/20 transition-all duration-300 group-hover:bg-teal-glow">
                      <svg className="ml-1 h-9 w-9" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-white drop-shadow">Click to watch how Curbside works</p>
                      <p className="text-xs text-white/70">Interactive walkthrough of visit intake &amp; Healthie portal</p>
                    </div>
                  </div>

                  {/* Simulated bottom progress bar */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-6 flex items-center justify-between text-xs text-white/80">
                    <div className="flex items-center gap-3">
                      <span>0:00 / 1:30</span>
                      <span className="hidden sm:inline text-white/50">|</span>
                      <span className="hidden sm:inline text-white/70">Audio: English (CC Available)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-teal-glow font-semibold">100% Physician Reviewed</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </GlassCard>
        </section>

        {/* SECTION: HIGHLIGHT SERVICES UNDERNEATH VIDEO (With Organ System Graphics & Blurbs) */}
        <section className="mt-20">
          <div className="text-center mb-12">
            <span className="section-eyebrow">Our Clinical Services</span>
            <h2 className="section-heading">Services highlighted by organ system</h2>
            <p className="section-subheading mx-auto max-w-2xl">
              Underneath our clinical process, explore the specific anatomical systems we evaluate with dedicated blurbs, committed clinician time, and clear upfront costs.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {organServices.map((service) => (
              <GlassCard
                key={service.id}
                padding="lg"
                interactive
                accent
                className="flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-18 w-18 shrink-0 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 shadow-sm p-1">
                      {service.graphic}
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-extrabold text-slate-deep">{service.cost}</span>
                      <p className="text-[11px] font-semibold text-teal-accent">{service.format}</p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <span className="rounded-full bg-teal-accent-light px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-teal-accent">
                      {service.organSystem}
                    </span>
                    <h3 className="mt-2 text-xl font-extrabold text-slate-deep">{service.condition}</h3>
                    <p className="mt-2 text-xs font-semibold text-slate-500">
                      ⏱ {service.timeCommitted}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {service.blurb}
                    </p>
                  </div>

                  <div className="mt-5 border-t border-slate-100 pt-3">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Common symptoms treated:</p>
                    <ul className="mt-2 grid grid-cols-2 gap-1.5 text-xs text-slate-600">
                      {service.treats.map((t) => (
                        <li key={t} className="flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-teal-accent" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link
                    to={`/booking?treatment=${service.treatmentId}`}
                    className="btn-primary w-full text-xs font-bold py-2.5"
                  >
                    Start {service.condition.split(' ')[0]} Visit <span className="ml-1">→</span>
                  </Link>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* SECTION: HEALTHIE EMR INTRODUCTION & MANDATORY SIGN-UP */}
        <section className="mt-20">
          <GlassCard padding="lg" className="border-2 border-teal-accent/30 bg-gradient-to-br from-white via-[#f0f9fd] to-[#e7f6fd] shadow-xl">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-teal-accent/30 bg-teal-accent/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-teal-accent">
                  <ShieldCheck className="h-4 w-4" />
                  Electronic Medical Record Partner
                </div>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-deep sm:text-4xl">
                  Introducing Healthie EMR &amp; Why Sign-Up Is Required
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  Curbside Health is legitimate clinical medicine provided by licensed, board-certified medical doctors. Federal HIPAA guidelines and state medical board regulations strictly mandate that all telehealth visits and prescriptions be documented within an accredited <strong>Electronic Medical Record (EMR)</strong>.
                </p>
                <p className="mt-3 text-base leading-relaxed text-slate-600">
                  To fulfill these legal safety requirements and ensure your personal data is end-to-end encrypted, <strong>all of our clinical services require you to sign up for a free, confidential patient portal through Healthie</strong>.
                </p>

                <div className="mt-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-teal-accent shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-sm text-slate-800">256-Bit Bank-Grade HIPAA Encryption:</strong>
                      <span className="text-sm text-slate-600"> Your health questionnaires, doctor notes, and medical records remain private and secure.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-teal-accent shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-sm text-slate-800">Direct Pharmacy Surescripts E-Prescribing:</strong>
                      <span className="text-sm text-slate-600"> Transmits prescriptions directly to CVS, Walgreens, or your preferred local pharmacy in seconds.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-teal-accent shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-sm text-slate-800">Private Two-Way Clinician Messaging:</strong>
                      <span className="text-sm text-slate-600"> Communicate with your physician during your post-visit follow-up window without playing phone tag.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual 3-Step Sign-up Process */}
              <div className="rounded-2xl border border-slate-200/80 bg-white/95 p-6 shadow-md">
                <h3 className="text-lg font-bold text-slate-deep">How Healthie Sign-Up Fits In</h3>
                <p className="mt-1 text-xs text-slate-500">Fast, 2-minute registration integrated into your first visit</p>

                <div className="mt-6 space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-accent text-white font-extrabold text-xs">
                      1
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">Select your concern &amp; symptom check-in</h4>
                      <p className="mt-0.5 text-xs text-slate-600">Answer focused health questions so our doctor understands your condition.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-accent text-white font-extrabold text-xs">
                      2
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">Create your secure Healthie patient portal</h4>
                      <p className="mt-0.5 text-xs text-slate-600">Set up your free account with name, ID verification, and preferred local pharmacy.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-accent text-white font-extrabold text-xs">
                      3
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">Physician review &amp; instant care plan</h4>
                      <p className="mt-0.5 text-xs text-slate-600">Your doctor reviews your chart, e-prescribes, and uploads your permanent care plan.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-xl bg-slate-50 p-3 text-center border border-slate-100">
                  <a
                    href="https://securestaging.gethealthie.com/users/sign_in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-teal-accent hover:underline"
                  >
                    Already have a Healthie account? Log in to your portal →
                  </a>
                </div>
              </div>
            </div>
          </GlassCard>
        </section>

        {/* SECTION: A TABLE OF THE COSTS */}
        <section className="mt-20">
          <div className="text-center mb-8">
            <span className="section-eyebrow">Cost Transparency</span>
            <h2 className="section-heading">A table of the costs</h2>
            <p className="section-subheading mx-auto max-w-xl">
              100% upfront flat rates with committed physician time. No insurance billing, no surprise facility charges.
            </p>
          </div>

          <GlassCard padding="none" className="overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    <th className="py-4 px-6">Service / Condition</th>
                    <th className="py-4 px-4">Visit Format</th>
                    <th className="py-4 px-4">Committed Time</th>
                    <th className="py-4 px-4">Transparent Cost</th>
                    <th className="py-4 px-6 hidden sm:table-cell">What&apos;s Included</th>
                    <th className="py-4 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {costTableData.map((row) => (
                    <tr key={row.service} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6 font-bold text-slate-800">
                        {row.service}
                        <span className="block sm:hidden text-xs font-normal text-slate-500 mt-1">
                          {row.included}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-xs font-medium text-slate-600 whitespace-nowrap">
                        <span className="rounded-md bg-teal-accent-light px-2 py-1 text-teal-accent font-semibold">
                          {row.format}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-xs font-semibold text-slate-700 whitespace-nowrap">
                        ⏱ {row.timeCommitted}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="text-base font-extrabold text-teal-accent">{row.price}</span>
                        <span className="block text-[10px] text-slate-400">{row.billing}</span>
                      </td>
                      <td className="py-4 px-6 text-xs text-slate-600 hidden sm:table-cell leading-relaxed max-w-xs">
                        {row.included}
                      </td>
                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <Link
                          to={`/booking?treatment=${row.treatmentId}`}
                          className="btn-primary text-xs font-bold px-4 py-2"
                        >
                          Select
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-[#e7f6fd] p-4 text-center border-t border-slate-100 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-700">
              <span className="flex items-center gap-1">✓ Zero surprise bills</span>
              <span className="flex items-center gap-1">✓ No insurance required</span>
              <span className="flex items-center gap-1">✓ HSA &amp; FSA cards accepted</span>
              <span className="flex items-center gap-1">✓ Prescriptions sent to any pharmacy</span>
            </div>
          </GlassCard>
        </section>

        {/* BOTTOM SECTION: READY WHEN YOU ARE */}
        <section className="mt-16 rounded-[2rem] bg-slate-deep px-7 py-12 text-center text-white sm:px-12">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-glow">
            Ready to get started?
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Choose your service and start feeling better today.
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/get-started" className="btn-primary px-8 py-3.5 text-sm">
              Get Started with Care
            </Link>
            <Link to="/contact" className="btn-secondary bg-white text-slate-deep hover:bg-slate-100 px-6 py-3.5 text-sm">
              Contact &amp; Feedback →
            </Link>
          </div>
        </section>
      </div>
    </PageShell>
  );
}

