import dummyResponse from '../dummydata.js';

var job = [];
var jobObj = {};
console.log(dummyResponse.Job[0]);


// function myFunc(){
//     myFunc = function(){}; // kill it as soon as it was called
//     console.log('call once and never again!'); // your stuff here
// };

    console.log("insert");
for (let i=0; i<dummyResponse.Job.length; i++){
    jobObj[i] = dummyResponse.Job[i];
    // jobObj["jobId"]=dummyResponse.Job[i].jobId;
    // jobObj["alumniId"]=dummyResponse.Job[i].alumniId;
    // jobObj["description"]=dummyResponse.Job[i].description;
    // jobObj["salary"]=dummyResponse.Job[i].salary;
    // jobObj["email"]=dummyResponse.Job[i].email;
    // jobObj["imageId"]=dummyResponse.Job[i].imageId;
    // jobObj["location"]=dummyResponse.Job[i].location;
    // var key = dummyResponse.Job[i].alumniId;
}
job.push(jobObj);
localStorage.setItem('job', JSON.stringify(jobObj));
insert = function(){};

