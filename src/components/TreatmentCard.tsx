import { Link } from 'react-router-dom';
import type { Treatment } from '../types';
import GlassCard from './GlassCard';
import { AsyncIcon, VideoIcon } from './icons';

interface TreatmentCardProps {
  treatment: Treatment;
}

export default function TreatmentCard({ treatment }: TreatmentCardProps) {
  const isVideo = treatment.mode === 'video';
  const careLabels: Record<string, string> = {
    uti: 'Urinary health',
    uri: 'Respiratory care',
    sti: 'Private sexual health',
  };
  const careIndex: Record<string, string> = { uti: '01', uri: '02', sti: '03' };
  const careNotes: Record<string, string> = {
    uti: 'A focused check-in for faster next steps.',
    uri: 'Answer on your time, from wherever you are.',
    sti: 'Discreet care with clear next steps.',
  };

  return (
    <GlassCard interactive accent padding="md" className={`treatment-card treatment-card--${treatment.id} flex flex-col`}>
      <div className="treatment-card-cover" aria-hidden="true">
        <span className="treatment-card-cover-line" />
        <span className="treatment-card-cover-label">{careLabels[treatment.id] ?? 'Curbside care'}</span>
        <span className="treatment-card-index">{careIndex[treatment.id] ?? '01'}</span>
        <span className="treatment-card-cover-mark"><i /><i /></span>
      </div>
      <div className="treatment-card-body flex flex-1 flex-col">
        <div className="treatment-card-top">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
            isVideo
              ? 'bg-sky-100/90 text-sky-700'
              : 'bg-teal-accent-light/90 text-teal-accent'
          }`}
        >
          {isVideo ? <VideoIcon /> : <AsyncIcon />}
          {isVideo ? 'Video' : 'Async'}
        </span>
        {treatment.subscriptionRequired && (
          <span className="rounded-full bg-violet-100/90 px-2.5 py-1 text-xs font-semibold text-violet-700">
            Subscription
          </span>
        )}
        </div>
        <h3 className="treatment-card-title">{treatment.name}</h3>
        <p className="treatment-card-description">{treatment.description}</p>

        <div className="treatment-card-note">{careNotes[treatment.id] ?? 'Private care with clear next steps.'}</div>
        <div className="treatment-card-meta"><span>Private intake</span><i /> <span>Clinician review</span></div>

        {/* Direct users to the booking page with treatment details passed via state */}
        <Link
          to={`/booking?treatment=${treatment.id}`}
          className="treatment-card-button"
          state={{ treatment }}
        >
          Start private visit <span aria-hidden="true">→</span>
        </Link>
      </div>
    </GlassCard>
  );
}
