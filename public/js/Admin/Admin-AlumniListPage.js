// import { dummyResponse, updateDummyData } from "../dummydata.js";
console.log('connect');
let alumniArray=alumni_array
console.log(alumniArray);
// let pageIndex = 0;
// const loadAlumniList = (pageIndex) => {
//   // document.getElementById('pageIndex').innerHTML = pageIndex + 1 + "/" + Math.ceil(dummyResponse.Event.length / 10);
//   // document.getElementById('eventList').innerHTML = "";
//   let alumniStartIndex = pageIndex * 10;
//   let alumniEndIndex = alumniStartIndex + 10;

//   var dataLength = alumniArray.length;
//   var remainingLength = dataLength - alumniStartIndex;

//   /*   js for button*/
//   if (alumniEndIndex >= alumniArray.length) {
//     document.getElementById("nextPage").innerHTML = `
//         <li class="page-item disabled">
//         <button id="nextPage"  onclick="nextPage()" class="page-link" tabindex="-1" aria-disabled="true">Next</button>
//       </li>`;
//   } else {
//     document.getElementById("nextPage").innerHTML = `
//         <li class="page-item" id="nextPage">
//             <button  onclick="nextPage()" class="page-link" >Next</button>
//           </li>`;
//   }
//   if (pageIndex == 0) {
//     document.getElementById("previousPage").innerHTML = `
//         <li class="page-item disabled">
//         <button id="previousPage"  onclick="previousPage()" class="page-link" tabindex="-1" aria-disabled="true">Previous</button>
//       </li>`;
//   } else {
//     document.getElementById("previousPage").innerHTML = `
//         <li class="page-item" id="previousPage">
//             <button   onclick="previousPage()" class="page-link">Previous</button>
//           </li>`;
//   }
//   // js for 1,2,3
//   if (remainingLength <= 10) {
//     document.getElementsByClassName("pages")[0].innerHTML = `
//         <li class="page-item disabled">
//         <button class="page-link" tabindex="-1" aria-disabled="true">${pageIndex + 1
//       }</button>
//         </li>`;
//   } else if (remainingLength <= 20) {
//     document.getElementsByClassName("pages")[0].innerHTML = `
//         <li class="page-item disabled">
//         <button class="page-link" tabindex="-1" aria-disabled="true">${pageIndex + 1
//       }</button>
//         </li>
//         <li class="page-item" >
//         <button class="page-link" onclick="nextPage()">${pageIndex + 2
//       }</button></li>`;
//   } else {
//     document.getElementsByClassName("pages")[0].innerHTML = `
//         <li class="page-item disabled">
//         <button class="page-link" tabindex="-1" aria-disabled="true">${pageIndex + 1
//       }</button>
//         </li>
//         <li class="page-item" ><button class="page-link" onclick="nextPage()">${pageIndex + 2
//       }</button></li>
//         <li class="page-item" ><button class="page-link" onclick="nextPage();nextPage()">${pageIndex + 3
//       }</button></li>`;
//   }
// }

// loadAlumniList(pageIndex);

// window.nextPage = function () {
//   pageIndex++;
//   loadAlumniList(pageIndex);
// };
// window.previousPage = function () {
//   pageIndex--;
//   loadAlumniList(pageIndex);
// };
// add alumni list
const reload = (alumniArray) => {
const tbody = document.getElementsByTagName('tbody')[0];
tbody.innerHTML = "";
alumniArray.forEach((alumni, index) => {
  let tr = document.createElement('tr');
  let td = document.createElement('td');
  let div = document.createElement('div');
  div.setAttribute('class', 'custom-control custom-checkbox text-center');

  let input = document.createElement('input');
  input.setAttribute('type', 'checkbox');
  input.setAttribute('class', 'custom-control-input');
  input.setAttribute('id', 'id-' + alumni.alumniId);

  let label = document.createElement('label');
  label.setAttribute('class', 'custom-control-label');
  label.setAttribute('for', 'id-' + alumni.alumniId);

  div.appendChild(input);
  div.appendChild(label);
  td.appendChild(div);
  tr.appendChild(td);

  // avatar column
  td = document.createElement('td');
  td.innerHTML = `<div style="aspect-ratio:1/1; height:100px; margin-left:10px;margin-right:auto;overflow:hidden">
    <img class='table__td--height' src=${alumni.imageId}>
  </div>`
  td.setAttribute('width', '140px')
  tr.appendChild(td);

  // name column
  td = document.createElement('td');
  td.innerHTML = `<p id=${index} class="alumniName">${alumni.name}</p>`
  td.setAttribute('class', 'eventTitle');
  // <div class="eventTitle"><span class="alumniName" id=${index}>${alumni.name}</span></div>`
  // <td style="font-weight: 400; font-size: 18px" class="eventTitle">
  // let span = document.createElement('span');
  // span.innerHTML = alumni.name;
  // td.appendChild(span);
  tr.appendChild(td);

  // department column
  td = document.createElement('td');
  let span = document.createElement('span');
  span.innerHTML = alumni.department;
  td.appendChild(span);
  tr.appendChild(td);

  // status column
  td = document.createElement('td');
  div = document.createElement('div');
  div.setAttribute('class', 'text-black rounded p-1');

  if (alumni.approvedBy === "") {
    div.classList.add('bg-danger')
    div.innerText = 'Not Verified';
  } else {
    div.classList.add('bg-success')
    div.innerText = 'Verified';
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
  a.innerHTML = `<a href="#" role="button" id="${index}" value="Delete Row" onclick="deleteByJquery(this)">
  <i class="far fa-trash-alt fa-3x pl-2 text-danger" aria-hidden="true" style="font-size: 35px">
  </i></a>`;
  td.appendChild(a);
  tr.appendChild(td);
  tbody.appendChild(tr);
});

// click alumni name will pop out alumni details
document.querySelectorAll('.alumniName').forEach((alumni) => {
  alumni.addEventListener('click', (e) => {
    localStorage.setItem('updateId', e.target.id);
    localStorage.setItem('alumniId', alumniArray[e.target.id].alumniId);
    $("#image").attr('src', alumniArray[e.target.id].imageId)
    $("#name").text(alumniArray[e.target.id].name);
    $("#gender").text(alumniArray[e.target.id].gender);
    $("#graduated").text(alumniArray[e.target.id].graduated);
    $("#department1").text(alumniArray[e.target.id].department);
    $("#email").text(alumniArray[e.target.id].email);
    $("#contactNumber").text(alumniArray[e.target.id].contactNumber);
    $("#icNumber").text(alumniArray[e.target.id].icNumber);
    $("#update").attr("id", "update " + e.target.id);
    if (alumniArray[e.target.id].approvedBy === "") {
      $("#accStatus").text("Not Verified");
    } else {
      $("#accStatus").text("Verified");
    }
    if (alumniArray[e.target.id].approvedBy !== "") {
      document.getElementById("approve").disabled = true;
    }else{
      document.getElementById("approve").disabled = false;
    }
    $("#approve").click(function () {
      if (alumniArray[e.target.id].approvedBy == "") {
        alumniArray[e.target.id].approvedBy = localStorage.getItem("SignedInAdminId");
      }
    })
    $('#exampleModal').modal("show");
  }
  )
})
}
reload(alumniArray);
window.approve = function(){
  $('#exampleModal').modal("show");
$.ajax({
  type: "POST",
  url: 'approveAlumni',
  data: {alumniId: localStorage.getItem("alumniId"),signedInAdminId:localStorage.getItem("SignedInAdminId") },
  success:  function(data)
  { 
    var outputList = JSON.parse(data);
    alumniArray = outputList;
    console.log(outputList);
    reload(outputList);
    $('#exampleModal').modal("hide");
  }
});
}
//search bar filter
var searchBar = document.getElementById('searchBar');
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
    for (var j = 0; j < tds.length; j++) {
      var td = tds[j];
      if (td.textContent.toUpperCase().indexOf(filter) > -1) {
        flag = true;
      }
    }
    if (flag) {
      tr[i].style.display = "";
    }
    else {
      tr[i].style.display = "none";
    }
  } e.preventDefault();
});

// $('#searchBar').click(function(){
//   var search = document.getElementById("input1").value;
//   if (search == "") {
//     alert("Name must be filled out");
//   }
//   console.log("pls"+search);
//   $.ajax({
//     url: 'searchAllJob',
//     type: 'post',
//     data: {search: search},
//     success: function(resp){
//      console.log("success");
//     //  console.log(resp);
//     let page = 0;
//     var jobtList =JSON.parse(resp);
 
//      loadJobList(page,jobtList);
//     },
     
//   });

// });

window.getAlumniId = function(){
  return localStorage.getItem("alumniId");
}

//select all check box
window.toggle = function (source) {
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i] != source && $(checkboxes[i]).is(':visible'))
      checkboxes[i].checked = source.checked;
  }
}


window.deleteByJquery= function (o){
  event.preventDefault();
  var findId = o.id.split(" ");
  console.log(findId);
  var $deleteAlumniId=alumniArray[findId].alumniId;
  console.log($deleteAlumniId);

$.ajax({
                    type: "POST",
                    url: 'deleteAlumni',
                    data: {deleteAlumniId: $deleteAlumniId},
                    success:  function(data)
                    { 
                      var outputList = JSON.parse(data);
                      alumniArray = outputList;
                      console.log(outputList);
                      reload(outputList);
                    }
        });
}

//filter by using dropdown
$(document).ready(function () {
  $("#status,#department").on("change", function () {
    var status = $('#status').find("option:selected").val();
    var department = $('#department').find("option:selected").val();
    SearchData(status, department)
  });
});
window.SearchData = function (status, department) {
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
        if (department != 'All' || status == 'All') {
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
$("#clearAll").on("click", function (e) {
  $('#department option').prop('selected', function () {
    e.preventDefault();
    $('#myTable tbody tr').show();
    return this.defaultSelected;
  });
  $('#status option').prop('selected', function () {
    e.preventDefault();
    $('#myTable tbody tr').show();
    return this.defaultSelected;
  });
});

window.deleteCheckedRow = function(){
  event.preventDefault();
  var count=0;
  var $alumniId = [];
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  if(checkboxes.checked.length!=0){
    for (var i = checkboxes.length-1; i > 0; i--) {
      if(checkboxes[i].checked){
        count++;
        var alumniId= alumniArray[i-1].alumniId;
      $alumniId.push(alumniId);
      }
    }
    $alumniId=$alumniId.toString();
    $.ajax({
      type: "POST",
      url: 'deleteMultipleAlumni',
      data: {listOfDeleteAlumniId: $alumniId, count:count},
      success:  function(data)
      { 
        var outputList = JSON.parse(data);
        alumniArray = outputList;
        console.log(outputList);
        reload(outputList);
        checkboxes[0].checked = false;
      }
    });
    }
  }