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
const searchInput = document.getElementById('search_item');
const handleSearching = evt => {
  // get query string
  const searchQueryEle = document.getElementById("search_item");
  // we can know user searching by getting the searchQuery.value
  const searchQuery = searchQueryEle.value.toLowerCase();
  if(searchQuery.trim() === ""){
    location.href = '/event';
  }else{
    var url = new URL(location.href);
    var params = { search: searchQuery };
    url.search = new URLSearchParams(params).toString();
    location.href = (url.href);
  }
};
searchBtn.addEventListener('click', handleSearching);
searchInput.addEventListener('keypress', (evt) => {
  if (evt.key === 'Enter') {
    handleSearching(evt);
  }
});
// check if any event card exists
const cardNodeList = document.querySelectorAll('.card');
if (Array.from(cardNodeList).length === 0) {
  insertSearchNoResult(document.getElementById("no_result"));
} else {
}
// pagination handling
const toEventPage = (pageIdx) => {
  var url = new URL(location.href);
  var params = { page: pageIdx };
  url.search = new URLSearchParams(params).toString();
  location.href = (url.href);
}
const curPageIndex = document.querySelector('[data-cur-page-index]')?document.querySelector('[data-cur-page-index]').innerText:-1;
// add event listeners
const prevPageBtn = document.getElementById('previousEventPage');
const nextPageBtns = Array.from(document.querySelectorAll('.nextEventPage'));
const next2PageBtn = document.getElementById('next2EventPage');
if (prevPageBtn) {
prevPageBtn.addEventListener('click', evt => {
  toEventPage(parseInt(curPageIndex)-1);
});
}
nextPageBtns.forEach(btn => {
  btn.addEventListener('click', evt => {
    toEventPage(parseInt(curPageIndex)+1);
  });
});
if (next2PageBtn) {
  next2PageBtn.addEventListener('click', evt => {
    toEventPage(parseInt(curPageIndex)+2);
  });
}