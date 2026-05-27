import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Send } from "lucide-react";
import AccessibleModal from "../components/AccessibleModal";
import EmergencyContacts from "../components/EmergencyContacts";
import { CRISIS_TERMS, findGuide, getGuide } from "../data/mvpContent";

const STARTER_PROMPTS = [
  { label: "Study resources", text: "Please show study pressure resources.", reply: "Suggested resource topic: study pressure and planning." },
  { label: "Money resources", text: "Please show financial support resources.", reply: "Suggested resource topic: financial and practical support." },
  { label: "Wellbeing resources", text: "Please show wellbeing contact options.", reply: "Suggested resource topic: wellbeing contact pathways." }
];

function containsCrisisLanguage(text) {
  const normalized = text.toLowerCase();
  return CRISIS_TERMS.some((term) => normalized.includes(term));
}

function ChatPage() {
  const { guideId } = useParams();
  const guide = findGuide(guideId);
  const initialGuide = guide || getGuide();
  const [messages, setMessages] = useState([
    {
      id: "intro",
      sender: "guide",
      text: `This is ${initialGuide.name}, a scripted prototype guide. Select a resource prompt or enter words to preview suggested pathways.`
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [showEmergency, setShowEmergency] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showEndChat, setShowEndChat] = useState(false);
  const [ended, setEnded] = useState(false);

  function appendMessage(sender, text) {
    setMessages((current) => [...current, { id: `${Date.now()}-${current.length}`, sender, text }]);
  }

  function sendText(text, presetReply) {
    const cleanText = text.trim();
    if (!cleanText || ended) return;
    appendMessage("user", cleanText);
    setInputValue("");

    if (containsCrisisLanguage(cleanText)) {
      setShowEmergency(true);
      appendMessage(
        "system",
        "Urgent-help options are shown now. No simulated chat reply is generated for safety-related text."
      );
      return;
    }

    appendMessage(
      "guide",
      presetReply || "Suggested from words selected or entered: review wellbeing and support resources."
    );
  }

  function submitMessage(event) {
    event?.preventDefault();
    sendText(inputValue);
  }

  function confirmEndChat() {
    setShowEndChat(false);
    setMessages([]);
    setEnded(true);
  }

  if (!guide) {
    return (
      <section className="mx-auto max-w-lg rounded-2xl bg-white p-6 shadow-card ring-1 ring-line">
        <h1 className="text-2xl font-black text-ink">Chat preview unavailable</h1>
        <p className="mt-2 text-slate-600">This demo guide could not be found. No chat has started.</p>
        <Link to="/chat" className="mt-5 inline-flex rounded-full bg-brand px-5 py-3 font-bold text-white">
          Back to support options
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-4 pb-8">
      <Link to="/chat" className="text-sm font-bold text-brand underline">&larr; Back to support options</Link>

      <header className="rounded-2xl bg-white p-4 shadow-card ring-1 ring-line">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">Prototype simulation</p>
            <h1 className="mt-1 text-2xl font-black text-ink">{guide.name}</h1>
            <p className="text-sm text-slate-600">{guide.role} - {guide.topics.join(" and ")}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setShowPrivacy((open) => !open)} className="rounded-full border border-line px-3 py-2 text-sm font-bold text-brand">
              Privacy details
            </button>
            <button type="button" onClick={() => setShowEmergency(true)} className="rounded-full bg-red-700 px-3 py-2 text-sm font-bold text-white">
              Urgent help options
            </button>
            {!ended && (
              <button type="button" onClick={() => setShowEndChat(true)} className="rounded-full border border-red-300 px-3 py-2 text-sm font-bold text-red-700">
                End chat preview
              </button>
            )}
          </div>
        </div>
      </header>

      <div role="status" className="rounded-xl border border-red-200 bg-alert p-4 text-sm font-semibold text-red-900">
        This is a scripted prototype simulation, not live counselling or emergency assistance. Messages remain in this page only and are not saved.
      </div>

      {showPrivacy && (
        <aside className="rounded-xl border border-teal-200 bg-teal-50 p-4" aria-label="Privacy details">
          <h2 className="font-bold text-teal-900">Privacy limits in this MVP</h2>
          <p className="mt-1 text-sm text-teal-900">
            No backend chat storage is implemented. This prototype does not claim encryption, guaranteed anonymity, or clinical review.
          </p>
        </aside>
      )}

      {showEmergency && (
        <aside className="rounded-xl border border-red-200 bg-red-50 p-4" aria-labelledby="chat-emergency-title">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <h2 id="chat-emergency-title" className="font-bold text-red-900">Urgent contacts</h2>
              <p className="text-sm text-red-800">For immediate danger, call Triple Zero (000) now.</p>
            </div>
            <button type="button" onClick={() => setShowEmergency(false)} aria-label="Close urgent contacts" className="text-sm font-bold text-red-800 underline">
              Close
            </button>
          </div>
          <EmergencyContacts compact />
        </aside>
      )}

      <section className="min-h-[280px] space-y-3 rounded-2xl bg-white p-4 shadow-card ring-1 ring-line" aria-label="Simulated chat transcript" aria-live="polite">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`max-w-2xl rounded-xl p-3 text-sm ${
              message.sender === "user"
                ? "ml-auto bg-brand text-white"
                : message.sender === "system"
                  ? "border border-red-200 bg-red-50 font-semibold text-red-900"
                  : "bg-paper text-ink"
            }`}
          >
            {message.sender !== "user" && (
              <p className="mb-1 text-xs font-bold uppercase tracking-wide text-slate-500">
                {message.sender === "system" ? "Safety notice" : "Scripted response"}
              </p>
            )}
            <p>{message.text}</p>
          </div>
        ))}
        {ended && (
          <div role="status" className="rounded-xl bg-brand-soft p-4 text-sm font-semibold text-brand">
            Chat preview ended. No conversation was saved or sent to a service.
          </div>
        )}
      </section>

      {!ended ? (
        <form onSubmit={submitMessage} className="rounded-2xl bg-white p-4 shadow-card ring-1 ring-line">
          <div className="mb-3 flex flex-wrap gap-2">
            {STARTER_PROMPTS.map((prompt) => (
              <button
                key={prompt.label}
                type="button"
                onClick={() => sendText(prompt.text, prompt.reply)}
                className="rounded-full border border-line px-3 py-2 text-xs font-bold text-slate-700"
              >
                {prompt.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <label className="sr-only" htmlFor="chat-input">Enter text to preview suggested resources</label>
            <input
              id="chat-input"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              maxLength={500}
              placeholder="Enter text to preview suggested resources..."
              className="flex-1 rounded-lg border border-line px-4 py-3"
            />
            <button type="submit" aria-label="Send text for simulated resource suggestion" className="rounded-lg bg-brand px-4 text-white">
              <Send size={18} />
            </button>
          </div>
          <p className="mt-2 text-right text-xs text-slate-500">{inputValue.length}/500</p>
        </form>
      ) : (
        <div className="flex flex-wrap gap-3">
          <Link to="/chat" className="rounded-full bg-brand px-5 py-3 font-bold text-white">Choose another preview</Link>
          <Link to="/resources" className="rounded-full border border-line px-5 py-3 font-bold text-brand">View resources</Link>
        </div>
      )}

      {showEndChat && (
        <AccessibleModal
          title="End chat preview?"
          titleId="end-chat-title"
          descriptionId="end-chat-description"
          onClose={() => setShowEndChat(false)}
        >
          <p id="end-chat-description" className="text-sm text-slate-600">
            This ends the simulated transcript on this page. Nothing is submitted or saved.
          </p>
          <div className="mt-6 flex gap-3">
            <button type="button" onClick={() => setShowEndChat(false)} className="flex-1 rounded-lg border border-line px-4 py-2 font-bold text-slate-700">
              Continue preview
            </button>
            <button type="button" onClick={confirmEndChat} className="flex-1 rounded-lg bg-red-700 px-4 py-2 font-bold text-white">
              End preview
            </button>
          </div>
        </AccessibleModal>
      )}
    </section>
  );
}

export default ChatPage;
