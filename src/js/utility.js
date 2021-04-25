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
  const minute = eventDateTime.getMinutes();
  let hour = eventDateTime.getHours();
  const period = hour > 11 ? 'p.m.' : 'a.m.';
  hour = hour === 0 ? 12 : hour;
  hour = hour > 12 ? hour - 12 : hour;
  return `${hour}:${minute} ${period}`;
}