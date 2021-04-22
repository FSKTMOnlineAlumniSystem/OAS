import dummyResponse from '../dummydata.js';

let pageIndex = 0;


let myJob = JSON.parse(localStorage.getItem("job"));

const myJobLength = Object.values(myJob).flat().length;
console.log(myJob);

console.log(myJobLength);



// document.getElementById("pageIndex").innerHTML = "";
for(let i=1; i<=(Math.ceil(myJobLength/9)); i++){
    console.log('start')
    document.getElementById("pageIndex").innerHTML += 
    `<li class="page-item"><button class="page-link">`+i+`</button></li>`;
    console.log('page2 ' + i)
}
document.getElementById("pageIndex").innerHTML +=  `<li class="page-item">
<button class="page-link" id="nextPage">Next</button></li>` ;


const loadJobList = (pageIndex) => {
    // document.getElementById('pageIndex').innerHTML = pageIndex+1+"/"+Math.ceil(dummyResponse.Job.length/9);
   
    // console.log(Math.ceil(dummyResponse.Job.length/9));
   
    document.getElementById('jobList').innerHTML = "";
    let jobStartIndex = pageIndex * 9;
    let jobEndIndex = jobStartIndex + 9;
    console.log(pageIndex)
    console.log(jobStartIndex)
    console.log(jobEndIndex)

    if(jobEndIndex>=myJobLength){
        document.getElementById("nextPage").disabled = true;
        console.log('here')
    }
    else{
        document.getElementById("nextPage").disabled = false;
    }
    if(pageIndex==0){
        document.getElementById("previousPage").disabled = true;
        // console.log('last page')
    }
    else{
        document.getElementById("previousPage").disabled = false;
    }
    // document.getElementById('jobList').innerHTML += '<div class="card-desk">' +'<div class="row row-cols-4">'
    
    for (let i = jobStartIndex; i < jobEndIndex && i < myJobLength; i++) {

        console.log(myJob[i].imageId)
        console.log(myJob[i].imgaeUrl)
        
        if(myJob[i].imageId == null){
            document.getElementById('jobList').innerHTML += 
        `<div class="col mb-4">
        <a href="../../html/Alumni/JobDetailsPage.html">
        <div class="card h-100" data-name=${myJob[i].jobId}>
        <img src="" id="image" class="card-img-top" alt="jobPhoto">
        <div class="card-body">
        <h5 class="card-title">${myJob[i].title}</h5>
        <p class="card-text">
        <div class="row cards">
        <div class="col-1"> <img src="../../../Assets/imgs/locationIcon.png" alt="location" width="30" height="30"></div>
        <div class="col-7">${myJob[i].location}</div>
        </div>
        <div class="row cards">
        <div class="col-1">  <img src="../../../Assets/imgs/salaryIcon.png" alt="time" height="24" width="24"></div>
        <div class="col-7">${myJob[i].salary}</div>
        </div>
        </p>
        </div></div></a></div>`;
        console.log('jobbbbb')
        const readImageUrl = myJob[i].imgaeUrl;
        console.log(readImageUrl)
        if(readImageUrl){
            document.querySelector("#image").setAttribute("src", readImageUrl);
            console.log('i '+i)
        }

        }else {
        document.getElementById('jobList').innerHTML += 
        `<div class="col mb-4">
        <a href="../../html/Alumni/JobDetailsPage.html">
        <div class="card h-100" data-name=${myJob[i].jobId}>
        <img src="../../../Assets/imgs/${myJob[i].imageId}" class="card-img-top" alt="jobPhoto">
        <div class="card-body">
        <h5 class="card-title">${myJob[i].title}</h5>
        <p class="card-text">
        <div class="row cards">
        <div class="col-1"> <img src="../../../Assets/imgs/locationIcon.png" alt="location" width="30" height="30"></div>
        <div class="col-7">${myJob[i].location}</div>
        </div>
        <div class="row cards">
        <div class="col-1">  <img src="../../../Assets/imgs/salaryIcon.png" alt="time" height="24" width="24"></div>
        <div class="col-7">${myJob[i].salary}</div>
        </div>
        </p>
        </div></div></a></div>`;}

    }
}


// const nextPage = () => {
//     pageIndex++;
//     loadJobList(pageIndex);
// }

//CLICK
$("#jobList").on("click", ".card ", function () {
    
var jobName = $(this).attr("data-name");
var myJobList = [];
console.log(jobName)
for(let i=0; i <myJobLength; i++){
    if(myJob[i].jobId == jobName){
        console.log('click')
        myJobList.push(myJob[i]);
        localStorage.setItem('JobList',JSON.stringify(myJobList)); 
        break;
    }
}

});





document.getElementById('nextPage').addEventListener("click", function(){
    pageIndex++;
    loadJobList(pageIndex);
    console.log('here' + pageIndex)
});


// const previousPage = () => {
//     pageIndex--;
//     loadJobList(pageIndex);
// }

document.getElementById('previousPage').addEventListener("click", function(){
    pageIndex--;
    loadJobList(pageIndex);
    console.log('next' + pageIndex)
});

loadJobList(pageIndex);


