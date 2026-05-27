# Active React MVP Heuristic Audit

Scope: `EchoEase/frontend/react-app` is treated as the active frontend for this audit. It is
explicitly labelled as a prototype simulation; the separate static frontend was not changed in
this task.

| # | Heuristic | Result | Evidence and implemented control |
|---|---|---|---|
| 1 | Visibility of system status | PASS | Community result/save status in `src/pages/CommunityPage.jsx`; booking confirmation in `src/pages/ProfessionalSelectionPage.jsx`; queue and ended-chat status in `src/pages/QueuePage.jsx` and `src/pages/ChatPage.jsx`. |
| 2 | Match with real world | PASS | Verified urgent contacts are centralised in `src/data/mvpContent.js` and displayed by `src/components/EmergencyContacts.jsx`; simulated guide wording replaces realistic practitioner presentation. |
| 3 | User control and freedom | PASS | Queue leave and chat end confirmations are implemented; chat clears transcript on end; dialogs close with Escape/backdrop and restore focus via `src/components/AccessibleModal.jsx`. |
| 4 | Consistency and standards | PASS | Shared primary routes, consistent Quick Exit destination, shared urgent-contact component, and mobile navigation are implemented in layout components and `src/styles.css`. |
| 5 | Error prevention | PASS | Community blocks empty/contact-detail posts; crisis terms bypass normal simulated chat output; queue does not present invented wait-time behaviour. |
| 6 | Recognition rather than recall | PASS | Landing cards link directly to Community, Chat, and Resources; urgent contacts remain visible on Resources and Queue pages; selected guide is carried into chat. |
| 7 | Flexibility and efficiency | PASS | Direct urgent-help CTA, starter resource prompts, and direct route recovery links support short paths without hiding prototype limitations. |
| 8 | Aesthetic and minimalist design | PASS | Existing card/pill visual language is retained while unsupported live-status counts, fake event timing, and unused placeholder pages are removed from active routes. |
| 9 | Error recovery | PASS | Invalid guide routes show recoverable unavailable states; form validation is inline; confirmation modals allow cancel/continue paths. |
| 10 | Help and documentation | PASS | Resources page gives official-source links; privacy/prototype limitations are stated in chat and selection pages; this checklist documents MVP boundaries. |
| 11 | Accessibility and inclusivity | PASS | Skip link, named mobile navigation, named phone links, labelled inputs/dialogs, focus trapping/restoration, visible focus styling, and reduced-motion support are implemented. |
| 12 | Privacy, safety and trust | PASS | No encryption/anonymity guarantees; chat is page-memory only; urgent assistance is clearly separated from simulation; community local storage behaviour and backend exclusions are stated. |

## Behavioural Coverage

- `src/__tests__/App.test.jsx`: route navigation, emergency CTA, Quick Exit, and skip link.
- `src/__tests__/ProfessionalSelectionPage.test.jsx`: guide carry-over, queue routing, booking
  confirmation, emergency modal, and dialog focus loop.
- `src/__tests__/CriticalFlows.test.jsx`: community validation/local status, emergency call links,
  queue leave confirmation, crisis short-circuit, non-crisis suggestions, chat end clearing, and
  invalid-route recovery.
- Other existing component tests continue to cover layout and visual components.

## Remaining Parity Gaps

- Community posting in React remains page-session-only. It is not yet connected to the new
  backend anonymous post/report endpoints.
- Emergency contacts are currently present in both React constants and backend seed data. A
  production integration should read them from the API and define offline/error behaviour.
- Queue, booking, and chat are intentionally non-final simulations. There is no live service,
  appointment submission, or chat storage.
- Authentication, moderation response operations, data retention/deletion policy, deployment
  security controls, and abuse monitoring are required before accepting sensitive production data.
- `CoursesPage.jsx` remains in source for earlier component work but is no longer an active route
  in the wellbeing MVP.
