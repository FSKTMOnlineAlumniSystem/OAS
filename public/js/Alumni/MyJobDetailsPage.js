
//GET THE ARRAY FROM THE MYJOBPAGE WHEN USER CLICK ON IT
let myJob = job_array;

//DISPLAY THE DETAILS OF THE JOB ADS <i class="fas fa-user-edit mr-2 close">
    document.getElementById("main-body").innerHTML += 
    `<div class="row">
    <div class="col-0 col-md-1 col-lg-2">
    </div>
    <div class="col-12 col-md-10 col-lg-8">
    <div class="row align-items-center">
    <div class="col-10">
    <a href="myjob" class="btn btn-link back" ><i class="fas fa-chevron-left fa-2x" ></i></a>   
    <h3 class="d-inline">${myJob.company} - ${myJob.title}</h3>
    </div>
    <div class="col-2">
    <a href="editmyjob?myjobid=${myJob.jobId}" class="btn btn-secondary float-right edit" role="button"><i class="fas fa-user-edit"></i>  Edit</a>
    </div>
    </div>
    <hr  style="
    height: 3px;
    border-width: 0;
    color: rgb(0, 0, 0);
    background-color: black;
    "/>
    

    <div class="row">

    <div class="col-12 col-md-6 d-flex justify-content-center mb-3">
    <img src="${myJob.imageId}" class="image--max-size-100-percent" alt="Company Logo">
    </div>
    <div class="col-12 col-md-6 d-flex flex-column justify-content-center">

    <div class='row my-3'>
    <div class='col-4 d-flex justify-content-center'>          
    <i class="fas fa-map-marked-alt fa-2x" style="font-size: 50px"></i>
    </div>  
    <div class='col-8 d-flex align-items-center'>
    <p class="pt-3 pt-sm-0">${myJob.location}</p>
    </div>
    </div>

    <div class='row my-3'>
    <div class='col-4 d-flex justify-content-center'>          
    <i class="fas fa-sack-dollar fa-2x" style="font-size: 50px"></i>
    </div>  
    <div class='col-8 d-flex align-items-center'>
    <p class="pt-3 pt-sm-0">RM ${myJob.salary}</p>
    </div>
    </div>

    <div class='row my-3'>
    <div class='col-4 d-flex justify-content-center'>          
    <i class="fas fa-envelope-open-text text-primary fa-2x" style="font-size: 50px"></i>
    </div>  
    <div class='col-8 d-flex align-items-center'>
    <p>${myJob.email}</p>
    </div>
    </div>

    </div>
    </div>
    </div>
    </div>
    
    <br>
    <br>

    <div class="row">
    <div class="col-0 col-md-1 col-lg-2">
    </div>
    <div class="col-12 col-md-10 col-lg-8">
    <h4 class="pt-3">Job Description</h4>
    <div class="jumbotron">
    <div class="container">
    <div class="row">
    <div class="col-12">
        <p style="white-space: pre-wrap;">${myJob.description}</p>
      </div>
    </div>
  </div>
</div>
</div>
`;

