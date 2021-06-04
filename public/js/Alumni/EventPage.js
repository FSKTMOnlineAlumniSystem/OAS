const eventDate = document.getElementById('event-date');
const eventTime = document.getElementById('event-time');
const dateTime = eventDate.innerText;
eventDate.innerText = getReadableDate(dateTime);
eventTime.innerText = getReadableTime(dateTime);