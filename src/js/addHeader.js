// hardcode it as alumni
localStorage.setItem('SignedInAlumniId', "AL-1");
const curUser = dummyResponse.Alumni.filter(alumni => alumni.alumniId === localStorage.getItem('SignedInAlumniId'))[0];

const body = document.body;
const mainBody = document.getElementById('main-body');

const header = document.createElement('header');
header.setAttribute('class', 'd-flex flex-row-reverse align-items-center header--gradient p-2 font-weight-bold text-white');
header.innerHTML = `<div id="profile-header">
<img src="/Assets/imgs/AL-1.png" alt="" class="header__img m-1">
<span class="px-1 py-auto">${curUser.name}</span>
<i class="fa fa-angle-down font-weight-bold px-1" aria-hidden="true"></i>
</div>
<img src="/Assets/icons/bell.svg" alt="bell icon" class="header__img mx-2" id='notification-icon'>
<div id='profile-panel' class="profile-panel--display-none"></div>

<div id='notification-panel' class="profile-panel--display-none"></div>`

body.insertBefore(header, nav);

const notificationPanel = document.getElementById('notification-panel');
const profilePanel = document.getElementById('profile-panel');
function toggleNotificationPanel() {
  if (profilePanel.style.display === 'block') {
    toggleProfilePanel();
  }
  // first-time click will add childnode under panel 
  if (!notificationPanel.hasChildNodes()) {
    // build the content from dummy data
    notificationPanel.innerHTML = `<div class="p-2 fw-bold h6 m-0">Notifications</div>
      <ul class='m-0 list-unstyled'>
        <li class="p-2 border-top notification-border"></li>
      </ul>`
    // sort to let not reviewed event at front of array
    let result = []; let lastTrueElementIdx = 0;
    dummyResponse.Alumni_Event.forEach(event => {
      if (event.alumniId == localStorage.getItem('SignedInAlumniId')) {
        if (event.viewedByAlumni === 'TRUE') { result.push(event); }
        else { result.splice(lastTrueElementIdx, 0, event); lastTrueElementIdx++; }
      } else {
        console.log('not this alumni');
      }
    });
    // a function to show 'No notification'
    const showNoNotification = () => {
      const div1 = document.createElement('div');
      div1.setAttribute('class', 'py-2 container-fluid d-flex align-items-center');
      div1.innerHTML = `You have no notification`
      notificationPanel.innerHTML = `<div class="p-2 fw-bold h6 m-0 border-bottom">Notifications</div>`
      notificationPanel.appendChild(div1);
    }
    result.forEach((event, index) => {
      if(event.notificationClosedByAlumni) return;
      const div1 = document.createElement('div');
      div1.setAttribute('class', 'py-2 d-flex container-fluid border-bottom item--hover-light-bg');

      // direct to respective EventDetailsPage
      div1.addEventListener('click', (evt) => {
        localStorage.setItem('eventId', event.eventId);
        window.open('EventDetailsPage.html');
      });

      const eventTitle = dummyResponse.Event.filter(evt => evt.eventId === event.eventId)[0].title;
      let timeStr = ``;
      const dotClass = event.viewedByAlumni === 'TRUE' ? `` : `fa fa-circle p-1 d-flex justify-content-center text-primary`;
      const secondSinceInvitation = (new Date() - new Date(event.dateTime)) / 1000;
      const minute = Math.floor(secondSinceInvitation / 60);
      const hour = Math.floor(minute / 60);
      const day = Math.floor(hour / 24);
      // console.log(`${day} ${hour % 24} ${minute % 60}`);
      if (day === 0) {
        if (hour % 60 === 0) {
          if (minute % 60 === 0) {
            timeStr = `Just Now`;
          } else {
            timeStr = `${minute % 60} minute(s) ago`;
          }
        } else {
          timeStr = `${hour % 24} hour(s) ${minute % 60} minute(s) ago`;
        }
      } else {
        timeStr = `${day} day(s) ${hour % 24} hour(s) ${minute % 60} minute(s) ago`
      }
      div1.innerHTML = `
      <div class="row">
        <div class='col-2 d-flex justify-content-center align-items-center'>
          <i class="fa fa-calendar fa-2x text-primary"></i>
        </div>
        <div class='col-8 flex-grow-1 px-0'>
          You have been invited to join our event!!
          <strong>
            ${eventTitle}
          </strong>
          <div class="text-primary">${timeStr}</div>
        </div>
        <div class="col-2 d-flex justify-content-center">
          <div class='row flex-column'>
            <i class="fa fa-times fa-2x p-1" aria-hidden="true"></i>
            <i class="${dotClass}" aria-hidden="true"></i>
          </div>
        </div>
      </div>`;
      const icon = div1.querySelector('i.fa-times');
      const list = notificationPanel.querySelector('li');
      icon.classList.add('panel__icon--hover-dark-bg');
      icon.addEventListener('click', (event) => {
        list.removeChild(div1);
        event.stopPropagation();
        if(!list.hasChildNodes()){
          showNoNotification();
        }else{
          // console.log(list.childNodes);
        }
      });

      list.appendChild(div1);
    });
    // if have no notification
    if (result.length === 0) {
      showNoNotification();
    }
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
  if (notificationPanel.style.display === 'block') {
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