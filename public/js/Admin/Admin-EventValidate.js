const title1 = document.getElementById("title");
const description1 = document.getElementById("description");
const locate1 = document.getElementById("location");
const date1 = document.getElementById("date");
const time1 = document.getElementById("time");

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
    // if (compare == 0 && !titlevalue && !descriptionvalue && !locatevalue
    //   && !datevalue && !timevalue) {
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
  };
  function closeModal(modalId) {
    $(modalId).modal('hide');
  }