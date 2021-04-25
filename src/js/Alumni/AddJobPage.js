

document.getElementById("form").innerHTML += 
`<form id="job_ad_form" action="/src/html/Alumni/MyJobPage.html">
<div class="mb-3">
  <label for="companyName" class="form-label">Company Name</label>
  <input type="text" class="form-control" id="companyName" aria-describedby="emailHelp" required>
</div>
<div class="mb-3">
<label for="jobTitle" class="form-label">Job Title</label>
<input type="text" class="form-control" id="jobTitle" aria-describedby="jobTitle" required>
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
          <input type="email" class="form-control" id="email" aria-describedby="emailHelp" required>
        </div>
        <div class="mb-3">
          <label for="location" class="form-label">Location</label>
          <input type="text" class="form-control" id="location" required>
        </div>
        <div class="mb-3">
          <label for="salary" class="form-label">Job Salary</label>
          <input type="text" class="form-control" id="salary" required>
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Description</label>
          <textarea name="comment" form="job_ad_form" id="description" class="form-control"
            placeholder="Enter description here..." required></textarea>
        </div>
        <button type="submit" id="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>`;

/*  ==========================================
    SHOW UPLOADED IMAGE
* ========================================== */
var input = document.getElementById('upload');
function readURL(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();
   
      reader.onload = function (e) {
        console.log(e);
        document.getElementById('imageResult').setAttribute('src', e.target.result)
        // localStorage.setItem("recent-image", reader.result);
      };
      reader.readAsDataURL(input.files[0]);
  }
}
input.addEventListener( 'change', (event)=>readURL(input));

  //INPUT
  let myJob = JSON.parse(localStorage.getItem("job"));
  console.log(myJob);
  const myJobLength = Object.values(myJob).flat().length;
  console.log(myJobLength)
  var imageUrl;
  var newJob = {};

  // console.log(myJobLength.jobId);
  // console.log((myJob[myJobLength-1].jobId).split("-"));
  const jobIndex = myJob[myJobLength-1].jobId.split("-");
  // console.log(parseInt(jobIndex[1])+1);

  document.getElementById("submit").addEventListener("click", function(){
    console.log('submit')
    var newData_company = document.getElementById("companyName").value;
    var newData_title = document.getElementById("jobTitle").value;
    var newData_location = document.getElementById("location").value;
    var newData_salary = document.getElementById("salary").value;
    var newData_email = document.getElementById("email").value;
    var newData_description = document.getElementById("description").value;

    console.log(myJobLength.jobId);
    console.log(myJob[myJobLength-1].jobId);
    // const jobIndex = 

    newJob = {
      "jobId" :  "J-"+(parseInt(jobIndex[1])+1), 
      "alumniId" : "AL-1",
      "description" : newData_description,
      "salary" : newData_salary,
      "email" : newData_email,
      "location" : newData_location,
      "title" : newData_title,
      "company" : newData_company, 
      "imageId" : null,
      "imgaeUrl" : imageUrl
    };

    console.log(newJob);
    myJob.push(newJob);
    console.log(myJob);

    localStorage.setItem('job', JSON.stringify(myJob));
    console.log(myJob);

//     myJob[index].title = newData_title;
//     myJob[index].location = newData_location;
//     myJob[index].salary = newData_salary;
//     myJob[index].email = newData_email;
//     myJob[index].description = newData_description;

//     localStorage.setItem('job', JSON.stringify(myJob));
});





    var input = document.getElementById('upload');
    
    function readURL(input) {
    if (input.files && input.files[0]) {
       var reader = new FileReader();
       reader.readAsDataURL(input.files[0]);
       reader.name = input.files[0].name;
       reader.size = input.files[0].size;

      reader.onload = function (e) {
        // const imgElement = document.getElementsByTagName("img");
        console.log(e);
        
        var img = new Image();
        img.src = e.target.result;
        img.size = e.target.size;

        img.onload = function(el){
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 300;
        const scaleSize = MAX_WIDTH / el.target.width;
        canvas.width = MAX_WIDTH;
        canvas.height = el.target.height * scaleSize;

        const ctx = canvas.getContext("2d");

        ctx.drawImage(el.target, 0, 0, canvas.width, canvas.height);
        console.log(e.target);
        const srcEncoded = ctx.canvas.toDataURL(el.target,"image/jpg");
        console.log(srcEncoded);
        imageUrl = srcEncoded;
        // document.getElementById('imageResult').setAttribute('src', e.target.result)
       document.querySelector("#imageResult").src = srcEncoded;
      // document.getElementById('imageResult').setAttribute('src', el.target.result)
        }
      }
        // localStorage.setItem("recent-image", reader.result);
        // imageUrl = srcEncoded;
      };
      // reader.readAsDataURL(input.files[0]);
  
}
input.addEventListener( 'change', (event)=>readURL(input));