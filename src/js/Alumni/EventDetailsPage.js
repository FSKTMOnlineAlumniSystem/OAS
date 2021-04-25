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
  <div class="col-12 align-items-center p-2 mb-2">
    <i
      class="fa fa-calendar fa-3x mr-3"
      style="color: rgb(218, 58, 47); font-size: 50px"
    ></i>
    <span class="icon_Text">${getReadableDate(dateTime)}</span>
  </div>
  <div class="col-12 align-items-center p-2 mb-2">
    <i
      class="fa fa-clock-o fa-3x mr-3"
      aria-hidden="true "
      style="color: rgb(118, 172, 250); font-size: 50px"
    ></i>
    <span class="icon_Text">${getReadableTime(dateTime)}</span>
  </div>
  <div class="col-12 align-items-center p-2 mb-2">
    <i
      class="fa fa-map-marker fa-3x mr-4"
      aria-hidden="true "
      style="color: rgb(167, 0, 0); font-size: 50px"
    ></i>
    <span class="icon_Text">${theEvent.location}</span>
  </div>
  <div class="col-12 align-items-center p-2 mb-2">
    <i
      class="fa fa-file-text fa-3x mr-3"
      aria-hidden="true "
      style="color: rgb(175, 80, 175); font-size: 50px"
    ></i>
    <span class="icon_Text"
      ><a
        href="https://www.google.com/forms/about/ "
        target="_blank "
        rel="noopener noreferrer "
        >Register Link</a
      ></span>
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
<hr class="my-4" color="grey " />
<a
  class="btn btn-primary btn-lg"
  href="https://www.google.com/forms/about/ "
  target="_blank "
  rel="noopener noreferrer "
  role="button "
  >Join Us</a
>
</div>`
// console.log(eventInfo);
document.getElementById('main-body').appendChild(titleAndImage);
document.getElementById('main-body').appendChild(document.createElement('br'));
document.getElementById('main-body').appendChild(eventInfo);
document.getElementById('main-body').appendChild(document.createElement('br'));
document.getElementById('main-body').appendChild(descriptionBlock);