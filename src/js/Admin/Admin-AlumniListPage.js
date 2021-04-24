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

let pageIndex = 0;
const loadAlumniList = (pageIndex) => {
  // document.getElementById('pageIndex').innerHTML = pageIndex + 1 + "/" + Math.ceil(dummyResponse.Event.length / 10);
  console.log("the length" + dummyResponse.Alumni.length);
  let alumniStartIndex = pageIndex * 10;
  let alumniEndIndex = alumniStartIndex + 10;

  var dataLength = dummyResponse.Alumni.length;
  var remainingLength = dataLength - alumniStartIndex;

var table = document.getElementById(
    "myTable"
  )[0];
  //or use :  var table = document.all.tableid;

  for (var i = table.rows.length - 1; i > 0; i--) {
    table.deleteRow(i);
  }

  for (
    let i = eventStartIndex;
    i < eventEndIndex && i < dummyResponse.Event.length;
    i++
  ) {

  var newRowContent = `<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  ${dummyResponse.Alumni[i].name}
</button>

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Profile</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <img src="/Assets/imgs/v8_30.png" class="mx-auto d-block" alt="name" width="150px" height="auto">
      
        <div class="col">
          <div class="row mb-2">
              <div class="col-4">Name:</div>
              <div id="name" class="col-8">  ${dummyResponse.Alumni[i].name}
              </div>
          </div>
          <div class="row mb-2">
              <div class="col-4">Gender:</div>
              <div id="gender" class="col-8">  ${dummyResponse.Alumni[i].gender}
              </div>
          </div>
          <div class="row mb-2">
              <div class="col-4">Graduated:</div>
              <div id="graduated" class="col-8">  ${dummyResponse.Alumni[i].graduated}
              </div>
          </div>
          <div class="row mb-2">
              <div class="col-4">Department:</div>
              <div id="department" class="col-8">  ${dummyResponse.Alumni[i].department}
              </div>
          </div>
          <div class="row mb-2">
              <div class="col-4">E-mail:</div>
              <div id="email" class="col-8">  ${dummyResponse.Alumni[i].email}
              </div>
          </div>
          <div class="row mb-2">
              <div class="col-4">Contact Number:</div>
              <div id="contactNumber" class="col-8">  ${dummyResponse.Alumni[i].contactNumber}
              </div>
          </div>

          <div class="row mb-2">
            <div class="col-4">Ic No:</div>
            <div id="icNumber" class="col-8">${dummyResponse.Alumni[i].icNumber}</div>
        </div>

        <div class="row mb-2">
          <div class="col-4">Account Status:</div>
          <div id="accStatus" class="col-8">Verified</div>
      </div>
      </div>
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-success" data-dismiss="modal" onclick = "location.href ='Admin-EditAlumniProfilePage.html'">Edit</button>
        <button type="button" class="btn btn-info">Approve</button>
            </div>
      </div>
    </div>`;
    var tableRef = document
    .getElementById("myTable")[0]
    .getElementsByTagName("tbody")[0];
  var newRow = tableRef.insertRow(tableRef.rows.length);
  // table.insertRow(newRow)
  // console.log(newRow)
  newRow.innerHTML = newRowContent;
}
};


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

window.toggle=function(source) {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i] != source)
            checkboxes[i].checked = source.checked;
    }
}

window.DeleteRowFunction = function(o) {
  var p=o.parentNode.parentNode.parentNode;
      p.parentNode.removeChild(p);
 }



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

window.deleteMultipleRow = function(tableID)  {
    var table = document.getElementById("myTable").tBodies[0];
    var rowCount = table.rows.length;

    // var i=1 to start after header
    for(var i=0; i<rowCount; i++) {
        var row = table.rows[i];
        // index of td contain checkbox is 8
        var chkbox = row.cells[0].getElementsByTagName('input')[0];
        if('checkbox' == chkbox.type && true == chkbox.checked) {
            table.deleteRow(i);
         }
    }
}

$("#clearAll").on("click", function () {
$('#department option').prop('selected', function() {
    $('#myTable tbody tr').show();

    return this.defaultSelected;
});
$('#status option').prop('selected', function() {
    $('#myTable tbody tr').show();
    return this.defaultSelected;
    
});

});

function ValidateEmail(mail) 
{
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(myForm.emailAddr.value))
  {
    return (true)
  }
    alert("You have entered an invalid email address!")
    return (false)
}

function phonenumber(inputtxt)
{
  var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if(inputtxt.value.match(phoneno))
     {
	   return true;      
	 }
   else
     {
	   alert("Not a valid Phone Number");
	   return false;
     }
}


