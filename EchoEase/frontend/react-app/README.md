# EchoEase React MVP Prototype

This is the active React prototype for the student wellbeing journey. It is intentionally labelled
as a simulation: it does not connect a user to a live counsellor, submit bookings, or store chat
and journal text.

## Run Locally

```bash
npm install
npm run dev
npx vitest run
npm run build
```

## Active Routes

- `/`: landing page with direct Community, Chat, Resources, and urgent-help actions.
- `/community`: demo community feed with in-page anonymous display-name post creation.
- `/resources`: resource directory and verified urgent phone actions.
- `/chat`: fictional scripted-guide selection and booking interaction preview.
- `/queue/:guideId`: honest queue preview with no real queue state.
- `/chat-session/:guideId`: scripted chat/resource suggestion simulation.

Unknown routes redirect to the landing page. Invalid queue/chat guide identifiers render a
recoverable unavailable state.

## Safety Boundaries

- Emergency contacts are centralised in `src/data/mvpContent.js` and linked to official sources.
- Community posts remain in page state and are not submitted to the backend in this frontend MVP.
- Chat text remains in page state and is cleared when a preview is ended.
- Queue and booking interactions are demonstrations only.
- No encryption, guaranteed anonymity, live support, or clinical assessment is claimed.

See `HEURISTIC_AUDIT.md` for the Nielsen-style audit and remaining parity gaps.
