 # Curbside Health

 Curbside Health is a React web app prototype for clinician-led virtual care. It includes care information, guided symptom check-ins, appointment booking, and account entry points.
## Features

- Browse treatment information for urinary tract infections (UTI), upper respiratory infections (URI), and STI exposure.
- Complete a branching symptom check-in before booking.
- Continue to an embedded Healthie appointment form for the selected treatment.
- Explore how care works, FAQs, contact details, and the About, Privacy, and Terms pages.
- Use responsive sign-in and sign-up screens.
 
## Getting started
Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Vite prints the local development URL in the terminal when the server starts.
## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Run the TypeScript project build and create the production bundle. |
| `npm run preview` | Serve the production bundle locally after building. |
| `npm run lint` | Run Oxlint. |

## App routes
| Path | Page |
| --- | --- |
| `/` | Home |
| `/how-it-works` | Care process |
| `/treatments` | Treatment options |
| `/booking?treatment=uti` | Guided check-in and booking (also supports `uri` and `sti`) |
| `/about` | About Curbside Health |
| `/contact` | Contact |
| `/faq` | Frequently asked questions |
| `/sign-in` | Sign-in screen |
| `/sign-up` | Sign-up screen |
| `/privacy` | Privacy information |
| `/terms` | Terms |

## Tech stack

- React 19 and TypeScript
- Vite 8
- React Router 7
- Tailwind CSS 4
- Oxlint

## Project structure

```text
src/
  components/   Shared UI and layout components
  data/         Treatment, FAQ, and symptom-check-in content
  pages/        Route-level screens
  utils/        Shared utilities, including validation
  App.tsx       Application routes
  main.tsx      Client entry point
```

## Integration notes

Booking forms are embedded from Healthie staging URLs configured with the treatment data. Replace these with the intended environment's URLs before production use. The app currently contains client-side pages and interactions; connect authentication, data storage, and any production APIs before treating it as a live care service.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
