import {
  ArrowRight,
  BookOpenText,
  MessageCircle,
  Siren,
  Sparkles,
  Waves
} from "lucide-react";
import { Link } from "react-router-dom";
import ProgressRing from "../components/ProgressRing";

function Pill({ children, tone = "soft" }) {
  const toneMap = {
    soft: "bg-[#deecdf] text-[#38573f]",
    mint: "bg-[#bcf1ec] text-[#236f6a]"
  };

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${toneMap[tone]}`}>
      {children}
    </span>
  );
}

function WellbeingLandingPage() {
  return (
    <section className="mx-auto w-full max-w-5xl space-y-4 pb-6 md:space-y-5">
      <header className="space-y-2 pt-1">
        <p className="inline-flex rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand">
          MVP prototype: simulated support interactions
        </p>
        <h1 className="text-3xl font-black tracking-tight text-[#1d1f1f] md:text-5xl">
          Welcome, Alex Example. Explore support options.
        </h1>
        <p className="max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
          This demonstration helps you find resources and preview interactions. It is not a live
          counselling or emergency service.
        </p>
      </header>

      <article className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-alert p-5 ring-1 ring-[#f2c5c5]">
        <div className="flex items-center gap-4">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-[#c52424] text-white">
            <Siren size={22} />
          </div>
          <div>
            <h2 className="text-2xl font-black leading-tight text-[#aa1212] md:text-[2rem]">Need urgent help?</h2>
            <p className="text-sm leading-relaxed text-[#a84141] md:text-base">
              If there is immediate danger, call Triple Zero (000). Verified support numbers are available now.
            </p>
          </div>
        </div>
        <Link
          to="/resources#emergency"
          className="rounded-full bg-[#c91d1d] px-7 py-3 text-sm font-black text-white transition hover:bg-[#a71414]"
        >
          Get Help Now
        </Link>
      </article>

      <div className="grid gap-4 lg:grid-cols-2">
        <Link
          to="/community"
          className="group rounded-2xl bg-paper p-6 shadow-card ring-1 ring-line transition hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-brand"
        >
          <div className="mb-4 flex items-center justify-between">
            <Pill tone="soft">Browse demo stories</Pill>
            <BookOpenText size={17} className="text-[#578167]" />
          </div>
          <h2 className="text-[2rem] font-black leading-tight text-[#22352b]">Read Community Stories</h2>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-slate-600">
            Browse example experiences or create an anonymous display-name post kept only in the page session.
          </p>
          <span className="mt-6 inline-flex items-center gap-2 font-bold text-[#32463e]">
            Open Community <ArrowRight size={18} />
          </span>
        </Link>

        <Link
          to="/chat"
          className="group rounded-2xl bg-mint p-6 shadow-card ring-1 ring-[#a8d9d6] transition hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-brand"
        >
          <div className="mb-4 flex items-center justify-between">
            <Pill tone="mint">Scripted preview</Pill>
            <MessageCircle size={17} className="text-[#1f7f78]" />
          </div>
          <h2 className="text-[2rem] font-black leading-tight text-[#1f6662]">Explore Chat Resources</h2>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[#346f6b]">
            Preview simulated resource suggestions. No professional is actively replying and no chat is stored.
          </p>
          <span className="mt-6 inline-flex items-center gap-2 font-bold text-[#1f6662]">
            Choose a demo guide <ArrowRight size={18} />
          </span>
        </Link>
      </div>

      <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
        <article className="rounded-2xl bg-paper p-6 shadow-card ring-1 ring-line">
          <div className="flex items-center justify-between">
            <h3 className="text-[1.5rem] font-black text-[#2c2c2c]">Example Check-in</h3>
            <Waves size={18} className="text-[#3f7f7b]" />
          </div>
          <div className="mt-6 grid place-items-center">
            <ProgressRing value={70} label="Demo" />
          </div>
          <p className="mt-5 text-center text-sm leading-relaxed text-slate-600">
            Example progress display only; it is not based on user activity.
          </p>
        </article>

        <article className="relative overflow-hidden rounded-2xl bg-paper p-6 shadow-card ring-1 ring-line">
          <Sparkles size={130} className="pointer-events-none absolute -bottom-7 right-2 text-[#d8d8d8]" strokeWidth={1.4} />
          <div className="relative z-10 max-w-lg">
            <h3 className="text-[2rem] font-black leading-tight text-[#2f2f2f]">Feeling stressed about exams?</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
              Review study and wellbeing pathways in the resource directory. No event booking is active in this prototype.
            </p>
            <Link to="/resources" className="mt-5 inline-flex rounded-full border border-line bg-white px-4 py-2 text-sm font-bold text-brand">
              Browse resources
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}

export default WellbeingLandingPage;
