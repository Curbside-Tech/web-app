import { useState, useRef, useCallback, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import AuthExperience from '../components/layout/AuthExperience';
import EmergencyBanner from '../components/EmergencyBanner';
import { CameraIcon, UploadIcon } from '../components/icons';
import { termsSections } from '../data/terms';
import type { SignUpFormState, FormErrors } from '../types';
import { US_STATES, isAtLeast18, isValidEmail, isValidPhone } from '../utils/validation';

type SignUpStep = 'account' | 'identity' | 'verification';

const initialState: SignUpFormState = {
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  dateOfBirth: '',
  address: '',
  state: '',
  termsAccepted: false,
};

function validateAccountStep(values: SignUpFormState): FormErrors<SignUpFormState> {
  const errors: FormErrors<SignUpFormState> = {};

  if (!values.fullName.trim()) {
    errors.fullName = 'Full name is required';
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!values.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!isValidPhone(values.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
}

function validateIdentityStep(values: SignUpFormState): FormErrors<SignUpFormState> {
  const errors: FormErrors<SignUpFormState> = {};

  if (!values.dateOfBirth) {
    errors.dateOfBirth = 'Date of birth is required';
  } else if (!isAtLeast18(values.dateOfBirth)) {
    errors.dateOfBirth = 'You must be at least 18 years old to register';
  }

  if (!values.address.trim()) {
    errors.address = 'Address is required';
  }

  if (!values.state) {
    errors.state = 'State is required for treatment eligibility';
  }

  return errors;
}

export default function SignUp() {
  const [step, setStep] = useState<SignUpStep>('account');
  const [form, setForm] = useState<SignUpFormState>(initialState);
  const [errors, setErrors] = useState<FormErrors<SignUpFormState>>({});
  const [termsScrolledToBottom, setTermsScrolledToBottom] = useState(false);
  const [idUploaded, setIdUploaded] = useState(false);
  const [selfieUploaded, setSelfieUploaded] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const termsRef = useRef<HTMLDivElement>(null);

  const handleChange = <K extends keyof SignUpFormState>(field: K, value: SignUpFormState[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleTermsScroll = useCallback(() => {
    const el = termsRef.current;
    if (!el) return;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 8;
    if (atBottom) setTermsScrolledToBottom(true);
  }, []);

  const handleNextFromAccount = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateAccountStep(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setStep('identity');
  };

  const handleNextFromIdentity = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateIdentityStep(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (!form.termsAccepted) {
      setErrors({ termsAccepted: 'You must accept the Terms & Conditions' });
      return;
    }
    setErrors({});
    setStep('verification');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!idUploaded || !selfieUploaded) {
      return;
    }

    setSubmitting(true);
    try {
      // TODO: Auth-Service — replace with actual sign-up API call
      // await authService.signUp(form);
      // TODO: ID verification service — replace with actual verification API call
      // await idVerificationService.verify({ idDocument, selfie });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Sign up submitted (stub):', form.email);
    } finally {
      setSubmitting(false);
    }
  };

  const stepLabels: Record<SignUpStep, string> = {
    account: 'Account',
    identity: 'Identity & Terms',
    verification: 'ID Verification',
  };

  const stepContent: Record<SignUpStep, { title: string; description: string }> = {
    account: {
      title: 'Let’s get to know you.',
      description: 'Start with the essentials. It only takes a minute.',
    },
    identity: {
      title: 'A few care details.',
      description: 'We use these details to confirm eligibility and keep your care personal.',
    },
    verification: {
      title: 'One final check.',
      description: 'A quick identity check helps protect your account and your care.',
    },
  };

  const stepIndex = ['account', 'identity', 'verification'].indexOf(step);

  return (
    <AuthExperience mode="signup">
      <div className="auth-form-shell auth-form-shell--signup max-w-xl">
        <span className="section-eyebrow">Get started · {stepIndex + 1} of 3</span>
        <h2 className="mt-4 text-4xl font-extrabold leading-[1.02] tracking-[-0.055em] text-slate-deep">{stepContent[step].title}</h2>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-600">{stepContent[step].description}</p>

        <div className="mt-6">
          <EmergencyBanner />
        </div>

        {/* Step indicator */}
        <div className="auth-steps mt-8 grid grid-cols-3 gap-2" aria-label="Account creation progress">
          {(['account', 'identity', 'verification'] as SignUpStep[]).map((s, i) => (
            <div key={s} className={`auth-step ${i <= stepIndex ? 'auth-step--active' : ''}`} aria-current={s === step ? 'step' : undefined}>
              <div className="flex items-center gap-2"><span className="auth-step-number">{i + 1}</span><span className="hidden text-xs font-bold sm:inline">{stepLabels[s]}</span></div>
              <span className="auth-step-line" />
            </div>
          ))}
        </div>

        <div className="auth-form-card mt-8">
          {step === 'account' && (
            <form onSubmit={handleNextFromAccount} noValidate>
              <div className="mb-4">
                <label htmlFor="signup-name" className="form-label">Full name</label>
                <input
                  id="signup-name"
                  type="text"
                  autoComplete="name"
                  className="form-input"
                  value={form.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  aria-invalid={!!errors.fullName}
                />
                {errors.fullName && <p className="form-error">{errors.fullName}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="signup-email" className="form-label">Email</label>
                <input
                  id="signup-email"
                  type="email"
                  autoComplete="email"
                  className="form-input"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  aria-invalid={!!errors.email}
                />
                {errors.email && <p className="form-error">{errors.email}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="signup-phone" className="form-label">Phone</label>
                <input
                  id="signup-phone"
                  type="tel"
                  autoComplete="tel"
                  className="form-input"
                  placeholder="(555) 123-4567"
                  value={form.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  aria-invalid={!!errors.phone}
                />
                {errors.phone && <p className="form-error">{errors.phone}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="signup-password" className="form-label">Password</label>
                <input
                  id="signup-password"
                  type="password"
                  autoComplete="new-password"
                  className="form-input"
                  value={form.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  aria-invalid={!!errors.password}
                />
                {errors.password && <p className="form-error">{errors.password}</p>}
              </div>

              <div className="mb-6">
                <label htmlFor="signup-confirm" className="form-label">Confirm password</label>
                <input
                  id="signup-confirm"
                  type="password"
                  autoComplete="new-password"
                  className="form-input"
                  value={form.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  aria-invalid={!!errors.confirmPassword}
                />
                {errors.confirmPassword && <p className="form-error">{errors.confirmPassword}</p>}
              </div>

              <button type="submit" className="btn-primary w-full">Continue</button>
            </form>
          )}

          {step === 'identity' && (
            <form onSubmit={handleNextFromIdentity} noValidate>
              <div className="mb-4">
                <label htmlFor="signup-dob" className="form-label">Date of birth</label>
                <input
                  id="signup-dob"
                  type="date"
                  className="form-input"
                  value={form.dateOfBirth}
                  onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                  aria-invalid={!!errors.dateOfBirth}
                />
                {errors.dateOfBirth && <p className="form-error">{errors.dateOfBirth}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="signup-address" className="form-label">Address</label>
                <input
                  id="signup-address"
                  type="text"
                  autoComplete="street-address"
                  className="form-input"
                  placeholder="123 Main St"
                  value={form.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  aria-invalid={!!errors.address}
                />
                {errors.address && <p className="form-error">{errors.address}</p>}
              </div>

              <div className="mb-6">
                <label htmlFor="signup-state" className="form-label">State</label>
                <select
                  id="signup-state"
                  className="form-input"
                  value={form.state}
                  onChange={(e) => handleChange('state', e.target.value)}
                  aria-invalid={!!errors.state}
                >
                  <option value="">Select your state</option>
                  {US_STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {errors.state && <p className="form-error">{errors.state}</p>}
              </div>

              {/* Terms scroll panel */}
              <div className="mb-4">
                <p className="form-label">Terms &amp; Conditions</p>
                <div
                  ref={termsRef}
                  onScroll={handleTermsScroll}
                  className="max-h-48 overflow-y-auto rounded-xl border border-white/60 bg-white/30 p-4 text-xs leading-relaxed text-slate-600"
                >
                  {termsSections.map((section) => (
                    <div key={section.title} className="mb-3">
                      <p className="font-semibold text-slate-700">{section.title}</p>
                      <p className="mt-1">{section.content}</p>
                    </div>
                  ))}
                </div>
                {!termsScrolledToBottom && (
                  <p className="mt-1 text-xs text-slate-500">
                    Scroll to the bottom to enable acceptance.
                  </p>
                )}
              </div>

              <label className="mb-6 flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={form.termsAccepted}
                  disabled={!termsScrolledToBottom}
                  onChange={(e) => handleChange('termsAccepted', e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-accent focus:ring-teal-accent disabled:opacity-40"
                />
                <span className="text-sm text-slate-600">
                  I have read and agree to the{' '}
                  <Link to="/terms" className="text-teal-accent hover:underline" target="_blank">
                    Terms &amp; Conditions
                  </Link>
                </span>
              </label>
              {errors.termsAccepted && <p className="form-error -mt-4 mb-4">{errors.termsAccepted}</p>}

              <div className="flex gap-3">
                <button type="button" className="btn-secondary flex-1" onClick={() => setStep('account')}>
                  Back
                </button>
                <button type="submit" className="btn-primary flex-1">Continue</button>
              </div>
            </form>
          )}

          {step === 'verification' && (
            <form onSubmit={handleSubmit} noValidate>
              <p className="mb-4 text-sm text-slate-600">
                Verify your identity by uploading a photo ID and taking a selfie. This helps us keep
                our platform safe and compliant.
              </p>

              <div className="mb-4">
                <p className="form-label">Government-issued photo ID</p>
                <button
                  type="button"
                  onClick={() => {
                    // TODO: ID verification service — wire up actual file upload
                    setIdUploaded(true);
                  }}
                  className={`auth-upload-zone flex w-full flex-col items-center gap-2 p-6 ${
                    idUploaded
                      ? 'auth-upload-zone--ready'
                      : ''
                  }`}
                >
                  <UploadIcon className={idUploaded ? 'text-teal-accent' : 'text-slate-400'} />
                  <span className="text-sm font-medium text-slate-700">
                    {idUploaded ? 'ID uploaded ✓' : 'Upload photo ID'}
                  </span>
                  <span className="text-xs text-slate-500">Driver&apos;s license, passport, or state ID</span>
                </button>
              </div>

              <div className="mb-6">
                <p className="form-label">Selfie verification</p>
                <button
                  type="button"
                  onClick={() => {
                    // TODO: ID verification service — wire up actual selfie capture
                    setSelfieUploaded(true);
                  }}
                  className={`auth-upload-zone flex w-full flex-col items-center gap-2 p-6 ${
                    selfieUploaded
                      ? 'auth-upload-zone--ready'
                      : ''
                  }`}
                >
                  <CameraIcon className={selfieUploaded ? 'text-teal-accent' : 'text-slate-400'} />
                  <span className="text-sm font-medium text-slate-700">
                    {selfieUploaded ? 'Selfie captured ✓' : 'Take a selfie'}
                  </span>
                  <span className="text-xs text-slate-500">Must clearly show your face</span>
                </button>
              </div>

              <div className="flex gap-3">
                <button type="button" className="btn-secondary flex-1" onClick={() => setStep('identity')}>
                  Back
                </button>
                <button
                  type="submit"
                  className="btn-primary flex-1"
                  disabled={submitting || !idUploaded || !selfieUploaded}
                >
                  {submitting ? 'Creating account…' : 'Create account'}
                </button>
              </div>
            </form>
          )}

          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/sign-in" className="font-semibold text-teal-accent hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </AuthExperience>
  );
}
