import dummyResponse from "../dummydata.js";

console.log(dummyResponse);
const tbody = document.getElementsByTagName('tbody')[0];
dummyResponse.Alumni.forEach(alumni => {
  let tr = document.createElement('tr');
  let td = document.createElement('td');
  let div = document.createElement('div');
  div.setAttribute('class', 'custom-control custom-checkbox text-center');

  let input = document.createElement('input');
  input.setAttribute('type', 'checkbox');
  input.setAttribute('class', 'custom-control-input');
  input.setAttribute('id', 'id-'+alumni.alumniId);

  let label = document.createElement('label');
  label.setAttribute('class', 'custom-control-label');
  label.setAttribute('for', 'id-'+alumni.alumniId);

  div.appendChild(input);
  div.appendChild(label);
  td.appendChild(div);
  tr.appendChild(td);
  
  // avatar column
  td = document.createElement('td');
  const img = document.createElement('img');
  img.setAttribute('src', '/Assets/imgs/'+alumni.imageId);
  img.classList.add('table__td--height');
  td.appendChild(img);
  tr.appendChild(td);
  
  // name column
  td = document.createElement('td');
  let span = document.createElement('span');
  span.innerHTML = alumni.name;
  td.appendChild(span);
  tr.appendChild(td);

  // department column
  td = document.createElement('td');
  span = document.createElement('span');
  span.innerHTML = alumni.department;
  td.appendChild(span);
  tr.appendChild(td);

  // status column
  td = document.createElement('td');
  div = document.createElement('div');
  div.setAttribute('class', 'text-white rounded p-1');
  // check if this alumni invited in this 'Event 1'
  const foundAlumniEvent = dummyResponse.Alumni_Event.filter(alumni_event => {
    return alumni_event.eventId === 'E-1' && alumni.alumniId === alumni_event.alumniId;
  })[0];
  if(foundAlumniEvent){
    div.classList.add('bg-success')
    div.innerText = 'Verified';
  }else{
    div.classList.add('bg-danger')
    div.innerText = 'Not Verified';
  }
  td.appendChild(div);
  tr.appendChild(td);

  // action column
  td = document.createElement('td');
  td.setAttribute('class', 'text-center');
  let a = document.createElement('a');
  // insert 'toggle invitation' function here
  a.setAttribute('href', '#');
  a.setAttribute('role', 'button');
  a.innerHTML = `<a href="#" role="button" value="Delete Row" onclick="DeleteRowFunction(this)">
  <i class="fa fa-trash fa-3x pl-2 text-danger" aria-hidden="true" style="font-size: 35px">
  </i>`;
  td.appendChild(a);
  tr.appendChild(td);

  tbody.appendChild(tr);
});


