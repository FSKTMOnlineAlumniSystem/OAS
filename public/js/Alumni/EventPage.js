const eventCardArr = Array.from(document.querySelectorAll('.event-card-body'));
eventCardArr.forEach(evtCardEle => {
  const dateEle = evtCardEle.querySelector('[data-datetime="date"]');
  const timeEle = evtCardEle.querySelector('[data-datetime="time"]');
  const dateTime = dateEle.innerText; // both original string is the same, hence only 1 string needed
  dateEle.innerText = getReadableDate(dateTime);
  timeEle.innerText = getReadableTime(dateTime);
});
// search module
const searchBtn = document.getElementById('search-button');
searchBtn.addEventListener('click', evt => {
  // get query string
  const searchQueryEle = document.getElementById("search_item");
  // we can know user searching by getting the searchQuery.value
  const searchQuery = searchQueryEle.value.toLowerCase();
  console.log(searchQuery);
  if (searchQuery == "") {
    alert("Hi, type something to search!");
    return;
  }
  var url = new URL('http://localhost:8080/api/event');
  var params = { search: searchQuery };
  url.search = new URLSearchParams(params).toString();

  fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
  }).then(res => {
    console.log('get res');
    return res.json();
  }).then(data => {
    console.log(data);
    if(true){
      insertSearchNoResult(document.getElementById("no_result"));
    }
  })

});