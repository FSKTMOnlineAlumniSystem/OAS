import { dummyResponse, updateDummyData } from '../dummydata.js';

let pageIndex = 0;
var deleted = false;
let count=0;

// const myJobLength = Object.values(dummyResponse.Job).flat().length;
console.log(dummyResponse.Job.length);


//Only display job ads by AL-1
for(let i=0; i<dummyResponse.Job.length; i++){
    if(dummyResponse.Job[i].alumniId == "AL-1"){
        count++;
    }
}

document.getElementById("pageIndex").innerHTML = `<li class="page-item">
    <button class="page-link" id="previousPage">Previous</button></li>` ;

// for (let i = 1; i <= (Math.ceil(dummyResponse.Job.length / 9)); i++)
for (let i = 1; i <= (Math.ceil(count / 9)); i++) {
    document.getElementById("pageIndex").innerHTML +=
        `<li class="page-item"><button class="page-link inner">` + i + `</button></li>`;
}

document.getElementById("pageIndex").innerHTML += `<li class="page-item">
    <button class="page-link" id="nextPage">Next</button></li>` ;


const loadJobList = (pageIndex) => {
    // console.log('dumyData length' + count);

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

    // if (jobEndIndex >= dummyResponse.Job.length)
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
    // document.getElementById('jobList').innerHTML += '<div class="card-desk">' +'<div class="row row-cols-4">'

    // for (let i = jobStartIndex; i < jobEndIndex && i < dummyResponse.Job.length; i++)

    
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
        <div class="col-1"> <img src="../../../Assets/imgs/locationIcon.png" alt="location" width="30" height="30"></div>
        <div class="col-7">${dummyResponse.Job[i].location}</div>
        </div>
        <div class="row cards">
        <div class="col-1">  <img src="../../../Assets/imgs/salaryIcon.png" alt="time" height="24" width="24"></div>
        <div class="col-7">${dummyResponse.Job[i].salary}</div>
        </div>
        </p>
        </div></a>
        <div class="card-footer mt-auto">
        <button type="button" class="close" role="button" aria-pressed="true" data-name=${myJob[i].jobId}><i class="fas fa-trash"></i></button>  
        </div></div><div>`;

        // const readImageUrl = myJob[i].imgaeUrl;
        // console.log(i);
        // console.log(myJob[i].imgaeUrl);
        // // if(readImageUrl){
        //     document.querySelector("#image").setAttribute("src", myJob[i].imgaeUrl);

        // }
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
                <div class="col-1"> <img src="../../../Assets/imgs/locationIcon.png" alt="location" width="30" height="30"></div>
                <div class="col-7">${dummyResponse.Job[i].location}</div>
                </div>
                 <div class="row cards">
                <div class="col-1">  <img src="../../../Assets/imgs/salaryIcon.png" alt="time" height="24" width="24"></div>
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
// ./../html/Alumni/MyJobDetailsPage.html

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
// var myJobList = [];
// myJobList.push(myJob[i]); 
// localStorage.setItem('MyJobList',JSON.stringify(myJobList));
// console.log(myJobList);

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