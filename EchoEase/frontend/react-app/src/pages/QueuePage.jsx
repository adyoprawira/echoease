import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AccessibleModal from "../components/AccessibleModal";
import EmergencyContacts from "../components/EmergencyContacts";
import { findGuide } from "../data/mvpContent";

function QueuePage() {
  const { guideId } = useParams();
  const guide = findGuide(guideId);
  const navigate = useNavigate();
  const [showLeave, setShowLeave] = useState(false);

  if (!guide) {
    return (
      <section className="mx-auto max-w-lg rounded-2xl bg-white p-6 shadow-card ring-1 ring-line">
        <h1 className="text-2xl font-black text-ink">Queue preview unavailable</h1>
        <p className="mt-2 text-slate-600">This demo guide could not be found. Choose an available preview to continue.</p>
        <Link to="/chat" className="mt-5 inline-flex rounded-full bg-brand px-5 py-3 font-bold text-white">
          Back to support options
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-4xl space-y-5 pb-8">
      <Link to="/chat" className="text-sm font-bold text-brand underline">&larr; Back to support options</Link>
      <header className="rounded-2xl bg-white p-6 text-center shadow-card ring-1 ring-line">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">Simulation only</p>
        <h1 className="mt-2 text-3xl font-black text-ink">Demo queue preview</h1>
        <p className="mt-3 text-slate-600">
          You selected {guide.name}. This page does not track a real queue position or waiting time,
          and no live supporter is notified.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Link
            to={`/chat-session/${guide.id}`}
            className="rounded-full bg-brand px-5 py-3 font-bold text-white"
          >
            Continue to simulated chat
          </Link>
          <button
            type="button"
            onClick={() => setShowLeave(true)}
            className="rounded-full border border-line px-5 py-3 font-bold text-slate-700"
          >
            Leave demo queue
          </button>
        </div>
      </header>

      <aside className="rounded-2xl border border-red-200 bg-alert p-5" aria-labelledby="queue-emergency-title">
        <h2 id="queue-emergency-title" className="text-xl font-black text-red-900">Need urgent help while waiting?</h2>
        <p className="mb-3 mt-1 text-sm text-red-800">Do not wait in this simulation for emergency assistance.</p>
        <EmergencyContacts compact />
      </aside>

      <article className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-line">
        <h2 className="text-xl font-bold text-ink">Private notes</h2>
        <p className="mt-2 text-sm text-slate-600">
          Journalling is intentionally unavailable here: this MVP does not store sensitive journal content
          until privacy and retention rules are defined.
        </p>
      </article>

      {showLeave && (
        <AccessibleModal
          title="Leave demo queue?"
          titleId="leave-queue-title"
          descriptionId="leave-queue-desc"
          onClose={() => setShowLeave(false)}
        >
          <p id="leave-queue-desc" className="text-sm text-slate-600">
            Leaving only ends this queue preview. There is no real waiting list to cancel.
          </p>
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => setShowLeave(false)}
              className="flex-1 rounded-lg border border-line px-4 py-2 font-bold text-slate-700"
            >
              Stay
            </button>
            <button
              type="button"
              onClick={() => navigate("/chat")}
              className="flex-1 rounded-lg bg-brand px-4 py-2 font-bold text-white"
            >
              Leave
            </button>
          </div>
        </AccessibleModal>
      )}
    </section>
  );
}

export default QueuePage;
