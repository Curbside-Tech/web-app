import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import PageShell from './layout/PageShell';
import { treatments } from '../data/treatments';

const bookingThemes = {
  uti: { label: 'Urinary care', className: 'booking-page--uti' },
  uri: { label: 'Respiratory care', className: 'booking-page--uri' },
  'sti-exposure': { label: 'Private sexual health care', className: 'booking-page--sti' },
};

export default function BookingForm() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const treatmentId = searchParams.get('treatment') || location.state?.treatment?.id || location.state?.treatmentId;
  const selectedTreatment = treatments.find((treatment) => treatment.id === treatmentId);
  const iframeUrl = selectedTreatment?.healthieUrl;
  const theme = selectedTreatment ? bookingThemes[selectedTreatment.id as keyof typeof bookingThemes] : undefined;
  useEffect(() => setIsLoading(true), [iframeUrl]);

  return <PageShell><main className={`booking-desk ${theme?.className ?? ''}`}><div className="mx-auto max-w-5xl px-4 py-7 sm:px-6 lg:py-10"><div className="booking-desk-nav"><Link to={`/treatment-questionnaire?treatment=${treatmentId ?? ''}`}>← Your answers</Link><span>Secure care checkout</span></div><header className="booking-hero"><div><p>Almost there</p><h1>Your care time,<br />made simple.</h1><span>Your questionnaire is saved. Choose an appointment to send it securely to your clinician.</span></div><div className="booking-receipt"><span>Questionnaire</span><strong>Received ✓</strong><small>{theme?.label ?? 'Personalized care'}</small><i>⌁ Securely saved</i></div></header><section className="booking-desk-workspace"><aside className="booking-desk-steps"><span className="booking-desk-brand">CURBSIDE</span><ol><li className="is-complete"><b>01</b><div><strong>Tell us what’s going on</strong><small>Questionnaire completed</small></div></li><li className="is-active"><b>02</b><div><strong>Choose a care time</strong><small>Secure appointment booking</small></div></li><li><b>03</b><div><strong>Clinician review</strong><small>We’ll follow up in your portal</small></div></li></ol><div className="booking-desk-care"><span>Care request</span><strong>{selectedTreatment?.name ?? 'Consultation'}</strong><small>Private · encrypted · reviewed</small></div></aside><section className="booking-provider"><div className="booking-provider-head"><div><span>Healthie secure booking</span><h2>Choose a time that works for you.</h2></div><p>⌁ Encrypted</p></div>{iframeUrl ? <div className="booking-provider-embed">{isLoading && <div className="booking-loader"><span /><p>Opening secure appointment booking…</p></div>}<iframe key={iframeUrl} src={iframeUrl} onLoad={() => setIsLoading(false)} className="booking-embed" title={`${selectedTreatment?.name || 'Healthie'} Booking Form`} /></div> : <div className="booking-missing"><h3>Choose a treatment first</h3><p>Return to treatments to select the care you need.</p><Link to="/treatments" className="btn-primary mt-5">View treatments</Link></div>}<footer className="booking-desk-footer">Your appointment and questionnaire are securely managed by <a href="https://gethealthie.com" target="_blank" rel="noopener noreferrer">Healthie</a>.</footer></section></section></div></main></PageShell>;
}
