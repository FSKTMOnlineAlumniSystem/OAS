import { dummyResponse, updateDummyData } from "../dummydata.js";

//CREATE A FORM TO CAPTURE USER INPUT
document.getElementById("form").innerHTML += `
  <form id="job_ad_form">
    <div class="mb-3">
      <label for="companyName" class="form-label">Company Name</label>
      <input type="text" class="form-control" id="companyName" aria-describedby="emailHelp">
      <div class="valid-feedback">Valid.</div>
      <div class="invalid-feedback">Please provide a company name.</div>
    </div>
    <div class="mb-3">
      <label for="jobTitle" class="form-label">Job Title</label>
      <input type="text" class="form-control" id="jobTitle" aria-describedby="jobTitle">
      <div class="valid-feedback">Valid.</div>
      <div class="invalid-feedback">Please provide a job title.</div>
    </div>
    <div class="container-fluid mb-3">
      <div class='row'>
        <div class='col-md-4 col-12 d-flex flex-column justify-content-center align-items-center image-area px-0'>
          <img id="imageResult" src="#" alt="" class="company-image">
        </div>
        <div class='col-md-8 col-12 p-0 px-md-2'>
          <label for="upload" class="form-label">Company Image</label>
          <input type="file" class="form-control-file" id="upload" aria-describedby="image">
        </div>
      </div>
    </div>
    <div class="mb-3">
      <label for="email" class="form-label">Email address</label>
      <input type="email" class="form-control" id="email" aria-describedby="emailHelp">
      <div class="valid-feedback">Valid</div>
      <div id="emailFeedback" class="invalid-feedback">Please provide a valid email.</div>
    </div>
    <div class="mb-3">
      <label for="location" class="form-label">Location</label>
      <input type="text" class="form-control" id="locations">
      <div class="valid-feedback">Valid.</div>
      <div class="invalid-feedback">Please provide the location of the company.</div>
    </div>
    <div class="mb-3">
      <label for="salary" class="form-label">Job Salary</label>
      <div class="input-group input-group-sm mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-sm">RM</span>
        </div>
        <input type="text" class="form-control" id="salary" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
        <div class="valid-feedback">Valid.</div>
        <div class="invalid-feedback">Please provide the salary of the job.[E.g.: 1234]</div>
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea name="comment" form="job_ad_form" id="description" class="form-control"
        placeholder="Enter description here..."></textarea>
        <div class="valid-feedback">Valid.</div>
        <div class="invalid-feedback">Please provide the description of the job.</div>
      </div>
      <button type="submit" id="submit" class="btn btn-primary float-right ml-2">Submit</button>
      <a type="button" class="btn btn-outline-secondary float-right" id="cancel" href="../../html/Alumni/MyJobPage.html">Cancel</a>
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
const jobIndex = dummyResponse.Job[dummyResponse.Job.length - 1].jobId.split("-");

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


// CHECK THE VALIDITY OF USER INPUT WHEN PRESSING THE SUBMIT BUTTON
form.addEventListener("submit", (e) => {
  e.preventDefault();
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

  if (errorExist) {
    e.preventDefault();
  } else {
    //IF NO ERROR, ADD THE NEW JOB ADS DETAILS INTO DUMMYDATA
    var newJob = {};
    newJob = {
      jobId: "J-" + (parseInt(jobIndex[1]) + 1),
      alumniId: "AL-1",
      description: description.value,
      salary: salary.value,
      email: email.value,
      location: locations.value,
      title: jobTitle.value,
      company: companyName.value,
      imageId: null,
      imgaeUrl: imageUrl,
    };
    dummyResponse.Job.push(newJob);
    updateDummyData(dummyResponse);
    location.href = "MyJobPage.html";
  }
});

//DISPLAYING THE PICTURE AFTER USER UPLOADED THE FILE
var input = document.getElementById("upload");
function readURL(input) {
  if (input.files && input.files[0]) {
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
  }
}
input.addEventListener("change", (event) => readURL(input));

