export const QUICK_EXIT_URL = "https://learn.uq.edu.au/";

export const EMERGENCY_CONTACTS = [
  {
    id: "emergency",
    name: "Triple Zero",
    number: "000",
    tel: "000",
    guidance: "Call for immediate danger or urgent police, fire, or ambulance help.",
    sourceUrl: "https://www.triplezero.gov.au/triple-zero/How-to-Call-000"
  },
  {
    id: "lifeline",
    name: "Lifeline",
    number: "13 11 14",
    tel: "131114",
    guidance: "24/7 crisis support in Australia.",
    sourceUrl: "https://www.lifeline.org.au/get-help/national-services/lifeline-crisis-support"
  },
  {
    id: "uq-crisis",
    name: "UQ Counselling and Crisis Line",
    number: "1300 851 998",
    tel: "1300851998",
    guidance: "Urgent UQ mental health support, available 24/7.",
    sourceUrl: "https://my.uq.edu.au/information-and-services/student-support/health-and-wellbeing/health-and-wellbeing-overview/self-help-resources/exam-anxiety"
  }
];

export const SUPPORT_GUIDES = [
  {
    id: "guide-a",
    name: "Support Guide A",
    role: "Scripted prototype guide",
    status: "Ready to preview",
    topics: ["Study pressure", "Wellbeing resources"],
    description: "Explore a scripted support-resource conversation without contacting a live service.",
    action: "chat"
  },
  {
    id: "guide-b",
    name: "Support Guide B",
    role: "Scripted prototype guide",
    status: "Queue preview available",
    topics: ["Relationships", "Mindfulness resources"],
    description: "Preview a transparent demo queue before entering a scripted conversation.",
    action: "queue"
  },
  {
    id: "guide-c",
    name: "Support Guide C",
    role: "Booking interaction demo",
    status: "Booking preview only",
    topics: ["Accessibility", "Health pathways"],
    description: "Try the appointment selection interaction. No appointment will be submitted.",
    action: "schedule"
  }
];

export const CRISIS_TERMS = [
  "unsafe",
  "suicide",
  "self harm",
  "self-harm",
  "hurt myself",
  "kill myself",
  "want to die",
  "end my life",
  "emergency",
  "immediate danger"
];

export function getGuide(guideId) {
  return SUPPORT_GUIDES.find((guide) => guide.id === guideId) || SUPPORT_GUIDES[0];
}

export function findGuide(guideId) {
  return SUPPORT_GUIDES.find((guide) => guide.id === guideId);
}
