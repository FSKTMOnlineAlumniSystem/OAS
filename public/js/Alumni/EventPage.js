const eventCardArr = Array.from(document.querySelectorAll('.event-card-body'));
eventCardArr.forEach(evtCardEle => {
  const dateEle = evtCardEle.querySelector('[data-datetime="date"]');
  const timeEle = evtCardEle.querySelector('[data-datetime="time"]');
  const dateTime = dateEle.innerText; // both original string is the same, hence only 1 string needed
  dateEle.innerText = getReadableDate(dateTime);
  timeEle.innerText = getReadableTime(dateTime);
});