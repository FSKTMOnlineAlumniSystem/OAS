import { dummyResponse } from '../dummydata.js';

// const eventTitle = document.getElementById('event-title');
// eventTitle.innerText = localStorage.getItem('eventId');
const theEvent = dummyResponse.Event.filter(event => event.eventId === localStorage.getItem('eventId'))[0];
const { title, dateTime, description, imageId } = theEvent;

// append child nodes
const titleAndImage = document.createElement('div');
titleAndImage.innerHTML = `
  <div>
    <h3>${title}</h3>
    <hr
      style="
        height: 3px;
        border-width: 0;
        color: rgb(0, 0, 0);
        background-color: black;
      "
    />
    <div class="text-center">
      <img
        src="/Assets/imgs/${imageId}"
        class="rounded w-50"
        alt="Event Poster "
      />
  </div>`
const eventInfo = document.createElement('div');
eventInfo.innerHTML = `
<div class="container">
<div class="row">
  <div class="col-12 p-2 mb-2">
    <div class='row'>
      <div class='col-1'></div>
      <div class='col-2 d-flex justify-content-center'>
        <i class="fa fa-calendar fa-3x mr-3"
          style="color: rgb(218, 58, 47); font-size: 50px"></i>
      </div>
      <div class='col-8 d-flex align-items-center'>
        <span class="icon_Text pt-3 pt-sm-0">${getReadableDate(dateTime)}</span>
      </div>
    </div>
  </div>
  <div class="col-12 p-2 mb-2">
    <div class='row'>
      <div class='col-1'></div>
      <div class='col-2 d-flex justify-content-center'>
        <i class="fa fa-clock-o fa-3x mr-3"
          style="color: rgb(118, 172, 250); font-size: 50px"></i>
      </div>
      <div class='col-8 d-flex align-items-center'>
        <span class="icon_Text pt-3 pt-sm-0">${getReadableTime(dateTime)}</span>
      </div>
    </div>
  </div>
  <div class="col-12 p-2 mb-2">
    <div class='row'>
      <div class='col-1'></div>
      <div class='col-2 d-flex justify-content-center'>
        <i class="fa fa-map-marker fa-3x mr-3"
          style="color: rgb(167, 0, 0); font-size: 50px"></i>
      </div>
      <div class='col-8 d-flex align-items-center'>
        <span class="icon_Text pt-3 pt-sm-0">${theEvent.location}</span>
      </div>
    </div>
  </div>
</div>
</div>`
const descriptionBlock = document.createElement('div');
descriptionBlock.innerHTML = `
<div class="jumbotron">
<h4><b>Event Description</b></h4>
<p class="lead">
  ${description}
</p>
</div>`
// console.log(eventInfo);
document.getElementById('main-body').appendChild(titleAndImage);
document.getElementById('main-body').appendChild(document.createElement('br'));
document.getElementById('main-body').appendChild(eventInfo);
document.getElementById('main-body').appendChild(document.createElement('br'));
document.getElementById('main-body').appendChild(descriptionBlock);