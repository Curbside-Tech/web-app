export type HealthieIntakePayload = {
  firstName: string;
  lastName: string;
  email: string;
  answers: Record<string, string | string[]>;
};

export async function connectIntakeToHealthie(payload: HealthieIntakePayload) {
  let response: Response;
  try {
    response = await fetch('/api/healthie-intake', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  } catch {
    throw new Error('The local Healthie server route is unavailable. Restart the app with npm run dev.');
  }
  const contentType = response.headers.get('content-type') ?? '';
  const result = contentType.includes('application/json') ? await response.json() as { redirectUrl?: string; message?: string } : null;
  if (response.ok && result?.redirectUrl) return window.location.assign(result.redirectUrl);
  if (result?.message) throw new Error(result.message);
  throw new Error('Your secure Healthie connection is unavailable. Please contact the care team or try again shortly.');
}
