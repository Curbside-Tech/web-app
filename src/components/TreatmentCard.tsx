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
    uri: 'Everyday respiratory care',
    'sti-exposure': 'Private sexual health',
  };

  return (
    <GlassCard interactive accent padding="md" className={`treatment-card treatment-card--${treatment.id} flex flex-col`}>
      <div className="treatment-card-orbit" aria-hidden="true"><i /><i /><span>✦</span></div>
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
      <p className="treatment-card-kicker">{careLabels[treatment.id] ?? 'Curbside care'}</p>
      <h3 className="treatment-card-title">{treatment.name}</h3>
      <p className="treatment-card-description">
        {treatment.description}
      </p>

      <div className="treatment-card-meta"><span>Private intake</span><i /> <span>Clinician review</span></div>

      {/* Direct users to the booking page with treatment details passed via state */}
      <Link
        to={`/treatment-questionnaire?treatment=${treatment.id}`}
        className="treatment-card-button"
        state={{ treatment }}
      >
        Start visit
      </Link>
    </GlassCard>
  );
}
