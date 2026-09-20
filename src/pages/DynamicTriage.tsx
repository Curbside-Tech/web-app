import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ALGORITHMS } from '../data/algorithms';

interface DynamicTriageProps {
  treatmentId: string;
}

export default function DynamicTriage({ treatmentId }: DynamicTriageProps) {
  const navigate = useNavigate();
  const algorithm = ALGORITHMS[treatmentId] || ALGORITHMS.uti;

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
    <div className="w-full max-w-2xl mx-auto">
      {/* TOP NAVIGATION BAR */}
      <div className="flex items-center justify-between mb-4 px-1">
        <button
          onClick={handleGoBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors"
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

      {/* MAIN CONTAINER CARD */}
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        {/* PROGRESS BAR */}
        <div className="w-full bg-slate-100 h-1.5">
          <div
            className="bg-teal-500 h-1.5 transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
              {algorithm.name} Evaluation
            </span>
            {currentStep !== 'er' && currentStep !== 'form' && (
              <span className="text-xs font-medium text-slate-400">
                Step {history.length + 1}
              </span>
            )}
          </div>

          {/* ER IMMEDIATE CARE SCREEN */}
          {currentStep === 'er' && (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                !
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Immediate Evaluation Required</h3>
              <p className="text-slate-600 leading-relaxed max-w-md mx-auto text-sm">
                Based on your symptoms, online telehealth evaluation is not safe for your condition. Please visit an Emergency Room or Urgent Care facility immediately.
              </p>
              <button
                onClick={() => {
                  setCurrentStep(algorithm.startQuestionId);
                  setHistory([]);
                }}
                className="mt-4 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
              >
                Restart Assessment
              </button>
            </div>
          )}

          {/* HEALTHIE EMBEDDED FORM SCREEN */}
          {currentStep === 'form' && (
            <div className="space-y-6">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-800 text-sm font-medium">
                <svg className="w-5 h-5 text-emerald-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Triage Completed: Please complete your appointment details below.</span>
              </div>

              <div className="rounded-xl overflow-hidden border border-slate-200 bg-white">
                <iframe
                  key={algorithm.healthieUrl}
                  src={algorithm.healthieUrl}
                  style={{ width: '100%', height: '100%', minHeight: '620px', border: 'none' }}
                  title={`${algorithm.name} Booking Form`}
                />
              </div>

              {/* POST SUBMISSION ACTION OPTIONS */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-5 text-center space-y-3">
                <p className="text-xs font-medium text-slate-500">Finished submitting your form?</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="https://securestaging.gethealthie.com/users/sign_in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-5 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg text-sm transition-colors text-center shadow-sm"
                  >
                    Sign In to Portal
                  </a>
                  <button
                    onClick={() => navigate('/sign-up', { state: { treatmentId } })}
                    className="py-2.5 px-5 bg-white hover:bg-slate-100 text-slate-700 font-medium rounded-lg text-sm border border-slate-300 transition-colors text-center"
                  >
                    Create Account
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* DYNAMIC QUESTION STEPS */}
          {currentStep !== 'er' && currentStep !== 'form' && currentQuestion && (
            <div className="space-y-6">
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 leading-relaxed">
                {currentQuestion.text}
              </h3>

              {/* BUTTON OPTIONS */}
              {currentQuestion.type === 'button' && (
                <div className="grid gap-3 sm:grid-cols-1">
                  {currentQuestion.options?.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => handleNextStep(opt.nextStep)}
                      className="group flex items-center justify-between p-4 bg-slate-50 hover:bg-teal-50/60 border border-slate-200 hover:border-teal-300 rounded-xl font-medium text-slate-800 hover:text-teal-900 transition-all text-left shadow-sm hover:shadow"
                    >
                      <span>{opt.label}</span>
                      <svg
                        className="w-5 h-5 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-0.5 transition-all"
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
                  className="space-y-4"
                >
                  <input
                    type="text"
                    required
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Type your response here..."
                    className="w-full px-4 py-3.5 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-none transition-all placeholder:text-slate-400"
                  />
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl transition-all shadow-md shadow-teal-600/20 active:scale-[0.99]"
                  >
                    Continue →
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}