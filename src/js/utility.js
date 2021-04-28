const getReadableDate = (dateTime) => {
  const eventDateTime = new Date(dateTime);
  const mm = eventDateTime.getMonth();
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const month = monthNames[mm];
  const dd = eventDateTime.getDate();
  const yyyy = eventDateTime.getFullYear();
  return `${month} ${dd}, ${yyyy}`;
}
const getReadableTime = (dateTime) => {
  const eventDateTime = new Date(dateTime);
  let minute = eventDateTime.getMinutes().toString();
  minute = minute.padStart(2, '0');
  let hour = eventDateTime.getHours();
  const period = hour > 11 ? 'p.m.' : 'a.m.';
  hour = hour === 0 ? 12 : hour;
  hour = hour > 12 ? hour - 12 : hour;
  return `${hour}:${minute} ${period}`;
}

function setInValid(el) {
  if (el.classList.contains("is-valid")) {
    el.classList.replace("is-valid", "is-invalid");
  } else {
    el.classList.add("is-invalid");
  }
}

function setValid(el) {
  if (el.classList.contains("is-invalid")) {
    el.classList.replace("is-invalid", "is-valid");
  } else {
    el.classList.add("is-valid");
  }
}

const imgPath = "/Assets/imgs/";

const iconClassName = {
  'backButtonIcon': 'fas fa-chevron-left',
  'calenderIcon': 'far fa-calendar-alt',
  'locationIcon': 'fas fa-map-marked-alt',
  'notificationIcon': 'fas fa-bell',
  'searchIcon': 'fas fa-search',
  'settingIcon': 'fas fa-cog',
  'userIcon': 'fas fa-user-circle',
  'homeIcon': 'fas fa-home',
  'trashIcon': 'far fa-trash-alt',
  'clockIcon': 'far fa-clock',
  'logOutIcon': 'fas fa-sign-out-alt',
  'salaryIcon': 'fas fa-sack-dollar',
  'mailIcon': 'fas fa-envelope-open-text',
  'pencilEditIcon': 'fas fa-pencil-alt',
}
