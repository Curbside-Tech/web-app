import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ALGORITHMS } from '../data/algorithms';

interface DynamicTriageProps {
  treatmentId: string;
}

const triagePresentation = {
  uti: {
    eyebrow: 'Urinary care',
    heading: <>Let’s get a clearer<br />picture together.</>,
    description: 'A few focused questions help us understand urinary symptoms and guide your next step.',
    cue: 'Focused urinary check-in',
  },
  uri: {
    eyebrow: 'Respiratory care',
    heading: <>Tell us what you’re<br />feeling today.</>,
    description: 'Share the symptoms that matter so we can help guide your respiratory care safely.',
    cue: 'Focused respiratory check-in',
  },
  sti: {
    eyebrow: 'Private sexual health care',
    heading: <>Your care starts<br />privately, here.</>,
    description: 'Take this at your own pace. Your answers are reviewed discreetly and securely.',
    cue: 'Private health check-in',
  },
};

export default function DynamicTriage({ treatmentId }: DynamicTriageProps) {
  const navigate = useNavigate();
  const algorithm = ALGORITHMS[treatmentId] || ALGORITHMS.uti;
  const presentation = triagePresentation[algorithm.id as keyof typeof triagePresentation] || triagePresentation.uti;

  const [currentStep, setCurrentStep] = useState<string>(algorithm.startQuestionId);
  const [history, setHistory] = useState<string[]>([]);
  const [textInput, setTextInput] = useState('');

  // Reset steps when treatmentId changes
  useEffect(() => {
    setCurrentStep(algorithm.startQuestionId);
    setHistory([]);
    setTextInput('');
  }, [treatmentId, algorithm]);

  const currentQuestion = algorithm.questions[currentStep];

  // Navigate to next question step and push previous step to history
  const handleNextStep = (nextStep: string) => {
    setHistory((prev) => [...prev, currentStep]);
    setCurrentStep(nextStep);
  };

  // Go back to previous question
  const handleGoBack = () => {
    if (history.length > 0) {
      const previousStep = history[history.length - 1];
      setHistory((prev) => prev.slice(0, -1));
      setCurrentStep(previousStep);
    } else {
      navigate(-1); // Return to previous router page if at start
    }
  };

  // Calculate rough progress percentage
  const totalQuestions = Object.keys(algorithm.questions).length;
  const progressPercent =
    currentStep === 'form'
      ? 100
      : currentStep === 'er'
      ? 100
      : Math.min(Math.round(((history.length + 1) / totalQuestions) * 100), 95);

  return (
    <main className={`triage-page triage-page--${algorithm.id}`}>
      <div className="triage-shell">
      <div className="triage-nav">
        <button
          onClick={handleGoBack}
          className="triage-nav-button"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <button
          onClick={() => navigate('/')}
          className="triage-nav-button"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 00-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Home
        </button>
      </div>

      <section className="triage-hero">
        <div className="triage-hero-copy">
          <p>{presentation.eyebrow}</p>
          <h1>{presentation.heading}</h1>
          <span>{presentation.description}</span>
        </div>
        <div className="triage-hero-mark" aria-hidden="true"><i /><i /><b>✦</b></div>
      </section>

      <section className="triage-card">
        <aside className="triage-rail">
          <span className="triage-rail-brand">CURBSIDE</span>
          <div className="triage-rail-icon">✦</div>
          <p>Your care journey</p>
          <ol>
            <li className="is-active"><b>01</b><span>Care check-in</span></li>
            <li><b>02</b><span>Appointment details</span></li>
            <li><b>03</b><span>Clinician review</span></li>
          </ol>
          <small>Private and encrypted</small>
        </aside>
        <div className="triage-main">
          <div className="triage-progress-track">
            <div
              className="triage-progress-value"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="triage-content">
          <div className="triage-card-header">
            <div>
              <span className="triage-kicker">{presentation.cue}</span>
              <p>{algorithm.name} evaluation</p>
            </div>
            <span className="triage-step-count">
              {currentStep === 'er' || currentStep === 'form' ? 'Complete' : `Step ${history.length + 1}`}
            </span>
          </div>

          {currentStep === 'er' && (
            <div className="triage-emergency">
              <div className="triage-emergency-icon">
                !
              </div>
              <span>In-person evaluation needed</span>
              <h3>Immediate evaluation required</h3>
              <p>
                Based on your symptoms, online telehealth evaluation is not safe for your condition. Please visit an Emergency Room or Urgent Care facility immediately.
              </p>
              <button
                onClick={() => {
                  setCurrentStep(algorithm.startQuestionId);
                  setHistory([]);
                }}
                className="triage-secondary-button"
              >
                Restart Assessment
              </button>
            </div>
          )}

          {currentStep === 'form' && (
            <div className="triage-form-state">
              <div className="triage-complete-note">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong>Care check-in complete.</strong> Please complete your appointment details below.</span>
              </div>

              <div className="triage-embed-frame">
                <iframe
                  key={algorithm.healthieUrl}
                  src={algorithm.healthieUrl}
                  style={{ width: '100%', height: '100%', minHeight: '620px', border: 'none' }}
                  title={`${algorithm.name} Booking Form`}
                />
              </div>

              <div className="triage-post-form">
                <p>Finished submitting your form?</p>
                <div>
                  <a
                    href="https://securestaging.gethealthie.com/users/sign_in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="triage-primary-button"
                  >
                    Sign In to Portal
                  </a>
                  <button
                    onClick={() => navigate('/sign-up', { state: { treatmentId } })}
                    className="triage-secondary-button"
                  >
                    Create Account
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentStep !== 'er' && currentStep !== 'form' && currentQuestion && (
            <div className="triage-question-state">
              <div className="triage-question-number">{String(history.length + 1).padStart(2, '0')}</div>
              <h3>
                {currentQuestion.text}
              </h3>

              {/* BUTTON OPTIONS */}
              {currentQuestion.type === 'button' && (
                <div className="triage-options">
                  {currentQuestion.options?.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => handleNextStep(opt.nextStep)}
                      className="triage-option"
                    >
                      <span className="triage-option-letter">{String.fromCharCode(65 + (currentQuestion.options?.indexOf(opt) ?? 0))}</span><span>{opt.label}</span>
                      <svg
                        className="triage-option-arrow"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ))}
                </div>
              )}

              {/* TEXT INPUT QUESTIONS */}
              {currentQuestion.type === 'text' && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const next = currentQuestion.options?.[0]?.nextStep || 'form';
                    handleNextStep(next);
                  }}
                  className="triage-text-form"
                >
                  <input
                    type="text"
                    required
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Type your response here..."
                    className="triage-text-input"
                  />
                  <button
                    type="submit"
                    className="triage-primary-button triage-text-continue"
                  >
                    Continue →
                  </button>
                </form>
              )}
            </div>
          )}
          </div>
        </div>
      </section>
      <p className="triage-privacy">⌁ Your answers are private, encrypted, and reviewed securely.</p>
      </div>
    </main>
  );
}
