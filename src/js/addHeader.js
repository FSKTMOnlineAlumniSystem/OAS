/**
 * Make sure there's either 'SignedInAlumniId' or 'SignedInAdminId' in localStorage
 * Having 2 together may cause bug
 * So this script make it customizable
 * just set if you want the user to be Alumni or Admin below
 * Below header set the alumni as AL-1
 */

import { dummyResponse, updateDummyData } from "./dummydata.js"

// check if this is alumni or admin
let curUser = {};
let isAlumni = !location.href.toLowerCase().includes('admin-');
if (isAlumni) {
  localStorage.setItem('SignedInAlumniId', "AL-1");
  curUser = dummyResponse.Alumni.filter(alumni => alumni.alumniId === localStorage.getItem('SignedInAlumniId'))[0];
} else {
  localStorage.setItem('SignedInAdminId', "AD-1");
  curUser = dummyResponse.Admin.filter(admin => admin.adminId === localStorage.getItem('SignedInAdminId'))[0];
}

const body = document.body;
const header = document.createElement('header');

// check if got notification not viewed and the notification not closed by the alumni
const hasEventNotViewedByAlumni = dummyResponse.Alumni_Event.filter(alumni_event => {
  return !(alumni_event.viewedByAlumni === "true") && !(alumni_event.notificationClosedByAlumni === "true") && alumni_event.alumniId === localStorage.getItem('SignedInAlumniId');
}).length === 0 ? false : true;
console.log(hasEventNotViewedByAlumni);

header.setAttribute('class', 'd-flex flex-row-reverse align-items-center header--gradient header--fixed-height p-2 font-weight-bold text-white');
header.innerHTML = `<div id="profile-header">
<img src="/Assets/imgs/${curUser.imageId}" alt="" class="header__img m-1">
<span class="px-1 py-auto">${curUser.name}</span>
<i class="fa fa-angle-down font-weight-bold px-1" aria-hidden="true"></i>
</div>
${isAlumni ?
    `<img src="${hasEventNotViewedByAlumni ? '/Assets/icons/notification.svg' : '/Assets/icons/bell.svg'}" alt="bell icon" class="mx-2" id='notification-icon' style="height:20px;">` : ``
  }
<div id='profile-panel' class="profile-panel--display-none"></div>

<div id='notification-panel' class="profile-panel--display-none"></div>`

if (isAlumni) body.insertBefore(header, nav);
else body.insertBefore(header, document.getElementById('main-body'));

const notificationPanel = document.getElementById('notification-panel');
const profilePanel = document.getElementById('profile-panel');
function toggleNotificationPanel() {
  if (!isAlumni) return;
  // close profile panel if it's opened
  if (profilePanel.style.display === 'block') {
    toggleProfilePanel();
  }
  // first-time click will add childnode under panel 
  if (!notificationPanel.hasChildNodes()) {
    // build the content from dummy data
    notificationPanel.innerHTML = `<div class="p-2 fw-bold h6 m-0 d-flex justify-content-between">
    Notifications<i class="fa fa-times p-1 panel__icon--hover-dark-bg" aria-hidden="true" id="close-panel-icon"></i>
    </div>
      <ul class='m-0 list-unstyled'>
        <li class="p-2 border-top notification-border"></li>
      </ul>`
    const closePanelIcon = notificationPanel.querySelector('#close-panel-icon');
    console.log(closePanelIcon);
    closePanelIcon.addEventListener('click', toggleNotificationPanel);
    // sort to let not reviewed event at front of array
    let result = []; let lastTrueElementIdx = 0;
    dummyResponse.Alumni_Event.forEach(event => {
      if (event.alumniId == localStorage.getItem('SignedInAlumniId')) {
        if (event.viewedByAlumni === 'true') { result.push(event); }
        else { result.splice(lastTrueElementIdx, 0, event); lastTrueElementIdx++; }
      } else {
        console.log('not this alumni');
      }
    });
    // a function to show 'No notification'
    const showNoNotification = () => {
      const div1 = document.createElement('div');
      div1.setAttribute('class', 'py-2 container-fluid d-flex align-items-center');
      div1.innerHTML = `You have no notification`;
      notificationPanel.innerHTML = `<div class="p-2 fw-bold h6 m-0 border-bottom">Notifications</div>`;
      notificationPanel.appendChild(div1);
    }
    // used as a method to display 'You have no notification'
    let atLeastHasOneEventNotClosed = false;
    result.forEach((event, index) => {
      if (event.notificationClosedByAlumni === "true") return;
      atLeastHasOneEventNotClosed = true;
      const div1 = document.createElement('div');
      div1.setAttribute('class', 'py-2 d-flex container-fluid border-bottom item--hover-light-bg');

      // direct to respective EventDetailsPage
      div1.addEventListener('click', (evt) => {
        event.viewedByAlumni = "true";
        updateDummyData(dummyResponse);
        localStorage.setItem('eventId', event.eventId);
        window.open('EventDetailsPage.html',"_self");
      });
      
      console.log(event.viewedByAlumni);
      const eventTitle = dummyResponse.Event.filter(evt => evt.eventId === event.eventId)[0].title;
      let timeStr = ``;
      const dotClass = event.viewedByAlumni === 'true' ? `` : `fa fa-circle p-1 d-flex justify-content-center text-primary`;
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
          <i class="far fa-calendar-alt fa-2x text-primary"></i>
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
      icon.addEventListener('click', (evt) => {
        list.removeChild(div1);
        evt.stopPropagation();
        event.notificationClosedByAlumni = "true";
        updateDummyData(dummyResponse);
        if (!list.hasChildNodes()) {
          showNoNotification();
        } else {
          // console.log(list.childNodes);
        }
      });
      list.appendChild(div1);
    });
    // if have no notification
    if ((result.length === 0 || !atLeastHasOneEventNotClosed) && isAlumni) {
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
    profilePanel.innerHTML = `<div class="p-2 font-weight-bold m-0 border-bottom profile-panel__item--dark-bg"><a href="/src/html/${isAlumni? 'Alumni/MyProfilePage.html':'Admin/Admin-MyProfilePage.html'}" class="nostyle d-flex align-items-center"><i class="fas fa-user-circle px-2" style="font-size:17px"></i>My Profile</a></div>
    <div class="p-2 font-weight-bold m-0 profile-panel__item--dark-bg"><a href="/src/html/${isAlumni? 'Alumni/LoginPage.html':'Admin/Admin-LoginPage.html'}" class="nostyle d-flex align-items-center"><i class="fas fa-sign-out-alt px-2" style="font-size:17px"></i>Log Out</a></div>`;
    profilePanel.style.display = "block";
  } else {
    if (profilePanel.style.display === "none") {
      profilePanel.style.display = "block";
    } else {
      profilePanel.style.display = "none";
    }
  }
}
if (isAlumni) {
  const notificationIcon = document.getElementById('notification-icon');
  notificationIcon.addEventListener('click', toggleNotificationPanel);
}
const profileHeader = document.getElementById('profile-header');
profileHeader.addEventListener('click', toggleProfilePanel);