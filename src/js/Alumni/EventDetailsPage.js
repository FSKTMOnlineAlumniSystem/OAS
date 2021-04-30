import { dummyResponse } from '../dummydata.js';

// const eventTitle = document.getElementById('event-title');
// eventTitle.innerText = localStorage.getItem('eventId');
const theEvent = dummyResponse.Event.filter(event => event.eventId === localStorage.getItem('eventId'))[0];
const { title, dateTime, description, imageId } = theEvent;

// append child nodes
const titleAndImage = document.createElement('div');
titleAndImage.setAttribute('class', 'row')
titleAndImage.innerHTML = `
  <div class="col-12">
    <h3>${title}</h3>
    <hr
      style="
        height: 3px;
        border-width: 0;
        color: rgb(0, 0, 0);
        background-color: black;
      "
    />
    <div class="row">
      <div class="col-12 col-md-6">
        <img
          src="/Assets/imgs/${imageId}"
          class="image--max-size-100-percent"
          alt="Event Poster "
        />
      </div>
      <div class="col-12 col-md-6">
        <div class='row my-3'>
          <div class='col-4 d-flex justify-content-center'>
            <i class="far fa-calendar-alt fa-3x" style="color: rgb(218, 58, 47); font-size: 50px"></i>
          </div>
          <div class='col-8 d-flex align-items-center'>
            <span class="icon_Text pt-3 pt-sm-0">${getReadableDate(dateTime)}</span>
          </div>
        </div>
        <div class='row my-3'>
          <div class='col-4 d-flex justify-content-center'>
            <i class="far fa-clock fa-3x" style="color: rgb(118, 172, 250); font-size: 50px"></i>
          </div>
          <div class='col-8 d-flex align-items-center'>
            <span class="icon_Text pt-3 pt-sm-0">${getReadableTime(dateTime)}</span>
          </div>
        </div>
        <div class='row my-3'>
          <div class='col-4 d-flex justify-content-center'>
            <i class="fas fa-map-marked-alt fa-3x" style="color: rgb(167, 0, 0); font-size: 50px"></i>
          </div>
          <div class='col-8 d-flex align-items-center'>
            <span class="icon_Text pt-3 pt-sm-0">${theEvent.location}</span>
          </div>
        </div>
      </div>
    </div>
  </div>`
const eventInfo = document.createElement('div');
eventInfo.innerHTML = ``
{/* <i class="far fa-calendar-alt fa-3x" style="color: rgb(218, 58, 47); font-size: 50px"></i> */}
{/* <i class="far fa-clock fa-3x" style="color: rgb(118, 172, 250); font-size: 50px"></i> */}
{/* <i class="fas fa-map-marked-alt fa-3x" style="color: rgb(167, 0, 0); font-size: 50px"></i> */}
const descriptionBlock = document.createElement('div');
descriptionBlock.innerHTML = `
<div class="jumbotron">
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h4 class="pt-3"><b>Event Description</b></h4>
        <p class="lead">
          ${description}
        </p>
      </div>
    </div>
  </div>
</div>`
// console.log(eventInfo);
document.getElementById('main-body').appendChild(titleAndImage);
document.getElementById('main-body').appendChild(document.createElement('br'));
// document.getElementById('main-body').appendChild(eventInfo);
document.getElementById('main-body').appendChild(document.createElement('br'));
document.getElementById('main-body').appendChild(descriptionBlock);