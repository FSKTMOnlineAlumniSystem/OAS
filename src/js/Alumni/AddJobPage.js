/*  ==========================================
    SHOW UPLOADED IMAGE
* ========================================== */
// var input = document.getElementById('upload');
// function readURL(input) {
//   if (input.files && input.files[0]) {
//       var reader = new FileReader();
   
//       reader.onload = function (e) {
//         console.log(e);
//         document.getElementById('imageResult').setAttribute('src', e.target.result)
//         // localStorage.setItem("recent-image", reader.result);
//       };
//       reader.readAsDataURL(input.files[0]);
//   }
// }
// input.addEventListener( 'change', (event)=>readURL(input));


document.getElementById("form").innerHTML += 
`<form id="job_ad_form" action="/src/html/Alumni/MyJobPage.html">
<div class="mb-3">
  <label for="companyName" class="form-label">Company Name</label>
  <input type="text" class="form-control" id="companyName" aria-describedby="emailHelp">
</div>
<div class="mb-3">
<label for="jobTitle" class="form-label">Job Title</label>
<input type="text" class="form-control" id="jobTitle" aria-describedby="jobTitle">
</div>
<div class="container-fluid mb-3">
        <div class='row'>
          <div class='image-area col-md-4 col-12 d-flex flex-column justify-content-center align-items-center'>
            <span class='image-area-content'>Uploaded image result</span>
            <img id="imageResult" src="#" alt="" class="p-1">
          </div>
          <div class='p-2 col-md-8 col-12'>
            <label for="upload" class="form-label">Company Image</label>
            <input type="file" class="form-control" id="upload" aria-describedby="image">
          </div>
        </div>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input type="email" class="form-control" id="email" aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
          <label for="location" class="form-label">Location</label>
          <input type="text" class="form-control" id="location">
        </div>
        <div class="mb-3">
          <label for="salary" class="form-label">Job Salary</label>
          <input type="text" class="form-control" id="salary">
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Description</label>
          <textarea name="comment" form="job_ad_form" id="description" class="form-control"
            placeholder="Enter description here..."></textarea>
        </div>
        <button type="submit" id="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>`;

  //INPUT
  let myJob = JSON.parse(localStorage.getItem("job"));
  console.log(myJob);
  const myJobLength = Object.values(myJob).flat().length;
  console.log(myJobLength)
  var imageUrl;
  var newJob = {};

  document.getElementById("submit").addEventListener("click", function(){
    var newData_company = document.getElementById("companyName").value;
    var newData_title = document.getElementById("jobTitle").value;
    var newData_location = document.getElementById("location").value;
    var newData_salary = document.getElementById("salary").value;
    var newData_email = document.getElementById("email").value;
    var newData_description = document.getElementById("description").value;

    newJob = {
      "jobId" :  "J-"+(myJobLength +1), 
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
   
      reader.onload = function (e) {
        console.log(e);
        document.getElementById('imageResult').setAttribute('src', e.target.result)
        // localStorage.setItem("recent-image", reader.result);
        imageUrl = reader.result
      };
      reader.readAsDataURL(input.files[0]);
  }
}
input.addEventListener( 'change', (event)=>readURL(input));