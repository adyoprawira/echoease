import { Bell, CircleUserRound } from "lucide-react";

function TopNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-line/80 bg-white/90 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        <p className="text-lg font-extrabold tracking-tight text-brand md:text-[1.35rem]">
          UQ Student Well-being
        </p>

        <div className="flex items-center gap-3">
          <a
            href="https://www.google.com"
            className="rounded-full bg-brand px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-brand-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            Quick Exit
          </a>
          <button
            type="button"
            aria-label="Notifications"
            className="grid h-9 w-9 place-items-center rounded-full border border-line bg-paper text-slate-600 transition hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <Bell size={16} />
          </button>
          <button
            type="button"
            aria-label="Open profile"
            className="grid h-9 w-9 place-items-center rounded-full bg-[#ff8a6e] text-white shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <CircleUserRound size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default TopNav;
