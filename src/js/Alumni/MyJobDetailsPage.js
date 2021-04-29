import { dummyResponse, updateDummyData } from '../dummydata.js';


let myJob = JSON.parse(localStorage.getItem("MyJobList"));

document.getElementById("MyJobTitle").innerHTML += 
`

<a href="../../html/Alumni/MyJobPage.html" class="btn btn-link float-left back" ><i class="fas fa-chevron-left fa-2x" ></i></a>

<div class="col-sm-8">
<h1>${myJob[0].company} - ${myJob[0].title}</h1>
</div>
<div class="col-sm">
<a href="../../html/Alumni/EditMyJobPage.html"class="btn btn-secondary float-right edit" role="button"><i class="bi bi-pencil-square"></i>   Edit</a>
</div>
`;

document.getElementById("MyJobDescription").innerHTML += 
`<div class="row align-items-center">
<div class="col-4 w-auto">
<div class="picture mx-auto">`;

if(myJob[0].imageId == null){
    document.getElementById("MyJobDescription").innerHTML += `
    <div class="row align-items-center">
    <div class="col-4 w-auto">
    <div class="picture mx-auto">
    <img src="" id="image" alt="Company Logo" width="100%">
    </div></div>
    <div class="col">
    <br>
    <div class="container-fluid ">
    <div class="row mb-3 mx-auto">
    <div class="col-1">                    
    <span><i class="fas fa-map-marked-alt fa-2x" alt="location"></i></span>
    </div>   
    <div class="col">
    <p  id="info">${myJob[0].location}</p>
    </div></div>
    <div class="row mb-3 mx-auto">
    <div class="col-1">
    <span><i class="fas fa-sack-dollar fa-2x"></i></span>
    </div>
    <div class="col">
    <p id="info">RM${myJob[0].salary}</p>
    </div></div>
    <div id = "email" class="row mb-3 mx-auto mr-5 mb-xl-5">
    <div class="col-1">                    
    <span><i class="fas fa-envelope-open-text fa-2x" ></i></span>
    </div> 
    <div class="col">
    <a href="mailto:${myJob[0].email}">${myJob[0].email}</a>
    </div></div></div></div>
    <div class="col-12 mt-md-3">
    <div class="font-weight-bold">
    <div id=bio-title>Job Description</div>
    <div id=job class="rounded-lg p-3 text-justify">
    <div id=bio class="rounded-lg p-3 text-justify">${myJob[0].description}</div>
    </div></div></div>
    </div>
    </div>
    </div>`;
    const readImageUrl = myJob[0].imgaeUrl;
        console.log(readImageUrl)
        if(readImageUrl){
            document.querySelector("#image").setAttribute("src", readImageUrl);
        }
}else{
    document.getElementById("MyJobDescription").innerHTML += `
    <div class="row align-items-center">
    <div class="col-4 w-auto">
    <div class="picture mx-auto">
    <img src="../../../Assets/imgs/${myJob[0].imageId}" alt="Company Logo" width="100%" >
    </div></div>
    <div class="col">
    <br>
    <div class="container-fluid ">
    <div class="row mb-3 mx-auto">
    <div class="col-1">                    
    <span><i class="fas fa-map-marked-alt fa-2x" alt="location"></i></span>
    </div>    
    <div class="col">
    <p  id="info">${myJob[0].location}</p>
    </div></div>
    <div class="row mb-3 mx-auto">
    <div class="col-1">
    <span><i class="fas fa-sack-dollar fa-2x"></i></span>
    </div>
    <div class="col">
    <p id="info">RM${myJob[0].salary}</p>
    </div></div>
    <div id = "email" class="row mb-3 mx-auto mr-5 mb-xl-5">
    <div class="col-1">                    
    <span><i class="fas fa-envelope-open-text fa-2x" ></i></span>
    </div> 
    <div class="col">
    <a href="mailto:${myJob[0].email}">${myJob[0].email}</a>
    </div></div></div></div>
    <div class="col-12 mt-md-3">
    <div class="font-weight-bold">
    <div id=bio-title>Job Description</div>
    <div id=job class="rounded-lg p-3 text-justify">
    <div id=bio class="rounded-lg p-3 text-justify">${myJob[0].description}</div>
    </div></div></div>
    </div>
    </div>
    </div>`;
}

// CLICK 
$(".back").on("click", function(){
    console.log("click");
    localStorage.removeItem('MyJobList');
});


//EDIT
$(".edit").on("click", function(){
    console.log("click");
    localStorage.removeItem('MyJobList');
    localStorage.setItem('EditJob', myJob[0].jobId);
});




