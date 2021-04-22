import dummyResponse from '../dummydata.js';

var job = [];
var jobObj = {};
console.log(dummyResponse.Job[0]);


// function myFunc(){
//     myFunc = function(){}; // kill it as soon as it was called
//     console.log('call once and never again!'); // your stuff here
// };

    
// for (let i=0; i<dummyResponse.Job.length; i++){
//     // jobObj[i] = dummyResponse.Job[i];
//     // jobObj["jobId"]=dummyResponse.Job[i].jobId;
//     // console.log(jobObj)
//     // jobObj["alumniId"]=dummyResponse.Job[i].alumniId;
//     // jobObj["description"]=dummyResponse.Job[i].description;
//     // jobObj["salary"]=dummyResponse.Job[i].salary;
//     // jobObj["email"]=dummyResponse.Job[i].email;
//     // jobObj["imageId"]=dummyResponse.Job[i].imageId;
//     // jobObj["location"]=dummyResponse.Job[i].location;
//     // var key = dummyResponse.Job[i].alumniId;
//     // job = [jobObj]
//     // job.push(jobObj);
//     // console.log(job)
// }
// // job.push(jobObj);
// localStorage.setItem('job', JSON.stringify(jobObj));
// let myJob = JSON.parse(localStorage.getItem("job"));
// console.log(myJob);
// insert = function(){};


// for (let i=0; i<dummyResponse.Job.length; i++){
//         jobArr.push (( new Job (
//         dummyResponse.Job[i].jobId,
//         dummyResponse.Job[i].alumniId,
//         dummyResponse.Job[i].description,
//         dummyResponse.Job[i].salary,
//         dummyResponse.Job[i].email,
//         dummyResponse.Job[i].imageId,
//         dummyResponse.Job[i].location ))) ;

// }
// arr.push((new columnDefs(oFullResponse.results[i].label,true,true)));
// localStorage.setItem('job', JSON.stringify(jobArr));
// console.log(job);
// var columnDefs = function(key, sortable, resizeable){

var jobArr = []
const Job = function (jobId, alumniId, description, salary, email, imageId, location, title,company){
   
      this.jobId = jobId;
      this.alumniId = alumniId;
      this.description = description;
      this.salary = salary;
      this.email = email;
      this.imageId = imageId;
      this.location = location;
      this.title = title;
      this.company = company;
    }

    for (let i=0; i<dummyResponse.Job.length; i++){
        jobArr.push (( new Job (
        dummyResponse.Job[i].jobId,
        dummyResponse.Job[i].alumniId,
        dummyResponse.Job[i].description,
        dummyResponse.Job[i].salary,
        dummyResponse.Job[i].email,
        dummyResponse.Job[i].imageId,
        dummyResponse.Job[i].location,
        dummyResponse.Job[i].title, 
        dummyResponse.Job[i].company))) ;

} 

localStorage.setItem('job', JSON.stringify(jobArr));
console.log(job);

