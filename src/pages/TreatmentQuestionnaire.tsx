import { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import PageShell from '../components/layout/PageShell';
import { treatmentAlgorithms, type AlgorithmAnswers } from '../data/algorithms';
import { treatments } from '../data/treatments';

const themes = {
  uti: { name: 'Urinary care', detail: 'A quick safety screen helps us understand your symptoms and guide you to the right care.', badge: 'Urinary symptoms', headline: 'Clarity starts with the details.', cue: 'A focused care check-in' },
  uri: { name: 'Respiratory care', detail: 'A few focused questions help us understand your symptoms and keep your care on track.', badge: 'Respiratory symptoms', headline: 'A clearer path to feeling better.', cue: 'A thoughtful breathing check-in' },
  'sti-exposure': { name: 'Private sexual health care', detail: 'Answer privately, at your pace. Your responses guide a safe next step with a clinician.', badge: 'Private health', headline: 'Private care, without the uncertainty.', cue: 'A discreet care check-in' },
};

export default function TreatmentQuestionnaire() {
  const [params] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const treatmentId = params.get('treatment') || location.state?.treatment?.id || location.state?.treatmentId;
  const treatment = treatments.find((item) => item.id === treatmentId);
  const theme = treatment ? themes[treatment.id as keyof typeof themes] : undefined;
  const [answers, setAnswers] = useState<AlgorithmAnswers>({});
  const [step, setStep] = useState(0);
  const questions = useMemo(() => treatment ? (treatmentAlgorithms[treatment.id] ?? []).filter((item) => !item.showWhen || item.showWhen(answers)) : [], [treatment, answers]);
  const question = questions[step];
  const answer = answers[question?.id];
  const emergency = question?.emergencyWhen?.(answer) ?? false;
  const ready = Array.isArray(answer) ? answer.length > 0 : Boolean(answer);
  const setAnswer = (value: string | string[]) => setAnswers((current) => ({ ...current, [question.id]: value }));

  if (!treatment || !theme || !question) return <PageShell><div className="mx-auto max-w-3xl px-4 py-20 sm:px-6"><h1 className="section-heading">Choose a treatment to begin.</h1><Link to="/treatments" className="btn-primary mt-6">View treatments</Link></div></PageShell>;
  if (emergency) return <PageShell><div className="algorithm-page"><div className="mx-auto max-w-3xl px-4 py-16 sm:px-6"><section className="algorithm-emergency rounded-[2rem] p-7 sm:p-10"><p>In-person evaluation needed</p><h1>Please go to the nearest emergency room.</h1><p className="algorithm-emergency-copy">Based on this answer, an online visit is not the right setting for your care. If symptoms are severe or worsening, call 911.</p><span className="algorithm-emergency-mark" aria-hidden="true">!</span><Link to="/treatments" className="btn-secondary mt-7">Return to treatments</Link></section></div></div></PageShell>;

  const progress = ((step + 1) / questions.length) * 100;
  const questionLabel = question.type === 'multi' ? 'Choose all that apply' : question.type === 'text' ? 'Write your answer' : 'Choose one answer';
  return <PageShell><main className={`intake-experience intake-experience--${treatment.id}`}><div className="mx-auto max-w-5xl px-4 pb-20 pt-6 sm:px-6 lg:pt-10"><Link to="/treatments" className="intake-back">← Back to treatments</Link><section className="intake-hero"><div className="intake-hero-copy"><p>{theme.name}</p><h1>{theme.headline}</h1><span>{theme.detail}</span></div><div className="intake-hero-status"><div className="intake-status-orbit"><i /><i /><b>✦</b></div><strong>{theme.cue}</strong><small>{theme.badge}</small><i /><b>{String(step + 1).padStart(2, '0')} <em>/ {String(questions.length).padStart(2, '0')}</em></b></div></section><section className="intake-question"><header><div><span>{questionLabel}</span><p>Question {step + 1} of {questions.length}</p></div><strong>{Math.round(progress)}% complete</strong></header><div className="intake-progress"><i style={{ width: `${progress}%` }} /></div><div className="intake-content"><div className="intake-number">0{step + 1}</div><div><h2>{question.label}</h2>{question.helpText && <p>{question.helpText}</p>}</div></div><div className="intake-answers">{question.type === 'text' ? <textarea className="form-input min-h-40 resize-y" value={String(answer ?? '')} onChange={(event) => setAnswer(event.target.value)} placeholder="Type your answer here" /> : question.type === 'number' ? <input className="form-input max-w-xs" type="number" min="0" value={String(answer ?? '')} onChange={(event) => setAnswer(event.target.value)} placeholder="Number of days" /> : question.options?.map((option, index) => { const selected = question.type === 'multi' ? Array.isArray(answer) && answer.includes(option) : answer === option; const nextValue = question.type === 'multi' ? (selected ? (answer as string[]).filter((item) => item !== option) : [...(Array.isArray(answer) ? answer : []), option]) : option; return <button type="button" key={option} onClick={() => setAnswer(nextValue)} className={`intake-answer ${selected ? 'intake-answer--selected' : ''}`}><b>{selected ? '✓' : String.fromCharCode(65 + index)}</b><span>{option}</span></button>; })}</div><footer><button type="button" disabled={step === 0} onClick={() => setStep((current) => current - 1)}>← Previous</button><button type="button" disabled={!ready} onClick={() => step === questions.length - 1 ? navigate(`/booking?treatment=${treatment.id}`, { state: { treatment } }) : setStep((current) => current + 1)}>{step === questions.length - 1 ? 'Continue to booking' : 'Continue'} →</button></footer><small className="intake-private">⌁ Your answers are private, encrypted, and reviewed securely.</small></section></div></main></PageShell>;
}
