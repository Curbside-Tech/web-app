import { useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { treatments } from '../data/treatments';

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  // Extract treatment ID from query string, router state object, or direct state value
  const treatmentId =
    searchParams.get('treatment') ||
    location.state?.treatment?.id ||
    location.state?.treatmentId;

  const selectedTreatment = treatments.find((t) => t.id === treatmentId);

  const iframeUrl = selectedTreatment?.healthieUrl;

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4 text-center text-slate-800">
        {selectedTreatment ? `Booking: ${selectedTreatment.name}` : 'Book Consultation'}
      </h2>

      <div className="relative w-full min-h-[600px] rounded-lg overflow-hidden border border-gray-100 shadow-sm">
        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-600"></div>
          </div>
        )}

        <iframe
          key={iframeUrl}
          src={iframeUrl}
          onLoad={() => setIsLoading(false)}
          style={{
            width: '100%',
            height: '100%',
            minHeight: '600px',
            border: 'none',
          }}
          title={`${selectedTreatment?.name || 'Healthie'} Booking Form`}
        />
      </div>

      <p className="text-center mt-3 text-sm text-gray-500">
        Booking Provided by{' '}
        <a
          href="https://gethealthie.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-700 transition-colors"
        >
          Healthie
        </a>
      </p>
    </div>
  );
}