import { useSearchParams, useLocation } from 'react-router-dom';
import DynamicTriage from '../pages/DynamicTriage';
import PageShell from './layout/PageShell';

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  // Extract treatment ID from query string, router state object, or direct state value
  const treatmentId =
    searchParams.get('treatment') ||
    location.state?.treatment?.id ||
    location.state?.treatmentId ||
    'uti'; // Default fallback

  return <PageShell><DynamicTriage treatmentId={treatmentId} /></PageShell>;
}
