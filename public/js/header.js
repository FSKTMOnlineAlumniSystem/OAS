// below event listener added only when the user is alumni
// add event listener to all close button in the panel
const dropDownMenu = document.getElementById('dropdown-menu');
const dropDownBtn = document.getElementById('notificationDropdownMenuButton');
const closeBtnArr = Array.from(document.querySelectorAll('[data-close-btn-id]'));
closeBtnArr.forEach((btn, index) => {
  btn.addEventListener('click', (evt) => {
    const eventId = btn.dataset.closeBtnId;
    var formData = new FormData();
    formData.append('eventId', eventId);
    formData.append('column', 'notificationClosedByAlumni');
    fetch('api/alumni-event', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      body: formData // body data type must match "Content-Type" header
    }).then(res => {
      return res.json();
    }).then(data => {
      console.log(data);
    })
    evt.stopPropagation();
    const div = btn.closest('[data-notification-href]');
    document.getElementById('dropdown-menu').removeChild(div);
    if(dropDownMenu.querySelectorAll('[data-event-id]').length === 0){
      console.log('zero');
      dropDownMenu.innerHTML = '<div class="dropdown-item py-2 container-fluid d-flex align-items-center">You have no notification.</div>';
      dropDownBtn.click();
      dropDownBtn.querySelector('img').src = '/Assets/icons/bell.svg';
    }else{
      console.log('not zero');
    }
  });
});
// add event listener to notification
const notificationDivArr = Array.from(document.querySelectorAll('[data-notification-href]'));
notificationDivArr.forEach(div => {
  div.addEventListener('click', (evt) => {
    var formData = new FormData();
    formData.append('eventId', div.dataset.eventId);
    formData.append('column', 'viewedByAlumni');
    fetch('api/alumni-event', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      body: formData // body data type must match "Content-Type" header
    }).then(res => {
      return res.json();
    }).then(data => {
      console.log(data);
      window.location.href = div.dataset.notificationHref; // redirect
    })
  });
});

const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn !== null) {
  logoutBtn.addEventListener('click', evt => {
    console.log('button clicked.');
    fetch('/api/log-out', {
      method: 'GET'
    }).then(res =>
      res.json()
    ).then(data => {
      console.log(logoutBtn.dataset.userType);
      console.log(logoutBtn.dataset);
      if(logoutBtn.dataset.userType === 'alumni'){
        location.href = "/login";
      }else{
        location.href = "/admin-login";
      }
    })
  });
}