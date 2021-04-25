console.log('testing')
sessionStorage.setItem('event', 'update')
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
           document.getElementById("prevImage").src=e.target.result;
           document.getElementById("wizardPicturePreview").src=e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
    }
}
import dummyResponse from "../dummydata.js";
window.update_array = function() {
    console.log("update element")
  var title = document.getElementById("title").value;
  var date = document.getElementById("date").value;
  var stime = document.getElementById("startTime").value;
  var etime = document.getElementById("endTime").value;
  var description = document.getElementById("description").value;
  var location = document.getElementById("location").value;
  var image = document.getElementById("prevImage").value;
  var endIndex = dummyResponse.Event.length;
  var newId=endIndex+1
  var eventId="E-"+ newId
  var adminId="ad-2"; //need connect to localstorege ltr
  // var d = new Date(dummyResponse.Event[i].dateTime);
var newEvent={eventId:eventId,
  adminId: adminId,
  title: title,
  dateTime: new Date(), //change
  description: description,
  imageId: image,
  location: location
}
dummyResponse.Event.splice(endIndex,0,newEvent)

  console.log(dummyResponse)