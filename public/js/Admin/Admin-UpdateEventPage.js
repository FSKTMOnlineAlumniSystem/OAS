sessionStorage.setItem('event', 'update')
const imgPath = "/Assets/imgs/";
let eventArray=event_array
var inputValue;
var imageName;
var inputValue;
//image
const img = document.querySelector('#wizard-picture');
const wizardPicturePreview = document.querySelector("#prevImage");
const eventPicture = document.querySelector('#eventPicture');

const title = document.getElementById("title");
const description = document.getElementById("description");
const locate = document.getElementById("location");
const date = document.getElementById("date");
const time = document.getElementById("time");
const form = document.querySelector('form');
const saveButton = document.querySelector('#saveButton');
const cancelButton = document.querySelector('#cancelButton');
const closeCancelChangesModalButton = document.querySelector('#closeCancelChangesModalButton');
const stayButton = document.querySelector('#stayButton');
const choosePictureDescription = document.querySelector('#choosePictureDescription');

var i = localStorage.getItem("updateId")
localStorage.setItem('eventId',eventArray[i].eventId)
var d = new Date(eventArray[i].dateTime);
var todayDate = d.toISOString().slice(0, 10);
let hour = d.getHours().toString();
hour = hour.padStart(2, '0');
let minute = d.getMinutes().toString();
  minute = minute.padStart(2, '0');

document.getElementById('title').value=eventArray[i].title
document.getElementById('date').value=todayDate
var timevalue = hour +':'+ minute;
document.getElementById('time').value=timevalue
document.getElementById('description').value=eventArray[i].description
document.getElementById('location').value=eventArray[i].location

var check=eventArray[i].imageId=='Default';
var isNull=eventArray[i].imageId==null;
if(check||isNull){
  document.getElementById('prevImage').src="/Assets/imgs/default_events.jpg";
}else{
  document.getElementById('prevImage').src=eventArray[i].imageId;
}
var titlevalue = eventArray[i].title;
  var descriptionvalue = eventArray[i].description;
  var locatevalue = eventArray[i].location;
  var datevalue = todayDate;
 