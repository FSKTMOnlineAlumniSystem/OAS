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
    console.log("here");
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
      // add_element_to_array();
      // saveButton.textContent = 'Saving...';
    //   // setTimeout(() => {
    //   //   location.href = 'adminEvent';
    //   // }, 1000);
    }else{
      return false;
    }
  };
  function isEmpty(obj) {
  return obj.value.length == 0;
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

img.addEventListener("change", (e) => readURL(e));
function readURL(e) {
  var i = localStorage.getItem("updateId");
  console.log('f')
  let allowedExtensions = /(\.png|\.jpg|\.jpeg)$/i;
  if (e.target.files && e.target.files[0] && e.target.files[0].size > 1000000) {
    // To handle the file size
    choosePictureDescription.textContent = "Image size must be smaller than 1MB";
  } else if (
    eventArray[i].imageId=='Default' &&
    e.target.files &&
    e.target.files[0] &&
    allowedExtensions.test(e.target.value)
  ) {
    eventPicture.files = e.target.files;
    var reader = new FileReader();
    reader.onload = function (e) {
      wizardPicturePreview.src = e.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
    choosePictureDescription.textContent = "Choose picture";
  } else {
    choosePictureDescription.textContent =
      "Please choose picture in .png, .jpg or .jpeg format";
  }
}


/*Check whether there is any changes that might be lost*/
function cancelCreate(){
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
      // if (!img.value && 
      //   titlevalue==title1.value && 
      //   descriptionvalue==description1.value && 
      //   locatevalue==locate1.value&& 
      //   datevalue==date1.value && 
      //   timevalue==time1.value) {
    location.href = "adminEvent";
    } else {
      /*POP UP MODAL ask if cancel will lose changes */
      $('#cancelChangesModal').modal('show');
    }
  };
  let eventArray=event_array;
  var i = localStorage.getItem("updateId");
  var d = new Date(eventArray[i].dateTime);
  var todayDate = d.toISOString().slice(0, 10);
  document.getElementById('dateTime').value=d;
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
  // cancelButton.addEventListener('click', () => {
    console.log("hiii");
    var image = document.getElementById("prevImage").src;
    // var titlevalue = document.getElementById("title").value;
    // var descriptionvalue = document.getElementById("description").value;
    // var locatevalue = document.getElementById("location").value;
    // var datevalue = document.getElementById("date").value;
    // var timevalue = document.getElementById("time").value;
    // var image = document.getElementById("prevImage").src;
    // var compare = image.localeCompare("https://www.ris.org.in/sites/all/themes/ris/images/default-events.jpg")
    // if (compare == 0 && !titlevalue && !descriptionvalue && !locatevalue
    //   && !datevalue && !timevalue) {
      // !img.value && 
    console.log('time');
    console.log(time1.value);
      console.log('image');
      var t=titlevalue==title1.value;
      var des=descriptionvalue==description1.value;
      console.log(descriptionvalue);
      console.log(description1.value);
      var compareDescription=descriptionvalue.replace(/[^a-zA-Z]/g, "") == description1.value.replace(/[^a-zA-Z]/g, "");
      var loc=locatevalue==locate1.value;
      var da=datevalue==date1.value;
      var ti=timevalue==time1.value;
      console.log('title '+t);
      console.log('description '+ des);
      console.log('location '+loc);
      console.log('date '+da);
      console.log('time '+ti);
      // console.log(image);
      // console.log(imagesrc);
      var compare=image==imagesrc;
      console.log('compare'+compare);
      // var compare = image.localeCompare(imagesrc)
      if (image==imagesrc &&
        titlevalue==title1.value && 
        compareDescription && 
        locatevalue==locate1.value&& 
        datevalue==date1.value && 
        timevalue==time1.value) {
    location.href = "adminEvent";
    } else {
      /*POP UP MODAL ask if cancel will lose changes */
      $('#cancelChangesModal').modal('show');
    }
  };
  function closeModal(modalId) {
    $(modalId).modal('hide');
  }

//   img.addEventListener('change', (e) => readURL(e));
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