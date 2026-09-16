import PageShell from '../components/layout/PageShell';
import GlassCard from '../components/GlassCard';

const sections = [
  {
    title: '1. Information We Collect',
    content:
      'We collect personal information you provide during registration (name, email, phone, date of birth, address) and health information you share during consultations. We also collect usage data such as device type and browser.',
  },
  {
    title: '2. How We Use Your Information',
    content:
      'Your information is used to provide telehealth services, connect you with licensed physicians, process payments, and improve our platform. We do not sell your personal or health information to third parties.',
  },
  {
    title: '3. HIPAA Compliance',
    content:
      'Curbside Health is committed to protecting your health information in accordance with the Health Insurance Portability and Accountability Act (HIPAA). We implement administrative, physical, and technical safeguards to protect PHI.',
  },
  {
    title: '4. Data Security',
    content:
      'All data is transmitted over encrypted connections (TLS/SSL). Health records are stored in HIPAA-compliant infrastructure with access controls and audit logging.',
  },
  {
    title: '5. Information Sharing',
    content:
      'We share your health information only with the physicians treating you, pharmacies fulfilling prescriptions, and service providers who assist in operating our platform under strict confidentiality agreements.',
  },
  {
    title: '6. Your Rights',
    content:
      'You have the right to access, correct, or request deletion of your personal information. You may also request a copy of your medical records at any time by contacting support@curbsidehealth.com.',
  },
  {
    title: '7. Cookies and Analytics',
    content:
      'We use essential cookies for authentication and session management. Analytics cookies help us understand usage patterns — you may opt out through your browser settings.',
  },
  {
    title: '8. Data Retention',
    content:
      'We retain your health records as required by applicable law and medical record retention standards. Account information is retained for the duration of your account plus any legally required period.',
  },
  {
    title: '9. Children\'s Privacy',
    content:
      'Curbside Health is not intended for individuals under 18 years of age. We do not knowingly collect information from minors.',
  },
  {
    title: '10. Contact Us',
    content:
      'For privacy-related inquiries, contact our Privacy Officer at privacy@curbsidehealth.com.',
  },
];

export default function Privacy() {
  return (
    <PageShell>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="text-center">
          <h1 className="section-heading">Privacy Policy</h1>
          <p className="section-subheading">Last updated: August 2026</p>
        </div>
        <GlassCard padding="lg" className="mt-10">
          <div className="space-y-6">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-base font-semibold text-slate-800">{section.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{section.content}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </PageShell>
  );
}
