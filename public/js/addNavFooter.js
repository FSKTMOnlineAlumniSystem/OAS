/**
 * Load this script after loading addHeader.js
 * This nav make respective nav item 'active' based on the url
 */
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
            <li class="nav-item ${location.href.toLowerCase().includes('homepage')? "active":""}">
              <a class="nav-link" aria-current="page" href="/src/html/Alumni/HomePage.html">Home</a>
            </li>
            <li class="nav-item ${location.href.toLowerCase().includes('alumnipage')? "active":""}">
              <a class="nav-link" href="/src/html/Alumni/AlumniPage.html">Alumni</a>
            </li>
            <li class="nav-item dropdown ${location.href.toLowerCase().includes('jobpage')? "active":""}">
              <a class="nav-link dropdown-toggle" href="" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Jobs
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="/src/html/Alumni/JobPage.html">All Job Advertisement</a></li>
                <li><a class="dropdown-item" href="/src/html/Alumni/MyJobPage.html">My Job Advertisement</a></li>
              </ul>
            </li>
            <li class="nav-item ${location.href.toLowerCase().includes('eventpage')? "active":""}">
              <a class="nav-link" href="/src/html/Alumni/EventPage.html">Event</a>
            </li>
            <li class="nav-item">
              <span class="nav-link" id="contact-us-nav-item">Contact Us</span>
            </li>
          </ul>
        </div>
      </div>`;

// scroll to bottom when user click 'Contact Us'
const contactUsNavItem = nav.querySelector('#contact-us-nav-item');
contactUsNavItem.addEventListener('click', function(event){
  // console.log('clicked');
  footer.scrollIntoView({behavior: "smooth"});
});

document.body.insertBefore(nav, document.getElementById('main-body'));