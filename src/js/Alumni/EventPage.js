import { dummyResponse } from '../dummydata.js';

const upcomingEventSection = document.getElementById('upcoming-event-section');
const yourUpcomingEventSection = document.getElementById('your-upcoming-event-section');

const myEvent = dummyResponse.Alumni_Event.filter(event => {
  return event.alumniId === localStorage.getItem('SignedInAlumniId');
});
const notMyEvent = dummyResponse.Alumni_Event.filter(event => {
  return event.alumniId !== localStorage.getItem('SignedInAlumniId');
});
console.log(notMyEvent);

// build html nodes based on myEvent
myEvent.forEach(event => {
  const eventDetails = dummyResponse.Event.filter(evt => evt.eventId === event.eventId)[0];
  const { title, dateTime, imageId } = eventDetails;
  // console.log(`${title} ${dateTime} ${imageId}`);
  
  // /src/html/Alumni/EventDetailsPage.html
  const cardDiv = document.createElement('div');
  cardDiv.setAttribute('class', 'col-12 col-sm-6 col-md-4 mb-4');
  cardDiv.innerHTML = `
  <a href="/src/html/Alumni/EventDetailsPage.html" target="_self" id="${event.eventId}-card">
    <div class="card h-100">
      <img src="/Assets/imgs/${imageId}" class="card-img-top image__fixed-height" alt="eventPhoto">
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">
        <div class="row cards">
          <div class="col-1"><img src="/Assets/imgs/calendar.png" alt="time" height="24" width="24">
          </div>
          <div class="col-7">${getReadableDate(dateTime)}</div>
        </div>
        <div class="row cards">
          <div class="col-1"> <img src="/Assets/imgs/time.png" alt="time" height="24" width="24"></div>
          <div class="col-9">${getReadableTime(dateTime)}</div>
        </div>
        </p>
      </div>
    </div>
  </a>`;
  yourUpcomingEventSection.appendChild(cardDiv);

  // function to be called when this card clicked
  // console.log(yourUpcomingEventSection.lastChild.querySelector('a'));
  // console.log(document.getElementById(event.eventId + '-card'));
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
  cardDiv.setAttribute('class', 'col-12 col-sm-6 col-md-4 mb-4');
  cardDiv.innerHTML = `
  <a href="/src/html/Alumni/EventDetailsPage.html" target="_self" id="${event.eventId}-card">
    <div class="card h-100">
      <img src="/Assets/imgs/${imageId}" class="card-img-top image__fixed-height" alt="eventPhoto">
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">
        <div class="row cards">
          <div class="col-1"><img src="/Assets/imgs/calendar.png" alt="time" height="24" width="24">
          </div>
          <div class="col-7">${getReadableDate(dateTime)}</div>
        </div>
        <div class="row cards">
          <div class="col-1"> <img src="/Assets/imgs/time.png" alt="time" height="24" width="24"></div>
          <div class="col-9">${getReadableTime(dateTime)}</div>
        </div>
        </p>
      </div>
    </div>
  </a>`;
  upcomingEventSection.appendChild(cardDiv);

  // function to be called when this card clicked
  const evtHandler = evt => {
    console.log(`set eventId to ${event.eventId}`);
    localStorage.setItem('eventId', event.eventId);
  };
  cardDiv.querySelector('#' + event.eventId + '-card').addEventListener('click', evtHandler);
});