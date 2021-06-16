const title1 = document.getElementById("title");
const description1 = document.getElementById("description");
const locate1 = document.getElementById("location");
const date1 = document.getElementById("date");
const time1 = document.getElementById("time");
const img = document.querySelector('#wizard-picture');
const wizardPicturePreview = document.querySelector("#prevImage");
const eventPicture = document.querySelector('#eventPicture');
// 
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

function checkvalidation() {
    let errorExist = false; //false if no error exists in email, contactNumber, biography
  
    if (isEmpty(title1)) {
      setInValid(title1);
      errorExist = true;
    } else {
      setValid(title1);
    }
  
    if (isEmpty(description1)) {
      setInValid(description1);
      errorExist = true;
    } else {
      setValid(description1);
    }
  
    if (isEmpty(locate1)) {
      setInValid(locate1);
      errorExist = true;
    } else {
      setValid(locate1);
    }
  
    if (isEmpty(date1)) {
      setInValid(date1);
      errorExist = true;
    } else {
      setValid(date1);
    }
  
    if (isEmpty(time1)) {
      setInValid(time1);
      errorExist = true;
    } else {
      setValid(time1);
    }
  
    if (!errorExist) {
      return true
    }else{
      return false;
    }
  };
  function isEmpty(obj) {
  return obj.value.length == 0;
}

/*Check the file extension of the image & Update preview*/
img.addEventListener("change", (e) => readURL(e));
function readURL(e) {
  // var i = localStorage.getItem("updateId");
  let allowedExtensions =
  /(\.png|\.jpg|\.jpeg)$/i;
if (e.target.files && e.target.files[0] && e.target.files[0].size>10000000) {
  // To handle the file size
  choosePictureDescription.textContent = "Image size must be smaller than 10MB";
}else if (e.target.files && e.target.files[0] && allowedExtensions.test(e.target.value)) {
  eventPicture.files = e.target.files;
  var reader = new FileReader();
  reader.onload = function (e) {
      wizardPicturePreview.src = e.target.result;
  }
  reader.readAsDataURL(e.target.files[0]);
  choosePictureDescription.textContent = "Choose picture";
} else {
  choosePictureDescription.textContent = "Please choose picture in .png, .jpg or .jpeg format";
}
}

/*Check whether there is any changes that might be lost*/
function cancelCreate(){
    var titlevalue = document.getElementById("title").value;
    var descriptionvalue = document.getElementById("description").value;
    var locatevalue = document.getElementById("location").value;
    var datevalue = document.getElementById("date").value;
    var timevalue = document.getElementById("time").value;
    var image = document.getElementById("prevImage").src;
    var compare = image.localeCompare("http://localhost/Assets/imgs/default_events.jpg")
    if (compare == 0 && !titlevalue && !descriptionvalue && !locatevalue
      && !datevalue && !timevalue) {
    location.href = "/admin/event";
    } else {
      /*POP UP MODAL ask if cancel will lose changes */
      $('#cancelChangesModal').modal('show');
    }
  };
  let eventArray=event_array;
  var i = localStorage.getItem("updateId");
  var d = new Date(eventArray[i].dateTime);
  var todayDate = d.toISOString().slice(0, 10);
  let hour = d.getHours();
  let minute = d.getMinutes().toString();
  minute = minute.padStart(2, '0');
  var titlevalue = eventArray[i].title;
  var descriptionvalue = eventArray[i].description;
  var locatevalue = eventArray[i].location;
  var datevalue = todayDate;
  var timevalue = hour +':'+ minute;
  var imagesrc=eventArray[i].imageId;

function cancelUpdate(){
    var image = document.getElementById("prevImage").src;
      var compareDescription=descriptionvalue.replace(/[^a-zA-Z]/g, "") == description1.value.replace(/[^a-zA-Z]/g, "");
      
      if ((image==imagesrc || image=="http://localhost/Assets/imgs/default_events.jpg") &&
        titlevalue==title1.value && 
        compareDescription && 
        locatevalue==locate1.value&& 
        datevalue==date1.value && 
        timevalue==time1.value) {
    location.href = "/admin/event";
    } else {
      /*POP UP MODAL ask if cancel will lose changes */
      $('#cancelChangesModal').modal('show');
    }
  };
  function closeModal(modalId) {
    $(modalId).modal('hide');
  }
