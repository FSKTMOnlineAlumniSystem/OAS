console.log('testing')
sessionStorage.setItem('event', 'update')
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            document.getElementById("prevImage").src = e.target.result;
            document.getElementById("wizardPicturePreview").src = e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
    }
}
import {dummyResponse, updateDummyData} from "../dummydata.js";
const imgPath = "/Assets/imgs/";

var i = localStorage.getItem("updateId")
var d = new Date(dummyResponse.Event[i].dateTime);
var todayDate = d.toISOString().slice(0, 10);
console.log("date"+todayDate);

const minute = d.getMinutes();
let hour = d.getHours();


document.getElementById("updateForm").innerHTML=`
<div class="form-group">
            <label for="formGroupExampleInput">Event Title :</label>
            <input type="text" class="form-control rounded-0 w-75 p-3" id="title" placeholder="Enter new event title"
              value="${dummyResponse.Event[i].title}">
          </div>

          <div class="form-group">
            <label for="formGroupExampleInput2">Schedule :</label> <br>
            <input type=date value="${todayDate}" id="date"> &nbsp;
            <input type=time value="${hour}:${minute}" id="time"> 
          </div>

          <div class="form-group">
            <label for="formGroupExampleInput2" >Description :</label>
            <textarea type="text" class="form-control rounded-0" id="description"
              placeholder="Enter new schedule" value="${dummyResponse.Event[i].description}" rows="5" ;>${dummyResponse.Event[i].description}</textarea>
          </div>
      
          <div class="form-group">
            <label for="formGroupExampleInput2" >Location :</label>
            <input type="text " class="form-control rounded-0 w-75 p-3" id="location"
              placeholder="Enter new location" value="${dummyResponse.Event[i].location}">
          </div>

          <div>
            <label for="phfile">Image:</label>
            <img id="prevImage" src="${imgPath+dummyResponse.Event[i].imageId}" alt="update Image" width="150" length="150">
            <input type="file" id="phfile" onchange="readURL(this)">
          </div>


`
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
    var image = document.getElementById("prevImage").src;
  //   console.log(image)
  //   var imageArr=image.split("/");
  // var imageName=imageArr[imageArr.length-1];
  // console.log(imageName);
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
        imageId: image, 
        location: location
    }
    dummyResponse.Event.splice(i, 1, newEvent)
    updateDummyData(dummyResponse)
    console.log(dummyResponse)
}