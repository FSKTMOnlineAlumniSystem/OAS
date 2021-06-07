

//CREATE A FORM TO CAPTURE USER INPUT
document.getElementById("form").innerHTML += `
  <form id="job_ad_form"  method="post" onsubmit="return checkvalidation()" enctype="multipart/form-data">
    <div class="mb-3">
      <label for="companyName" class="form-label">Company Name</label>
      <input type="text" class="form-control" id="companyName" aria-describedby="emailHelp" name="company">
      <div class="valid-feedback">Valid.</div>
      <div class="invalid-feedback">Please provide a company name.</div>
    </div>
    <div class="mb-3">
      <label for="jobTitle" class="form-label">Job Title</label>
      <input type="text" class="form-control" id="jobTitle" aria-describedby="jobTitle" name="title">
      <div class="valid-feedback">Valid.</div>
      <div class="invalid-feedback">Please provide a job title.</div>
    </div>
    <div class="container-fluid mb-3">
      <div class='row'>
        <div class='col-md-4 col-12 d-flex flex-column justify-content-center align-items-center image-area px-0'>
          <img id="imageResult" src="#" alt="" class="company-image">
        </div>
        <div class='col-md-8 col-12 p-0 px-md-2'>
          <label for="upload" id="fileLabel" class="form-label">Company Image</label>
          <input type="file" class="form-control-file" id="upload" aria-describedby="image" name="jobImage" >
          <div class="valid-feedback">Valid.</div>
          <div class="invalid-feedback"></div>
          <div id="fileTooLarge" style="color:red;"></div>
        </div>
      </div>
    </div>
    <div class="mb-3">
      <label for="email" class="form-label">Email address</label>
      <input type="email" class="form-control" id="email" aria-describedby="emailHelp" name="email">
      <div class="valid-feedback">Valid</div>
      <div id="emailFeedback" class="invalid-feedback">Please provide a valid email.</div>
    </div>
    <div class="mb-3">
      <label for="location" class="form-label">Location</label>
      <input type="text" class="form-control" id="locations" name="location">
      <div class="valid-feedback">Valid.</div>
      <div class="invalid-feedback">Please provide the location of the company.</div>
    </div>
    <div class="mb-3">
      <label for="salary" class="form-label">Job Salary</label>
      <div class="input-group input-group-sm mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-sm">RM</span>
        </div>
        <input type="text" class="form-control" id="salary" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" name="salary">
        <div class="valid-feedback">Valid.</div>
        <div class="invalid-feedback">Please provide the salary of the job.[E.g.: 1234]</div>
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea name="description" form="job_ad_form" id="description" class="form-control"
        placeholder="Enter description here..." ></textarea>
        <div class="valid-feedback">Valid.</div>
        <div class="invalid-feedback">Please provide the description of the job.</div>
      </div>
      <input type="submit" name="Submit" id="submit" class="btn btn-primary float-right ml-2" value="Submit"></button>
      <a type="button" class="btn btn-outline-secondary float-right" id="cancel" href="myjob">Cancel</a>
      <br>
    </div>
  </form>`;


//GET ID
var imageUrl;
const companyName = document.getElementById("companyName");
const jobTitle = document.getElementById("jobTitle");
const locations = document.getElementById("locations");
const salary = document.getElementById("salary");
const email = document.getElementById("email");
const description = document.getElementById("description");
const form = document.querySelector("form");
var input = document.getElementById("upload");


//INPUT HANDLING ERROR
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

const emailFormat = /[a-zA-Z0-9]+@[a-z0-9]+(\.[a-z]+)+/;
const regex = /^[0-9]+$/;
const imageFormat = /(\.png|\.jpg|\.jpeg)$/i;


// CHECK THE VALIDITY OF USER INPUT WHEN PRESSING THE SUBMIT BUTTON
function checkvalidation() {
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

  if (isEmpty(upload) || !upload.value.match(imageFormat) || readURL(input)) {
    setInValid(upload);
    errorExist = true;
  } else {
    setValid(upload);
  }

  if (errorExist) {
    return false;
  } 
  else{
    return true;
  }
}

//DISPLAYING THE PICTURE AFTER USER UPLOADED THE FILE
// var input = document.getElementById("upload");
var content = document.getElementById("fileTooLarge");
var fileLabel = document.getElementById("fileLabel");

input.addEventListener("change", (event) => readURL(input));

function readURL(input) {
  content.textContent = "";
  let allowedExtensions =
  /(\.png|\.jpg|\.jpeg)$/i;
 
  if (input.files && input.files[0] && input.files[0].size>10000000) {
    content.textContent = "This image file is too large";
    return true;
  }else if(input.files && input.files[0] && allowedExtensions.test(input.value)){
    var reader = new FileReader();
    reader.readAsDataURL(input.files[0]);
    reader.name = input.files[0].name;
    reader.size = input.files[0].size;

    reader.onload = function (e) {

      var img = new Image();
      img.src = e.target.result;
      img.size = e.target.size;

      img.onload = function (el) {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 300;
        const scaleSize = MAX_WIDTH / el.target.width;
        canvas.width = MAX_WIDTH;
        canvas.height = el.target.height * scaleSize;

        const ctx = canvas.getContext("2d");

        ctx.drawImage(el.target, 0, 0, canvas.width, canvas.height);
        const srcEncoded = ctx.canvas.toDataURL(el.target, "image/jpg");
        imageUrl = srcEncoded;
        document.querySelector("#imageResult").src = srcEncoded;

  
      };
    };
  
  }else if(isEmpty(upload)){
      content.textContent = "Please provide picture for this job.";
  }
  else{
    content.textContent = "Please choose picture in .png, .jpg or .jpeg format.";
  }
}



//TRY
// img.addEventListener('change', (e) => readURL(e));
// function readURL(e) {
//     let allowedExtensions =
//         /(\.png|\.jpg|\.jpeg)$/i;
//     if (e.target.files && e.target.files[0] && e.target.files[0].size>10000000) {
//         // To handle the file size
//         choosePictureDescription.textContent = "Image size must be smaller than 10MB";
//     }else if (e.target.files && e.target.files[0] && allowedExtensions.test(e.target.value)) {
//         profilePicture.files = e.target.files;
//         var reader = new FileReader();
//         reader.onload = function (e) {
//             wizardPicturePreview.src = e.target.result;
//         }
//         reader.readAsDataURL(e.target.files[0]);
//         choosePictureDescription.textContent = "Choose picture";
//     } else {
//         choosePictureDescription.textContent = "Please choose picture in .png, .jpg or .jpeg format";
//     }
// }