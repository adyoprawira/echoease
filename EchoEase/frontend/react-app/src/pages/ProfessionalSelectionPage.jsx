import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AccessibleModal from "../components/AccessibleModal";
import EmergencyContacts from "../components/EmergencyContacts";
import { SUPPORT_GUIDES } from "../data/mvpContent";

const TIME_SLOTS = ["Tomorrow, 10:00 AM", "Tomorrow, 2:00 PM", "Friday, 11:30 AM"];

function ProfessionalSelectionPage() {
  const navigate = useNavigate();
  const [bookingGuide, setBookingGuide] = useState(null);
  const [showEmergency, setShowEmergency] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(TIME_SLOTS[0]);
  const [confirmation, setConfirmation] = useState("");

  function chooseGuide(guide) {
    setConfirmation("");
    if (guide.action === "chat") {
      navigate(`/chat-session/${guide.id}`);
    } else if (guide.action === "queue") {
      navigate(`/queue/${guide.id}`);
    } else {
      setBookingGuide(guide);
    }
  }

  function saveBookingPreview() {
    setConfirmation(
      `${bookingGuide.name} selected for ${selectedSlot}. This is a demo confirmation only; no appointment was submitted.`
    );
    setBookingGuide(null);
  }

  return (
    <section className="mx-auto w-full max-w-5xl space-y-6 pb-8">
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">Simulated chat flow</p>
        <h1 className="mt-2 text-3xl font-black text-ink md:text-4xl">Choose a support preview</h1>
        <p className="mt-2 max-w-3xl text-slate-600">
          These are fictional scripted guide options for demonstrating navigation. They are not live
          counsellors, and starting a preview does not contact a service.
        </p>
      </header>

      <aside className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-red-200 bg-alert p-4">
        <div>
          <h2 className="font-bold text-red-900">Need immediate help?</h2>
          <p className="text-sm text-red-800">This simulation cannot provide emergency assistance.</p>
        </div>
        <button
          type="button"
          onClick={() => setShowEmergency(true)}
          className="rounded-full bg-red-700 px-4 py-2 font-bold text-white"
        >
          Open urgent contacts
        </button>
      </aside>

      {confirmation && (
        <p role="status" className="rounded-xl border border-teal-200 bg-teal-50 p-4 text-sm font-semibold text-teal-900">
          {confirmation}
        </p>
      )}

      <div className="grid gap-4 lg:grid-cols-3">
        {SUPPORT_GUIDES.map((guide) => (
          <article key={guide.id} className="flex flex-col rounded-2xl bg-white p-5 shadow-card ring-1 ring-line">
            <span className="w-fit rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand">{guide.status}</span>
            <h2 className="mt-4 text-xl font-bold text-ink">{guide.name}</h2>
            <p className="text-sm font-semibold text-slate-500">{guide.role}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {guide.topics.map((topic) => (
                <span key={topic} className="rounded-full bg-paper px-2.5 py-1 text-xs font-bold text-slate-600">{topic}</span>
              ))}
            </div>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">{guide.description}</p>
            <button
              type="button"
              onClick={() => chooseGuide(guide)}
              className="mt-5 rounded-full bg-brand px-4 py-2 font-bold text-white"
            >
              {guide.action === "chat" && "Start simulated chat"}
              {guide.action === "queue" && "Open demo queue"}
              {guide.action === "schedule" && "Try booking preview"}
            </button>
          </article>
        ))}
      </div>

      <article className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-line">
        <h2 className="text-xl font-bold text-ink">Privacy and prototype limits</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600">
          <li>Simulated chat messages are held in page memory only and are not submitted to a backend.</li>
          <li>No encryption, anonymity guarantee, or clinical service is claimed for this prototype.</li>
          <li>Use verified urgent contacts rather than this preview in a crisis.</li>
        </ul>
        <Link to="/resources" className="mt-4 inline-flex font-bold text-brand underline">Browse resource directory</Link>
      </article>

      {bookingGuide && (
        <AccessibleModal
          title="Booking interaction preview"
          titleId="booking-modal-title"
          descriptionId="booking-modal-description"
          onClose={() => setBookingGuide(null)}
        >
          <p id="booking-modal-description" className="mb-4 text-sm text-slate-600">
            Select an example slot for {bookingGuide.name}. Saving creates only an on-screen confirmation.
          </p>
          <fieldset className="mb-6 space-y-2">
            <legend className="sr-only">Example time slots</legend>
            {TIME_SLOTS.map((slot) => (
              <label key={slot} className="flex cursor-pointer items-center gap-3 text-sm text-slate-700">
                <input
                  type="radio"
                  name="scheduleSlot"
                  checked={selectedSlot === slot}
                  onChange={() => setSelectedSlot(slot)}
                />
                {slot}
              </label>
            ))}
          </fieldset>
          <div className="flex gap-3">
            <button type="button" onClick={() => setBookingGuide(null)} className="flex-1 rounded-lg border border-line px-4 py-2 font-bold text-slate-700">
              Cancel
            </button>
            <button type="button" onClick={saveBookingPreview} className="flex-1 rounded-lg bg-brand px-4 py-2 font-bold text-white">
              Save demo selection
            </button>
          </div>
        </AccessibleModal>
      )}

      {showEmergency && (
        <AccessibleModal
          title="Urgent contacts"
          titleId="urgent-contacts-title"
          descriptionId="urgent-contacts-description"
          onClose={() => setShowEmergency(false)}
        >
          <p id="urgent-contacts-description" className="mb-4 text-sm text-red-800">
            For immediate danger, call Triple Zero (000). This list uses official public contact information.
          </p>
          <EmergencyContacts compact />
        </AccessibleModal>
      )}
    </section>
  );
}

export default ProfessionalSelectionPage;
