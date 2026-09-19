# Healthie intake handoff

The site sends a completed intake to `POST /api/healthie-intake`. The server finds or creates the Healthie patient under `HEALTHIE_PROVIDER_ID`, saves answers to the configured Healthie Intake Form, then returns the patient's password-setup link. The browser immediately redirects to that link.

Create an Intake Form in Healthie Form Builder, then place its form ID and every corresponding question CustomModule ID in server-side environment variables. The question keys are in `src/data/intake.ts`.

Never expose the Healthie API key, provider ID, form ID, or question IDs to the browser.
