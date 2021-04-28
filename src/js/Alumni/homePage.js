import { dummyResponse } from "../dummydata.js";
console.log("link js");

localStorage.setItem('currentPage', "homePage");
document.getElementById('event').innerHTML = "";

var latest_1 = [];
var dayy_1 = [];
var yearr_1 = [];

for (let i = 0; i < dummyResponse.Event.length; i++) {

    // console.log("previous time" + dummyResponse.Event[i].dateTime)
    var d = new Date(dummyResponse.Event[i].dateTime);
    // console.log(dummyResponse.Event[i].dateTime)
    let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
    let mo = new Intl.DateTimeFormat("en", { month: "numeric" }).format(d);
    let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);

    dayy_1[i] = mo + "," + da + "," + i;
    yearr_1[i] = ye;

}

dayy_1.sort();
console.log(dayy_1);
console.log(yearr_1);


for (var i = 0; i < dayy_1.length; i++) {


    //day,month,index
    var a_1 = dayy_1[i].split(",");
    var currentYr_1 = new Date();
    var Yr_1 = currentYr_1.getFullYear();

    console.log(a_1[2]);
    console.log(yearr_1[a_1[2]]);


    if (yearr_1[a_1[2]] == Yr_1) {

        latest_1[i] = a_1[2];
    }

}

console.log(latest_1);


for (let i = 0; i < 6; i++) {

    // console.log("previous time" + dummyResponse.Event[i].dateTime)
    var d = new Date(dummyResponse.Event[latest_1[i]].dateTime);
    // console.log(dummyResponse.Event[i].dateTime)
    let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
    let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
    let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);

    const card_event = document.createElement('div');
    card_event.setAttribute('class', 'swiper-slide pl-1 pr-1');

    card_event.innerHTML = `

    <div class="card h-100" id="${dummyResponse.Event[latest_1[i]].eventId}">
       
            <div class="w-100 bg-dark d-flex" style="aspect-ratio:1/1;overflow:hidden;">
        
                <img  class="card-img-top w-100 m-auto" src="/Assets/imgs/${dummyResponse.Event[latest_1[i]].imageId}" alt="Card image cap">
            
            </div>

        
        <div class="card-body">
            <h5 class="card-title text-left">${dummyResponse.Event[latest_1[i]].title}</h5>
            <div class="card-text">
 
                <div class="row">
                    <div class="col-2 d-flex flex-column">
                    <i class="far fa-calendar-alt"></i>
                     </div>
                    <div class="col-10 d-flex flex-column">
                        <span class="t">${`${da}, ${mo} ${ye}`}</span>
                    </div>
                    
                </div>
                    <div class="row">
                        <div class="col-2 d-flex flex-column">
                        <i class="far fa-clock"></i>
                        </div>

                        <div class="col-10 d-flex flex-column">
                            <span class="t">${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                    </div>
                <div class="row">
                    <div class="col-2 d-flex flex-column">
                            <i class="fas fa-map-marked-alt"></i>
                    </div>
                    <div class="col-10 d-flex flex-column">
                        <span class="t">${dummyResponse.Event[latest_1[i]].location}</span>
                    </div>
                </div>
 
            </div>
                   
         </div>
       
    </div>
  `;


    const E = document.getElementById('event');
    // console.log(E);

    const evtHandler = evt => {
        // console.log(`set eventId to ${dummyResponse.Event[latest_1[i]].eventId}`);
        localStorage.setItem('eventId', dummyResponse.Event[latest_1[i]].eventId);
        location.href = "/src/html/Alumni/EventDetailsPage.html";
    };

    console.log(dummyResponse.Event[latest_1[i]].eventId);
    card_event.querySelector('#' + dummyResponse.Event[latest_1[i]].eventId).addEventListener('click', evtHandler);


    E.appendChild(card_event);

}





document.getElementById('alumni').innerHTML = "";

for (let i = 0; i < 6; i++) {

    const card_alumni = document.createElement('div');
    card_alumni.setAttribute('class', 'swiper-slide pl-1 pr-1');

    card_alumni.innerHTML = `
                     
                            <div class="card h-100" id="${dummyResponse.Alumni[i].alumniId}">
                               
                                <div class="w-100 bg-dark" style="aspect-ratio:1/1;overflow:hidden;">
                                    <img class="card-img-top w-100" src="/Assets/imgs/${dummyResponse.Alumni[i].imageId}" alt="Card image cap"
                                    width="100%">
                                </div>
                                
                                <div class="card-body">
                                    <div class="row">
                                        <h5 class="card-title-title font-weight-900px ml-2 mr-2">
                                            ${dummyResponse.Alumni[i].name}</h5>
                                    </div>
 
                                    <p class="card-text mb-1"><span>Achievement:</span><br>
                                    <p class="card-text mb-0" style="display: -webkit-box;
                                        -webkit-line-clamp: 3;
                                        -webkit-box-orient: vertical;
                                        overflow: hidden;
                                        text-overflow: ellipsis;">${dummyResponse.Alumni[i].biography}</p>
                                    </p>
                                    
                                </div>
                             
                            </div>
                       
`


    const A = document.getElementById('alumni');
    // console.log(A);

    const evtHandler = evt => {

        // console.log("clickkk");
        // console.log(`set eventId to ${dummyResponse.Alumni[i].alumniId}`);
        // var s = dummyResponse.Alumni[i].alumniId.split("");
        // console.log(s[3]);
        // console.log(s);
        localStorage.setItem('alumniprofile', i);
        location.href = "/src/html/Alumni/AlumniProfilePage.html";

    };

    // console.log(dummyResponse.Alumni[i].alumniId);
    card_alumni.querySelector('#' + dummyResponse.Alumni[i].alumniId).addEventListener('click', evtHandler);


    A.appendChild(card_alumni);


}


var latest = [];
var dayy = [];
var yearr = [];

for (let i = 0; i < dummyResponse.Job.length; i++) {

    // console.log("previous time" + dummyResponse.Event[i].dateTime)
    var d = new Date(dummyResponse.Job[i].postedDate);
    // console.log(dummyResponse.Event[i].dateTime)
    let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
    let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
    let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);

    dayy[i] = mo + "," + da + "," + i;
    yearr[i] = ye;

}

dayy.sort();
// console.log(dayy);
// console.log(yearr);


for (var i = 0; i < dayy.length; i++) {


    //day,month,index
    var a = dayy[i].split(",");
    var currentYr = new Date();
    var Yr = currentYr.getFullYear();

    // console.log(a[2]);
    // console.log(yearr[a[2]]);


    if (yearr[a[2]] == Yr) {

        latest[i] = a[2];
    }

}

// console.log(latest);


document.getElementById('job_row_1').innerHTML = "";


for (let i = 0; i < 2; i++) {

    const card_job = document.createElement('div');
    card_job.setAttribute('class', 'col');

    card_job.innerHTML = `
 
        <div id="${dummyResponse.Job[latest[i]].jobId}" class="h-100">
      
            <img src="/Assets/imgs/${dummyResponse.Job[latest[i]].imageId}" alt="..."
            width="100%" class="job_image" >
     
    
    `

    const J = document.getElementById('job_row_1');
    // console.log(J);
    var myJobList_1 = [];
    myJobList_1.push(dummyResponse.Job[latest[i]]);

    const evtHandler = evt => {
        // console.log(dummyResponse.Job[latest[i]]);
        var myJobList_1 = [];
        myJobList_1.push(dummyResponse.Job[latest[i]]);
        // console.log(myJobList_1);
        localStorage.setItem('JobList', JSON.stringify(myJobList_1));
        location.href = "/src/html/Alumni/JobDetailsPage.html";

    };

    card_job.querySelector('#' + dummyResponse.Job[latest[i]].jobId).addEventListener('click', evtHandler);

    J.appendChild(card_job);


}

document.getElementById('job_row_2').innerHTML = "";


for (let i = 2; i < 4; i++) {

    const card_job_1 = document.createElement('div');
    card_job_1.setAttribute('class', 'col');

    card_job_1.innerHTML = `
 
        <div id="${dummyResponse.Job[latest[i]].jobId}" class="h-100">
        <a class="d-contents" href=" /src/html/Alumni/JobDetailsPage.html">
            <img src="/Assets/imgs/${dummyResponse.Job[latest[i]].imageId}" alt="..."
            width="100%" class="job_image" >
        </a>
   
    
    `




    const J_1 = document.getElementById('job_row_2');
    // console.log(J_1);
    var myJobList = [];
    myJobList.push(dummyResponse.Job[latest[i]]);

    const evtHandler = evt => {
        // console.log(dummyResponse.Job[latest[i]]);
        var myJobList = [];
        myJobList.push(dummyResponse.Job[latest[i]]);
        // console.log(myJobList);
        localStorage.setItem('JobList', JSON.stringify(myJobList));

    };

    card_job_1.querySelector('#' + dummyResponse.Job[latest[i]].jobId).addEventListener('click', evtHandler);

    J_1.appendChild(card_job_1);

}



import Swiper from 'https://unpkg.com/swiper/swiper-bundle.esm.browser.min.js'
var slidesPerView = 3;
var spaceBetween = 80;

if (window.innerWidth < 1000 || screen.width < 1000) {
    slidesPerView = 2;
    spaceBetween = 30;
}
if (window.innerWidth < 600 || screen.width < 600) {
    slidesPerView = 1;
    spaceBetween = 10;
}

var swiper = new Swiper('.swiper-container', {
    slidesPerView: slidesPerView,
    spaceBetween: spaceBetween,
    slidesPerGroup: slidesPerView,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});


// function viewMoreEvents() {
//     console.log("eventviewmore");
//     location.replace("../../html/Alumni/EventPage.html");
// }

// function viewMoreJob() {
//     console.log("jobviewmore");
//     location.replace("../../html/Alumni/JobPage.html");
// }

// function viewMoreAlumni() {
//     console.log("alumniviewmore");
//     location.replace("../../html/Alumni/alumniPage.html");
// }


var EventView = document.getElementById('viewMoreEvents');

EventView.onclick = function () {

    location.href = "../../html/Alumni/EventPage.html";

}

var JobView = document.getElementById('viewMoreJob');

JobView.onclick = function () {

    location.href = "../../html/Alumni/JobPage.html";

}

var AlumniView = document.getElementById('viewMoreAlumni');

AlumniView.onclick = function () {

    location.href = "../../html/Alumni/alumniPage.html";

}



