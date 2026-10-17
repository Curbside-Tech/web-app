import { useState, type FormEvent } from 'react';
import PageShell from '../components/layout/PageShell';
import GlassCard from '../components/GlassCard';
import { AlertTriangle, CheckCircle, ShieldCheck } from '../components/icons';
import type { ContactFormState, FormErrors } from '../types';

const initialState: ContactFormState = {
  name: '',
  email: '',
  phone: '',
  category: 'feedback',
  visitReference: '',
  message: '',
  followUp: 'email',
};

function validate(values: ContactFormState): FormErrors<ContactFormState> {
  const errors: FormErrors<ContactFormState> = {};

  if (!values.name.trim()) {
    errors.name = 'Please provide your name';
  }

  if (!values.email.trim()) {
    errors.email = 'Please provide your email address';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!values.message.trim()) {
    errors.message = 'Please share your feedback or concern';
  } else if (values.message.trim().length < 10) {
    errors.message = 'Please provide at least 10 characters so we can understand your message';
  }

  return errors;
}

export default function Contact() {
  const [form, setForm] = useState<ContactFormState>(initialState);
  const [errors, setErrors] = useState<FormErrors<ContactFormState>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof ContactFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitted(true);
  };

  return (
    <PageShell>
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        {/* HEADER */}
        <div className="text-center">
          <span className="section-eyebrow">We&apos;re Listening</span>
          <h1 className="section-heading">Patient Feedback &amp; Concerns</h1>
          <p className="section-subheading mx-auto max-w-2xl">
            Curbside Health is physician-founded. We value your voice and review all patient feedback, suggestions, and clinical concerns directly.
          </p>
        </div>

        {/* EMERGENCY BANNER WARNING */}
        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50/80 p-4 text-xs text-amber-900 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold">Medical Emergency Notice:</strong> This feedback form is not monitored for real-time medical emergencies or acute clinical questions. If you are experiencing chest pain, difficulty breathing, severe bleeding, or any medical emergency, please call <strong>911</strong> or visit the nearest emergency department immediately.
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-5">
          {/* SIDE INFORMATION (2 COLS) */}
          <div className="space-y-5 lg:col-span-2">
            <GlassCard padding="md" className="space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-accent/10 text-teal-accent">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h2 className="text-base font-bold text-slate-800">Direct Physician Review</h2>
              <p className="text-xs leading-relaxed text-slate-600">
                Unlike giant healthcare corporations with offshore ticket queues, patient concerns and feedback at Curbside are reviewed by our clinical leadership team to continuously improve patient care.
              </p>
            </GlassCard>

            <GlassCard padding="md" className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Response Commitment</h3>
              <p className="text-sm font-semibold text-slate-800">Within 1 Business Day</p>
              <p className="text-xs text-slate-500">
                If you request a follow-up response, a care coordinator or clinician will reply directly to your email or phone.
              </p>
            </GlassCard>

            <GlassCard padding="md" className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Direct Support Email</h3>
              <a
                href="mailto:feedback@curbsidehealth.com"
                className="block text-sm font-bold text-teal-accent hover:underline"
              >
                feedback@curbsidehealth.com
              </a>
              <p className="text-xs text-slate-500">
                For general support: <a href="mailto:support@curbsidehealth.com" className="text-teal-accent hover:underline">support@curbsidehealth.com</a>
              </p>
              <p className="text-xs text-slate-500 pt-1">
                Hours: Monday – Friday, 9:00 AM – 6:00 PM ET
              </p>
            </GlassCard>
          </div>

          {/* MAIN FORM AREA (3 COLS) */}
          <GlassCard padding="lg" className="lg:col-span-3">
            {submitted ? (
              <div className="py-12 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal-accent-light text-teal-accent mb-4">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-deep">Thank You for Your Feedback</h3>
                <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto">
                  Your message has been received. Our clinical leadership team reviews all submissions. If you requested a reply, we will follow up with you within one business day at <strong>{form.email}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setForm(initialState);
                  }}
                  className="btn-secondary mt-6 text-xs"
                >
                  Submit Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* CATEGORY / REASON SELECTOR */}
                <div className="mb-5">
                  <label className="form-label font-bold text-slate-800">
                    What is the nature of your message?
                  </label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 mt-2">
                    {[
                      { id: 'feedback', label: '💬 General Feedback / Suggestion' },
                      { id: 'concern', label: '⚠️ Patient Concern / Care Issue' },
                      { id: 'question', label: '❓ Visit or Healthie EMR Question' },
                      { id: 'billing', label: '💳 Receipt or Billing Question' },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => handleChange('category', cat.id)}
                        className={`rounded-xl border p-2.5 text-left text-xs font-semibold transition-all ${
                          form.category === cat.id
                            ? 'border-teal-accent bg-[#e7f6fd] text-teal-accent shadow-xs'
                            : 'border-slate-200 bg-white/60 text-slate-700 hover:bg-white'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 mb-4">
                  <div>
                    <label htmlFor="contact-name" className="form-label">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      className="form-input"
                      placeholder="Jane Doe"
                      value={form.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && <p className="form-error">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="form-label">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      className="form-input"
                      placeholder="jane@example.com"
                      value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && <p className="form-error">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 mb-4">
                  <div>
                    <label htmlFor="contact-phone" className="form-label">
                      Phone Number <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      className="form-input"
                      placeholder="(555) 000-0000"
                      value={form.phone || ''}
                      onChange={(e) => handleChange('phone', e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-ref" className="form-label">
                      Visit or Service Ref <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      id="contact-ref"
                      type="text"
                      className="form-input"
                      placeholder="e.g. UTI visit on Tuesday"
                      value={form.visitReference || ''}
                      onChange={(e) => handleChange('visitReference', e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="contact-message" className="form-label">
                    Your Feedback or Concern <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    className="form-input resize-none"
                    placeholder={
                      form.category === 'concern'
                        ? 'Please describe the issue or concern you experienced. What happened, and how can we make it right?'
                        : 'Share your thoughts, suggestions, or feedback on your Curbside experience...'
                    }
                    value={form.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && <p className="form-error">{errors.message}</p>}
                </div>

                {/* FOLLOW UP PREFERENCE */}
                <div className="mb-6 rounded-xl border border-slate-200/80 bg-slate-50/60 p-3.5">
                  <span className="block text-xs font-bold text-slate-700 mb-2">
                    How would you like us to respond?
                  </span>
                  <div className="flex flex-wrap gap-4 text-xs text-slate-700">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="followUp"
                        checked={form.followUp === 'email'}
                        onChange={() => handleChange('followUp', 'email')}
                        className="text-teal-accent"
                      />
                      <span>Reply via Email</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="followUp"
                        checked={form.followUp === 'phone'}
                        onChange={() => handleChange('followUp', 'phone')}
                        className="text-teal-accent"
                      />
                      <span>Phone Call if possible</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="followUp"
                        checked={form.followUp === 'none'}
                        onChange={() => handleChange('followUp', 'none')}
                        className="text-teal-accent"
                      />
                      <span>Feedback only (no response needed)</span>
                    </label>
                  </div>
                </div>

                <button type="submit" className="btn-primary w-full text-sm font-bold py-3">
                  Submit Feedback or Concern
                </button>
              </form>
            )}
          </GlassCard>
        </div>
      </div>
    </PageShell>
  );
}
