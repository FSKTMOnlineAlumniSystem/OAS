import { dummyResponse } from "../dummydata.js";
import { loadEventSection } from "../Alumni/EventPageModule.js";

const myEvent = dummyResponse.Alumni_Event.filter((event) => {
  return event.alumniId === localStorage.getItem("SignedInAlumniId");
});
const notMyEvent = dummyResponse.Alumni_Event.filter((event) => {
  return event.alumniId !== localStorage.getItem("SignedInAlumniId");
});

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
