import dummyResponse from '../dummydata.js';

var event = [];
var jobObj = {};
console.log(dummyResponse.Job[0]);

var eventArr = []
const event = function (eventId, adminId, title, dateTime, description, imageId, location){
   
      this.eventId = eventId;
      this.adminId = adminId;
      this.title = title;
      this.dateTime = dateTime;
      this.description = description;
      this.imageId = imageId;
      this.location = location;
    }

    for (let i=0; i<dummyResponse.Event.length; i++){
        eventArr.push (( new event (
        dummyResponse.event[i].eventId,
        dummyResponse.event[i].adminId,
        dummyResponse.event[i].title,
        dummyResponse.event[i].dateTime,
        dummyResponse.event[i].description,
        dummyResponse.Job[i].imageId,
        dummyResponse.Job[i].location))) ;

} 

localStorage.setItem('event', JSON.stringify(eventArr));
console.log(event);
