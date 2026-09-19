# Healthie intake handoff

The site sends a completed intake to `POST /api/healthie-intake`. The server finds or creates the Healthie patient under `HEALTHIE_PROVIDER_ID`, saves answers to the configured Healthie Intake Form, and returns the patient's password-setup link. The browser redirects to that link immediately. For new patients, Healthie also sends its welcome email because the integration enables the welcome email.

Create an Intake Form in Healthie Form Builder, then place its form ID and every corresponding question CustomModule ID in server-side environment variables. The question keys are in `src/data/intake.ts`.

For the Healthie sandbox, set `HEALTHIE_GRAPHQL_URL` to `https://staging-api.gethealthie.com/graphql`. Use `https://api.gethealthie.com/graphql` only in production. Sandbox and production IDs are different and cannot be shared.

Never expose the Healthie API key, provider ID, form ID, or question IDs to the browser.

## Deploy before testing the automated flow

`api/healthie-intake.js` is a serverless API route. It does not run with `npm run dev` alone, and a static hosting service cannot execute it. Deploy the `web-app` folder to a serverless host such as Vercel, then add all `HEALTHIE_*` variables to that host's server environment and redeploy.

When a new patient completes the questionnaire, the route creates the Healthie patient with `dont_send_welcome: false`. Healthie sends the account invitation email. The route also redirects the browser to Healthie's one-time `set_password_link` when it is available; choosing a password from either route finishes the patient activation and opens their portal.
