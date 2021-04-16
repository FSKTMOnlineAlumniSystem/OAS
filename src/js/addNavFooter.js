// const body = document.body;
// const mainBody = document.getElementById('main-body');

const nav = document.createElement('nav');
nav.setAttribute('class', 'navbar navbar-light navbar-expand-md bg-light container-fluid');
nav.innerHTML = `
<div class="container-fluid">
        <a class="navbar-brand" href="https://fsktm.um.edu.my/" target="_blank">
          <img src="/Assets/imgs/umfsktm.png" alt="" class='nav__img'>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/src/html/Alumni/HomePage.html">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/src/html/Alumni/AlumniPage.html">Alumni</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Jobs
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="/src/html/Alumni/JobPage.html">All Job Advertisement</a></li>
                <li><a class="dropdown-item" href="/src/html/Alumni/MyJobPage.html">Your Job Advertisement</a></li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/src/html/Alumni/EventPage.html">Event</a>
            </li>
            <li class="nav-item">
              <span class="nav-link" id="contact-us-nav-item">Contact Us</span>
            </li>
          </ul>
        </div>
      </div>`;

const footer = document.createElement('footer');
footer.setAttribute('class', 'container-fluid');
footer.innerHTML = `<div class='row d-flex justify-content-evenly justify-content-md-center footer--gradient text-break text-dark py-2'>
<div class='d-flex flex-column col-12 col-md-3 text-white'>
  <div class='fw-bold p-3'>
    Contact Us
  </div>
  <div id="contactUs">
    <div class="d-flex flex-column px-3">
      <span class='pt-2'>+603 7967 6300</span>
      <span class='pt-2'>dekan_fsktm@um.edu.my</span>
      <span class='pt-2'>FCSIT Technical Team
        Level 2 Block A
        Faculty of Computer Science and
        Information Technology
        University of Malaya
        50603 Kuala Lumpur</span>
    </div>
  </div>
</div>
<div class='d-flex flex-column col-12 col-md-3 mt-2 mt-md-0 text-white' id='links'>
  <div class='fw-bold p-3'>
        Quick Links
  </div>
  <div id="quickLinks">
    <div class="d-flex flex-column px-3">
      <a class="nostyle" href="#">Home</a>
      <a class="nostyle" href="#">Alumni</a>
      <a class="nostyle" href="#">Jobs</a>
      <a class="nostyle" href="#">Events</a>
    </div>
  </div>
</div>
<div class='d-flex flex-column col-12 col-md-3 mt-2 mt-md-0 text-white'>
  <div class='fw-bold p-3'>
        Resources
  </div>
  <div id="resources">
    <div class="d-flex flex-column px-3">
      <a class="nostyle" href="#">UM Library</a>
      <a class="nostyle" href="#">UM Expert</a>
      <a class="nostyle" href="#">UM Research</a>
    </div>
  </div>
</div>
<div class='d-flex flex-column col-12 col-md-3 mt-2 mt-md-0 text-white'>
  <div class='fw-bold p-3'>
        Follow Us
  </div>
  <div id="followUs">
    <div class="d-flex flex-column px-3">
      <a class="nostyle" href="#">Instagram</a>
      <a class="nostyle" href="#">Facebook</a>
      <a class="nostyle" href="#">Youtube</a>
      <a class="nostyle" href="#">Twitter</a>
    </div>
  </div>
</div>
</div>`;

// scroll to bottom when user click 'Contact Us'
const contactUsNavItem = nav.querySelector('#contact-us-nav-item');
contactUsNavItem.addEventListener('click', function(event){
  console.log('clicked');
  footer.scrollIntoView();
});

console.log(nav);
body.insertBefore(nav, mainBody);
body.appendChild(footer);