import dummyResponse from '../dummydata.js';

var job = [];
var jobObj = {};
console.log(dummyResponse.Job[0]);


// function myFunc(){
//     myFunc = function(){}; // kill it as soon as it was called
//     console.log('call once and never again!'); // your stuff here
// };

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
