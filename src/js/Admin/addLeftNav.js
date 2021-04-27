/**
 * Make sure the structure of the html page as below
 * <main class="container-fluid h-100" id='main-body'>
    <div class="row h-100">
      <div class="col-2 custom-dark-gray px-0" id="left-nav">
        // Admin left nav bar will be here
      </div>
      <div class="col-10">
        // The main content of the html page goes here
      </div>
  </main>
 */

const leftNav = document.getElementById('left-nav');
leftNav.innerHTML = `<ul class="d-flex flex-column list-unstyled text-dark">
<li class="pl-3 py-2 container-fluid border-bottom border-secondary admin-nav__brighten">
  <a class="nostyle row no-gutters" href="Admin-HomePage.html">
    <i class="d-flex align-items-center justify-content-center fa fa-home fa-2x col-6"></i>
    <span class="d-flex align-items-center col-6">Home</span>
  </a>
</li>
<li class="pl-3 py-2 container-fluid border-bottom border-secondary">
  <a class="nostyle row no-gutters" href="Admin-AlumniListPage.html">
    <i class="d-flex align-items-center justify-content-center fa fa-users fa-2x col-6"></i>
    <span class="d-flex align-items-center col-6">Alumni</span>
  </a>
</li>
<li class="pl-3 py-2 container-fluid border-bottom border-secondary">
  <a class="nostyle row no-gutters" href="Admin-EventPage.html">
    <i class="d-flex align-items-center justify-content-center fa fa-calendar fa-2x col-6"></i>
    <span class="d-flex align-items-center col-6">Event</span>
  </a>
</li>
</ul>`;