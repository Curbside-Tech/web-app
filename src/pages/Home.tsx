import { Link } from 'react-router-dom';
import PageShell from '../components/layout/PageShell';
import EmergencyBanner from '../components/EmergencyBanner';
import TreatmentCard from '../components/TreatmentCard';
import CarePathCard from '../components/CarePathCard';
import { AsyncIcon, CheckCircle, ShieldCheck, VideoIcon } from '../components/icons';
import { treatments } from '../data/treatments';
import { homeFaqTeaser } from '../data/faqs';

const reassurance = ['Licensed clinicians', 'Private by design', 'Care on your schedule'];
const moments = [
  ['01', 'Tell us what you need', 'A few thoughtful questions get your visit started.'],
  ['02', 'Connect with a clinician', 'Your care is reviewed by a licensed medical professional.'],
  ['03', 'Move forward with clarity', 'Receive a care plan and prescriptions when appropriate.'],
];

const carePaths = [
  {
    icon: <AsyncIcon className="h-6 w-6" />,
    eyebrow: 'On your own time',
    title: 'Async care',
    description: 'Share your symptoms through a focused questionnaire whenever it is convenient for you.',
    detail: 'Best for many everyday concerns that do not need a live conversation.',
  },
  {
    icon: <VideoIcon className="h-6 w-6" />,
    eyebrow: 'Face-to-face support',
    title: 'Video visits',
    description: 'Meet privately with a clinician when a conversation or visual review will help guide care.',
    detail: 'A secure visit from wherever you feel most comfortable.',
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    eyebrow: 'Care that continues',
    title: 'Ongoing plans',
    description: 'For eligible treatments, stay connected with follow-ups and thoughtful ongoing support.',
    detail: 'Clear next steps, regular check-ins, and prescription support when appropriate.',
  },
];

export default function Home() {
  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <div className="pt-2"><EmergencyBanner /></div>

        <section className="home-hero mt-6 overflow-hidden rounded-[2rem] px-6 py-8 sm:mt-8 sm:px-10 sm:py-12 lg:grid lg:min-h-[620px] lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-12 lg:px-16 lg:py-16">
          <div className="relative z-10 max-w-2xl">
            <p className="hero-kicker">A better kind of everyday care</p>
            <h1 className="mt-6 text-5xl font-extrabold leading-[0.98] tracking-[-0.065em] text-white sm:text-6xl lg:text-7xl">Feel like yourself,<br /><span className="text-[#bae6fd]">sooner.</span></h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl">Clinician-led care for the things that should not have to wait. Simple, personal, and designed around real life.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row"><Link to="/intake" className="hero-button">Start your private intake <span aria-hidden="true">→</span></Link><Link to="/treatments" className="hero-link">Explore care options <span aria-hidden="true">↗</span></Link></div>
            <div className="mt-10 flex flex-wrap gap-x-5 gap-y-3">{reassurance.map((item) => <span key={item} className="flex items-center gap-2 text-sm font-semibold text-white/80"><CheckCircle className="h-4 w-4 text-[#bae6fd]" />{item}</span>)}</div>
          </div>

          <div className="hero-orbit relative mt-12 min-h-[330px] lg:mt-0">
            <div className="hero-orbit-ring absolute inset-4 rounded-full" /><div className="hero-orbit-ring hero-orbit-ring--inner absolute inset-14 rounded-full" /><div className="hero-sun absolute left-[12%] top-[11%] h-16 w-16 rounded-full" />
            <div className="hero-care-card absolute bottom-0 right-0 w-[88%] rounded-3xl p-5 sm:w-[76%] sm:p-6"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#3b7892]">Care update</p><h2 className="mt-2 text-xl font-bold tracking-tight text-slate-deep">Your visit is in good hands.</h2></div><span className="rounded-full bg-[#e0f7ff] px-3 py-1 text-xs font-bold text-[#174b66]">Today</span></div><div className="mt-6 flex items-center gap-3 border-t border-[#d4eaf2] pt-5"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e8f7fc] text-teal-accent"><VideoIcon className="h-5 w-5" /></span><div><p className="text-sm font-bold text-slate-deep">Your next step, made clear</p><p className="mt-0.5 text-xs text-slate-500">Easy async and video visits</p></div></div></div>
            <div className="hero-note absolute bottom-9 left-0 rounded-2xl px-4 py-3 text-sm font-semibold text-[#174b66]">Care that fits your day <span className="ml-1">✦</span></div>
          </div>
        </section>

        <section className="home-trust-grid grid gap-px overflow-hidden rounded-2xl border border-[#d6e8f1] bg-[#d6e8f1] sm:grid-cols-3"><div><strong>Most visits start in minutes</strong><span>on your time, from home</span></div><div><strong>Licensed U.S. clinicians</strong><span>real care from real people</span></div><div><strong>Private &amp; secure</strong><span>your health stays personal</span></div></section>

        <section className="marketing-launch grid gap-8 py-24 sm:py-32 lg:grid-cols-[1fr_.95fr] lg:items-center"><div><span className="section-eyebrow">Care made easier to begin</span><h2 className="mt-4 max-w-xl text-4xl font-extrabold leading-[1.04] tracking-[-.055em] text-slate-deep sm:text-5xl">Care for the concern that brought you here.</h2><p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">Explore a focused care path, understand what happens next, and start a private intake when you are ready. No waiting room required.</p><Link to="/intake" className="btn-primary mt-8">Find your care path →</Link></div><div className="grid gap-3 sm:grid-cols-2">{[['Focused care', 'Choose a concern and see the care options designed around it.'], ['Clear pricing', 'Know what to expect before you begin your consultation.'], ['Private by design', 'Your health journey deserves a thoughtful, secure experience.'], ['Care that continues', 'Stay connected when your plan needs ongoing support.']].map(([title, copy]) => <article className="marketing-point" key={title}><span>✦</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

        <section className="py-24 sm:py-32"><div className="grid items-end gap-8 lg:grid-cols-[1fr_.74fr]"><div><span className="section-eyebrow">Care, without the runaround</span><h2 className="mt-4 max-w-2xl text-4xl font-extrabold leading-[1.04] tracking-[-0.055em] text-slate-deep sm:text-5xl">Healthcare that moves at the speed of your life.</h2></div><p className="max-w-md text-base leading-relaxed text-slate-600 lg:justify-self-end">No hold music. No crowded rooms. Start when it works for you and get a clear, clinically sound next step.</p></div><div className="mt-12 grid gap-4 md:grid-cols-3">{moments.map(([number, title, description]) => <article key={number} className="moment-card"><span>{number}</span><h3>{title}</h3><p>{description}</p><div className="moment-line" /></article>)}</div><Link to="/how-it-works" className="mt-9 inline-flex items-center gap-2 text-sm font-bold text-teal-accent hover:text-teal-accent-hover">See the full care experience <span aria-hidden="true">→</span></Link></section>

        <section className="pb-24 sm:pb-32">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><span className="section-eyebrow">Choose the pace that feels right</span><h2 className="mt-4 text-4xl font-extrabold tracking-[-0.05em] text-slate-deep sm:text-5xl">Care that meets you<br />where you are.</h2></div><p className="max-w-sm text-base leading-relaxed text-slate-600">Whether you need a quick answer or a conversation, there is a clear way to begin.</p></div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">{carePaths.map((path) => <CarePathCard key={path.title} {...path} />)}</div>
        </section>

        <section className="featured-care overflow-hidden rounded-[2rem] bg-[#e7f5fb] px-6 py-10 sm:px-10 sm:py-14 lg:px-14"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><span className="section-eyebrow">Meet care where it is</span><h2 className="mt-4 text-4xl font-extrabold tracking-[-0.05em] text-slate-deep sm:text-5xl">Start with what<br />you are feeling.</h2></div><Link to="/treatments" className="btn-secondary w-fit">View all care options <span className="ml-1">→</span></Link></div><div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{treatments.slice(0, 4).map((treatment) => <TreatmentCard key={treatment.id} treatment={treatment} />)}</div></section>

        <section className="grid gap-10 py-24 sm:py-32 lg:grid-cols-[.82fr_1.18fr] lg:items-center"><div className="relative min-h-80 overflow-hidden rounded-[2rem] bg-[#38a9d3] p-7 sm:min-h-96 sm:p-10"><div className="absolute -right-16 -top-20 h-72 w-72 rounded-full border-[28px] border-[#8bd6f2]" /><div className="absolute -bottom-24 -left-12 h-56 w-56 rounded-full bg-[#c5edfb]" /><ShieldCheck className="relative h-10 w-10 text-white" /><p className="relative mt-24 max-w-xs text-2xl font-bold leading-tight tracking-tight text-white sm:mt-36">A real clinician is always part of your care.</p></div><div><span className="section-eyebrow">Clinically grounded. Genuinely human.</span><h2 className="mt-4 text-4xl font-extrabold leading-[1.04] tracking-[-0.055em] text-slate-deep sm:text-5xl">You deserve care that listens.</h2><p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">Curbside gives you a calmer way to take care of yourself—with thoughtful questions, licensed clinicians, and a clear path forward.</p><Link to="/about" className="btn-primary mt-8 px-7 py-3.5">Why Curbside Health</Link></div></section>

        <section className="home-questions grid gap-8 rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-14 lg:px-14">
          <div><span className="section-eyebrow">Before you begin</span><h2 className="mt-4 text-4xl font-extrabold leading-[1.04] tracking-[-0.055em] text-slate-deep">A few answers, right when you need them.</h2><p className="mt-5 max-w-md text-base leading-relaxed text-slate-600">We want the path to care to feel straightforward from the first click.</p><Link to="/faq" className="btn-secondary mt-7">Visit the help center <span className="ml-1">→</span></Link></div>
          <div className="grid gap-3 sm:grid-cols-2">{homeFaqTeaser.slice(0, 4).map((item) => <Link key={item.id} to="/faq" className="home-question rounded-2xl p-5"><p className="text-base font-bold tracking-tight text-slate-deep">{item.question}</p><p className="mt-3 text-sm leading-relaxed text-slate-600">{item.answer}</p><span className="mt-4 inline-block text-xs font-bold text-teal-accent">Read answer →</span></Link>)}</div>
        </section>
      </div>
    </PageShell>
  );
}
