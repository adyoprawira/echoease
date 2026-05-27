# MVP Implementation 

## Summary

A basic but functional implementation of the MVP. This is a working piece of software (not just a prototype) that can be run locally. The deployed instance is available at:

https://tired-brooks-adyoprawira-e009a356.koyeb.app/

## How to run locally

Note: commands assume a Windows PowerShell environment. Adjust for other shells as needed.

### Backend (Django)

1. Open a terminal in `EchoEase/backend/`.
2. Create and activate a virtual environment:

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
```

3. Install dependencies and apply migrations:

```powershell
pip install -r requirements.txt
python manage.py migrate
```

4. (Optional) Seed the database if fixtures exist:

```powershell
# python manage.py loaddata <fixture.json>
```

5. Run the development server:

```powershell
python manage.py runserver
```

The backend will usually be available at `http://127.0.0.1:8000/`.

### Frontend (Static HTML)

To run the frontend locally, simply open the `blackboard.html` page in your browser:

1. In your file explorer, double-click to open:

`EchoEase/frontend/Landing Page/blackboard.html`

2. Or open the file directly from the browser via `File → Open` and select the `blackboard.html` file above.

No `npm` or build step is required. If the static page needs to call the local backend, ensure the backend is running at `http://127.0.0.1:8000/` and update any API URLs in the HTML/JS if necessary.

## Features

- `Blackboard Support Button`: one‑click entry from Blackboard that opens the wellbeing landing page (the primary low‑friction access point).
- `Landing Page`: simple three‑option landing page that routes users to the appropriate support flow (e.g., Resources, Community, Professional help).
- `Anonymous Community Forum`: read and post anonymously; a lightweight moderated forum for peer support and shared experiences.
- `Quick Exit / Safety`: a quick‑exit button that immediately redirects back to Blackboard or a neutral site.
- `Resources & Emergency Contacts`: curated emergency and self‑help resources accessible from the landing page.
- `Private / Professional Path`: entry point for escalation to professional support (e.g., booking or links to counselling services).

(This reflects the project MVP documented in `Documents/Iteration 3/MVP_definition.md` — the product is focused on embedded Blackboard access and a static landing experience rather than React-based audio transcription features.)

## Verification steps

1. Open `EchoEase/frontend/Landing Page/blackboard.html` in a browser — confirm the Blackboard-style UI renders.
2. From `blackboard.html`, click the `Support` / `Go to Blackboard` link (or open `wellbeing-landing.html`) and verify the landing page loads.
3. Open the Community Forum at `EchoEase/frontend/Community Forum/pages/community.html` and confirm you can view posts and the quick‑exit button is present and works.
4. Verify the Resources page shows emergency contacts and curated links.
5. If the project includes a backend route for escalation, confirm the backend is running at `http://127.0.0.1:8000/` and any links to professional support open correctly.
6. Compare behaviour with the deployed instance at the link above.
