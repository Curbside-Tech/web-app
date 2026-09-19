export type HealthieIntakePayload = {
  firstName: string;
  lastName: string;
  email: string;
  answers: Record<string, string | string[]>;
};

export async function connectIntakeToHealthie(payload: HealthieIntakePayload) {
  const response = await fetch('/api/healthie-intake', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  const result = await response.json() as { redirectUrl?: string; message?: string };
  if (response.ok && result.redirectUrl) return window.location.assign(result.redirectUrl);
  // Allows a temporary direct handoff before the provider-side API connection is configured.
  // This cannot create or connect a patient record; it only opens the configured Healthie sign-in destination.
  const fallback = import.meta.env.VITE_HEALTHIE_SIGN_IN_URL || 'https://www.gethealthie.com/';
  window.location.assign(fallback);
}
