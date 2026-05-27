import {
  ArrowRight,
  BookOpenText,
  CircleDot,
  MessageCircle,
  Siren,
  Sparkles,
  Waves
} from "lucide-react";
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
        <h1 className="text-3xl font-black tracking-tight text-[#1d1f1f] md:text-5xl">
          Welcome, Alex. It&apos;s okay to just look around.
        </h1>
        <p className="max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
          Take a deep breath. You&apos;re in a safe space designed to support you at your own pace. Whether
          you&apos;re here to learn or need immediate help, we&apos;re with you.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        <article className="group rounded-2xl bg-paper p-6 shadow-card ring-1 ring-line transition hover:-translate-y-0.5">
          <div className="mb-4 flex items-center justify-between">
            <Pill tone="soft">Low Pressure</Pill>
            <BookOpenText size={17} className="text-[#578167]" />
          </div>
          <h2 className="text-[2rem] font-black leading-tight text-[#22352b]">Read Community Stories</h2>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-slate-600">
            Browse through shared experiences and wellness tips from fellow UQ students. You don&apos;t have to
            engage; just being here is enough.
          </p>
          <div className="mt-6 flex items-center justify-between">
            <div className="-space-x-2">
              <span className="inline-grid h-8 w-8 place-items-center rounded-full border-2 border-white bg-[#236f6a] text-[10px] font-bold text-white">
                AL
              </span>
              <span className="inline-grid h-8 w-8 place-items-center rounded-full border-2 border-white bg-[#2d88a0] text-[10px] font-bold text-white">
                BE
              </span>
              <span className="inline-grid h-8 w-8 place-items-center rounded-full border-2 border-white bg-[#4f6fcb] text-[10px] font-bold text-white">
                CK
              </span>
              <span className="inline-grid h-8 w-8 place-items-center rounded-full border-2 border-white bg-[#def3df] text-[10px] font-black text-[#2d4a34]">
                +12
              </span>
            </div>
            <ArrowRight size={18} className="text-[#32463e]" />
          </div>
        </article>

        <article className="group rounded-2xl bg-mint p-6 shadow-card ring-1 ring-[#a8d9d6] transition hover:-translate-y-0.5">
          <div className="mb-4 flex items-center justify-between">
            <Pill tone="mint">Moderate Pressure</Pill>
            <MessageCircle size={17} className="text-[#1f7f78]" />
          </div>
          <h2 className="text-[2rem] font-black leading-tight text-[#1f6662]">Chat with Someone</h2>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[#346f6b]">
            Connect with a trained peer supporter or a professional counselor in a private, confidential
            chat.
          </p>
          <div className="mt-8 flex items-center justify-between text-[15px] font-semibold text-[#1f6662]">
            <span className="inline-flex items-center gap-2">
              <CircleDot size={15} /> 3 Supporters Online
            </span>
            <ArrowRight size={18} />
          </div>
        </article>
      </div>

      <article className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-alert p-5 ring-1 ring-[#f2c5c5]">
        <div className="flex items-center gap-4">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-[#c52424] text-white">
            <Siren size={22} />
          </div>
          <div>
            <h2 className="text-[2rem] font-black leading-tight text-[#aa1212]">Emergency Resources</h2>
            <p className="text-sm leading-relaxed text-[#a84141] md:text-base">
              If you or someone else is in immediate danger, access our emergency contacts and safety
              protocols right now.
            </p>
          </div>
        </div>
        <button
          type="button"
          className="rounded-full bg-[#c91d1d] px-7 py-3 text-sm font-black text-white transition hover:bg-[#a71414]"
        >
          Get Help Now
        </button>
      </article>

      <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
        <article className="rounded-2xl bg-paper p-6 shadow-card ring-1 ring-line">
          <div className="flex items-center justify-between">
            <h3 className="text-[1.85rem] font-black text-[#2c2c2c]">Mindfulness Pulse</h3>
            <Waves size={18} className="text-[#3f7f7b]" />
          </div>
          <div className="mt-6 grid place-items-center">
            <ProgressRing value={70} label="Goal" />
          </div>
          <p className="mt-5 text-center text-sm leading-relaxed text-slate-600">
            You&apos;ve completed 3 out of 5 daily reflections. Great work, Alex.
          </p>
        </article>

        <article className="relative overflow-hidden rounded-2xl bg-paper p-6 shadow-card ring-1 ring-line">
          <Sparkles
            size={130}
            className="pointer-events-none absolute -bottom-7 right-2 text-[#d8d8d8]"
            strokeWidth={1.4}
          />
          <div className="relative z-10 max-w-lg">
            <h3 className="text-[2rem] font-black leading-tight text-[#2f2f2f]">
              Feeling stressed about exams?
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
              Join our "Chill &amp; Chat" session happening in the Community Lounge today at 2:00 PM.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold text-slate-600">
              <span className="rounded-full border border-line bg-white px-3 py-1.5">#ExamPrep</span>
              <span className="rounded-full border border-line bg-white px-3 py-1.5">#MentalHealth</span>
              <span className="rounded-full border border-line bg-white px-3 py-1.5">#Support</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

export default WellbeingLandingPage;
