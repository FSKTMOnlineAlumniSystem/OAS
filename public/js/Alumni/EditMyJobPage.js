

//GET THE JOB ID FROM THE MYJOBDETAILSPAGE
let editJobs = job_array;

    document.getElementsByClassName("container my-5")[0].innerHTML += 
    `<form id="editJob" method="post" enctype="multipart/form-data" onsubmit="return checkValidation()">
    <div class="row">
    <div class="left1">
    <input id="companyName" size="50" type="text" placeholder="Enter company name" name="company" class="form-control h-100" value="${editJobs.company}">
    <div class="valid-feedback">Valid.</div>
    <div class="invalid-feedback">Please provide a company name.</div>
    </div>
    <div class="left2">
    <input type="text" size="50" id="jobTitle" placeholder="Enter job title" name="jobtitle" class="form-control h-100" value="${editJobs.title}">
    <div class="valid-feedback">Valid.</div>
    <div class="invalid-feedback">Please provide a job title.</div>
    </div>
    </div>
    <hr>
    <div class="container-fluid align-content-center my-5">
    <div class="row align-items-center">
    <div class="col-sm-4 d-flex align-items-center justify-content-center">
    <div class="w-50 position-relative">
    <div class="picture-container">
        <div class="picture">
            <img src="${editJobs.imageId}" class="picture-src"
                id="wizardPicturePreview" title="" >
            <input type="file" id="wizard-picture" >
            <input type="file" name="imageId" id="jobPicture" class="d-none">
            <div class="valid-feedback">Valid.</div>
            <div class="invalid-feedback"></div>
        </div>
        <h6 id="choosePictureDescription">Choose Picture</h6>
    </div>
</div>
    </div>
    <div class="col">
    <div class="container-fluid ">
    <br>
    <div class="row mb-3 mx-auto">
    <div class="col-1">
    <span><i class="fas fa-map-marked-alt fa-2x"></i></span>
    </div>
    <div class="col ">
    <input type="text" id="locations" size="50" class="form-control" name="location" value="${editJobs.location}">
    <div class="valid-feedback">Valid.</div>
    <div class="invalid-feedback">Please provide the location of the company.</div>
    </div>
    </div>
    <div class="row mb-3 mx-auto">
    <div class="col-1">
    <span><i class="fas fa-sack-dollar fa-2x"></i></span>
    </div>
    <div class="col">
    <div class="input-group input-group-sm mb-3">
    <div class="input-group-prepend">
    <span class="input-group-text" id="inputGroup-sizing-sm">RM</span>
    </div>
    <input type="text" class="form-control" size="50" id="salary" name="salary" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value="${editJobs.salary}">
    <div class="valid-feedback">Valid.</div>
    <div class="invalid-feedback">Please provide the salary of the job.[E.g.: 1234]</div>
    </div>
    </div>
    </div>
    <div class="row mb-3 mx-auto mb-xl-5">
    <div class="col-1">
    <span><i class="fas fa-envelope-open-text text-primary fa-2x"></i></span>
    </div>
    <div class="col mx-auto">
    <input type="email" class="form-control" id="email" name="email" value="${editJobs.email}">
    <div class="valid-feedback">Valid</div>
    <div id="emailFeedback" class="invalid-feedback">Please provide a valid email.</div>
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
         placeholder="Enter new schedule"  id="description" name="description" rows="3">${editJobs.description}</textarea>
    <div class="valid-feedback">Valid.</div>
    <div class="invalid-feedback">Please provide the description of the job.</div>
    </div>
    <br>
    <input type="submit" name="Submit" class="btn btn-primary float-right ml-2" id="post" value="Post"></button>
    <a button type="button" class="btn btn-outline-secondary float-right ml-2" id="cancel" href="myjob">Cancel</a>
    <br>
    <br>
    </div></div></form>`;

    //GET THE ID 
    const wizardPicturePreview = document.querySelector('#wizardPicturePreview');
    const img = document.querySelector('#wizard-picture');
    const jobPicture = document.querySelector('#jobPicture');
    const companyName = document.getElementById("companyName");
    const jobTitle = document.getElementById("jobTitle");
    const locations = document.getElementById("locations");
    const salary = document.getElementById("salary");
    const email = document.getElementById("email");
    const description = document.getElementById("description");
    const cancel = document.getElementById("cancel");
    const emailFormat = /[a-zA-Z0-9]+@[a-z0-9]+(\.[a-z]+)+/;
    const regex=/^[0-9]+$/;

    var input = document.getElementById("jobPicture");
    const imageFormat = /(\.png|\.jpg|\.jpeg)$/i;
    //jobPicture
    /*Check the file extension of the image & Update preview*/
    // img.addEventListener('change', (e) => readURL(e));
    // function readURL(e) {
    // let allowedExtensions =
    //     /(\.png|\.jpg|\.jpeg)$/i;
    // if (e.target.files && e.target.files[0] && allowedExtensions.test(e.target.value)) {
    //     var reader = new FileReader();
    //     reader.onload = function (e) {
    //         document.getElementById("wizardPicturePreview").src = e.target.result;
    //     }
    //     reader.readAsDataURL(e.target.files[0]);
    //     choosePictureDescription.textContent = "Choose picture";
    // } else {
    //     choosePictureDescription.textContent = "Please choose picture in .png, .jpg or .jpeg format";
    // }
    // }

    img.addEventListener('change', (e) => readURL(e));
    function readURL(e) {
    let allowedExtensions =
        /(\.png|\.jpg|\.jpeg)$/i;
    if (e.target.files && e.target.files[0] && e.target.files[0].size>1000000) {
        // To handle the file size
        choosePictureDescription.textContent = "Image size must be smaller than 10MB";
        return true;
    }else if (e.target.files && e.target.files[0] && allowedExtensions.test(e.target.value)) {
        jobPicture.files = e.target.files;
        var reader = new FileReader();
        reader.onload = function (e) {
            wizardPicturePreview.src = e.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);
        choosePictureDescription.textContent = "Choose picture";

    
    }else if(isEmpty(jobPicture)){
        choosePictureDescription.textContent = "Please provide picture for this job.";
    } 
    
    else {
        choosePictureDescription.textContent = "Please choose picture in .png, .jpg or .jpeg format";
    }
    }


    //INPUT WITH HANDLING ERROR 
    function setInValid(el) {
        if (el.classList.contains("is-valid")) {
            el.classList.replace("is-valid", "is-invalid");
        } else {
            el.classList.add("is-invalid");
        }
      }
      function setValid(el) {
        if (el.classList.contains("is-invalid")) {
            el.classList.replace("is-invalid", "is-valid");
        } else {
            el.classList.add("is-valid");
        }
      }
    
      function isEmpty(obj) {
        return obj.value.length == 0;
      }
    
    //CHECKING THE VALIDITY OF INPUT WHEN THE USER PRESS POST BUTTON
    function checkValidation(){    
        console.log("here");
        let errorExist = false; 

        if (isEmpty(companyName)) {
            setInValid(companyName);
            errorExist = true;
       } else {
       setValid(companyName);
       }
  
        if (isEmpty(jobTitle)) {
             setInValid(jobTitle);
             errorExist = true;
        } else {
        setValid(jobTitle);
        }
  
        if (isEmpty(locations)) {
            setInValid(locations);
            errorExist = true;
        } else {
            setValid(locations);
        }
  
        if (isEmpty(salary) || !salary.value.match(regex)) {
            setInValid(salary);
            errorExist = true;
        } else {
            setValid(salary);
        }
        
        if (isEmpty(email) || !email.value.match(emailFormat)) {
            setInValid(email);
            errorExist = true;
        } else {
            setValid(email);
        }
        
        if (isEmpty(description)) {
            setInValid(description);
            errorExist = true;
        } else {
            setValid(description);
        }

        if (isEmpty(jobPicture) || !jobPicture.value.match(imageFormat) || readURL(input)) {
            setInValid(jobPicture);
            errorExist = true;
          } else {
            setValid(jobPicture);
          }

        if (errorExist){
            return false;
        }
        else{   
                return true;
        }
    }

 
