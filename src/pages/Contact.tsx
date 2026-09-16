import { useState, type FormEvent } from 'react';
import PageShell from '../components/layout/PageShell';
import GlassCard from '../components/GlassCard';
import type { ContactFormState, FormErrors } from '../types';

const initialState: ContactFormState = {
  name: '',
  email: '',
  message: '',
};

function validate(values: ContactFormState): FormErrors<ContactFormState> {
  const errors: FormErrors<ContactFormState> = {};

  if (!values.name.trim()) {
    errors.name = 'Name is required';
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!values.message.trim()) {
    errors.message = 'Message is required';
  } else if (values.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
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
    // TODO: Integrate with contact/support API
    setSubmitted(true);
  };

  return (
    <PageShell>
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="text-center">
          <span className="section-eyebrow">Get in touch</span>
          <h1 className="section-heading">Contact us</h1>
          <p className="section-subheading">We&apos;re here to help. Send us a message anytime.</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            <GlassCard padding="md">
              <h2 className="text-sm font-semibold text-slate-800">Support email</h2>
              <a
                href="mailto:support@curbsidehealth.com"
                className="mt-1 block text-sm text-teal-accent hover:underline"
              >
                support@curbsidehealth.com
              </a>
            </GlassCard>
            <GlassCard padding="md">
              <h2 className="text-sm font-semibold text-slate-800">Support hours</h2>
              <p className="mt-1 text-sm text-slate-600">Monday – Friday</p>
              <p className="text-sm text-slate-600">9:00 AM – 6:00 PM ET</p>
            </GlassCard>
            <GlassCard padding="md">
              <h2 className="text-sm font-semibold text-slate-800">Response time</h2>
              <p className="mt-1 text-sm text-slate-600">
                We typically respond within one business day.
              </p>
            </GlassCard>
          </div>

          <GlassCard padding="lg" className="lg:col-span-3">
            {submitted ? (
              <div className="py-8 text-center">
                <p className="text-lg font-semibold text-teal-accent">Message sent!</p>
                <p className="mt-2 text-sm text-slate-600">
                  Thank you for reaching out. We&apos;ll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-4">
                  <label htmlFor="contact-name" className="form-label">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    className="form-input"
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <p className="form-error">{errors.name}</p>}
                </div>

                <div className="mb-4">
                  <label htmlFor="contact-email" className="form-label">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    className="form-input"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <p className="form-error">{errors.email}</p>}
                </div>

                <div className="mb-6">
                  <label htmlFor="contact-message" className="form-label">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    className="form-input resize-none"
                    value={form.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && <p className="form-error">{errors.message}</p>}
                </div>

                <button type="submit" className="btn-primary w-full">
                  Send message
                </button>
              </form>
            )}
          </GlassCard>
        </div>
      </div>
    </PageShell>
  );
}
