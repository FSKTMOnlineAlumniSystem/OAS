// import { dummyResponse, updateDummyData } from "../dummydata.js";
let eventArray=event_array
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

{/* <form method="post" onsubmit="return checkvalidation()"></form> */}
console.log('create page')
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
///////////////////////need for validation
// img.addEventListener('change', (e) => readURL(e));
// function readURL(e) {
//   let allowedExtensions =
//     /(\.png|\.jpg|\.jpeg)$/i;
//   if (e.target.files && e.target.files[0] && allowedExtensions.test(e.target.value)) {
//     var reader = new FileReader();
//     reader.onload = function (e) {
//       document.getElementById("prevImage").src = e.target.result;
//     }
//     reader.readAsDataURL(e.target.files[0]);
//     choosePictureDescription.textContent = "";
//   } else {
//     choosePictureDescription.textContent = "Please choose picture in .png, .jpg or .jpeg format";
    
//   }
// }

/*Form Validation for Edit My Profile (email, contactNumber, biography)*/
function isEmpty(obj) {
  return obj.value.length == 0;
}

// form.addEventListener('submit', (e) => {
//   e.preventDefault();
function checkvalidation() {
  console.log("here");
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
    add_element_to_array();
    saveButton.textContent = 'Saving...';
  //   // setTimeout(() => {
  //   //   location.href = 'adminEvent';
  //   // }, 1000);
  }
};

window.add_element_to_array = function () {
  var title = document.getElementById("title").value;
  var description = document.getElementById("description").value;
  var location = document.getElementById("location").value;

  if(img.value){
    const imgLocalPathArr = img.value.split('\\');
    imageName = imgLocalPathArr[imgLocalPathArr.length-1];
}

  var endIndex = eventArray.length;
  var newId = endIndex + 1
  var eventId = "E-" + newId
  var adminId = localStorage.getItem("SignedInAlumniId"); //need connect to localstorege later
  var date = document.getElementById("date").value;
  var time = document.getElementById("time").value;
  var year = date.split("-")[0];
  var month = date.split("-")[1];
  var day = date.split("-")[2];
  var hours = time.split(":")[0];
  var min = time.split(":")[1];
  const newDate = new Date(year, month, day, hours, min, "0");
document.getElementById('dateTime').value=newDate;
  
  var newEvent = {
    eventId: eventId,
    adminId: adminId,
    title: title,
    dateTime: newDate,
    description: description,
    imageId: imageName,
    location: location
  }
  eventArray.splice(endIndex, 0, newEvent)
  // updateDummyData(dummyResponse)
  }

window.setEventId = function () {
  var endIndex = eventArray.length;
  var newId = endIndex + 1
  var eventId = "E-" + newId
  localStorage.setItem('eventId', eventId);
}
console.log('hellooo');
/*Check whether there is any changes that might be lost*/
function cancelUpdate(){
// cancelButton.addEventListener('click', () => {
  console.log("hiii");
  var titlevalue = document.getElementById("title").value;
  var descriptionvalue = document.getElementById("description").value;
  var locatevalue = document.getElementById("location").value;
  var datevalue = document.getElementById("date").value;
  var timevalue = document.getElementById("time").value;
  var image = document.getElementById("prevImage").src;
  var compare = image.localeCompare("https://www.ris.org.in/sites/all/themes/ris/images/default-events.jpg")
  if (compare == 0 && !titlevalue && !descriptionvalue && !locatevalue
    && !datevalue && !timevalue) {
    location.href = "adminEvent";
  } else {
    /*POP UP MODAL ask if cancel will lose changes */
    $('#cancelChangesModal').modal('show');
  }
};

/*Close Modal */
// closeCancelChangesModalButton.addEventListener('click', () => closeModal('#cancelChangesModal'));
// stayButton.addEventListener('click', () => closeModal('#cancelChangesModal'));
function closeModal(modalId) {
  $(modalId).modal('hide');
}
