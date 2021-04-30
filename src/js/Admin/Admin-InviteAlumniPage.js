import{ dummyResponse,updateDummyData} from "../dummydata.js";

console.log(dummyResponse);
let pageIndex = '0';
var clickedSomething=0;
const loadEventList = (pageIndex) => {
// const loadEventList = () => {
const tbody = document.getElementsByTagName('tbody')[0];
tbody.innerHTML="";
dummyResponse.Alumni.forEach((alumni,index) => {
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
  td.innerHTML = `<div style="aspect-ratio:1/1; height:100px; margin-left:10px;margin-right:auto;overflow:hidden">
    <img class='table__td--height' src=${'/Assets/imgs/'+alumni.imageId}>
  </div>`
  td.setAttribute('width','140px')
  const img = document.createElement('img');
  // img.setAttribute('src', '/Assets/imgs/'+alumni.imageId);
  // img.setAttribute('width',100);
  // img.setAttribute('height',150);
  img.classList.add('table__td--height');
  td.appendChild(img);
  tr.appendChild(td);
  
  // name column
 
  td = document.createElement('td');
  // td.innerHTML = `
  // <span class="alumniName">${alumni.name}</span>`
  // // let span = document.createElement('span');
  // // span.innerHTML = alumni.name;
  // // td.appendChild(span);
  // tr.appendChild(td);
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
  div.setAttribute('class', 'text-black rounded p-1');

  // check if this alumni invited in this 'Event 1'
  const foundAlumniEvent = dummyResponse.Alumni_Event.filter(alumni_event => {
    return alumni_event.eventId === localStorage.getItem("eventId") && alumni.alumniId === alumni_event.alumniId;
  })[0];
  if(foundAlumniEvent){
    div.classList.add('bg-success')
    div.innerText = 'Invited';
  }else{
    div.classList.add('bg-danger')
    div.innerText = 'Not Invited';
  }
  td.appendChild(div);
  tr.appendChild(td);

  // action column
  td = document.createElement('td');
  td.setAttribute('class', 'text-center');
  // let a = document.createElement('a');
  // // insert 'toggle invitation' function here
  // a.setAttribute('href', '#');
  // a.setAttribute('class','inviteNewAlumni')
  // a.setAttribute('id',index)
  // a.setAttribute('role', 'button');
  // // a.setAttribute('onclick','inviteAlumni(this)');
  
  // a.innerHTML = `<i class="fas fa-user-plus fa-3x pl-2" aria-hidden="true" style="font-size: 35px; color: #000000">
  // </i>`;
  td.innerHTML=`
  <a href="#" class="inviteNewAlumni"  role='button' id=${index} onclick='inviteNewAlumni(this),clicked()'>
  <i class="fas fa-user-plus fa-3x pl-2"  aria-hidden="true" style="font-size: 35px; color: #000000">
  </i>
</a>
  `
  // td.appendChild(a);
  tr.appendChild(td);

  tbody.appendChild(tr);
// console.log(document.getElementById(index));
});
// };
}
window.toggle = function (source) {
  console.log("checkbox")
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i] != source)
      checkboxes[i].checked = source.checked;
  }
}

window.filterSearchBar = function() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("searchBar");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (var i = 1; i < tr.length; i++) {
    var tds = tr[i].getElementsByTagName("td");
    var flag = false;
    for(var j = 0; j < tds.length; j++){
      var td = tds[j];
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        flag = true;
      } 
    }
    if(flag){
        tr[i].style.display = "";
    }
    else {
        tr[i].style.display = "none";
    }
  }
}

// window.DeleteRowFunction = function(o) {
//   var p=o.parentNode.parentNode.parentNode;
//       p.parentNode.removeChild(p);
//       dummyResponse.Alumni.splice(o.target.id, 1)
//       updateDummyData(dummyResponse)
//  }

$(document).ready(function () {
    $("#status,#department").on("change", function () {
        var status = $('#status').find("option:selected").val();
        var department = $('#department').find("option:selected").val();
        SearchData(status, department)
    });
});

window.SearchData = function(status, department) {
    if (status.toUpperCase() == 'ALL' && department.toUpperCase() == 'ALL') {
        $('#myTable tbody tr').show();
    } else {
        $('#myTable tbody tr:has(td)').each(function () {
            var rowStatus = $.trim($(this).find('td:eq(4)').text());
            var rowDepartment = $.trim($(this).find('td:eq(3)').text());
            if (status.toUpperCase() != 'ALL' && department.toUpperCase() != 'ALL') {
                if (rowStatus.toUpperCase() == status.toUpperCase() && rowDepartment == department) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            } else if ($(this).find('td:eq(4)').text() != '' || $(this).find('td:eq(4)').text() != '') {
                if (status != 'All' || department == 'All') {
                    if (rowStatus.toUpperCase() == status.toUpperCase()) {
                        $(this).show();
                    } else {
                        $(this).hide();
                    }
                }
                if (department != 'All' || status =='All') {
                    if (rowDepartment == department) {
                        $(this).show();
                    }
                    else {
                        $(this).hide();
                    }
                }
            }

        });
    }
}
//clearAll
// document.getque
$("#clearAll").on("click", function (e) {
  // clickedSomething=1;
  e.preventDefault();
  $('#department option').prop('selected', function() {
      $('#myTable tbody tr').show();
      return this.defaultSelected;
  });
  $('#status option').prop('selected', function() {
      $('#myTable tbody tr').show();
      return this.defaultSelected;
  });
  });
// window.inviteAlumni = function(o) {
//   var p=o.parentNode.parentNode;
//   // console.log("p")
//   // console.log(p)
// console.log("inviteAlumni");
// }

// document.querySelectorAll('.inviteNewAlumni').forEach((alumni)=>{
//   alumni.addEventListener('click',(e)=>{
//     console.log("target id: "+e.target.id)
//     var alumniId= dummyResponse.Alumni[e.target.id].alumniId;
//     var eventId=localStorage.getItem('eventId')
//     var dateTime=new Date().toISOString();

//     var newAlumniEvent={
//       "alumniId": alumniId,
//             "eventId": eventId,
//             "viewedByAlumni": "false",
//             "dateTime": dateTime,
//             "notificationClosedByAlumni": "false"
//     }
//     dummyResponse.Alumni_Event.push(newAlumniEvent)
//     updateDummyData(dummyResponse)
//     console.log(dummyResponse)
//     // loadEventList(0);
//     location.reload();
//   })
// })

window.inviteNewAlumni = function(o){
  var i=o.id;
    var alumniId= dummyResponse.Alumni[i].alumniId;
    var eventId=localStorage.getItem('eventId')
    var dateTime=new Date().toISOString();
    var newAlumniEvent={
      "alumniId": alumniId,
            "eventId": eventId,
            "viewedByAlumni": "false",
            "dateTime": dateTime,
            "notificationClosedByAlumni": "false"
    }
    dummyResponse.Alumni_Event.push(newAlumniEvent)
    updateDummyData(dummyResponse)
  loadEventList(0)
}
window.inviteCheckedAlumni = function () {
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  for (var i = checkboxes.length-1; i > 0; i--) {
    if(checkboxes[i].checked){
      var alumniId= dummyResponse.Alumni[i-1].alumniId;
    var eventId=localStorage.getItem('eventId')
    var dateTime=new Date().toISOString();
    var newAlumniEvent={
      "alumniId": alumniId,
            "eventId": eventId,
            "viewedByAlumni": "false",
            "dateTime": dateTime,
            "notificationClosedByAlumni": "false"
    }
    dummyResponse.Alumni_Event.push(newAlumniEvent)
    }
  }
  checkboxes[0].checked = false;
  updateDummyData(dummyResponse)
  loadEventList(0)
  // location.reload();
}
window.clicked=function(){
  clickedSomething=clickedSomething+1;
}
window.backToPreviousPage=function(){
  // localStorage.getItem('')
  if(clickedSomething>0){
    window.history.back();
    window.history.back();
  }else{window.history.back()}
}
loadEventList(0);
