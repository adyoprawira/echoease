# UQ Student Well-being React Frontend

A modern React + Tailwind CSS frontend for the UQ Student Well-being platform.

## Quick Start

### Prerequisites
- **Node.js** 18+ (download from https://nodejs.org/)
- **npm** (comes with Node.js)

### Installation & Running

1. **Navigate to the project folder:**
   ```bash
   cd Code/frontend/react-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser** to the URL shown in the terminal (usually `http://localhost:5173`)

## Available Routes

- `/` — Well-being Landing Page (home)
- `/courses` — Courses & Deadlines Dashboard
- `/community` — Community Forum (placeholder)
- `/chat` — Private Chat (placeholder)
- `/resources` — Resources (placeholder)

## Building for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

## Tech Stack

- **React 18** — UI library
- **Tailwind CSS 4** — Utility-first styling
- **Vite** — Fast build tool
- **React Router 6** — Client-side routing
- **Lucide React** — Icons

## Project Structure

```
src/
├── App.jsx              # Route configuration
├── main.jsx             # Entry point
├── styles.css           # Global styles & Tailwind theme
├── layout/
│   ├── MainLayout.jsx   # Persistent layout shell
│   ├── TopNav.jsx       # Header with Quick Exit
│   └── Sidebar.jsx      # Navigation sidebar
├── pages/
│   ├── WellbeingLandingPage.jsx
│   ├── CoursesPage.jsx
│   └── PlaceholderPage.jsx
└── components/
    └── ProgressRing.jsx
```

## Notes for Team

- The sidebar remains persistent while the main content area changes based on the route
- Mobile: sidebar collapses to an icon rail
- Desktop: sidebar is full width
- All styling uses Tailwind utilities (no custom CSS files needed except `styles.css`)
- Icons are from lucide-react

## Need Help?

- Check `package.json` for all dependencies
- Tailwind docs: https://tailwindcss.com/docs
- React Router docs: https://reactrouter.com/
- Lucide icons: https://lucide.dev/
