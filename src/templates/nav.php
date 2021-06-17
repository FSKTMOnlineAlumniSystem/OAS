<nav class="navbar navbar-light navbar-expand-md bg-light container-fluid">
  <div class="container-fluid">
    <a class="navbar-brand" href="https://fsktm.um.edu.my/" target="_blank">
      <img src="/Assets/imgs/umfsktm.png" alt="" class='nav__img'>
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item 
        <?=
        strpos($_SERVER['REQUEST_URI'], 'home') ? " active" : "";
        ?> 
        ">
          <a class="nav-link" aria-current="page" href="/home">Home</a>
        </li>
        <li class="nav-item 
        <?=
        strpos($_SERVER['REQUEST_URI'], 'alumni') ? " active" : "";
        ?> ">
          <a class="nav-link" href="/alumni">Alumni</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle
          <?=
          strpos($_SERVER['REQUEST_URI'], 'job') ? " active" : "";
          ?>" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Jobs
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="/job">All Job Advertisement</a>
            <a class="dropdown-item" href="/myjob">My Job Advertisement</a>
          </div>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle
          <?=
          strpos($_SERVER['REQUEST_URI'], 'event') ? " active" : "";
          ?>" href="#" id="eventDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Events
          </a>
          <div class="dropdown-menu" aria-labelledby="eventDropdown">
            <a class="dropdown-item" href="/event">All Events</a>
            <a class="dropdown-item" href="/my-event">My Events</a>
          </div>
        </li>
        <li class="nav-item">
          <span class="nav-link" id="contact-us-nav-item">Contact Us</span>
        </li>
      </ul>
    </div>
  </div>
</nav>