const body = document.body;
const mainBody = document.getElementById('main-body');

// const header = document.createElement('header');
// header.setAttribute('class', 'd-flex flex-row-reverse align-items-center custom-dark-purple p-2 fw-bold text-white header--gradient');
// header.append('Dr Tey Kok Soon');
// const profileUrl = '..\\..\\..\\Assets\\imgs\\DrTey.jpg';
// const image = document.createElement('img');
// image.src = profileUrl;
// image.className = `header__img m-1`;
// const bellUrl = '..\\..\\..\\Assets\\icons\\bell.svg';
// const image2 = document.createElement('img');
// image2.src = bellUrl;
// image2.className = `header__img m-1`;
// header.appendChild(image);
// header.appendChild(image2);

// body.insertBefore(header, mainBody);

function togglePanel() {
  var notificationPanel = document.getElementById("notification-panel");
  if (notificationPanel.style.display === "none") {
    notificationPanel.style.display = "block";
  } else {
    notificationPanel.style.display = "none";
  }
}

console.log('hi');
// toggle notifcation bar
const notificationPanel = document.getElementById('notification-panel');
const notificationIcon = document.getElementById('notification-icon');
notificationIcon.addEventListener('click', togglePanel)