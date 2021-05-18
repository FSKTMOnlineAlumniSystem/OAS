sessionStorage.setItem('event', 'update')
import {dummyResponse, updateDummyData} from "../dummydata.js";
const imgPath = "/Assets/imgs/";

var inputValue;
var imageName;
var inputValue;
const img = document.querySelector('#wizard-picture');
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
localStorage.setItem('eventId',dummyResponse.Event[i].eventId)
var d = new Date(dummyResponse.Event[i].dateTime);
var todayDate = d.toISOString().slice(0, 10);

// const minute = d.getMinutes();
let hour = d.getHours();
let minute = d.getMinutes().toString();
  minute = minute.padStart(2, '0');

document.getElementById('title').value=dummyResponse.Event[i].title
document.getElementById('date').value=todayDate
document.getElementById('time').value=hour +':'+ minute
document.getElementById('description').value=dummyResponse.Event[i].description
document.getElementById('location').value=dummyResponse.Event[i].location
document.getElementById('prevImage').src=imgPath+dummyResponse.Event[i].imageId

var titlevalue = dummyResponse.Event[i].title;
  var descriptionvalue = dummyResponse.Event[i].description;
  var locatevalue = dummyResponse.Event[i].location;
  var datevalue = todayDate;
  var timevalue = hour +':'+ minute;

function setInValid(el) {
  if (el.classList.contains("is-valid")) {
    el.classList.replace("is-valid", "is-invalid");
  } else {
    el.classList.add("is-invalid");
  }
}
function setValid(el) {
  if (el.classList.contains("is-invalid")) {
    el.classList.replace("is-invalid", "is-valid");
  } else {
    el.classList.add("is-valid");
  }
}

/*Check the file extension of the image & Update preview*/
img.addEventListener('change', (e) => readURL(e));
function readURL(e) {
  let allowedExtensions =
    /(\.png|\.jpg|\.jpeg)$/i;
  if (e.target.files && e.target.files[0] && allowedExtensions.test(e.target.value)) {
    var reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("prevImage").src = e.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
    choosePictureDescription.textContent = "";
  } else {
    choosePictureDescription.textContent = "Please choose picture in .png, .jpg or .jpeg format";
    
  }
}
/*Form Validation for Edit My Profile (email, contactNumber, biography)*/
function isEmpty(obj) {
  return obj.value.length == 0;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let errorExist = false; //false if no error exists in email, contactNumber, biography

  if (isEmpty(title)) {
    setInValid(title);
    errorExist = true;
  } else {
    setValid(title);
  }

  if (isEmpty(description)) {
    setInValid(description);
    errorExist = true;
  } else {
    setValid(description);
  }

  if (isEmpty(locate)) {
    setInValid(locate);
    errorExist = true;
  } else {
    setValid(locate);
  }

  if (isEmpty(date)) {
    setInValid(date);
    errorExist = true;
  } else {
    setValid(date);
  }

  if (isEmpty(time)) {
    setInValid(time);
    errorExist = true;
  } else {
    setValid(time);
  }

  if (!errorExist) {
    update_array();
    saveButton.textContent = 'Saving...';
    setTimeout(() => {
      location.href = 'adminEvent';
    }, 1000);
  }
});

window.update_array = function () {
    var i = localStorage.getItem("updateId")
    var title = document.getElementById("title").value;
    var date = document.getElementById("date").value;
    var time = document.getElementById("time").value;
    var year = date.split("-")[0];
    var month =  date.split("-")[1];
    var day = date.split("-")[2];
    var hours = time.split(":")[0];
    var min = time.split(":")[1];
    const newDate = new Date(year, month, day, hours, min, "0");

    var description = document.getElementById("description").value;
    var location = document.getElementById("location").value;
 
    if(img.value){
      const imgLocalPathArr = img.value.split('\\');
      imageName = imgLocalPathArr[imgLocalPathArr.length-1];
      }
    else{
      imageName=dummyResponse.Event[i].imageId;
    }
    var eventId = dummyResponse.Event[i].eventId
    var adminId = dummyResponse.Event[i].adminId 
    var newEvent = {
        eventId: eventId,
        adminId: adminId,
        title: title,
        dateTime: newDate, //change
        description: description,
        imageId: imageName, 
        location: location
    }
    dummyResponse.Event.splice(i, 1, newEvent)
    updateDummyData(dummyResponse)
    }
cancelButton.addEventListener('click', () => {
  
  var image = document.getElementById("prevImage").src;
  if (!img.value && 
    titlevalue==title.value && 
    descriptionvalue==description.value && 
    locatevalue==locate.value&& 
    datevalue==date.value && 
    timevalue==time.value) {
    location.href = "adminEvent";
  } else {
    /*POP UP MODAL ask if cancel will lose changes */
    $('#cancelChangesModal').modal('show');
  }
});

/*Close Modal */
closeCancelChangesModalButton.addEventListener('click', () => closeModal('#cancelChangesModal'));
stayButton.addEventListener('click', () => closeModal('#cancelChangesModal'));
function closeModal(modalId) {
  $(modalId).modal('hide');
}
