// import{ dummyResponse,updateDummyData} from "../dummydata.js";
let alumniEventArray=alumniEvent_array
let alumniArray=alumni_array
localStorage.setItem("eventId",$inviteEventId)

let pageIndex = 0;
const loadEventList = (pageIndex,alumniEventArray,alumniArray) => {
const tbody = document.getElementsByTagName('tbody')[0];
tbody.innerHTML="";

//handle no result
  if(alumniArray.length==0){
    document.getElementById('invideAndDone').innerHTML='';
    // document.getElementById('forSearch').innerHTML=`
    // <div class="row m-0 p-0 justify-content-center">
    //     <div class="text-center">
    //     <p>Search not Found</p>
    //       <img class="card-img-150 mb-3" src="/Assets/imgs/searchNotFound.png" alt="Search Not Found" style="width:500px;height:500px;">
    //     </div>
    // `;
  insertSearchNoResult(document.getElementById("no_result"));
    
  }

  else{
    document.getElementById('no_result').innerHTML='';
    
// document.getElementById('forSearch').innerHTML=`
// <table  id="myTable" class="table table-striped table-bordered">
//   <thead style="font-weight: 200; color:#ffffff" class="custom-dark-purple">
//     <tr>
//       <th class="text-center">
//         <div class="custom-control custom-checkbox">
//           <input type="checkbox" class="custom-control-input" id="CheckAllBoxes" onclick="toggle(this);">
//           <label class="custom-control-label" for="CheckAllBoxes"></label>
//         </div>
//       </th>
//       <th>Avatar</th>
//       <th>Name</th>
//       <th>Department</th>
//       <th>Status</th>
//       <th class="text-center">Action</th>
//     </tr>
//   </thead>
//   <tbody>
//   </tbody>
// </table>
// `

//   const tbody = document.getElementsByTagName('tbody')[0];
// tbody.innerHTML="";



alumniArray.forEach((alumni,index) => {
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
  let defineAlumni=alumni.alumniId;

  div.appendChild(input);
  div.appendChild(label);
  td.appendChild(div);
  tr.appendChild(td);
  
  var check=alumni.imageId==null||alumni.imageId== '/Assets/imgs/default_user.jpg'
  console.log(alumni.imageId);
  // console.log("check "+check);
  // avatar column
  td = document.createElement('td');
  if(check){
    td.innerHTML = `<div style="aspect-ratio:1/1; height:100px; margin-left:10px;margin-right:auto;overflow:hidden">
    <img class='table__td--height' src="/Assets/imgs/default_user.png">
  </div>`
 
  }else{
  td.innerHTML = `<div style="aspect-ratio:1/1; height:100px; margin-left:10px;margin-right:auto;overflow:hidden">
    <img class='table__td--height' src=${alumni.imageId}>
  </div>`}
  td.setAttribute('width','140px')
  const img = document.createElement('img');
  img.classList.add('table__td--height');
  td.appendChild(img);
  tr.appendChild(td);
  
  // name column
  td = document.createElement('td');
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
  const foundAlumniEvent = alumniEventArray.filter(alumni_event => {
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
  td.innerHTML=`
  <button class="inviteNewAlumni" id=${index} onclick='inviteNewAlumni(this)'>
  <i class="fas fa-user-plus pl-2"  aria-hidden="true" >
  </i>
  </button>`
  tr.appendChild(td);
  tbody.appendChild(tr);
});
document.getElementById('invideAndDone').innerHTML=`
            <button type="button" class="btn btn-info"  onclick='inviteCheckedAlumni()'>
              <i class="fas fa-user-plus"></i> Invite
            </button>
            <button type="button" class="btn btn-primary ml-2" onclick='backToPreviousPage()'>
              Done
            </button>
`
}//else
}
// window.toggle = function (source) {
//   var checkboxes = document.querySelectorAll('input[type="checkbox"]');
//   for (var i = 0; i < checkboxes.length; i++) {
//     console.log();
//     if ($(checkboxes[i]).is(":visible") && (checkboxes[i] != source ));
//       checkboxes[i].checked = source.checked;
//   }
// }
window.toggle = function (source) {
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  // if($(checkboxes).is(':visible')){
    for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i] != source && $(checkboxes[i]).is(':visible'))
    // if($(checkboxes[i]).is(':visible')){
      checkboxes[i].checked = source.checked;
  }
};

/*
var searchBar=document.getElementById('searchBar');
searchBar.addEventListener('click', (e) => {
  e.preventDefault();
  var input, filter, table, tr, td, i;
  input = document.getElementById("input1");
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
});
*/
window.DeleteRowFunction = function(o) {
  var p=o.parentNode.parentNode.parentNode;
      p.parentNode.removeChild(p);
      alumniArray.splice(o.target.id, 1)
      updateDummyData(dummyResponse)
 }
 
// search bar
$('#searchBar').click(function(){
  event.preventDefault();
  // SearchData("All", "All");
  // $('#department option').prop('selected', function() {
  //     return this.defaultSelected;
  // });
  // $('#status option').prop('selected', function() {
  //     return this.defaultSelected;
  // });
  var status = $('#status').find("option:selected").val();
  var department = $('#department').find("option:selected").val();
  var search = document.getElementById("input1").value;
  var eventId=localStorage.getItem('eventId');
  if (search == "") {
    alert("Hi, type something to search!"); // He Lin: suggest change to "Hi, type something to search!" as within the EventPage.js
    return;
    // and add a return here so below code will not run
  }
var outputList;
  $.ajax({
    url: '/admin/search/invite/alumni?eventId='+$inviteEventId,
    type: 'post',
    data: {
      search: search,
      status: status,
      department: department,
      eventId: eventId    
    },
    success: function(resp){
    let page = 0;
    console.log(resp);
    outputList =JSON.parse(resp);
    alumniArray=outputList;
    loadEventList(pageIndex,alumniEventArray,alumniArray);
    },     
  });
});

$(document).ready(function () {
    $("#status,#department").on("change", function () {
        var status = $('#status').find("option:selected").val();
        console.log(status);
        var department = $('#department').find("option:selected").val();
        console.log(department);
        SearchData(status, department)
    });
});
window.SearchData = function(status, department) {
  var outputList;
  var eventId=localStorage.getItem('eventId');
  var search = document.getElementById("input1").value;
  $.ajax({
    // url: '/admin/search/event',
    url: '/admin/search/invite/alumni?eventId='+$inviteEventId,
    type: 'post',
    data: {
      status: status,
      department: department,
      eventId: eventId,
      search: search
    },
    success: function(resp){
    let page = 0;
    console.log(resp);
    outputList =JSON.parse(resp);
    alumniArray=outputList;
    loadEventList(pageIndex,alumniEventArray,alumniArray);
    //  if(outputList.length===0){
    //   loadMyJobList(page,outputList,-1);
    // }else{
    //  loadMyJobList(page,outputList,outputList.length);
    // }
    },     
  });
}
/*
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
*/
//clearAll
// document.getque
$("#clearAll").on("click", function (e) {
  e.preventDefault();
  SearchData("All", "All");
  $('#department option').prop('selected', function() {
      // $('#myTable tbody tr').show();
      return this.defaultSelected;
  });
  $('#status option').prop('selected', function() {
      // $('#myTable tbody tr').show();
      return this.defaultSelected;
  });
  });


  // invite single alumni
  var dateTime=new Date().toISOString();
  document.cookie = "dateTime="+dateTime;
window.inviteNewAlumni = function(o){
  var i=o.id;
    var alumniId= alumniArray[i].alumniId;
    var eventId=localStorage.getItem('eventId')
    var dateTime=new Date().toISOString();

    // document.cookie = "alumniId="+alumniId;
    // document.cookie = "eventId="+eventId;
    // document.cookie = "dateTime="+dateTime;
    $.ajax({
      url:"/admin/invite/function",    //the page containing php script
      data: { alumniId: alumniId, 
              eventId: eventId,
              dateTime: dateTime,
            },
      type: 'POST',    //request type,
      success: function(resp){
        console.log('resp');
        console.log(resp);
        var outputList = JSON.parse(resp);
        alumniEventArray=outputList;
        loadEventList(pageIndex,outputList,alumniArray);
      },
      error: function(request, status, error){  
        alert(error);
        }
      });
    // var newAlumniEvent={
    //   "alumniId": alumniId,
    //   "eventId": eventId,
    //   "viewedByAlumni": "false",
    //   "dateTime": dateTime,
    //   "notificationClosedByAlumni": "false"
    // }
    // alumniEventArray.push(newAlumniEvent)
    // updateDummyData(dummyResponse)
  }

// invite alumni that is checked
var $alumniId=[];
var $eventId=[];
var $dateTime=[];
window.inviteCheckedAlumni = function () {
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  for (var i = checkboxes.length-1; i > 0; i--) {
    if(checkboxes[i].checked){
      var alumniId= alumniArray[i-1].alumniId;
      var eventId=localStorage.getItem('eventId')
      var dateTime=new Date().toISOString();
      $alumniId.push(alumniId);
      $eventId.push(eventId);
      $dateTime.push(dateTime);
    }
  }
  $alumniId=$alumniId.toString();
  $eventId=$eventId.toString();
  $dateTime=$dateTime.toString();
  $.ajax({
    url:"/admin/invite/function",    //the page containing php script
    data: { alumniId: $alumniId, 
            eventId: $eventId,
            dateTime: $dateTime,
            checkbox:'checked'
          },
    type: 'POST',    //request type,
    success: function(resp){
      console.log('resp');
      console.log(resp);
      var outputList = JSON.parse(resp);
      alumniEventArray=outputList;
      loadEventList(pageIndex,outputList,alumniArray);
    },
    error: function(request, status, error){  
      alert(error);
      }
    });

  checkboxes[0].checked = false;
}  
  // var newAlumniEvent={
    //         "alumniId": alumniId,
    //         "eventId": eventId,
    //         "viewedByAlumni": "false",
    //         "dateTime": dateTime,
    //         "notificationClosedByAlumni": "false"
    // }
    // alumniEventArray.push(newAlumniEvent)
  /*
    // $alumniId = json_encode($alumniId, true); 
  // setcookie('alumniId', $alumniId);
  
  // $eventId = json_encode($eventId, true); 
  // setcookie('alumniId', $eventId);

  // $dateTime = json_encode($dateTime, true); 
  // setcookie('dateTime', $dateTime);
  // console.log($alumniId);
  // console.log('/////////////////////////');
  // $($alumniId).serialize()
  // $alumniId = serialize($alumniId); 
  document.cookie="alumniId="+ $alumniId;
  console.log($alumniId);

  // $eventId = serialize($eventId); 
  // $($eventId).serialize()
  document.cookie="eventId="+ $eventId;

  // $dateTime = serialize($dateTime); 
  // $($dateTime).serialize()
  document.cookie="dateTime="+ $dateTime;

  document.cookie="checkbox="+'checked';
  // updateDummyData(dummyResponse)
  // location.reload();
  // location.reload();
  // location.reload();
  history.go(0);
  history.go(0);
  history.go(0);
  history.go(0);
  */// loadEventList(0)
// }

window.backToPreviousPage=function(){
    window.history.back();
}
loadEventList(pageIndex,alumniEventArray,alumniArray);

// window.inviteCheckedAlumni = function () {
//   var checkboxes = document.querySelectorAll('input[type="checkbox"]');
//   for (var i = checkboxes.length-1; i > 0; i--) {
//     if(checkboxes[i].checked){
//       var alumniId= alumniArray[i-1].alumniId;
//     var eventId=localStorage.getItem('eventId')
//     var dateTime=new Date().toISOString();
//     var newAlumniEvent={
//       "alumniId": alumniId,
//             "eventId": eventId,
//             "viewedByAlumni": "false",
//             "dateTime": dateTime,
//             "notificationClosedByAlumni": "false"
//     }
//     alumniEventArray.push(newAlumniEvent)
//     }
//   }
//   checkboxes[0].checked = false;
//   // updateDummyData(dummyResponse)
//   loadEventList(0)
// }