console.log('testing')
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

// window.readURL=function(input) {
//   inputValue=input.value;
//   console.log(inputValue)
  
//     if (input.files && input.files[0]) {
//         var reader = new FileReader();

//         reader.onload = function (e) {
//             document.getElementById("prevImage").src = e.target.result;
//             document.getElementById("wizardPicturePreview").src = e.target.result;
//         }
//         reader.readAsDataURL(input.files[0]);
//     }
    
// }


var i = localStorage.getItem("updateId")
localStorage.setItem('eventId',dummyResponse.Event[i].eventId)
var d = new Date(dummyResponse.Event[i].dateTime);
var todayDate = d.toISOString().slice(0, 10);
console.log("date"+todayDate);

// const minute = d.getMinutes();
let hour = d.getHours();
let minute = d.getMinutes().toString();
  minute = minute.padStart(2, '0');
console.log(hour)
console.log(minute)

document.getElementById('title').value=dummyResponse.Event[i].title
document.getElementById('date').value=todayDate
document.getElementById('time').value=hour +':'+ minute
console.log(hour +':'+ minute)
document.getElementById('description').value=dummyResponse.Event[i].description
document.getElementById('location').value=dummyResponse.Event[i].location
document.getElementById('prevImage').src=imgPath+dummyResponse.Event[i].imageId

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
    update_array();
    console.log('no error')
    saveButton.textContent = 'Saving...';
    setTimeout(() => {
      location.href = 'Admin-EventPage.html';
    }, 1000);
  }
});

window.update_array = function () {
    var i = localStorage.getItem("updateId")
    console.log("i=" + i)
    console.log("update element")
    var title = document.getElementById("title").value;
    var date = document.getElementById("date").value;
    var time = document.getElementById("time").value;
console.log(date)
    var year = date.split("-")[0];
    var month =  date.split("-")[1];
    var day = date.split("-")[2];
    var hours = time.split(":")[0];
    var min = time.split(":")[1];
    const newDate = new Date(year, month, day, hours, min, "0");

    var description = document.getElementById("description").value;
    var location = document.getElementById("location").value;
    // var image = document.getElementById("prevImage").value;
// if(inputValue){
//     var imageArr=inputValue.split("\\");
//     var imageName=imageArr[imageArr.length-1];
// }
// else{
//   var image=document.getElementById("prevImage").src;
//   var imageArr=image.split("/");
//   var imageName=imageArr[imageArr.length-1];
// }
// console.log(imageName)
//     console.log("image name: "+imageName);

    if(img.value){
      const imgLocalPathArr = img.value.split('\\');
      imageName = imgLocalPathArr[imgLocalPathArr.length-1];
      console.log("the image name is: "+imageName);
    }
    else{
      console.log('image value over here')
      imageName=dummyResponse.Event[i].imageId;
    }
    var eventId = dummyResponse.Event[i].eventId
    var adminId = dummyResponse.Event[i].adminId 
    //need connect to localstorege ltr
    // var d = new Date(dummyResponse.Event[i].dateTime);
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
    console.log(dummyResponse)
}
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

  // console.log('compare: '+(titlevalue=='hellooooo'))
  var image = document.getElementById("prevImage").src;
  var compare = image.localeCompare("https://lh3.googleusercontent.com/LfmMVU71g-HKXTCP_QWlDOemmWg4Dn1rJjxeEsZKMNaQprgunDTtEuzmcwUBgupKQVTuP0vczT9bH32ywaF7h68mF-osUSBAeM6MxyhvJhG6HKZMTYjgEv3WkWCfLB7czfODidNQPdja99HMb4qhCY1uFS8X0OQOVGeuhdHy8ln7eyr-6MnkCcy64wl6S_S6ep9j7aJIIopZ9wxk7Iqm-gFjmBtg6KJVkBD0IA6BnS-XlIVpbqL5LYi62elCrbDgiaD6Oe8uluucbYeL1i9kgr4c1b_NBSNe6zFwj7vrju4Zdbax-GPHmiuirf2h86eKdRl7A5h8PXGrCDNIYMID-J7_KuHKqaM-I7W5yI00QDpG9x5q5xOQMgCy1bbu3St1paqt9KHrvNS_SCx-QJgBTOIWW6T0DHVlvV_9YF5UZpN7aV5a79xvN1Gdrc7spvSs82v6gta8AJHCgzNSWQw5QUR8EN_-cTPF6S-vifLa2KtRdRAV7q-CQvhMrbBCaEYY73bQcPZFd9XE7HIbHXwXYA=s200-no")
  if (!img.value && 
    titlevalue==title.value && 
    descriptionvalue==description.value && 
    locatevalue==locate.value&& 
    datevalue==date.value && 
    timevalue==time.value) {
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


// document.getElementById("updateForm").innerHTML=`
//           <div class="form-group">
//             <label for="formGroupExampleInput">Event Title :</label>
//             <input type="text" class="form-control rounded-0 w-75 p-3" id="title" placeholder="Enter new event title"
//               value="${dummyResponse.Event[i].title}" required>
//               <div class="valid-feedback">Valid.</div>
//               <div id="contactNumberFeedback" class="invalid-feedback">
//                 Please provide the title of the event.
//               </div>
//           </div>

//           <div class="form-group">
//             <label for="formGroupExampleInput2">Schedule :</label> <br>
//             <input type=date value="${todayDate}" id="date"> &nbsp;
//             <input type=time value="${hour}:${minute}" id="time"> 

//             <div id="contactNumberFeedback" class="invalid-feedback">
//             Please provide both date and time of the event.
//             </div>
//           </div>

//           <div class="form-group">
//             <label for="formGroupExampleInput2" >Description :</label>
//             <textarea type="text" class="form-control rounded-0" id="description"
//               placeholder="Enter new schedule" value="${dummyResponse.Event[i].description}" rows="5" ;>${dummyResponse.Event[i].description}</textarea>
//               <div class="valid-feedback">Valid.</div>
//               <div id="contactNumberFeedback" class="invalid-feedback">
//                 Please provide a brief description for the event.
//               </div>
          
//               </div>
      
//           <div class="form-group">
//             <label for="formGroupExampleInput2" >Location :</label>
//             <input type="text " class="form-control rounded-0 w-75 p-3" id="location"
//               placeholder="Enter new location" value="${dummyResponse.Event[i].location}">
//               <div class="valid-feedback">Valid.</div>
//               <div id="contactNumberFeedback" class="invalid-feedback">
//               Please provide the location of the event.
//               </div>
//           </div>
          
          
//           <div class="w-25 position-relative">
//           <label for="phfile">Event Picture:</label>
//             <div class="picture-container">
//               <div class="picture">
//                 <img src="${imgPath+dummyResponse.Event[i].imageId}" 
//                 id="prevImage" alt="update Image" width="150" length="150">
//                 <input type="file" id="wizard-picture">
//                 <div id="contactNumberFeedback" class="invalid-feedback">
//                     Please provide a picture for the event.
//                 </div>
//               </div>
//               <h6 id="choosePictureDescription"></h6>
//             </div>
//           </div>

// `