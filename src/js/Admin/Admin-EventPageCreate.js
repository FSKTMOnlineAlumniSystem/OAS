console.log('testing')

import { dummyResponse, updateDummyData } from "../dummydata.js";
sessionStorage.setItem('event', 'create')
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

// window.readURL = function (input) {
//   inputValue = input.value;
//   if (input.files && input.files[0]) {
//     var reader = new FileReader();

//     reader.onload = function (e) {
//       document.getElementById("prevImage").src = e.target.result;
//       document.getElementById("wizardPicturePreview").src = e.target.result;
//     }
//     reader.readAsDataURL(input.files[0]);
//   }
// }
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
  console.log('what is change :'+ e.target.files +"   "+e.target.files[0])
  let allowedExtensions =
    /(\.png|\.jpg|\.jpeg)$/i;
  if (e.target.files && e.target.files[0] && allowedExtensions.test(e.target.value)) {
    var reader = new FileReader();
    console.log("reader")
    reader.onload = function (e) {
      document.getElementById("prevImage").src = e.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
    choosePictureDescription.textContent = "";
  } else {
    choosePictureDescription.textContent = "Please choose picture in .png, .jpg or .jpeg format";
    
  }
  // console.log('jpg: '+allowedExtensions.test(e.target.value))
  // if(allowedExtensions.test(e.target.value)){
  //   setValid(img)
  // }else{setInValid(img);
  //   errorExist = true;
  // }
}
/*Form Validation for Edit My Profile (email, contactNumber, biography)*/
function isEmpty(obj) {
  return obj.value.length == 0;
}
// const emailFormat = /[a-zA-Z0-9]+@[a-z0-9]+(\.[a-z]+)+/;
// const phoneNumberFormat = /[0-9]+-[0-9]{7,}/;

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


  // if (isEmpty(img)) {
  //   setInValid(img);
  //   errorExist = true;
  // } else {
  //   setValid(img);
  // }

  if (!errorExist) {
    add_element_to_array();
    console.log('no error')
    saveButton.textContent = 'Saving...';
    setTimeout(() => {
      location.href = 'Admin-EventPage.html';
    }, 1000);
  }
});

window.add_element_to_array = function () {
  console.log("add element")
  var title = document.getElementById("title").value;
  var description = document.getElementById("description").value;
  var location = document.getElementById("location").value;

  if(img.value){
    const imgLocalPathArr = img.value.split('\\');
    imageName = imgLocalPathArr[imgLocalPathArr.length-1];
}

  // var imageArr = inputValue.split("\\");
  // imageName = imageArr[imageArr.length - 1];
  // console.log("imageName: " + imageName);
  var endIndex = dummyResponse.Event.length;
  var newId = endIndex + 1
  var eventId = "E-" + newId
  var adminId = localStorage.getItem("SignedInAlumniId"); //need connect to localstorege ltr
  // var d = new Date(dummyResponse.Event[i].dateTime);
  var date = document.getElementById("date").value;
  var time = document.getElementById("time").value;
  console.log(date)
  var year = date.split("-")[0];
  var month = date.split("-")[1];
  var day = date.split("-")[2];
  var hours = time.split(":")[0];
  var min = time.split(":")[1];
  const newDate = new Date(year, month, day, hours, min, "0");
  console.log(date)

  var newEvent = {
    eventId: eventId,
    adminId: adminId,
    title: title,
    dateTime: newDate,
    description: description,
    imageId: imageName,
    location: location
  }
  dummyResponse.Event.splice(endIndex, 0, newEvent)
  updateDummyData(dummyResponse)
  console.log(dummyResponse)
  // location.reload();
}

window.setEventId = function () {
  var endIndex = dummyResponse.Event.length;
  var newId = endIndex + 1
  var eventId = "E-" + newId
  localStorage.setItem('eventId', eventId);
}
/*Check whether there is any changes that might be lost*/
// const cancelButton = document.querySelector('#cancelButton');
cancelButton.addEventListener('click', () => {
  var titlevalue = document.getElementById("title").value;
  var descriptionvalue = document.getElementById("description").value;
  var locatevalue = document.getElementById("location").value;
  var datevalue = document.getElementById("date").value;
  var timevalue = document.getElementById("time").value;
  console.log('title: ' + titlevalue)
  console.log('description: ' + descriptionvalue)
  console.log('location: ' + locatevalue)
  console.log('date: ' + datevalue)
  console.log('time: ' + timevalue)

  var image = document.getElementById("prevImage").src;
  var compare = image.localeCompare("https://www.ris.org.in/sites/all/themes/ris/images/default-events.jpg")
  if (compare == 0 && !titlevalue && !descriptionvalue && !locatevalue
    && !datevalue && !timevalue) {
    console.log("hereeeeeeeeeee")
    location.href = 'Admin-EventPage.html';
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
