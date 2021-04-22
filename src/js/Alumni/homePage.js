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
      <img class="card-img-top h-50" src="${dummyResponse.Event[i].imageId}" alt="Card image cap">
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
                      <span class="t">11.00AM - 12.00AM</span>
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
                                <img class="card-img-top" src="../../../Assets/imgs/Alumni_1.jpg" alt="Card image cap"
                                    width="100%">

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


function openSignUp(){
    document.getElementById('signUP').style.display='block';
}

function closeSignUp(){
    window.onclick = function(event) {
        if (event.target == popUp) {
          popUp.style.display = "none";
        }
      }
}

function openSignIn(){
    document.getElementById('signIN').style.display='block';
    window.onclick = function(event) {
        if (event.target == popUp) {
          popUp.style.display = "none";
        }
      }
}

function search(){
    document.getElementById('search');
}

function searchBar(){
     
}

function viewMore(){

}

const password = document.getElementById('inputPassword');
const signUP = document.getElementById('signUP')

