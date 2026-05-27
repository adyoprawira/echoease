# React MVP Behavioural Test Plan

Run automated checks with:

```bash
npx vitest run
npm run build
```

## Automated Critical Flows

- Landing cards and `Get Help Now` route to implemented pages.
- Quick Exit, skip-link, mobile navigation naming, and unavailable controls are exposed correctly.
- Community search works, empty/contact-detail validation is inline, and session-only save wording is displayed.
- Resources expose call links for `000`, `13 11 14`, and `1300 851 998`.
- Selected fictional guide is carried into chat or queue.
- Queue is labelled as simulation and requires confirmation before leaving.
- Booking modal traps/restores focus and confirms that no appointment was submitted.
- Crisis-related chat input immediately reveals urgent options without a normal simulated reply.
- Non-crisis prompt output uses resource wording; ending chat clears the transcript.
- Unknown guide routes provide a recovery link.

## Manual Checks

- At narrow viewport width, bottom navigation remains visible and all labels fit without overlap.
- With reduced-motion enabled, hover/transitions do not animate noticeably.
- Keyboard-only navigation reaches Quick Exit and urgent-help actions early, and modal Tab cycling stays inside the dialog.
- Telephone links and official-source links are correct on a real device/browser.

## Excluded From This Prototype

- Live counselling or real queue status.
- Backend-connected React community publishing/reporting.
- Booking submission.
- Chat, journal, summary, or inferred-concern storage.
