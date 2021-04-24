import dummyResponse from "./dummydata.js";

const body = document.body;
const mainBody = document.getElementById('main-body');

const header = document.createElement('header');
header.setAttribute('class', 'd-flex flex-row-reverse align-items-center header--gradient p-2 font-weight-bold text-white');
header.innerHTML = `<div id="profile-header">
<img src="/Assets/imgs/AL-1.png" alt="" class="header__img m-1">
<span class="px-1 py-auto">Dr Tey Kok Soon</span>
<i class="fa fa-angle-down font-weight-bold px-1" aria-hidden="true"></i>
</div>
<img src="/Assets/icons/bell.svg" alt="bell icon" class="header__img mx-2" id='notification-icon'>
<div id='profile-panel' class="profile-panel--display-none"></div>

<div id='notification-panel' class="profile-panel--display-none"></div>`

body.insertBefore(header, mainBody);

let result = []; let lastTrueElementIdx = 0;
    console.log(dummyResponse.Alumni_Event);
    dummyResponse.Alumni_Event.forEach(event => {
      if(event.viewedByAlumni === 'FALSE'){ result.push(event); }
      else{ result.splice(lastTrueElementIdx, 0, event); lastTrueElementIdx++; }
    });
    console.log(result);

const notificationPanel = document.getElementById('notification-panel');
const profilePanel = document.getElementById('profile-panel');
function toggleNotificationPanel() {
  if(profilePanel.style.display === 'block'){
    toggleProfilePanel();
  }
  // first-time click will add childnode under panel 
  if (!notificationPanel.hasChildNodes()) {
    // build the content from dummy data
    // sort to let not reviewed event at front of array
    const result = []; const lastTrueElementIdx = 0;
    console.log(dummyResponse);
    dummyResponse.Alumni_Event.forEach(event => {
      if(event.viewedByAlumni){ result.push(event); }
      else{ result.splice(lastTrueElementIdx, 0, event); lastTrueElementIdx++; }
    });
    console.log(result);
    notificationPanel.innerHTML = `<div class="p-2 fw-bold h6 m-0">Notifications</div>
    <ul class='m-0 list-unstyled'>
      <li class="p-2 border-top notification-border">
        <div class="p-2 d-flex container-fluid border-bottom item--hover-dark-bg">
          <div class="row">
            <div class='col-2 d-flex justify-content-center align-items-center'>
              <i class="fa fa-calendar fa-2x text-primary"></i>
            </div>
            <div class='col-8 flex-grow-1'>
              You have been invited to join our event!!
              <strong>
                Keselamatan Siber Di Kalangan Kanak-Kanak
              </strong>
              <div class="text-primary">Just now</div>
            </div>
            <div class="col-1">
              <div class='row flex-column'>
                <i class="fa fa-times fa-2x p-1" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>`;
    notificationPanel.style.display = "block";
  } else {
    if (notificationPanel.style.display === "none") {
      notificationPanel.style.display = "block";
    } else {
      notificationPanel.style.display = "none";
    }
  }
}
function toggleProfilePanel() {
  if(notificationPanel.style.display === 'block'){
    toggleNotificationPanel();
  }
  // first-time click will add childnode under panel
  if (!profilePanel.hasChildNodes()) {
    profilePanel.innerHTML = `<div class="p-2 font-weight-bold m-0 border-bottom profile-panel__item--dark-bg"><a href="/src/html/Alumni/AlumniProfilePage.html" class="nostyle">My Profile</a></div>
    <div class="p-2 font-weight-bold m-0 profile-panel__item--dark-bg"><a href="/src/html/Alumni/HomePage.html" class="nostyle">Log Out</a></div>`;
    profilePanel.style.display = "block";
  } else {
    if (profilePanel.style.display === "none") {
      profilePanel.style.display = "block";
    } else {
      profilePanel.style.display = "none";
    }
  }
}

const notificationIcon = document.getElementById('notification-icon');
const profileHeader = document.getElementById('profile-header');
notificationIcon.addEventListener('click', toggleNotificationPanel);
profileHeader.addEventListener('click', toggleProfilePanel);