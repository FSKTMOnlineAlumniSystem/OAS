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
  var url = new URL(location.href);
  var params = { search: searchQuery };
  url.search = new URLSearchParams(params).toString();
  console.log(url.href);
  location.href = (url.href);
});
// check if any event card exists
const cardNodeList = document.querySelectorAll('.card');
if(Array.from(cardNodeList).length === 0){
  insertSearchNoResult(document.getElementById("no_result"));
}else{
  console.log('found events');
}