// const body = document.body;
// const mainBody = document.getElementById('main-body');

const nav = document.createElement('nav');
nav.setAttribute('class', 'navbar navbar-light navbar-expand-md bg-light container-fluid');
nav.innerHTML = `
<a class="navbar-brand" href="https://fsktm.um.edu.my/" target="_blank">
  <img src="..\\..\\..\\Assets\\imgs\\umfsktm.png" alt="" class='nav__img'>
</a>
<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
  <span class="navbar-toggler-icon"></span>
</button>

<div class="collapse navbar-collapse" id="navbarSupportedContent">
  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
    <li class="nav-item">
      <a class="nav-link active" aria-current="page" href="#">Home</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">Alumni</a>
    </li>
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        Jobs
      </a>
      <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
        <li><a class="dropdown-item" href="#">All Job Advertisement</a></li>
        <li><a class="dropdown-item" href="#">Your Job Advertisement</a></li>
      </ul>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">Event</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">Contact Us</a>
    </li>
  </ul>
</div>`;

const footer = document.createElement('footer');
footer.setAttribute('class', 'container-fluid');
footer.innerHTML = `<div class='row d-flex justify-content-evenly justify-content-md-center bg-dark text-break text-dark py-2'>
<div class='d-flex flex-column col-12 col-md-3 text-white'>
  <div>
    <a class="btn text-white" role="button" data-toggle="collapse" data-target="#contactUs" aria-expanded="false"
      aria-controls="contactUs"><u>Contact Us</u></a>
  </div>
  <div class="collapse" id="contactUs">
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
  <div>
    <a class="btn text-white" role="button" data-toggle="collapse" data-target="#quickLinks"
      aria-expanded="false" aria-controls="quickLinks"><u>
        Quick Links
      </u>
    </a>
  </div>
  <div class="collapse" id="quickLinks">
    <div class="d-flex flex-column px-3">
      <a class="nostyle" href="#">Home</a>
      <a class="nostyle" href="#">Alumni</a>
      <a class="nostyle" href="#">Jobs</a>
      <a class="nostyle" href="#">Events</a>
    </div>
  </div>
</div>
<div class='d-flex flex-column col-12 col-md-3 mt-2 mt-md-0 text-white'>
  <div>
    <a class="btn text-white" role="button" data-toggle="collapse" data-target="#resources" aria-expanded="false"
      aria-controls="resources"><u>
        Resources
      </u>
    </a>
  </div>
  <div class="collapse" id="resources">
    <div class="d-flex flex-column px-3">
      <a class="nostyle" href="#">UM Library</a>
      <a class="nostyle" href="#">UM Expert</a>
      <a class="nostyle" href="#">UM Research</a>
    </div>
  </div>
</div>
<div class='d-flex flex-column col-12 col-md-3 mt-2 mt-md-0 text-white'>
  <div>
    <a class="btn text-white" role="button" data-toggle="collapse" data-target="#followUs" aria-expanded="false"
      aria-controls="followUs"><u>
        Follow Us
      </u>
    </a>
  </div>
  <div class="collapse" id="followUs">
    <div class="d-flex flex-column px-3">
      <a class="nostyle" href="#">Instagram</a>
      <a class="nostyle" href="#">Facebook</a>
      <a class="nostyle" href="#">Youtube</a>
      <a class="nostyle" href="#">Twitter</a>
    </div>
  </div>
</div>
</div>`;

body.insertBefore(nav, mainBody);
body.appendChild(footer);
