import dummyResponse from '../dummydata.js';

// let index;
// let myJob = JSON.parse(localStorage.getItem("job"));
// const myJobLength = Object.values(myJob).flat().length;

// for (let i=0; i<myJobLength;i++){
//     if(myJob[i].alumniId == "AL-1"){
//         index = i;
//     }
//     console.log(index)
// }

let myJob = JSON.parse(localStorage.getItem("JobList"));
console.log(myJob);
console.log(myJob[0].jobId);

if(myJob[0].imageId == null){
document.getElementById("jobDetails").innerHTML += 
`  <h1>${myJob[0].company} - ${myJob[0].title}</h1>
<hr>
<div class="container" style="width:90%">
        <div class="row align-items-center">
            <div class="col-4 w-auto">
                <div class="picture mx-auto">
                    <img src="" id="image" alt="Company Logo" width="100%">
                </div>
            </div>
            <div class="col">
                <div class="container-fluid ">
                    <div class="row mb-3 mx-auto">
                        <img src="https://img.icons8.com/color/48/000000/marker--v1.png" width="40" height="auto">
                        <div class="col ">
                            <p id="info">${myJob[0].location}</p>
                        </div>
                    </div>
                <div class="row mb-3 mx-auto">
                <img src="https://img.icons8.com/doodle/48/000000/money.png" width="40" height="auto">
                <div class="col">
                     <p id="info">RM${myJob[0].salary}</p>
                </div>
                </div>
                <div id = "email" class="row mb-3 mx-auto mr-5 mb-xl-5">
                    <img src="https://img.icons8.com/fluent/48/000000/email-open.png" width="40" width="auto">
                    <div class="col">
                        <a href="mailto:${myJob[0].email}">${myJob[0].email}</a>
                    </div>
                </div>
                </div>
            </div>
            <div class="col-12 mt-md-3">
                    <div class="font-weight-bold">
                        <div id=bio-title>Job Description</div>
                        <div id=job class="rounded-lg p-3 text-justify">
                            <div id=bio class="rounded-lg p-3 text-justify">${myJob[0].description}</div>
                        </div>
                    </div>
                </div>
                <br>
            <br>
        </div></div></div>`;
        const readImageUrl = myJob[0].imgaeUrl;
        console.log(readImageUrl)
        if(readImageUrl){
            document.querySelector("#image").setAttribute("src", readImageUrl);
        }
    }else{
        document.getElementById("jobDetails").innerHTML += 
`  <h1>${myJob[0].company} - ${myJob[0].title}</h1>
<hr>
<div class="container" style="width:90%">
        <div class="row align-items-center">
            <div class="col-4 w-auto">
                <div class="picture mx-auto">
                    <img src="../../../Assets/imgs/${myJob[0].imageId}" alt="Company Logo" width="100%">
                </div>
            </div>
            <div class="col">
                <div class="container-fluid ">
                    <div class="row mb-3 mx-auto">
                        <img src="https://img.icons8.com/color/48/000000/marker--v1.png" width="40" height="auto">
                        <div class="col ">
                            <p id="info">${myJob[0].location}</p>
                        </div>
                    </div>
                <div class="row mb-3 mx-auto">
                <img src="https://img.icons8.com/doodle/48/000000/money.png" width="40" height="auto">
                <div class="col">
                     <p id="info">RM${myJob[0].salary}</p>
                </div>
                </div>
                <div id = "email" class="row mb-3 mx-auto mr-5 mb-xl-5">
                    <img src="https://img.icons8.com/fluent/48/000000/email-open.png" width="40" width="auto">
                    <div class="col">
                        <a href="mailto:${myJob[0].email}">${myJob[0].email}</a>
                    </div>
                </div>
                </div>
            </div>
            <div class="col-12 mt-md-3">
                    <div class="font-weight-bold">
                        <div id=bio-title>Job Description</div>
                        <div id=job class="rounded-lg p-3 text-justify">
                            <div id=bio class="rounded-lg p-3 text-justify">${myJob[0].description}</div>
                        </div>
                    </div>
                </div>
                <br>
            <br>
        </div></div></div>`;
    }

    localStorage.removeItem('JobList');
