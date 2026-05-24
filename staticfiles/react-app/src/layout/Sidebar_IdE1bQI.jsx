import {
  BookOpen,
  CircleHelp,
  Headset,
  Home,
  MessageSquare,
  Settings,
  Users,
  Heart
} from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/community", label: "Community", icon: Users },
  { to: "/chat", label: "Chat", icon: MessageSquare },
  { to: "/resources", label: "Resources", icon: BookOpen }
];

function itemClassName(isActive) {
  return [
    "group flex items-center justify-center gap-3 rounded-xl px-2 py-2.5 text-sm font-semibold transition md:justify-start md:px-3",
    isActive
      ? "bg-brand-soft text-brand"
      : "text-slate-600 hover:bg-[#f5f1fb] hover:text-brand"
  ].join(" ");
}

function Sidebar() {
  const location = useLocation();
  const showSupportCta = location.pathname === "/courses";

  return (
    <aside className="flex w-[72px] shrink-0 flex-col border-r border-line bg-white px-2 py-4 md:w-64 md:px-4 md:py-5">
      <div>
        <div className="mb-4 flex items-center justify-center gap-3 md:justify-start">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand text-white">
            <Heart size={18} />
          </div>
          <div className="hidden md:block">
            <p className="text-base font-extrabold leading-tight text-brand">Well-being Hub</p>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Student Support
            </p>
          </div>
        </div>

        <nav className="space-y-1" aria-label="Primary Navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.end}
                className={({ isActive }) => itemClassName(isActive)}
              >
                <Icon size={16} className="opacity-85" />
                <span className="hidden md:inline">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto space-y-4">
        {showSupportCta && (
          <Link
            to="/"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-3 py-3 text-sm font-bold text-white shadow-[0_10px_22px_rgba(73,27,112,0.25)] transition hover:-translate-y-0.5 hover:bg-brand-strong"
          >
            <Headset size={16} />
            <span className="hidden md:inline">Support &amp; Well-being</span>
          </Link>
        )}

        <div className="space-y-1 border-t border-line pt-3">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-[#f7f4fb] hover:text-brand md:justify-start"
          >
            <Settings size={15} />
            <span className="hidden md:inline">Settings</span>
          </button>
          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-[#f7f4fb] hover:text-brand md:justify-start"
          >
            <CircleHelp size={15} />
            <span className="hidden md:inline">Help</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
