import { dummyResponse, updateDummyData } from "../dummydata.js";

let pageIndex = 0;
const loadAlumniList = (pageIndex) => {
  console.log(dummyResponse)
  // document.getElementById('pageIndex').innerHTML = pageIndex + 1 + "/" + Math.ceil(dummyResponse.Event.length / 10);
  console.log("the length" + dummyResponse.Alumni.length);
  // document.getElementById('eventList').innerHTML = "";
  let alumniStartIndex = pageIndex * 10;
  let alumniEndIndex = alumniStartIndex + 10;
  console.log("page index" + pageIndex);
  console.log("StartIndex" + alumniStartIndex);
  console.log("EndIndex" + alumniEndIndex);

  var dataLength = dummyResponse.Alumni.length;
  var remainingLength = dataLength - alumniStartIndex;

  /*   js for button*/
  if (alumniEndIndex >= dummyResponse.Alumni.length) {
    document.getElementById("nextPage").innerHTML = `
        <li class="page-item disabled">
        <button id="nextPage"  onclick="nextPage()" class="page-link" tabindex="-1" aria-disabled="true">Next</button>
      </li>`;
    console.log("last page");
  } else {
    document.getElementById("nextPage").innerHTML = `
        <li class="page-item" id="nextPage">
            <button  onclick="nextPage()" class="page-link" >Next</button>
          </li>`;
  }
  if (pageIndex == 0) {
    document.getElementById("previousPage").innerHTML = `
        <li class="page-item disabled">
        <button id="previousPage"  onclick="previousPage()" class="page-link" tabindex="-1" aria-disabled="true">Previous</button>
      </li>`;
    console.log("first page");
  } else {
    document.getElementById("previousPage").innerHTML = `
        <li class="page-item" id="previousPage">
            <button   onclick="previousPage()" class="page-link">Previous</button>
          </li>`;
  }
  // js for 1,2,3
  if (remainingLength <= 10) {
    console.log("<=10");
    document.getElementsByClassName("pages")[0].innerHTML = `
        <li class="page-item disabled">
        <button class="page-item" tabindex="-1" aria-disabled="true">${pageIndex + 1
      }</button>
        </li>`;
  } else if (remainingLength <= 20) {
    console.log("<=20");
    document.getElementsByClassName("pages")[0].innerHTML = `
        <li class="page-item disabled">
        <button class="page-item" tabindex="-1" aria-disabled="true">${pageIndex + 1
      }</button>
        </li>
        <li class="page-item" ><button onclick="nextPage()">${pageIndex + 2
      }</button></li>`;
  } else {
    console.log("<=30");
    document.getElementsByClassName("pages")[0].innerHTML = `
        <li class="page-item disabled">
        <button class="page-item" tabindex="-1" aria-disabled="true">${pageIndex + 1
      }</button>
        </li>
        <li class="page-item" ><button onclick="nextPage()">${pageIndex + 2
      }</button></li>
        <li class="page-item" ><button onclick="nextPage();nextPage()">${pageIndex + 3
      }</button></li>`;

  }
}

loadAlumniList(pageIndex);

window.nextPage = function () {
  pageIndex++;
  loadAlumniList(pageIndex);
};
window.previousPage = function () {
  pageIndex--;
  loadAlumniList(pageIndex);
};


const tbody = document.getElementsByTagName('tbody')[0];
tbody.innerHTML = "";
dummyResponse.Alumni.forEach((alumni, index) => {
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
  td.innerHTML = `<div style="aspect-ratio:1/1; height:100px; overflow:hidden;">
    <img class='table__td--height' src=${'/Assets/imgs/' + alumni.imageId}>
  </div>`
  tr.appendChild(td);

  // name column
  td = document.createElement('td');
  td.innerHTML = `
  <span class="alumniName" id=${index}>${alumni.name}</span>`
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
  div.setAttribute('class', 'text-white rounded p-1');

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
  a.innerHTML = `<a href="#" role="button" value="Delete Row" onclick="DeleteRowFunction(this)">
  <i class="fa fa-trash fa-3x pl-2 text-danger" aria-hidden="true" style="font-size: 35px">
  </i>`;
  td.appendChild(a);
  tr.appendChild(td);

  tbody.appendChild(tr);
});

window.filterSearchBar = function () {
  var input, filter, table, tr, td, i;
  input = document.getElementById("searchBar");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (var i = 1; i < tr.length; i++) {
    var tds = tr[i].getElementsByTagName("td");
    var flag = false;
    for (var j = 0; j < tds.length; j++) {
      var td = tds[j];
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        flag = true;
      }
    }
    if (flag) {
      tr[i].style.display = "";
    }
    else {
      tr[i].style.display = "none";
    }
  }
}

window.toggle = function (source) {
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i] != source)
      checkboxes[i].checked = source.checked;
  }
}

window.DeleteRowFunction = function (o) {
  var p = o.parentNode.parentNode.parentNode;
  p.parentNode.removeChild(p);
  dummyResponse.Alumni.splice(o.target.id, 1)
  updateDummyData(dummyResponse)
}

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

//deleteMultipleRow
window.deleteMultipleRow = function (tableID) {
  var table = document.getElementById("myTable").tBodies[0];
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  for (var i = checkboxes.length - 1; i >= 0; i--) {
    if (checkboxes[i].checked) {
      table.deleteRow(i - 1);
      dummyResponse.Alumni.splice(i - 1, 1)
    }
  }
  loadAlumniList(pageIndex)
  updateDummyData(dummyResponse)
}

//clearAll
$("#clearAll").on("click", function () {
  $('#department option').prop('selected', function () {
    $('#myTable tbody tr').show();
    return this.defaultSelected;
  });
  $('#status option').prop('selected', function () {
    $('#myTable tbody tr').show();
    return this.defaultSelected;
  });
});

// modal
document.querySelectorAll('.alumniName').forEach((alumni) => {
  alumni.addEventListener('click', (e) => {
    localStorage.setItem('updateId',e.target.id);
    console.log($('#exampleModal'))
    $("#image").attr('src', "/Assets/imgs/" + dummyResponse.Alumni[e.target.id].imageId)
    $("#name").text(dummyResponse.Alumni[e.target.id].name);
    $("#gender").text(dummyResponse.Alumni[e.target.id].gender);
    $("#graduated").text(dummyResponse.Alumni[e.target.id].graduated);
    $("#department1").text(dummyResponse.Alumni[e.target.id].department);
    $("#email").text(dummyResponse.Alumni[e.target.id].email);
    $("#contactNumber").text(dummyResponse.Alumni[e.target.id].contactNumber);
    $("#icNumber").text(dummyResponse.Alumni[e.target.id].icNumber);
    $("#update").attr("id", "update "+e.target.id);
    if (dummyResponse.Alumni[e.target.id].approvedBy === "") {
      $("#accStatus").text("Not Verified");
    } else {
      $("#accStatus").text("Verified");
    }
    $("#approve").click(function () {
      if (dummyResponse.Alumni[e.target.id].approvedBy !== "") {
      }
      else {
        dummyResponse.Alumni[e.target.id].approvedBy = localStorage.getItem("SignedInAdminId");
        updateDummyData(dummyResponse);
        location.reload();
      }
    })

    $('#exampleModal').modal("show");
    console.log(e.target.id);

    window.updateEvent = function (o) {
      var eventId = o.id.split(" ")[1]
      localStorage.setItem("updateId", eventId)
      console.log("update event")
    }

    // var update = document.getElementsByClassName("btn btn-success")[0];
    // update.addEventListener("click", function(o) {
    //   var eventId = o.id.split(" ")[1]
    //   localStorage.setItem("updateId", eventId)
    //   console.log("Hello")
    // });
  })
})

