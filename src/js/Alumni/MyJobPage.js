import { dummyResponse, updateDummyData } from '../dummydata.js';

let pageIndex = 0;
var deleted = false;
let count=0;


//Only display job ads by AL-1
for(let i=0; i<dummyResponse.Job.length; i++){
    if(dummyResponse.Job[i].alumniId == "AL-1"){
        count++;
    }
}

document.getElementById("pageIndex").innerHTML = `<li class="page-item">
    <button class="page-link" id="previousPage">Previous</button></li>` ;

for (let i = 1; i <= (Math.ceil(count / 9)); i++) {
    document.getElementById("pageIndex").innerHTML +=
        `<li class="page-item"><button class="page-link inner">` + i + `</button></li>`;
}

document.getElementById("pageIndex").innerHTML += `<li class="page-item">
    <button class="page-link" id="nextPage">Next</button></li>` ;


const loadJobList = (pageIndex) => {

    if (deleted) {
        document.getElementById("pageIndex").innerHTML = `<li class="page-item">
        <button class="page-link" id="previousPage">Previous</button></li>` ;
    
    for (let i = 0; i <= pageIndex; i++) {
        document.getElementById("pageIndex").innerHTML +=
            `<li class="page-item"><button class="page-link inner">` + (i+1) + `</button></li>`;
    }
    
    document.getElementById("pageIndex").innerHTML += `<li class="page-item">
        <button class="page-link" id="nextPage">Next</button></li>` ;
    }

    document.getElementById('jobList').innerHTML = "";
    let jobStartIndex = pageIndex * 9;
    let jobEndIndex = jobStartIndex + 9;

    if (jobEndIndex >= count) {
        document.getElementById("nextPage").disabled = true;
    }
    else {
        document.getElementById("nextPage").disabled = false;
    }
    if (pageIndex == 0) {
        document.getElementById("previousPage").disabled = true;
    }
    else {
        document.getElementById("previousPage").disabled = false;
    }


    for (let i = jobStartIndex;  i <dummyResponse.Job.length ; i++) {
        if(dummyResponse.Job[i].alumniId == "AL-1"){

            if(dummyResponse.Job[i].imageId == null){
        document.getElementById('jobList').innerHTML +=
        `<div class="col mb-4">
        <div class="card h-100" data-name=${dummyResponse.Job[i].jobId}>
        <a href="../../html/Alumni/MyJobDetailsPage.html" >
        <div class="w-100">
        <img src="${dummyResponse.Job[i].imgaeUrl}" id="image" class="card-img-top" alt="aaaaa">
        </div>
        <div class="card-body">
        <h5 class="card-title">${dummyResponse.Job[i].company} - ${dummyResponse.Job[i].title}</h5>
        <p class="card-text">
        <div class="row cards">
        <div class="col-1"><span><i class="fas fa-map-marked-alt fa-lg"></i></span></div>
        <div class="col-7">${dummyResponse.Job[i].location}</div>
        </div>
        <div class="row cards">
        <div class="col-1"><span><i class="fas fa-sack-dollar fa-lg"></i></span></div>
        <div class="col-7">${dummyResponse.Job[i].salary}</div>
        </div>
        </p>
        </div></a>
        <div class="card-footer mt-auto">
        <button type="button" class="close" role="button" aria-pressed="true" data-name=${dummyResponse.Job[i].jobId}><i class="fas fa-trash"></i></button>  
        </div></div><div>`;
    }
            else{
                console.log('image')
                document.getElementById('jobList').innerHTML +=
                `<div class="col mb-4">
                 <div class="card h-100"  data-name=${dummyResponse.Job[i].jobId}>
                 
                 <a href="../../html/Alumni/MyJobDetailsPage.html">
                 <div class="w-100">
                 <img class="w-100" src="../../../Assets/imgs/${dummyResponse.Job[i].imageId}" class="card-img-top" alt="jobPhoto">
                </div>
                 <div class="card-body">
                <h5 class="card-title">${dummyResponse.Job[i].company} - ${dummyResponse.Job[i].title}</h5>
                <p class="card-text">
                <div class="row cards">
                <div class="col-1"><span><i class="fas fa-map-marked-alt fa-lg"></i></span></div>
                <div class="col-7">${dummyResponse.Job[i].location}</div>
                </div>
                 <div class="row cards">
                <div class="col-1"><span><i class="fas fa-sack-dollar fa-lg"></i></span></div>
                <div class="col-7">${dummyResponse.Job[i].salary}</div>
                </div>
                </p>
                </div></a>
                <div class="card-footer mt-auto">
                <button type="button" class="close" role="button" aria-pressed="true" data-name=${dummyResponse.Job[i].jobId}><i class="fas fa-trash"></i></button>  
                </div></div><div>`;      
            }
        }
    }
}

//CLICK
// document.querySelector("#card").addEventListener("click", function(){
    $("#jobList").on("click", ".card ", function () {
        console.log('click')
    var jobName = $(this).attr("data-name");
    var myJobList = [];
    for(let i=0; i <dummyResponse.Job.length; i++){
        if(dummyResponse.Job[i].jobId == jobName){
            myJobList.push(dummyResponse.Job[i]);
            localStorage.setItem('MyJobList',JSON.stringify(myJobList)); 
            break;
        }
    }
  
});

//Delete the job advertisement 
$("#jobList").on("click", ".close", function () {
    var name = $(this).attr("data-name");
    for (let i = 0; i < dummyResponse.Job.length; i++) {
        if (dummyResponse.Job[i].jobId == name) {
            dummyResponse.Job.splice(i, 1);  //at position i remove 1 item
         
            updateDummyData(dummyResponse); //assign array back to localStorage
            break;
        }
    }
    loadJobList(pageIndex);
});

document.getElementById('nextPage').addEventListener("click", function () {
    pageIndex++;
    loadJobList(pageIndex);
});

document.getElementById('previousPage').addEventListener("click", function () {
    pageIndex--;
    loadJobList(pageIndex);
});

loadJobList(pageIndex);