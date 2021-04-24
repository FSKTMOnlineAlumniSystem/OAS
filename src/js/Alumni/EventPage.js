const upcomingEventSection = document.getElementById('upcoming-event-section');
const YourUpcomingEventSection = document.getElementById('your-upcoming-event-section');

const myEvent = dummyResponse.Alumni_Event.filter(event => {
  return event.alumniId === localStorage.getItem('SignedInAlumniId');
});
const notMyEvent = dummyResponse.Alumni_Event.filter(event => {
  return event.alumniId !== localStorage.getItem('SignedInAlumniId');
});
console.log(notMyEvent);

// build html nodes based on myEvent
myEvent.forEach(event => {
  eventDetails = dummyResponse.Event.filter(evt => evt.eventId === event.eventId)[0];
  const { title, dateTime, imageId } = eventDetails;
  console.log(`${title} ${dateTime} ${imageId}`);
  const eventDateTime = new Date(dateTime);
  const mm = eventDateTime.getMonth();
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const month = monthNames[mm];
  const dd = eventDateTime.getDate();
  const yyyy = eventDateTime.getFullYear();
  const minute = eventDateTime.getMinutes();
  let hour = eventDateTime.getHours();
  const period = hour > 11 ? 'p.m.' : 'a.m.';
  hour = hour === 0 ? 12 : hour;
  hour = hour > 12 ? hour - 12 : hour;

  YourUpcomingEventSection.innerHTML += `<div class="col mb-4">
  <a href="#" target="_blank">
    <div class="card">
      <img src="/Assets/imgs/${imageId}" class="card-img-top" alt="eventPhoto">
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">
        <div class="row cards">
          <div class="col-1"><img src="/Assets/imgs/calendar.png" alt="time" height="24" width="24">
          </div>
          <div class="col-7">${month} ${dd}, ${yyyy}</div>
        </div>
        <div class="row cards">
          <div class="col-1"> <img src="/Assets/imgs/time.png" alt="time" height="24" width="24"></div>
          <div class="col-9">${hour}:${minute} ${period}</div>
        </div>
        </p>
      </div>
    </div>
  </a>
</div>`;
});