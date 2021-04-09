const body = document.body;
const mainBody = document.getElementById('main-body');

const header = document.createElement('header');
header.setAttribute('class', 'd-flex flex-row-reverse align-items-center custom-dark-purple p-2 fw-bold text-white');
header.append('Dr Tey Kok Soon');
const profileUrl = '..\\..\\Assets\\imgs\\DrTey.jpg';
const image = document.createElement('img');
image.src = profileUrl;
image.className = `header__img m-1`;
const bellUrl = '..\\..\\Assets\\icons\\bell.svg';
const image2 = document.createElement('img');
image2.src = bellUrl;
image2.className = `header__img m-1`;
header.appendChild(image);
header.appendChild(image2);

const nav = document.createElement('nav');
nav.setAttribute('class', 'navbar navbar-light navbar-expand-md bg-light');
nav.innerHTML = `<div class="container-fluid">
<a class="navbar-brand" href="https://fsktm.um.edu.my/" target="_blank">
  <img src="..\\..\\Assets\\imgs\\umfsktm.png" alt="" class='nav__img'>
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
footer.innerHTML = `<div class='row d-flex justify-content-evenly custom-dark-purple fw-bold text-break text-dark'>
    
<div class='d-flex flex-column col-3'>
  <span class='text-warning'>Contact Us</span>
  <ul>
    <li>
      <span class=''>+603 7967 6300</span>
    </li>
    <li>
      <span class=''>dekan_fsktm@um.edu.my</span>
    </li>
    <li>
      <span class=''>FCSIT Technical Team
        Level 2 Block A
        Faculty of Computer Science and 
        Information Technology
        University of Malaya
        50603 Kuala Lumpur</span>
    </li>
  </ul>
</div>
<div class='d-flex flex-column col-3'>
  <span class='text-warning'>Quick Links</span>
  <a class="" href="#">Home</a>
  <a class="" href="#">Alumni</a>
  <a class="" href="#">Jobs</a>
  <a class="" href="#">Events</a>
</div>
<div class='d-flex flex-column col-3'>
  <span class='text-warning'>Resources</span>
  <a class="" href="#">UM Library</a>
  <a class="" href="#">UM Expert</a>
  <a class="" href="#">UM Research</a>
</div>
<div class='d-flex flex-column col-3'>
  <span class='text-warning'>Follow Us</span>
  <a class="" href="#">Instagram</a>
  <a class="" href="#">Facebook</a>
  <a class="" href="#">Youtube</a>
  <a class="" href="#">Twitter</a>
</div>
</div>`;

body.insertBefore(header, mainBody);
body.insertBefore(nav, mainBody);
body.appendChild(footer);
