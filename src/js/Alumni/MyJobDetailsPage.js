import dummyResponse from '../dummydata.js';

let index;
for (let i=0; i<dummyResponse.Job.length;i++){
    if(dummyResponse.Job[i].alumniId == "AL-1"){
        index = i;
    }
}

document.getElementById("MyJobTitle").innerHTML += 
`<div class="col-sm-10">
<h1>${dummyResponse.Job[index].title}</h1>
</div>
<div class="col-sm">
<a href="../../html/Alumni/EditMyJobPage.html"class="btn btn-secondary float-right" role="button"><i class="bi bi-pencil-square"></i>   Edit</a>
</div>`;

document.getElementById("MyJobDescription").innerHTML += 
`<div class="container" style="width:90%">
<div class="row align-items-center">
<div class="col-4 w-auto">
<div class="picture mx-auto">
<img src="../../../Assets/imgs/${dummyResponse.Job[index].imageId}" alt="Company Logo" width="100%">
</div></div>
<div class="col">
<div class="container-fluid ">
<div class="row mb-3 mx-auto">
<img src="https://img.icons8.com/color/48/000000/marker--v1.png" width="40" height="auto">
<div class="col">
<p  id="info">${dummyResponse.Job[index].location}</p>
</div></div>
<div class="row mb-3 mx-auto">
<img src="https://img.icons8.com/doodle/48/000000/money.png" width="40" height="auto">
<div class="col">
<p id="info">RM${dummyResponse.Job[index].salary}</p>
</div></div>
<div id = "email" class="row mb-3 mx-auto mr-5 mb-xl-5">
<img src="https://img.icons8.com/fluent/48/000000/email-open.png" width="40" width="auto">
<div class="col">
<a href="mailto:${dummyResponse.Job[index].email}">${dummyResponse.Job[index].email}</a>
</div></div></div></div>
<div class="col-12 mt-md-3">
<div class="font-weight-bold">
<div id=bio-title>Job Description</div>
<div id=job class="rounded-lg p-3 text-justify">
<div id=bio class="rounded-lg p-3 text-justify">${dummyResponse.Job[index].description}</div>
</div></div></div>
 </div></div>
</div>`;




