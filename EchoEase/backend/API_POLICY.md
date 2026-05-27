# Minimal Safe API Policy

## Included Endpoints

- `GET /api/emergency/` and `GET /api/emergency/{id}/`: public read-only emergency resource directory.
- `GET /api/posts/`, `GET /api/posts/{id}/`, and `POST /api/posts/`: anonymous community posts.
- `POST /api/reports/`: records a concern about a post. No active moderation or response workflow is configured.

## Validation And Privacy

- Forum posts are always exposed as `Anonymous Student`; the API does not accept a public author name.
- Post and report text reject HTML markup, email addresses, and phone numbers.
- Tags are limited to five plain-text labels.
- Anonymous post creation is throttled to 5 submissions per hour per originating network identifier.
- Report creation is throttled to 10 submissions per hour per originating network identifier.

## Explicitly Excluded

- Chat messages, summaries, inferred concerns, queues, appointment requests, and journal entries have no API endpoint or database model in this MVP.
- A production deployment must define authentication, privacy notices, retention/deletion policies, moderation operations, abuse monitoring, and incident response before accepting sensitive data.
