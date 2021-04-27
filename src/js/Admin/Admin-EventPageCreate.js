console.log('testing')

import {dummyResponse, updateDummyData} from "../dummydata.js";
sessionStorage.setItem('event', 'create')

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
  var imageName=imageArr[imageArr.length-1];
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

