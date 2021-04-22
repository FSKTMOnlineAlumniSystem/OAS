import dummyResponse from '../dummydata.js';

// var job = [];
// var jobObj = {};

// console.log(dummyResponse.Job[0]);
// for (let i=0; i<dummyResponse.Job.length; i++){
//     jobObj[i] = dummyResponse.Job[i];
//     // jobObj["jobId"]=dummyResponse.Job[i].jobId;
//     // jobObj["alumniId"]=dummyResponse.Job[i].alumniId;
//     // jobObj["description"]=dummyResponse.Job[i].description;
//     // jobObj["salary"]=dummyResponse.Job[i].salary;
//     // jobObj["email"]=dummyResponse.Job[i].email;
//     // jobObj["imageId"]=dummyResponse.Job[i].imageId;
//     // jobObj["location"]=dummyResponse.Job[i].location;
//     // var key = dummyResponse.Job[i].alumniId;
   
// }
// job.push(jobObj);
// localStorage.setItem('job', JSON.stringify(jobObj));

//START
let myJob = JSON.parse(localStorage.getItem("job"));
const myJobLength = Object.values(myJob).flat().length;
let index;

for(let i=0; i<myJobLength; i++){
    if(myJob[i].alumniId ==="AL-1"){
        index=i;
        console.log(index)
        break;
    }
}



document.getElementsByClassName("container my-5")[0].innerHTML += 
`<input type="text" id="jobTitle" class="form-control h-100" value="${myJob[index].title}">
<hr>
<div class="container-fluid align-content-center my-5">
<div class="row align-items-center">
<div class="col-4 w-auto">
    <div class="picture mx-auto">
        <img src="../../../Assets/imgs/${myJob[index].imageId}" alt="Company Logo" width="100%">
    </div>
</div>
<div class="col">
                <div class="container-fluid ">
                    <div class="row mb-3 mx-auto">
                        <img src="https://img.icons8.com/color/48/000000/marker--v1.png" width="40" height="auto">
                        <div class="col ">
                            <input type="text" id="location" class="form-control" value="${myJob[index].location}">
                        </div>
                    </div>
                    <div class="row mb-3 mx-auto">
                    <img src="https://img.icons8.com/doodle/48/000000/money.png" width="40" height="auto">
                    <div class="col">
                        <input type="text" class="form-control" id="salary" value="${myJob[index].salary}">
                    </div>
                </div>
                <div class="row mb-3 mx-auto mb-xl-5">
                        <img src="https://img.icons8.com/fluent/48/000000/email-open.png" width="40" width="auto">
                        <div class="col mx-auto">
                            <input type="email" class="form-control" id="email" value="${myJob[index].email}">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-12 mt-md-3">
    <div class="font-weight-bold mb-3">
        <div id=bio-title>Job Description</div>
        <div id=job class="rounded-lg p-3 text-justify">
            <textarea type="text" class="form-control"
                placeholder="Enter new schedule"  id="description" rows="7" style="height:100%;">${myJob[index].description}</textarea>
    </div>
    <a button type="button" class="btn btn-info float-right ml-2" id="post" href="../../html/Alumni/JobPage.html">Post</a>
    <a button type="button" class="btn btn-danger float-right ml-2" id="cancel" href="../../html/Alumni/MyJobPage.html">Cancel</a>
    
    <br>
    <br>
    </div></div>`;

    //  INPUT
    document.getElementById("post").addEventListener("click", function(){
        var newData_title = document.getElementById("jobTitle").value;
        var newData_location = document.getElementById("location").value;
        var newData_salary = document.getElementById("salary").value;
        var newData_email = document.getElementById("email").value;
        var newData_description = document.getElementById("description").value;

        // console.log(myJob[index].title)
        // console.log(newData_title)
        myJob[index].title = newData_title;
        // console.log(myJob[index].title)
        myJob[index].location = newData_location;
        myJob[index].salary = newData_salary;
        myJob[index].email = newData_email;
        myJob[index].description = newData_description;

        // job.push(myJob);
        localStorage.setItem('job', JSON.stringify(myJob));
        console.log(myJob[0])

        

        // localStorage.setItem('job', JSON.stringify(myJob));
        console.log(job)
    });
    









// let myObj = JSON.parse(localStorage.getItem("job"));
// console.log(myObj[0]);
// console.log(myObj[1].jobId);
// console.log(myObj);