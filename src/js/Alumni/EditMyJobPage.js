import { dummyResponse, updateDummyData } from '../dummydata.js';
var imageID = false;

//START
let myJob = localStorage.getItem("EditJob");
let index;


for(let i=0; i<dummyResponse.Job.length; i++){
    if(dummyResponse.Job[i].jobId === myJob){
        index=i;
        console.log(index)
        break;
    }
}


if(dummyResponse.Job[index].imageId == null){
    document.getElementsByClassName("container my-5")[0].innerHTML += 
    `<div class="row">
    <div class="left1">
    <input id="companyName" size="50" type="text" placeholder="Enter company name" class="form-control h-100" value="${dummyResponse.Job[index].company}">
    <div class="valid-feedback">Valid.</div>
    <div class="invalid-feedback">Please provide a company name.</div>
    </div>
    <div class="left2">
    <input type="text" size="50" id="jobTitle" placeholder="Enter job title" class="form-control h-100" value="${dummyResponse.Job[index].title}">
    <div class="valid-feedback">Valid.</div>
    <div class="invalid-feedback">Please provide a job title.</div>
    </div>
    </div>
    <hr>
    <div class="container-fluid align-content-center my-5 clear" >
    <div class="row align-items-center">
    <div class="col-sm-4 d-flex align-items-center justify-content-center">
    <div class="w-50 position-relative">
    <div class="picture-container">
        <div class="picture">
            <img src=${dummyResponse.Job[index].imgaeUrl} class="picture-src"
                id="wizardPicturePreview" title="">
            <input type="file" id="wizard-picture">
        </div>
        <h6 id="choosePictureDescription">Choose Picture</h6>
    </div>
</div>
    </div>
    
    <div class="col">
    <div class="container-fluid ">
    <div class="row mb-3 mx-auto">
    <div class="col-1">
    <span><i class="fas fa-map-marked-alt fa-2x"></i></span>
    </div>
    <div class="col ">
    <input type="text" id="location" class="form-control" placeholder="Enter the location of the company" value="${dummyResponse.Job[index].location}">
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
    <input type="text" class="form-control" placeholder="Enter the salary of this job" id="salary" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value="${dummyResponse.Job[index].salary}">
    <div class="valid-feedback">Valid.</div>
    <div class="invalid-feedback">Please provide the salary of the job.[E.g.: 1234]</div>
    </div>
    </div>
    </div>
    <div class="row mb-3 mx-auto mb-xl-5">
    <div class="col-1">
    <span><i class="fas fa-envelope-open-text fa-2x"></i></span>
    </div>
    <div class="col mx-auto">
    <input type="email" class="form-control" placeholder="Enter your active email address" id="email" value="${dummyResponse.Job[index].email}">
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
            placeholder="Enter new schedule"  id="description" rows="3" >${dummyResponse.Job[index].description}</textarea>
    <div class="valid-feedback">Valid.</div>
    <div class="invalid-feedback">Please provide the description of the job.</div>
    </div>
    <br>
    <a type="button" class="btn btn-primary float-right ml-2" id="post" href="../../html/Alumni/MyJobPage.html">Post</a>
    <a type="button" class="btn btn-outline-secondary float-right ml-2" id="cancel" href="../../html/Alumni/MyJobPage.html">Cancel</a>
    <br>
    <br>
    </div></div>`;
}else{
    imageID=true;
    document.getElementsByClassName("container my-5")[0].innerHTML += 
    `<div class="row">
    <div class="left1">
    <input id="companyName" size="50" type="text" placeholder="Enter company name" class="form-control h-100" value="${dummyResponse.Job[index].company}">
    <div class="valid-feedback">Valid.</div>
    <div class="invalid-feedback">Please provide a company name.</div>
    </div>
    <div class="left2">
    <input type="text" size="50" id="jobTitle" placeholder="Enter job title" class="form-control h-100" value="${dummyResponse.Job[index].title}">
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
            <img src="/Assets/imgs/${dummyResponse.Job[index].imageId}" class="picture-src"
                id="wizardPicturePreview" title="">
            <input type="file" id="wizard-picture">
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
    <input type="text" id="location" size="50" class="form-control" value="${dummyResponse.Job[index].location}">
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
    <input type="text" class="form-control" size="50" id="salary" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value="${dummyResponse.Job[index].salary}">
    <div class="valid-feedback">Valid.</div>
    <div class="invalid-feedback">Please provide the salary of the job.[E.g.: 1234]</div>
    </div>
    </div>
    </div>
    <div class="row mb-3 mx-auto mb-xl-5">
    <div class="col-1">
    <span><i class="fas fa-envelope-open-text fa-2x"></i></span>
    </div>
    <div class="col mx-auto">
    <input type="email" class="form-control" id="email" value="${dummyResponse.Job[index].email}">
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
         placeholder="Enter new schedule"  id="description" rows="3">${dummyResponse.Job[index].description}</textarea>
    <div class="valid-feedback">Valid.</div>
    <div class="invalid-feedback">Please provide the description of the job.</div>
    </div>
    <br>
    <a button type="button" class="btn btn-primary float-right ml-2" id="post" href="../../html/Alumni/MyJobPage.html">Post</a>
    <a button type="button" class="btn btn-outline-secondary float-right ml-2" id="cancel" href="../../html/Alumni/MyJobPage.html">Cancel</a>
    <br>
    <br>
    </div></div>`;
}

    //INPUT WITH HANDLING ERROR 
    const imgPath = "/Assets/imgs/";
    const wizardPicturePreview = document.querySelector('#wizardPicturePreview');
    const img = document.querySelector('#wizard-picture');
    const companyName = document.getElementById("companyName");
    const jobTitle = document.getElementById("jobTitle");
    const location = document.getElementById("location");
    const salary = document.getElementById("salary");
    const email = document.getElementById("email");
    const description = document.getElementById("description");
    const cancel = document.getElementById("cancel");
    const emailFormat = /[a-zA-Z0-9]+@[a-z0-9]+(\.[a-z]+)+/;
    const regex=/^[0-9]+$/;

    /*Check the file extension of the image & Update preview*/
    img.addEventListener('change', (e) => readURL(e));
    function readURL(e) {
    let allowedExtensions =
        /(\.png|\.jpg|\.jpeg)$/i;
    if (e.target.files && e.target.files[0] && allowedExtensions.test(e.target.value)) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("wizardPicturePreview").src = e.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);
        choosePictureDescription.textContent = "Choose picture";
    } else {
        choosePictureDescription.textContent = "Please choose picture in .png, .jpg or .jpeg format";
    }
    }

    console.log(wizardPicturePreview.src)


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

    document.getElementById("post").addEventListener("click", function(e){
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
  
        if (isEmpty(location)) {
            setInValid(location);
            errorExist = true;
        } else {
            setValid(location);
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

        if (errorExist){
            console.log('error');
            e.preventDefault();}
        else{   
                dummyResponse.Job[index].company = companyName.value;
                dummyResponse.Job[index].title = jobTitle.value;
                dummyResponse.Job[index].location = location.value;
                dummyResponse.Job[index].salary = salary.value;
                dummyResponse.Job[index].email = email.value;
                dummyResponse.Job[index].description = description.value;
                if(!imageID){
                    dummyResponse.Job[index].imgaeUrl = wizardPicturePreview.src;
                }else{
                    dummyResponse.Job[index].imgaeUrl = wizardPicturePreview.src;
                    dummyResponse.Job[index].imageId = null;
                }
                updateDummyData(dummyResponse);
                localStorage.removeItem("EditJob");
        }
    });

    cancel.addEventListener("click", function(){
        localStorage.removeItem("EditJob");
    });
