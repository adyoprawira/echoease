import { Link } from "react-router-dom";
import EmergencyContacts from "../components/EmergencyContacts";

const RESOURCE_GROUPS = [
  {
    title: "Study and wellbeing",
    description: "Explore study planning and general wellbeing pathways in this prototype.",
    items: ["Study pressure planning", "Mindfulness exercises", "Wellbeing contact options"]
  },
  {
    title: "Accessibility and practical support",
    description: "Examples of support categories a production directory could connect to.",
    items: ["Accessibility adjustments", "Financial assistance", "Health service information"]
  }
];

function ResourcesPage() {
  return (
    <section className="mx-auto w-full max-w-5xl space-y-6 pb-8">
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">Resource directory</p>
        <h1 className="mt-2 text-3xl font-black text-ink md:text-4xl">Support Resources</h1>
        <p className="mt-2 max-w-3xl text-slate-600">
          Emergency contact links below use public official contact information. Other cards are
          prototype pathways and do not book or contact a service.
        </p>
      </header>

      <section id="emergency" className="rounded-2xl border border-red-200 bg-alert p-5" aria-labelledby="emergency-title">
        <h2 id="emergency-title" className="text-2xl font-black text-red-900">Urgent help</h2>
        <p className="mb-4 mt-1 text-sm text-red-800">
          This prototype is not emergency assistance. Use these verified phone options when help is needed now.
        </p>
        <EmergencyContacts />
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        {RESOURCE_GROUPS.map((group) => (
          <article key={group.title} className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-line">
            <h2 className="text-xl font-bold text-ink">{group.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{group.description}</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {group.items.map((item) => <li key={item} className="rounded-lg bg-paper p-3">{item}</li>)}
            </ul>
          </article>
        ))}
      </div>

      <Link to="/chat" className="inline-flex rounded-full bg-brand px-5 py-3 font-bold text-white">
        Explore simulated chat support
      </Link>
    </section>
  );
}

export default ResourcesPage;
