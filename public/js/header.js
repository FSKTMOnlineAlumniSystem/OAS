// below event listener added only when the user is alumni
// add event listener to all close button in the panel
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
// const logoutBtn = document.getElementById('logout-btn');
// logoutBtn.addEventListener('click', evt => {
//   console.log('button clicked.');
//   fetch('/api/logout').then(
//     res => res.json()
//   ).then(data => {
//     console.log(data);
//   })
// });

// debugging purpose
document.getElementById('headerDropdownMenuButton').click();

const logoutBtn = document.getElementById('logout-btn');
logoutBtn.addEventListener('click', evt => {
  console.log('button clicked.');
  fetch('/api/log-out', {
    method: 'GET'
  }).then(res =>
    res.json()
  ).then(data => {
    console.log(data);
    location.href = "/login";
  })
  // $.ajax({
  //   url: '/api/log-out',
  //   type: 'get',
  // data: { search: search },
  // success: function (resp) {
  //   let page = 0;
  //   console.log(resp);
  //   outputList = JSON.parse(resp);
  //   if (outputList.length === 0) {
  //     loadMyJobList(page, outputList, -1);
  //   } else {
  //     loadMyJobList(page, outputList, outputList.length);
  //   }
  // },
  // });

});