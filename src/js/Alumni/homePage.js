import dummyResponse from "../dummydata.js";
console.log("link js");

document.getElementById('event').innerHTML = "";

for (let i = 0;i < dummyResponse.Event.length; i++) {

  // console.log("previous time" + dummyResponse.Event[i].dateTime)
  var d = new Date(dummyResponse.Event[i].dateTime);
  // console.log(dummyResponse.Event[i].dateTime)
  let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
  let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);


  document.getElementById('event').innerHTML += `
  <div class="swiper-slide pl-1 pr-1" >
  <div class="card h-100">
    <div class="w-100 bg-dark d-flex" style="aspect-ratio:1/1;overflow:hidden;">
      <img class="card-img-top w-100 m-auto" src=${dummyResponse.Event[i].imageId} alt="Card image cap">
      </div>
      <div class="card-body">
          <h5 class="card-title text-left">${dummyResponse.Event[i].title}</h5>
          <div class="card-text">

              <div class="row">
                  <div class="col-2 d-flex flex-column">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                          fill="currentColor" class="bi bi-calendar" viewBox="0 0 16 16">
                          <path
                              d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                      </svg>
                  </div>
                  <div class="col-10 d-flex flex-column">
                      <span class="t">${`${da}, ${mo} ${ye}`}</span>
                  </div>
              </div>
              <div class="row">
                  <div class="col-2 d-flex flex-column">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                          fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
                          <path
                              d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                          <path
                              d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                      </svg>
                  </div>
                  <div class="col-10 d-flex flex-column">
                      <span class="t">${d.toLocaleTimeString()}</span>
                  </div>
              </div>
              <div class="row">
                  <div class="col-2 d-flex flex-column">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                          fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
                          <path
                              d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                          <path
                              d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                      </svg>
                  </div>
                  <div class="col-10 d-flex flex-column">
                      <span class="t">${dummyResponse.Event[i].location}</span>
                  </div>
              </div>

          </div>
          <p class="card-text text-center"><small class="text-muted">Last updated 3 mins
                  ago</small></p>
      </div>
  </div>
</div>`;
}




document.getElementById('alumni').innerHTML = "";

for (let i = 0;i < dummyResponse.Alumni.length; i++) {

    document.getElementById('alumni').innerHTML += `
                        <div class="swiper-slide pl-1 pr-1">
                            <div class="card h-100">
                                <div class="w-100 bg-dark" style="aspect-ratio:1/1;overflow:hidden;">
                                    <img class="card-img-top w-100" src="${dummyResponse.Alumni[i].imageId}" alt="Card image cap"
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
                        </div>
`

}


var latest = [];
var dayy =[];
var yearr = [];

for (let i = 0;i < dummyResponse.Job.length; i++) {

    // console.log("previous time" + dummyResponse.Event[i].dateTime)
    var d = new Date(dummyResponse.Job[i].postedDate);
    // console.log(dummyResponse.Event[i].dateTime)
    let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
    let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
    let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);

    dayy[i] = da + "," + i;
    yearr[i] = ye;

}

dayy.sort();
console.log(dayy);
console.log(yearr);


for (var i = 0;i < dayy.length ;i ++) {

    
    var a = dayy[i].split(",");
    var currentYr = new Date();
    var Yr = currentYr.getFullYear();

    console.log(a[1]);
    console.log(yearr[a[i]]);


    if(yearr[a[1]] == Yr){

        latest[i] = a[1];
    }

}

console.log(latest);

document.getElementById('job_row1').innerHTML = "";

for (let i = 0;i <2; i++) {

    document.getElementById('job_row1').innerHTML += `

    <div class="col">
    <a class="d-contents" href="#"><img src="${dummyResponse.Job[latest[i]].imageId}" alt="..."
            width="100%" height="100%"></a>
    </div>
    
    `
}

document.getElementById('job_row2').innerHTML = "";

for (let i = 2;i < 4; i++) {

    document.getElementById('job_row2').innerHTML += `

    <div class="col">
    <a class="d-contents" href="#"><img src="${dummyResponse.Job[latest[i]].imageId}" alt="..."
            width="100%" height="100%"></a>
    </div>
    
    `
}



import Swiper from 'https://unpkg.com/swiper/swiper-bundle.esm.browser.min.js'
        var slidesPerView = 3;
        var spaceBetween = 80;

        if (window.innerWidth<1000 || screen.width < 1000) {
            slidesPerView = 2;
            spaceBetween = 30;
        }
        if (window.innerWidth<600 || screen.width < 600) {
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


// function openSignUp(){
//     document.getElementById('signUP').style.display='block';
// }

// function closeSignUp(){
//     window.onclick = function(event) {
//         if (event.target == popUp) {
//           popUp.style.display = "none";
//         }
//       }
// }

// function openSignIn(){
//     document.getElementById('signIN').style.display='block';
//     window.onclick = function(event) {
//         if (event.target == popUp) {
//           popUp.style.display = "none";
//         }
//       }
// }

// function search(){
//     document.getElementById('search');
// }


// const form_2 = document.getElementById('forgot');
// const sendEmail = document.getElementById('sendEmail');


// const form_1 = document.getElementById('signIN');
// const staticEmail = document.getElementById('staticEmail');
// const inputPassword = document.getElementById('inputPassword');


// const form = document.getElementById('signUP');
// const FirstName = document.getElementById('FirstNameID');
// const LastName = document.getElementById('LastNameID');
// const Email = document.getElementById('Email');
// const IC = document.getElementById('IC');
// const password = document.getElementById('Password');
// const Department = document.getElementById('Department');
// const Batch = document.getElementById('Batch');
// const Gender = document.getElementById('Gender');



// const emailFormat = /[a-zA-Z0-9]+@[a-z0-9]+(\.[a-z]+)+/;

// form_2.addEventListener('submit', (evt) => {

//     let errorExist = false;

//     const sendEmailValue = sendEmail.value.trim();

//     if (isEmpty(sendEmailValue) || !sendEmail.value.match(emailFormat)) {
//         setErrorFor(sendEmail);
//         errorExist = true;
//     } else {
//         setSuccessFor(sendEmail);
//     }

//     if (errorExist) {
//         evt.preventDefault();}

// });


// form_1.addEventListener('submit', (ev) => {

//     let errorExist = false;

//     const staticEmailValue = staticEmail.value.trim();
//     const inputPasswordValue = inputPassword.value.trim();

//     console.log(staticEmailValue);
//     console.log(inputPasswordValue);


//     if (isEmpty(staticEmailValue) || !staticEmail.value.match(emailFormat)) {
//         setErrorFor(staticEmail);
//         errorExist = true;
//     } else {
//         setSuccessFor(staticEmail);
//     }


//     if(isEmpty(inputPasswordValue)) {
//         setErrorFor(inputPassword);
//         errorExist = true;
//     }else{
//         setSuccessFor(inputPassword);
//     }


//     if (errorExist) {
//         ev.preventDefault();}

// });



// form.addEventListener('submit', (e) => {

//     let errorExist = false;

//     const FirstNameValue = FirstNameID.value.trim();
//     const emailValue = Email.value.trim();
//     const LastNameValue = LastNameID.value.trim();
//     const ICValue = IC.value.trim();
//     const passwordValue = Password.value.trim();
//     const DepartmentValue = Department.value.trim();
//     const BatchValue = Batch.value.trim();
//     const GenderValue = Gender.value.trim();

    


//     if(DepartmentValue == 0){
//         console.log("errordep");
//         setErrorFor(Department);
//         errorExist = true;
//         }else{
//             console.log("succdep");
//             setSuccessFor(Department);
//         }

//     if(BatchValue == 0){
//         console.log("errordep");
//         setErrorFor(Batch);
//         errorExist = true;
//         }else{
//             console.log("succdep");
//             setSuccessFor(Batch);
//         }

//     if(GenderValue == 0){
//         console.log("errordep");
//         setErrorFor(Gender);
//         errorExist = true;
//         }else{
//             console.log("succdep");
//             setSuccessFor(Gender);
//         }

//     if(isEmpty(FirstNameValue)){
//         setErrorFor(FirstName);
//         errorExist = true;
//     }else{
//         setSuccessFor(FirstName);
//     }

//     if(isEmpty(LastNameValue)){
//         setErrorFor(LastName);
//         errorExist = true;
//     }else{
//         setSuccessFor(LastName);
//     }


//     if (isEmpty(emailValue) || !Email.value.match(emailFormat)) {
//         setErrorFor(Email);
//         errorExist = true;
//     } else {
//         setSuccessFor(Email);
//     }


//     if(isEmpty(ICValue) || (ICValue.length == 11)){
//         setErrorFor(IC);
//         errorExist = true;
//     }else{
//         setSuccessFor(IC);
//     }


//     if(isEmpty(passwordValue) || checkLength(passwordValue)) {
//         setErrorFor(Password);
//         errorExist = true;
//     }else{
//         setSuccessFor(Password);
//     }



//     if (errorExist) {
//         e.preventDefault();}

    
// });



//  function checkLength(passwordValue) {
//      console.log('checkmethod');
//     if(Password.value.length < 6 ){
//         return true;
//     }else if(Password.value.length > 20 ){
//         return true;
//     }else{
//         return false;
//     }
     
//  }

// function setErrorFor(input) {
//     if (input.classList.contains("is-valid")) {
//         input.classList.replace("is-valid", "is-invalid");
//     } else {
//         input.classList.add("is-invalid");
//     }
// }

// function setSuccessFor(input) {
//     if (input.classList.contains("is-invalid")) {
//         input.classList.replace("is-invalid", "is-valid");
//     } else {
//         input.classList.add("is-valid");
//     }
// }

// //  function isEmail(email) {
// //      console.log("isemail");
// //     return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
// //  }

//  function isEmpty(obj) {
//     return obj.length == 0;
// }
 



