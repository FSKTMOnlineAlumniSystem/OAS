import { dummyResponse } from '../dummydata.js';
import { getCardStructure } from './EventPageModule.js'


const upcomingEventSection = document.getElementById('upcoming-event-section');
const yourUpcomingEventSection = document.getElementById('your-upcoming-event-section');

const myEvent = dummyResponse.Alumni_Event.filter(event => {
  return event.alumniId === localStorage.getItem('SignedInAlumniId');
});
const notMyEvent = dummyResponse.Alumni_Event.filter(event => {
  return event.alumniId !== localStorage.getItem('SignedInAlumniId');
});

// the parent node should be a div with class 'row'
export const loadEventSection = (eventArr, parentNode) => {
  eventArr.forEach(event => {
    const eventDetails = dummyResponse.Event.filter(evt => evt.eventId === event.eventId)[0];
    const { title, dateTime, imageId } = eventDetails;
    
    const cardDiv = document.createElement('div');
    cardDiv.setAttribute('class', 'col-12 col-sm-6 col-md-4 col-lg-3 mb-4');
    cardDiv.innerHTML = getCardStructure(event.eventId, imageId, title, dateTime);
    parentNode.appendChild(cardDiv);
  
    // function to be called when this card clicked
    const evtHandler = evt => {
      console.log(`set eventId to ${event.eventId}`);
      localStorage.setItem('eventId', event.eventId);
    };
    cardDiv.querySelector('#' + event.eventId + '-card').addEventListener('click', evtHandler);
  });
}
// build html nodes based on myEvent
loadEventSection(myEvent, yourUpcomingEventSection)
// build html nodes based on notMyEvent
loadEventSection(notMyEvent, upcomingEventSection)
