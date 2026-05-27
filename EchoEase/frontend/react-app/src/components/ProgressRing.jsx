function ProgressRing({ value = 70, label = "Goal" }) {
  const pct = Math.max(0, Math.min(100, value));

  return (
    <div
      className="relative grid h-32 w-32 place-items-center rounded-full"
      style={{
        background: `conic-gradient(#0f7d79 ${pct * 3.6}deg, #d9eeec ${pct * 3.6}deg)`
      }}
      aria-label={`Progress ${pct} percent`}
    >
      <div className="grid h-24 w-24 place-items-center rounded-full bg-white text-center">
        <p className="text-2xl font-black text-[#1a514f]">{pct}%</p>
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">{label}</p>
      </div>
    </div>
  );
}

export default ProgressRing;
