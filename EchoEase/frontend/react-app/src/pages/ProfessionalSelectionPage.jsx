import { useState } from "react";
import { Phone, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const PROFESSIONALS = [
  {
    id: 1,
    name: "Dr. Sarah Jenkins",
    role: "Clinical Psychologist",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    status: "AVAILABLE NOW",
    statusColor: "bg-green-100",
    statusTextColor: "text-green-700",
    dotColor: "#0abe70",
    tags: ["#Anxiety", "#StudyBurnout", "#CBT"],
    description:
      "Specializing in academic pressure and anxiety management. Helping students find balance and resilience.",
    actionLabel: "Start Chat",
    actionType: "chat"
  },
  {
    id: 2,
    name: "Marcus Thompson",
    role: "Mental Health Counselor",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop",
    status: "IN A SESSION",
    statusColor: "bg-orange-100",
    statusTextColor: "text-orange-700",
    dotColor: "#ffa333",
    tags: ["#RelationshipsIssues", "#Mindfulness"],
    description:
      "Focusing on holistic well-being and interpersonal dynamics. Creating a safe space for open dialogue and self-discovery.",
    actionLabel: "Join Queue (10m wait)",
    actionType: "queue"
  },
  {
    id: 3,
    name: "Dr. Elena Rodriguez",
    role: "Trauma Specialist",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&sat=-100",
    status: "AWAY",
    statusColor: "bg-slate-100",
    statusTextColor: "text-slate-600",
    dotColor: "#b5c3cf",
    tags: ["#PTSD", "#SelfEsteem"],
    description:
      "Experienced in trauma-informed care and identity development. Elena provides a compassionate framework for healing.",
    actionLabel: "Schedule for Later",
    actionType: "schedule"
  }
];

const TIME_SLOTS = [
  "Today, 4:30 PM",
  "Tomorrow, 10:00 AM",
  "Tomorrow, 2:00 PM",
  "Friday, 11:30 AM"
];

function ProfessionalSelectionPage() {
  const navigate = useNavigate();
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showCrisisModal, setShowCrisisModal] = useState(false);
  const [showEmergencyPanel, setShowEmergencyPanel] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(TIME_SLOTS[0]);
  const [selectedProfessional, setSelectedProfessional] = useState(null);

  const handleStartChat = (professional) => {
    navigate("/chat-session");
  };

  const handleSchedule = (professional) => {
    setSelectedProfessional(professional);
    setShowScheduleModal(true);
  };

  const handleBookSession = () => {
    setShowScheduleModal(false);
    setSelectedProfessional(null);
  };

  const handleActionClick = (professional, actionType) => {
    if (actionType === "chat") {
      handleStartChat(professional);
    } else if (actionType === "schedule") {
      handleSchedule(professional);
    } else if (actionType === "queue") {
      navigate("/chat-session");
    }
  };

  return (
    <div className="min-h-screen bg-shell pb-8">
      <section className="mx-auto max-w-4xl">
        <div className="mb-6 rounded-2xl border border-line bg-white px-5 py-4 shadow-card">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
            Partner website preview
          </p>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-4xl font-black text-ink">Professional Selection</h1>
              <p className="mt-2 text-sm text-slate-600">
                This page represents another website. Use the button below to open our own
                UQ Student Well-being site.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {PROFESSIONALS.map((professional) => (
              <article
                key={professional.id}
                className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-lg transition"
              >
                <div className="flex gap-6 p-6">
                  {/* Photo */}
                  <div className="flex-shrink-0">
                    <img
                      src={professional.photo}
                      alt={professional.name}
                      className="h-40 w-40 rounded-lg object-cover"
                    />
                    <div
                      className={`mt-2 rounded-full px-3 py-1 text-center text-xs font-bold ${professional.statusColor} ${professional.statusTextColor}`}
                    >
                      {professional.status}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="mb-1">
                      <h2 className="text-xl font-bold text-ink">{professional.name}</h2>
                      <p className="text-sm text-slate-600">{professional.role}</p>
                    </div>

                    <div className="mb-3 flex flex-wrap gap-2">
                      {professional.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-semibold text-purple-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="mb-4 text-sm text-slate-600 leading-relaxed">
                      {professional.description}
                    </p>

                    <div className="flex items-center gap-3">
                      <span
                        className="inline-block h-3 w-3 rounded-full"
                        style={{ background: professional.dotColor }}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          handleActionClick(professional, professional.actionType)
                        }
                        className={`rounded-lg px-4 py-2 font-bold transition ${
                          professional.status === "AWAY"
                            ? "border border-line bg-white text-slate-600 hover:bg-slate-50"
                            : "bg-brand text-white hover:bg-brand-strong"
                        }`}
                      >
                        {professional.actionLabel}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4">
            {/* Privacy Reassurance */}
            <div className="rounded-2xl bg-white p-6 shadow-card">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-mint">
                <svg viewBox="0 0 24 24" className="h-6 w-6 text-teal-700" fill="none" stroke="currentColor">
                  <path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 0-3 3z" strokeWidth="2" />
                  <path d="M8 7h8" strokeWidth="2" />
                  <path d="M8 11h8" strokeWidth="2" />
                  <path d="M8 15h6" strokeWidth="2" />
                </svg>
              </div>
              <h2 className="mb-3 font-bold text-ink">Privacy Reassurance</h2>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>♥ Your identity remains anonymous to other students at all times.</li>
                <li>Chats are end-to-end encrypted and not stored on university servers.</li>
                <li>⚙ Compliance with health privacy standards.</li>
              </ul>
            </div>

            {/* Crisis Support */}
            <div className="rounded-2xl bg-alert p-6 shadow-card">
              <h2 className="mb-2 font-bold text-red-900">Need Immediate Help?</h2>
              <p className="mb-4 text-sm text-red-800">
                If you are in immediate danger or experiencing a crisis, please use our 24/7
                emergency line.
              </p>
              <button
                type="button"
                onClick={() => setShowCrisisModal(true)}
                className="w-full rounded-lg border border-red-300 bg-white px-4 py-2 font-bold text-red-600 hover:bg-red-50"
              >
                Call Crisis Support
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-line bg-white p-6 shadow-card">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-black text-ink">Ready to continue?</h2>
              <p className="mt-1 text-sm text-slate-600">
                Jump from this preview into the real UQ Student Well-being website.
              </p>
            </div>
            <Link
              to="/"
              className="inline-flex items-center rounded-full bg-brand px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-strong"
            >
              Go to UQ Student Well-being
            </Link>
          </div>
        </div>
      </section>

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/30 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg" role="dialog" aria-modal="true" aria-labelledby="scheduleTitle">
            <div className="mb-4 flex items-start justify-between">
              <h2 className="text-lg font-bold text-ink">Schedule a Session</h2>
              <button
                type="button"
                onClick={() => setShowScheduleModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            <p className="mb-4 text-sm text-slate-600">
              Select an available slot for {selectedProfessional?.name}.
            </p>

            <fieldset className="mb-6 space-y-2">
              <legend className="sr-only">Available time slots</legend>
              {TIME_SLOTS.map((slot) => (
                <label key={slot} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="scheduleSlot"
                    value={slot}
                    checked={selectedSlot === slot}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                    className="h-4 w-4"
                  />
                  <span className="text-sm text-slate-700">{slot}</span>
                </label>
              ))}
            </fieldset>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowScheduleModal(false)}
                className="flex-1 rounded-lg border border-line bg-white px-4 py-2 font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleBookSession}
                className="flex-1 rounded-lg bg-brand px-4 py-2 font-bold text-white hover:bg-brand-strong"
              >
                Book Session
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Crisis Support Modal */}
      {showCrisisModal && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/30 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg" role="dialog" aria-modal="true" aria-labelledby="crisisTitle">
            <div className="mb-4 flex items-start justify-between">
              <h2 className="text-lg font-bold text-ink">Crisis Support</h2>
              <button
                type="button"
                onClick={() => setShowCrisisModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mb-6 space-y-2 text-sm text-slate-700">
              <p>
                If you are in immediate danger, call <strong>000</strong>.
              </p>
              <p>
                <strong>Lifeline:</strong> 13 11 14
              </p>
              <p>
                <strong>UQ Student Services:</strong> 07 3365 1704
              </p>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText("13 11 14");
                  setShowCrisisModal(false);
                }}
                className="w-full rounded-lg border border-line bg-white px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50"
              >
                Copy Lifeline Number
              </button>
              <button
                type="button"
                onClick={() => setShowEmergencyPanel(!showEmergencyPanel)}
                className="w-full rounded-lg border border-line bg-white px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50"
              >
                Open Emergency Resources
              </button>
              <button
                type="button"
                onClick={() => setShowCrisisModal(false)}
                className="w-full rounded-lg border border-line bg-white px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Emergency Exit Button */}
      <a
        href="https://www.google.com"
        className="fixed bottom-8 right-8 z-40 rounded-full bg-red-600 px-6 py-3 font-bold text-white shadow-lg hover:bg-red-700 transition"
      >
        Emergency Exit
      </a>
    </div>
  );
}

export default ProfessionalSelectionPage;
