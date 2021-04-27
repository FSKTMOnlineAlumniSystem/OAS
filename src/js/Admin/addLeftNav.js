//<link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />

/**
 * Make sure the structure of the html page as below
 * <main class="container-fluid h-100" id='main-body'>
    <div class="row h-100">
      <div class="col-1 custom-dark-gray px-0" id="left-nav">
        // Admin left nav bar will be here
      </div>
      <div class="col-11">
        // The main content of the html page goes here
      </div>
  </main>
 */

let homePage = location.href.toLowerCase().includes("homepage");
let alumniPage = location.href.toLowerCase().includes("alumni");
let eventPage = location.href.toLowerCase().includes("event");

const leftNav = document.getElementById('left-nav');
leftNav.innerHTML = `<ul class="d-flex flex-column list-unstyled">
<li class="pl-3 py-2 container-fluid admin-nav__brighten my-2 ${homePage?"text-warning":"text-white"}">
  <a class="nostyle row no-gutters d-flex flex-column justify-content-center align-items-center text-center" href="Admin-HomePage.html">
    <i class="d-flex align-items-center justify-content-center fas fa-home fa-2x"></i>
    <span class="d-flex">Home</span>
  </a>
</li>
<li class="pl-3 py-2 container-fluid my-2 ${alumniPage?"text-warning":"text-white"}">
  <a class="nostyle row no-gutters d-flex flex-column justify-content-center align-items-center text-center" href="Admin-AlumniListPage.html">
    <i class="d-flex align-items-center justify-content-center fas fa-users fa-2x col-6"></i>
    <span class="d-flex">Alumni</span>
  </a>
</li>
<li class="pl-3 py-2 container-fluid my-2 ${eventPage?"text-warning":"text-white"}">
  <a class="nostyle row no-gutters d-flex flex-column justify-content-center align-items-center text-center" href="Admin-EventPage.html">
    <i class="d-flex align-items-center justify-content-center far fa-calendar-alt fa-2x col-6"></i>
    <span class="d-flex">Event</span>
  </a>
</li>
</ul>`;