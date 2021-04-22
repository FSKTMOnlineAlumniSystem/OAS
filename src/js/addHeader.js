const body = document.body;
const mainBody = document.getElementById('main-body');

const header = document.createElement('header');
header.setAttribute('class', 'd-flex flex-row-reverse align-items-center header--gradient p-2 fw-bold text-white');
header.innerHTML = `Dr Tey Kok Soon
<img src="/Assets/imgs/AL-1.png" alt="" class="header__img m-1">
<img src="/Assets/icons/bell.svg" alt="" class="header__img m-1" id='notification-icon'> 
<div id='notification-panel'>
  <div class="p-2 fw-bold h6 m-0">Notifications</div>
  <ul class='m-0 list-unstyled'>
    <li class="p-2 border-top notification-border">
      <div class="d-flex container-fluid">
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
  </ul>
</div>`

body.insertBefore(header, mainBody);

function togglePanel() {
  var notificationPanel = document.getElementById("notification-panel");
  if (notificationPanel.style.display === "none") {
    notificationPanel.style.display = "block";
  } else {
    notificationPanel.style.display = "none";
  }
}
togglePanel();
// toggle notifcation bar
const notificationPanel = document.getElementById('notification-panel');
const notificationIcon = document.getElementById('notification-icon');
notificationIcon.addEventListener('click', togglePanel)