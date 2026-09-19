import { Link } from 'react-router-dom';
import type { Treatment } from '../types';
import GlassCard from './GlassCard';
import { AsyncIcon, VideoIcon } from './icons';

interface TreatmentCardProps {
  treatment: Treatment;
}

export default function TreatmentCard({ treatment }: TreatmentCardProps) {
  const isVideo = treatment.mode === 'video';

  return (
    <GlassCard interactive accent padding="md" className="flex flex-col">
      <div className="mb-4 flex flex-wrap gap-2">
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

      <h3 className="text-base font-bold text-slate-deep">{treatment.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">
        {treatment.description}
      </p>

      {/* Direct users to the booking page with treatment details passed via state */}
      <Link
        to={`/booking?treatment=${treatment.id}`}
        className="btn-primary mt-5 w-full text-center"
        state={{ treatment }}
      >
        Start visit
      </Link>
    </GlassCard>
  );
}