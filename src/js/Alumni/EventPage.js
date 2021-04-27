import { dummyResponse } from '../dummydata.js';

const upcomingEventSection = document.getElementById('upcoming-event-section');
const yourUpcomingEventSection = document.getElementById('your-upcoming-event-section');

const myEvent = dummyResponse.Alumni_Event.filter(event => {
  return event.alumniId === localStorage.getItem('SignedInAlumniId');
});
const notMyEvent = dummyResponse.Alumni_Event.filter(event => {
  return event.alumniId !== localStorage.getItem('SignedInAlumniId');
});
// <img src="/Assets/imgs/calendar.png" alt="time" height="24" width="24">
// <img src="/Assets/imgs/time.png" alt="time" height="24" width="24">
const getCardStructure = (eventId, imageId, title, dateTime) => {
  return `<a href="/src/html/Alumni/EventDetailsPage.html" target="_self" id="${eventId}-card">
  <div class="card h-100">
    <img src="/Assets/imgs/${imageId}" class="card-img-top image__fixed-height" alt="eventPhoto">
    <div class="card-body">
      <h5 class="card-title">${title}</h5>
      <p class="card-text">
      <div class="row cards">
        <div class="col-1"><i class="far fa-calendar-alt text-danger"></i>
        </div>
        <div class="col-7">${getReadableDate(dateTime)}</div>
      </div>
      <div class="row cards">
        <div class="col-1"><i class="far fa-clock text-primary"></i></div>
        <div class="col-9">${getReadableTime(dateTime)}</div>
      </div>
      </p>
    </div>
  </div>
</a>`
}
// build html nodes based on myEvent
myEvent.forEach(event => {
  const eventDetails = dummyResponse.Event.filter(evt => evt.eventId === event.eventId)[0];
  const { title, dateTime, imageId } = eventDetails;
  // console.log(`${title} ${dateTime} ${imageId}`);
  
  // /src/html/Alumni/EventDetailsPage.html
  const cardDiv = document.createElement('div');
  cardDiv.setAttribute('class', 'col-12 col-sm-6 col-md-4 col-lg-3 mb-4');
  cardDiv.innerHTML = getCardStructure(event.eventId, imageId, title, dateTime);
  yourUpcomingEventSection.appendChild(cardDiv);

  // function to be called when this card clicked
  // console.log(cardDiv.querySelector('#' + event.eventId + '-card'));
  const evtHandler = evt => {
    console.log(`set eventId to ${event.eventId}`);
    localStorage.setItem('eventId', event.eventId);
  };
  cardDiv.querySelector('#' + event.eventId + '-card').addEventListener('click', evtHandler);
});
// build html nodes based on notMyEvent
notMyEvent.forEach(event => {
  const eventDetails = dummyResponse.Event.filter(evt => evt.eventId === event.eventId)[0];
  const { title, dateTime, imageId } = eventDetails;
  
  const cardDiv = document.createElement('div');
  cardDiv.setAttribute('class', 'col-12 col-sm-6 col-md-4 col-lg-3 mb-4');
  cardDiv.innerHTML = getCardStructure(event.eventId, imageId, title, dateTime);
  upcomingEventSection.appendChild(cardDiv);

  // function to be called when this card clicked
  const evtHandler = evt => {
    console.log(`set eventId to ${event.eventId}`);
    localStorage.setItem('eventId', event.eventId);
  };
  cardDiv.querySelector('#' + event.eventId + '-card').addEventListener('click', evtHandler);
});