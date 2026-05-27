import { useState } from "react";
import { AlertCircle, Phone, X, Send } from "lucide-react";

const MENTOR = {
  name: "Dr. Sarah Jenkins",
  role: "Peer Support Officer",
  status: "Available now",
  photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop",
  specialty: "Academic pressure and anxiety management"
};

const STARTER_PROMPTS = [
  { label: "Study stress", concern: "study", text: "I feel stressed about exams and study pressure." },
  { label: "Money stress", concern: "financial", text: "I am worried about money, rent, and costs this semester." },
  { label: "Need someone to talk to", concern: "counselling", text: "I need someone to talk to and support my wellbeing." },
  { label: "Emergency help", concern: "crisis", text: "I need emergency help and feel unsafe right now." }
];

const EMERGENCY_RESOURCES = [
  { label: "000", desc: "Immediate danger" },
  { label: "13 11 14", desc: "Lifeline" },
  { label: "07 3365 1704", desc: "UQ Student Services" }
];

function ChatPage() {
  const [messages, setMessages] = useState([
    { id: 1, sender: "mentor", text: "Hi there! I'm Dr. Sarah. How are you feeling today?" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [showEmergency, setShowEmergency] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showEndChat, setShowEndChat] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setCharCount(value.length);
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessages = [
        ...messages,
        { id: messages.length + 1, sender: "user", text: inputValue }
      ];
      setMessages(newMessages);
      setInputValue("");
      setCharCount(0);

      // Simulate mentor response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            sender: "mentor",
            text: "I hear you. Let's explore what's causing this stress and find some strategies that work for you."
          }
        ]);
      }, 800);
    }
  };

  const handlePromptClick = (prompt) => {
    setInputValue(prompt.text);
    setCharCount(prompt.text.length);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <section className="flex h-[calc(100vh-64px)] flex-col overflow-hidden bg-shell">
      {/* Chat Header */}
      <div className="border-b border-line bg-white px-6 py-4">
        <div className="flex items-start justify-between gap-4">
          <button type="button" className="flex items-center gap-4 flex-1 text-left hover:opacity-80 transition">
            <img
              src={MENTOR.photo}
              alt={MENTOR.name}
              className="h-12 w-12 rounded-full object-cover"
            />
            <div>
              <p className="font-bold text-ink">{MENTOR.name}</p>
              <p className="flex items-center gap-2 text-sm text-green-600">
                <span className="h-2 w-2 rounded-full bg-green-600" />
                {MENTOR.status}
              </p>
              <p className="text-xs text-slate-500">{MENTOR.role}</p>
            </div>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowPrivacy(!showPrivacy)}
              className="rounded-full bg-mint px-3 py-1.5 text-sm font-semibold text-teal-700 hover:opacity-80"
            >
              Safe &amp; Confidential
            </button>
            <button
              type="button"
              onClick={() => setShowEmergency(!showEmergency)}
              className="rounded-full border border-line bg-white px-3 py-1.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Emergency Resources
            </button>
            <button
              type="button"
              onClick={() => setShowEndChat(true)}
              className="rounded-full border border-line bg-white px-3 py-1.5 text-sm font-semibold text-red-600 hover:bg-red-50"
            >
              End Chat
            </button>
            <a
              href="https://www.google.com"
              className="rounded-full border border-line bg-white px-3 py-1.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Quick Exit
            </a>
          </div>
        </div>

        {/* Info Panels */}
        {showEmergency && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-bold text-red-900">Emergency Resources</h3>
              <button
                type="button"
                onClick={() => setShowEmergency(false)}
                className="text-red-600 hover:text-red-800"
              >
                <X size={18} />
              </button>
            </div>
            <ul className="space-y-1 text-sm text-red-800">
              {EMERGENCY_RESOURCES.map((resource) => (
                <li key={resource.label}>
                  Call <strong>{resource.label}</strong> for {resource.desc}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-red-600">
              This chat is not a replacement for emergency help.
            </p>
          </div>
        )}

        {showPrivacy && (
          <div className="mt-4 rounded-lg border border-teal-200 bg-teal-50 p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-bold text-teal-900">Privacy Information</h3>
              <button
                type="button"
                onClick={() => setShowPrivacy(false)}
                className="text-teal-600 hover:text-teal-800"
              >
                <X size={18} />
              </button>
            </div>
            <ul className="space-y-1 text-sm text-teal-800">
              <li>Messages are private within this MVP demo</li>
              <li>Chats are end-to-end encrypted</li>
              <li>In a real system, this would comply with health privacy standards</li>
            </ul>
          </div>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        <div className="text-center text-xs font-bold uppercase text-slate-400">Today</div>

        {messages.length === 0 ? (
          <div className="rounded-lg border border-dashed border-line bg-white p-8 text-center">
            <h2 className="text-lg font-bold text-ink">Welcome to private student support</h2>
            <p className="mt-2 text-sm text-slate-600">
              You can talk about exams, money stress, loneliness, accessibility, health, or urgent
              safety concerns. Share what feels hardest right now.
            </p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : ""}`}>
              {msg.sender === "mentor" && (
                <img
                  src={MENTOR.photo}
                  alt={MENTOR.name}
                  className="h-8 w-8 flex-shrink-0 rounded-full"
                />
              )}
              <div
                className={`max-w-lg rounded-lg px-4 py-2 ${
                  msg.sender === "user"
                    ? "bg-brand text-white"
                    : "bg-white text-ink ring-1 ring-line"
                }`}
              >
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Chat Input */}
      <div className="border-t border-line bg-white p-4">
        <div className="mb-2 flex flex-wrap gap-2">
          {STARTER_PROMPTS.map((prompt) => (
            <button
              key={prompt.concern}
              type="button"
              onClick={() => handlePromptClick(prompt)}
              className="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-purple-50"
            >
              {prompt.label}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <div className="flex-1">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={`Message ${MENTOR.name}...`}
              maxLength={500}
              className="w-full rounded-lg border border-line bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
            />
            <div className="mt-1 flex justify-end text-xs text-slate-500">
              {charCount}/500
            </div>
          </div>
          <button
            type="button"
            onClick={handleSendMessage}
            className="rounded-lg bg-brand px-4 py-2.5 text-white font-bold hover:bg-brand-strong transition"
          >
            <Send size={16} />
          </button>
        </div>

        <div className="mt-2 text-center text-xs text-slate-500">
          Your safety is our priority. If you are in immediate danger, use Emergency Resources or
          call Emergency Services.
        </div>
      </div>

      {/* End Chat Modal */}
      {showEndChat && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/30 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-lg font-bold text-ink">Are you sure you want to end this chat?</h2>
            <p className="mt-2 text-sm text-slate-600">
              You can always start a new session with Dr. Sarah or another support officer.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setShowEndChat(false)}
                className="flex-1 rounded-lg border border-line bg-white px-4 py-2 font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setShowEndChat(false)}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-700"
              >
                End Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ChatPage;
