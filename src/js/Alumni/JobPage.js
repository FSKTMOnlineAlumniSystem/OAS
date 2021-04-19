import dummyResponse from '../dummydata.js';

let pageIndex = 0;

// document.getElementById("pageIndex").innerHTML = "";
for(let i=1; i<=(Math.ceil(dummyResponse.Job.length/9)); i++){
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

    if(jobEndIndex>=dummyResponse.Job.length){
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
    
    for (let i = jobStartIndex; i < jobEndIndex && i < dummyResponse.Job.length; i++) {
        document.getElementById('jobList').innerHTML += 
        `<div class="col mb-4">
        <div class="card h-100">
        <img src="../../../Assets/imgs/${dummyResponse.Job[i].imageId}" class="card-img-top" alt="jobPhoto">
        <div class="card-body">
        <h5 class="card-title">${dummyResponse.Job[i].title}</h5>
        <p class="card-text">
        <div class="row cards">
        <div class="col-1"> <img src="../../../Assets/imgs/locationIcon.png" alt="location" width="30" height="30"></div>
        <div class="col-7">${dummyResponse.Job[i].location}</div>
        </div>
        <div class="row cards">
        <div class="col-1">  <img src="../../../Assets/imgs/salaryIcon.png" alt="time" height="24" width="24"></div>
        <div class="col-7">${dummyResponse.Job[i].salary}</div>
        </div>
        </p>
        </div></div></div>`;
    }
}


// const nextPage = () => {
//     pageIndex++;
//     loadJobList(pageIndex);
// }

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

