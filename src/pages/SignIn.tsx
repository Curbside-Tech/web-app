import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import AuthExperience from '../components/layout/AuthExperience';
import type { SignInFormState, FormErrors } from '../types';

const initialState: SignInFormState = {
  email: '',
  password: '',
};

function validate(values: SignInFormState): FormErrors<SignInFormState> {
  const errors: FormErrors<SignInFormState> = {};

  if (!values.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }

  return errors;
}

export default function SignIn() {
  const [form, setForm] = useState<SignInFormState>(initialState);
  const [errors, setErrors] = useState<FormErrors<SignInFormState>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field: keyof SignInFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      // TODO: Auth-Service — replace with actual sign-in API call
      // await authService.signIn(form.email, form.password);
      await new Promise((resolve) => setTimeout(resolve, 800));
      console.log('Sign in submitted (stub):', form.email);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthExperience mode="signin">
      <div className="auth-form-shell max-w-md">
        <span className="section-eyebrow">Welcome back</span>
        <h2 className="mt-4 text-4xl font-extrabold leading-[1.02] tracking-[-0.055em] text-slate-deep">Your care space<br />is waiting.</h2>
        <p className="mt-4 text-base leading-relaxed text-slate-600">Sign in to view your visits, care plans, and messages—all in one private place.</p>
        <div className="auth-divider mt-8"><span>Secure sign in</span></div>
        <div className="mt-7">
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label htmlFor="signin-email" className="form-label">
                Email
              </label>
              <input
                id="signin-email"
                type="email"
                autoComplete="email"
                className="form-input"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                aria-invalid={!!errors.email}
              />
              {errors.email && <p className="form-error">{errors.email}</p>}
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between gap-4"><label htmlFor="signin-password" className="form-label">Password</label><span className="mb-1.5 text-xs font-bold text-teal-accent">Keep it private</span></div>
              <input
                id="signin-password"
                type="password"
                autoComplete="current-password"
                className="form-input"
                value={form.password}
                onChange={(e) => handleChange('password', e.target.value)}
                aria-invalid={!!errors.password}
              />
              {errors.password && <p className="form-error">{errors.password}</p>}
            </div>

            <button type="submit" className="btn-primary w-full py-3.5" disabled={submitting}>
              {submitting ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>
        <p className="mt-8 border-t border-[#d6e8f1] pt-6 text-sm text-slate-600">New to Curbside? <Link to="/sign-up" className="font-bold text-teal-accent hover:underline">Create your account</Link></p>
        <p className="mt-6 text-xs leading-relaxed text-slate-500">Protected with industry-standard encryption. This service is not for medical emergencies.</p>
      </div>
    </AuthExperience>
  );
}
