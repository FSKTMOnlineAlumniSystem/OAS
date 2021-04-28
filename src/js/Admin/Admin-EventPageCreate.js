console.log('testing')

import {dummyResponse, updateDummyData} from "../dummydata.js";
sessionStorage.setItem('event', 'create')
var imageName;
var inputValue;
window.readURL = function (input) {
  inputValue=input.value;
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
           document.getElementById("prevImage").src=e.target.result;
           document.getElementById("wizardPicturePreview").src=e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
    }
}

window.add_element_to_array = function() {
    console.log("add element")
    // var table = document.getElementsByClassName(
    //   "table table-striped table-sm something"
    // )[0];

  var title = document.getElementById("title").value;
  var description = document.getElementById("description").value;
  var location = document.getElementById("location").value;
  // var image = document.getElementById("prevImage").src;

  // console.log(image);
  // var imageArr=image.split("/");
  // var imageName=imageArr[imageArr.length-1];
  // console.log("image name: "+imageName);

  // var image = document.getElementById("prevImage").src;
  // console.log(image);
  var imageArr=inputValue.split("\\");
  imageName=imageArr[imageArr.length-1];
console.log("imageName: "+imageName);
  var endIndex = dummyResponse.Event.length;
  var newId=endIndex+1
  var eventId="E-"+ newId
  var adminId=localStorage.getItem("SignedInAlumniId"); //need connect to localstorege ltr
  // var d = new Date(dummyResponse.Event[i].dateTime);
  var date = document.getElementById("date").value;
    var time = document.getElementById("time").value;
console.log(date)
    var year = date.split("-")[0];
    var month =  date.split("-")[1];
    var day = date.split("-")[2];
    var hours = time.split(":")[0];
    var min = time.split(":")[1];
    const newDate = new Date(year, month, day, hours, min, "0");
console.log(date)

var newEvent={
  eventId:eventId,
  adminId: adminId,
  title: title,
  dateTime: newDate, 
  description: description,
  imageId: imageName,
  location: location
}
dummyResponse.Event.splice(endIndex,0,newEvent)
updateDummyData(dummyResponse)
  console.log(dummyResponse)
  // location.reload();
}
window.setEventId=function (){
  var endIndex = dummyResponse.Event.length;
  var newId=endIndex+1
  var eventId="E-"+ newId
  localStorage.setItem('eventId',eventId);
}
/*Check whether there is any changes that might be lost*/
const cancelButton = document.querySelector('#cancelButton');
cancelButton.addEventListener('click', () => {
  var title = document.getElementById("title").value;
  var description = document.getElementById("description").value;
  var locate = document.getElementById("location").value;
  var date = document.getElementById("date").value;
    var time = document.getElementById("time").value;
    console.log('title: '+title)
    console.log('description: '+description)
    console.log('location: '+location)
    console.log('date: '+date)
    console.log('time: '+time)
   
    var image=document.getElementById("prevImage").src;
    var compare=image.localeCompare("https://lh3.googleusercontent.com/LfmMVU71g-HKXTCP_QWlDOemmWg4Dn1rJjxeEsZKMNaQprgunDTtEuzmcwUBgupKQVTuP0vczT9bH32ywaF7h68mF-osUSBAeM6MxyhvJhG6HKZMTYjgEv3WkWCfLB7czfODidNQPdja99HMb4qhCY1uFS8X0OQOVGeuhdHy8ln7eyr-6MnkCcy64wl6S_S6ep9j7aJIIopZ9wxk7Iqm-gFjmBtg6KJVkBD0IA6BnS-XlIVpbqL5LYi62elCrbDgiaD6Oe8uluucbYeL1i9kgr4c1b_NBSNe6zFwj7vrju4Zdbax-GPHmiuirf2h86eKdRl7A5h8PXGrCDNIYMID-J7_KuHKqaM-I7W5yI00QDpG9x5q5xOQMgCy1bbu3St1paqt9KHrvNS_SCx-QJgBTOIWW6T0DHVlvV_9YF5UZpN7aV5a79xvN1Gdrc7spvSs82v6gta8AJHCgzNSWQw5QUR8EN_-cTPF6S-vifLa2KtRdRAV7q-CQvhMrbBCaEYY73bQcPZFd9XE7HIbHXwXYA=s200-no")
    // console.logimage.localeCompare(image)
    // console.log(image!="https://lh3.googleusercontent.com/LfmMVU71g-HKXTCP_QWlDOemmWg4Dn1rJjxeEsZKMNaQprgunDTtEuzmcwUBgupKQVTuP0vczT9bH32ywaF7h68mF-osUSBAeM6MxyhvJhG6HKZMTYjgEv3WkWCfLB7czfODidNQPdja99HMb4qhCY1uFS8X0OQOVGeuhdHy8ln7eyr-6MnkCcy64wl6S_S6ep9j7aJIIopZ9wxk7Iqm-gFjmBtg6KJVkBD0IA6BnS-XlIVpbqL5LYi62elCrbDgiaD6Oe8uluucbYeL1i9kgr4c1b_NBSNe6zFwj7vrju4Zdbax-GPHmiuirf2h86eKdRl7A5h8PXGrCDNIYMID-J7_KuHKqaM-I7W5yI00QDpG9x5q5xOQMgCy1bbu3St1paqt9KHrvNS_SCx-QJgBTOIWW6T0DHVlvV_9YF5UZpN7aV5a79xvN1Gdrc7spvSs82v6gta8AJHCgzNSWQw5QUR8EN_-cTPF6S-vifLa2KtRdRAV7q-CQvhMrbBCaEYY73bQcPZFd9XE7HIbHXwXYA=s200-no")
    // console.log(image)
    // console.log("https://lh3.googleusercontent.com/LfmMVU71g-HKXTCP_QWlDOemmWg4Dn1rJjxeEsZKMNaQprgunDTtEuzmcwUBgupKQVTuP0vczT9bH32ywaF7h68mF-osUSBAeM6MxyhvJhG6HKZMTYjgEv3WkWCfLB7czfODidNQPdja99HMb4qhCY1uFS8X0OQOVGeuhdHy8ln7eyr-6MnkCcy64wl6S_S6ep9j7aJIIopZ9wxk7Iqm-gFjmBtg6KJVkBD0IA6BnS-XlIVpbqL5LYi62elCrbDgiaD6Oe8uluucbYeL1i9kgr4c1b_NBSNe6zFwj7vrju4Zdbax-GPHmiuirf2h86eKdRl7A5h8PXGrCDNIYMID-J7_KuHKqaM-I7W5yI00QDpG9x5q5xOQMgCy1bbu3St1paqt9KHrvNS_SCx-QJgBTOIWW6T0DHVlvV_9YF5UZpN7aV5a79xvN1Gdrc7spvSs82v6gta8AJHCgzNSWQw5QUR8EN_-cTPF6S-vifLa2KtRdRAV7q-CQvhMrbBCaEYY73bQcPZFd9XE7HIbHXwXYA=s200-no")
  if (compare==0 && !title && !description && !locate && !date && !time) {
    console.log("hereeeeeeeeeee")
      location.href = 'Admin-EventPage.html';
      // location.href = "MyProfilePage.html";
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
