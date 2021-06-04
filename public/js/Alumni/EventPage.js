import { loadEventSection } from "../Alumni/EventPageModule.js";

const yourUpcomingEventSection = document.getElementById('your-upcoming-event-section');
const upcomingEventSection = document.getElementById('upcoming-event-section');

const myEvent = Array.from(yourUpcomingEventSection.children);
const notMyEvent = Array.from(yourUpcomingEventSection.children);
// build html nodes based on myEvent
loadEventSection(
  myEvent,
  yourUpcomingEventSection,
  "You have not invited to any event yet."
);
// build html nodes based on notMyEvent
loadEventSection(
  notMyEvent,
  upcomingEventSection,
  "No other upcoming event available"
);
