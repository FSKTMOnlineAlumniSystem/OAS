import dummyResponse from '../dummydata.js';

let pageIndex = 0;
var deleted = false;
let count=0;


let myJob = JSON.parse(localStorage.getItem("job"));
const myJobLength = Object.values(myJob).flat().length;
console.log(myJobLength);



for(let i=0; i<myJobLength; i++){
    if(myJob[i].alumniId == "AL-1"){
        count++;
    }
}
console.log('count'+count);


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
    console.log('dumyData length' + count);

    if (deleted) {
        document.getElementById("pageIndex").innerHTML = `<li class="page-item">
        <button class="page-link" id="previousPage">Previous</button></li>` ;
    
    for (let i = 0; i <= pageIndex; i++) {
        document.getElementById("pageIndex").innerHTML +=
            `<li class="page-item"><button class="page-link inner">` + (i+1) + `</button></li>`;
        console.log('page2 ' + i)
    }
    
    document.getElementById("pageIndex").innerHTML += `<li class="page-item">
        <button class="page-link" id="nextPage">Next</button></li>` ;
    }

    document.getElementById('jobList').innerHTML = "";
    let jobStartIndex = pageIndex * 9;
    let jobEndIndex = jobStartIndex + 9;
    console.log(pageIndex)
    console.log(jobStartIndex)
    console.log(jobEndIndex)

    // if (jobEndIndex >= dummyResponse.Job.length)
    if (jobEndIndex >= count) {
        document.getElementById("nextPage").disabled = true;
        // console.log('here')
    }
    else {
        document.getElementById("nextPage").disabled = false;
    }
    if (pageIndex == 0) {
        document.getElementById("previousPage").disabled = true;
        // console.log('last page')
    }
    else {
        document.getElementById("previousPage").disabled = false;
    }
    // document.getElementById('jobList').innerHTML += '<div class="card-desk">' +'<div class="row row-cols-4">'

    // for (let i = jobStartIndex; i < jobEndIndex && i < dummyResponse.Job.length; i++)

    
    for (let i = jobStartIndex; i < jobEndIndex || i <myJobLength && count <10; i++) {
       
        if(myJob[i].alumniId == "AL-1"){
            if(myJob[i].imageId == null){
        document.getElementById('jobList').innerHTML +=
        `<div class="col mb-4">
        <div class="card h-100" data-name=${myJob[i].jobId}>
        <a href="../../html/Alumni/MyJobDetailsPage.html" >
        <img src="" id="image" class="card-img-top" alt="jobPhoto">
        <div class="card-body">
        <h5 class="card-title">${myJob[i].company} - ${myJob[i].title}</h5>
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
        </div></a>
        <div class="card-footer mt-auto">
        <button type="button" class="close" role="button" aria-pressed="true" data-name=${myJob[i].jobId}><i class="bi bi-trash-fill"></i></button>  
        </div></div><div>`;

        const readImageUrl = myJob[i].imgaeUrl;
        console.log(readImageUrl)
        if(readImageUrl){
            document.querySelector("#image").setAttribute("src", readImageUrl);
        }}
            else{
                console.log('image')
                document.getElementById('jobList').innerHTML +=
                `<div class="col mb-4">
                 <div class="card h-100"  data-name=${myJob[i].jobId}>
                 <a href="../../html/Alumni/MyJobDetailsPage.html">
                 <img src="../../../Assets/imgs/${myJob[i].imageId}" class="card-img-top" alt="jobPhoto">
                <div class="card-body">
                <h5 class="card-title">${myJob[i].company} - ${myJob[i].title}</h5>
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
                </div></a>
                <div class="card-footer mt-auto">
                <button type="button" class="close" role="button" aria-pressed="true" data-name=${myJob[i].jobId}><i class="bi bi-trash-fill"></i></button>  
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
    for(let i=0; i <myJobLength; i++){
        if(myJob[i].jobId == jobName){
            myJobList.push(myJob[i]);
            localStorage.setItem('MyJobList',JSON.stringify(myJobList)); 
            break;
        }
    }
  
});
// var myJobList = [];
// myJobList.push(myJob[i]); 
// localStorage.setItem('MyJobList',JSON.stringify(myJobList));
// console.log(myJobList);


$("#jobList").on("click", ".close", function () {
    var name = $(this).attr("data-name");
    console.log(myJob)
    for (let i = 0; i < myJobLength; i++) {
        if (myJob[i].jobId == name) {
            myJob.splice(i, 1);  //at position i remove 1 item
         
            localStorage.setItem('job', JSON.stringify(myJob)); //assign array back to localStorage
            break;
        }
    }
   
    loadJobList(pageIndex);
    console.log(dummyResponse.Job.length);
});

document.getElementById('nextPage').addEventListener("click", function () {
    pageIndex++;
    loadJobList(pageIndex);
    console.log('here' + pageIndex)
});

document.getElementById('previousPage').addEventListener("click", function () {
    pageIndex--;
    loadJobList(pageIndex);
    console.log('next' + pageIndex)
});

loadJobList(pageIndex);