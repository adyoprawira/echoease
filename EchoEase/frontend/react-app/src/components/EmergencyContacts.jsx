import { ExternalLink, Phone } from "lucide-react";
import { EMERGENCY_CONTACTS } from "../data/mvpContent";

function EmergencyContacts({ compact = false }) {
  return (
    <ul className={compact ? "space-y-2" : "space-y-3"} aria-label="Verified emergency contacts">
      {EMERGENCY_CONTACTS.map((contact) => (
        <li key={contact.id} className="rounded-xl border border-red-200 bg-white p-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="font-bold text-red-900">{contact.name}</p>
              {!compact && <p className="text-sm text-red-800">{contact.guidance}</p>}
            </div>
            <a
              href={`tel:${contact.tel}`}
              className="inline-flex items-center gap-2 rounded-full bg-red-700 px-3 py-2 text-sm font-bold text-white"
              aria-label={`Call ${contact.name} on ${contact.number}`}
            >
              <Phone size={14} /> {contact.number}
            </a>
          </div>
          {!compact && (
            <a
              className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-red-800 underline"
              href={contact.sourceUrl}
              target="_blank"
              rel="noreferrer"
            >
              Official source <ExternalLink size={12} />
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}

export default EmergencyContacts;
