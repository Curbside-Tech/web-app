import { AlertTriangle } from './icons';

export default function EmergencyBanner() {
  return (
    <div role="alert">
      <div className="flex items-start gap-3 rounded-2xl border border-amber-200/50 bg-gradient-to-r from-amber-50/80 to-orange-50/60 px-4 py-3 backdrop-blur-md sm:px-5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-100/80">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
        </div>
        <p className="text-sm leading-relaxed text-amber-900/90">
          <strong className="font-semibold">Not for emergencies.</strong> If you are experiencing a medical
          emergency, call{' '}
          <a href="tel:911" className="font-bold text-amber-800 underline decoration-amber-400/60 underline-offset-2">
            911
          </a>{' '}
          or go to your nearest emergency room immediately.
        </p>
      </div>
    </div>
  );
}
