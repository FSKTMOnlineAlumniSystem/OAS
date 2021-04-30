import { dummyResponse, updateDummyData } from "../dummydata.js";

let myJob = JSON.parse(localStorage.getItem("JobList"));

//LOAD DETAILS AND DISPLAY
if (myJob[0].imageId == null) {
  document.getElementById("main-body").innerHTML += `
    <div class="row">
        <div class="col-0 col-md-1 col-lg-2"></div>
        <div class="col-12 col-md-10 col-lg-8">
            <div class="row align-items-center">
                <div class="col-12">
                    <a href="../../html/Alumni/JobPage.html" class="btn btn-link back" ><i class="fas fa-chevron-left fa-2x" ></i></a>   
                    <h3 class="d-inline">${myJob[0].company} - ${myJob[0].title}</h3>
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
                    <img src="" id="image" class="image--max-size-100-percent" alt="Company Logo" width="100%">
                </div>
                <div class="col-12 col-md-6 d-flex flex-column justify-content-center">
                    <div class='row my-3'>
                        <div class='col-4 d-flex justify-content-center'>          
                            <i class="fas fa-map-marked-alt fa-2x" style="font-size: 50px"></i>
                        </div>  
                        <div class='col-8 d-flex align-items-center'>
                            <span class="info pt-3 pt-sm-0">${myJob[0].location}</span>
                        </div>
                    </div>
                    <div class='row my-3'>
                        <div class='col-4 d-flex justify-content-center'>          
                            <i class="fas fa-sack-dollar fa-2x" style="font-size: 50px"></i>
                        </div>  
                        <div class='col-8 d-flex align-items-center'>
                            <span class="info pt-3 pt-sm-0">RM ${myJob[0].salary}</span>
                        </div>
                    </div>
                    <div class='row my-3'>
                        <div class='col-4 d-flex justify-content-center'>          
                            <i class="fas fa-envelope-open-text text-primary fa-2x" style="font-size: 50px"></i>
                        </div>  
                        <div class='col-8 d-flex align-items-center'>
                            <a href="mailto:${myJob[0].email}">${myJob[0].email}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <br>
    <br>
    <div class="row">
        <div class="col-0 col-md-1 col-lg-2"></div>
        <div class="col-12 col-md-10 col-lg-8">
            <div class="jumbotron">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <h4 class="pt-3"><b>Job Description</b></h4>
                            <p class="lead">
                                ${myJob[0].description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

  const readImageUrl = myJob[0].imgaeUrl;

  if (readImageUrl) {
    document.querySelector("#image").setAttribute("src", readImageUrl);
  }
} else {
  document.getElementById("main-body").innerHTML += `
    <div class="row">
        <div class="col-0 col-md-1 col-lg-2"></div>
        <div class="col-12 col-md-10 col-lg-8">
            <div class="row align-items-center">
                <div class="col-12">
                    <a href="../../html/Alumni/JobPage.html" class="btn btn-link back" ><i class="fas fa-chevron-left fa-2x" ></i></a>   
                    <h3 class="d-inline">${myJob[0].company} - ${myJob[0].title}</h3>
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
                    <img src="../../../Assets/imgs/${myJob[0].imageId}" class="image--max-size-100-percent" alt="Company Logo">
                </div>
                <div class="col-12 col-md-6 d-flex flex-column justify-content-center">
                    <div class='row my-3'>
                        <div class='col-4 d-flex justify-content-center'>          
                            <i class="fas fa-map-marked-alt fa-2x" style="font-size: 50px"></i>
                        </div>  
                        <div class='col-8 d-flex align-items-center'>
                            <span class="info pt-3 pt-sm-0">${myJob[0].location}</span>
                        </div>
                    </div>
                    <div class='row my-3'>
                        <div class='col-4 d-flex justify-content-center'>          
                            <i class="fas fa-sack-dollar fa-2x" style="font-size: 50px"></i>
                        </div>  
                        <div class='col-8 d-flex align-items-center'>
                            <span class="info pt-3 pt-sm-0">RM ${myJob[0].salary}</span>
                        </div>
                    </div>
                    <div class='row my-3'>
                        <div class='col-4 d-flex justify-content-center'>          
                            <i class="fas fa-envelope-open-text text-primary fa-2x" style="font-size: 50px"></i>
                        </div>  
                        <div class='col-8 d-flex align-items-center'>
                            <a href="mailto:${myJob[0].email}">${myJob[0].email}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <br>
    <br>
    <div class="row">
        <div class="col-0 col-md-1 col-lg-2"></div>
        <div class="col-12 col-md-10 col-lg-8">
            <div class="jumbotron">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <h4 class="pt-3"><b>Job Description</b></h4>
                            <p class="lead">
                                ${myJob[0].description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
}

// CLICK BACK BUTTON
$(".back").on("click", function () {
  console.log("click");
  localStorage.removeItem("JobList");
});
