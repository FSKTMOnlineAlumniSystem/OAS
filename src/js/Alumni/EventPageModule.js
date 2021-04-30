import { dummyResponse } from '../dummydata.js';

export const getCardStructure = (eventId, imageId, title, dateTime, location) => {
  return `<a href="/src/html/Alumni/EventDetailsPage.html" target="_self" id="${eventId}-card" class="nostyle">
  <div class="card h-100 card--bg-light-gray">
    <div style="aspect-ratio:1/1;" class="d-flex align-items-center custom-dark-gray">
      <img src="/Assets/imgs/${imageId}" class="card-img-top image__fixed-height m-auto w-100" alt="eventPhoto">
    </div>
    <div class="card-body">
      <h5 class="card-title">${title}</h5>
      <p class="card-text">
      <div class="row cards">
        <div class="col-2"><i class="far fa-calendar-alt" style="color: rgb(218, 58, 47);"></i>
        </div>
        <div class="col-10">${getReadableDate(dateTime)}</div>
      </div>
      <div class="row cards">
        <div class="col-2"><i class="far fa-clock text-primary"></i></div>
        <div class="col-10">${getReadableTime(dateTime)}</div>
      </div>
      <div class="row cards">
        <div class="col-2"><i class="fas fa-map-marked-alt text-danger"></i></div>
        <div class="col-10">${location}</div>
      </div>
      </p>
    </div>
  </div>
</a>`
}
// the parent node should be a div with class 'row'
export const loadEventSection = (eventArr, parentNode, errorMsg) => {
  console.log(eventArr);
  if(eventArr.length === 0){
    const noEventSection = document.createElement('div');
    noEventSection.setAttribute('class', 'alert custom-light-purple text-white');
    noEventSection.innerText = errorMsg;
    parentNode.appendChild(noEventSection);
  }
  eventArr.forEach(event => {
    const eventDetails = dummyResponse.Event.filter(evt => evt.eventId === event.eventId)[0];
    const { title, dateTime, imageId } = eventDetails;
    
    const cardDiv = document.createElement('div');
    cardDiv.setAttribute('class', 'col-12 col-sm-6 col-md-4 col-lg-3 mb-4');
    cardDiv.innerHTML = getCardStructure(event.eventId, imageId, title, dateTime, eventDetails.location);
    parentNode.appendChild(cardDiv);
  
    // function to be called when this card clicked
    const evtHandler = evt => {
      console.log(`set eventId to ${event.eventId}`);
      localStorage.setItem('eventId', event.eventId);
    };
    cardDiv.querySelector('#' + event.eventId + '-card').addEventListener('click', evtHandler);
  });
}

export const loadEventList = (eventArr, parentNode, eraseEventPage) => {
  console.log('loading event based on search query');
  if(eraseEventPage){
    document.getElementById('event-page-section').innerHTML = ``;
  }
  // append the title
  const pageTitle = document.createElement('h3');
  pageTitle.innerText = 'Your search result'
  pageTitle.setAttribute('class', 'pb-2');
  const section = document.createElement('div');
  section.setAttribute('class', 'row');
  if(eventArr.length === 0){
    pageTitle.innerText = 'All Upcoming Events'
    // append the sectio in event-page-section first
    document.getElementById('event-page-section').appendChild(pageTitle);
    document.getElementById('event-page-section').appendChild(section);
    loadEventSection(dummyResponse.Event, section);
    return;
  }
  console.log(parentNode);
  parentNode.appendChild(pageTitle);
  eventArr.forEach(event => {
    const eventDetails = dummyResponse.Event.filter(evt => evt.eventId === event.eventId)[0];
    const { title, dateTime, imageId } = eventDetails;
    
    const cardDiv = document.createElement('div');
    cardDiv.setAttribute('class', 'col-12 col-sm-6 col-md-4 col-lg-3 mb-4');
    cardDiv.innerHTML = getCardStructure(event.eventId, imageId, title, dateTime, eventDetails.location);
    section.appendChild(cardDiv);
    // function to be called when this card clicked
    const evtHandler = evt => {
      console.log(`set eventId to ${event.eventId}`);
      localStorage.setItem('eventId', event.eventId);
    };
    cardDiv.querySelector('#' + event.eventId + '-card').addEventListener('click', evtHandler);
  });
  parentNode.appendChild(section);
}