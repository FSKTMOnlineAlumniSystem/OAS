import {dummyResponse, updateDummyData} from "../dummydata.js";
const imgPath = "/Assets/imgs/";


let pageIndex = 0;

const loadEventList = (pageIndex) => {
  let eventStartIndex = pageIndex * 10;
  let eventEndIndex = eventStartIndex + 10;
 
  var dataLength = dummyResponse.Event.length;
  var remainingLength = dataLength - eventStartIndex;
  /*   js for button*/
  if (eventEndIndex >= dummyResponse.Event.length) {
    document.getElementById("nextPage").innerHTML = `
        <li class="page-item disabled">
        <button id="nextPage"  onclick="nextPage()" class="page-link" tabindex="-1" aria-disabled="true">Next</button>
      </li>`;
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
    } else {
    document.getElementById("previousPage").innerHTML = `
        <li class="page-item" id="previousPage">
            <button   onclick="previousPage()" class="page-link">Previous</button>
          </li>`;
  }
  // js for 1,2,3
  if (remainingLength <= 10) {
     document.getElementsByClassName("pages")[0].innerHTML = `
        <li class="page-item disabled">
        <button class="page-link" tabindex="-1" aria-disabled="true">${pageIndex + 1
      }</button>
        </li>`;
  } else if (remainingLength <= 20) {
    document.getElementsByClassName("pages")[0].innerHTML = `
        <li class="page-item disabled">
        <button class="page-link" tabindex="-1" aria-disabled="true">${pageIndex + 1
      }</button>
        </li>
        <li class="page-item" >
        <button class="page-link" onclick="nextPage()">${pageIndex + 2
      }</button></li>`;
  } else {
    document.getElementsByClassName("pages")[0].innerHTML = `
        <li class="page-item disabled">
        <button class="page-link" tabindex="-1" aria-disabled="true">${pageIndex + 1
      }</button>
        </li>
        <li class="page-item" ><button class="page-link" onclick="nextPage()">${pageIndex + 2
      }</button></li>
        <li class="page-item" ><button class="page-link" onclick="nextPage();nextPage()">${pageIndex + 3
      }</button></li>`;
  }

  var table = document.getElementsByClassName(
    "table table-striped table-sm something"
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

    var newRowContent = `<tr class="rowss">
                
               <td>
                    <div class="custom-control custom-checkbox text-center">
                      <input type="checkbox" class="custom-control-input" id="Boxes${i}">
                      <label class="custom-control-label" for="Boxes${i}"></label>
                    </div>
                  </td>
                 <td style="font-weight: 400; font-size: 18px">${getReadableDate(dummyResponse.Event[i].dateTime)}
                 <div style="font-weight: 200; font-size: 14px">${getReadableTime(dummyResponse.Event[i].dateTime)}</div>
               
                 <td style="font-weight: 400; font-size: 18px" class="eventTitle">
                 <a class="eventTitle" id=${i} href="Admin-EventPageUpdate.html" data-toggle="modal" data-target="#titleModal">
                ${dummyResponse.Event[i].title
      }
              </a>
        
              <!-- Modal -->

              </td>

                <td style="font-weight: 400; font-size: 14px; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">${dummyResponse.Event[i].description
      }</td>
                <td style="font-weight: 200; font-size: 18px">${dummyResponse.Event[i].location
      }</td>
                <td>
                  <div class="btn-group" role="group" aria-label="Third group">
                   
                  <button class="updateButton" onclick="updateEvent(this)" id="update ${i}">
                    <i class="fas fa-edit pr-2" aria-hidden="true">
                    </i></button>
                    


                      <button class="deleteRowButton d-flex justify-content-center align-items-center" onclick="DeleteRowFunction(this)" id="row ${i}">
                      <i class="far fa-trash-alt pl-2" aria-hidden="true">
                       </i></button>
                  </div>
                </td>
            </tr>`;


    var tableRef = document
      .getElementsByClassName("table table-striped table-sm something")[0]
      .getElementsByTagName("tbody")[0];
    var newRow = tableRef.insertRow(tableRef.rows.length);

    newRow.innerHTML = newRowContent;
  }
};

window.toggle = function (source) {

  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i] != source)
      checkboxes[i].checked = source.checked;
  }
}


window.check = function (source, i) {

  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes[i].checked = source.checked;

}

window.nextPage = function () {
  pageIndex++;
  loadEventList(pageIndex);
};
window.previousPage = function () {
  pageIndex--;
  loadEventList(pageIndex);
};
loadEventList(pageIndex);

// window.onload = function (i) {
//   console.log("function is running")
//   // localStorage.setItem("eventID",dummyResponse.Event[i].eventId)
//   // console.log("event id"+ dummyResponse.Event[i].eventId)
//   console.log(i)
//   // console.log(dummyResponse.Event[i].eventId)
// }


window.updateEvent = function (o) {
  var eventId = o.id.split(" ")[1]
  localStorage.setItem("updateId", eventId)
  location.href="Admin-EventPageUpdate.html"
}

window.DeleteRowFunction = function (o) {

  var findId = o.id.split(" ")[1]
  dummyResponse.Event.splice(findId, 1)
  updateDummyData(dummyResponse)

  loadEventList(pageIndex)
  // location.reload();
}
window.DeleteCheckedRow = function () {
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  for (var i = checkboxes.length-1; i > 0; i--) {
    if(checkboxes[i].checked){
      dummyResponse.Event.splice(i-1, 1)
    }
  }
  checkboxes[0].checked = false;
  updateDummyData(dummyResponse)
  loadEventList(pageIndex)
  // location.reload();
}

var clickedAlumniId;
document.querySelectorAll('.eventTitle').forEach((title) => {
  title.addEventListener('click',(e)=>{
		clickedAlumniId = e.target.id;
    // localStorage.setItem('updateId',clickedAlumniId);
    console.log("hiiiiiii"+clickedAlumniId)
		document.querySelector('#title').textContent = dummyResponse.Event[clickedAlumniId].title
    document.querySelector('#description').textContent = dummyResponse.Event[clickedAlumniId].description
    document.querySelector('#location').textContent = dummyResponse.Event[clickedAlumniId].location
    

  })
})

// var updateId;
// document.querySelector('#editButton').addEventListener {
  
  
// }

// document.querySelectorAll().forEach(btn=>
//   {
//     btn.addEventListener('click',(e)=>{
//       clickedAlumniId = e.target.id;
//     })
//   }
//   )

// filter
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
/*Close Modal */
closeCancelChangesModalButton.addEventListener('click', () => closeModal('#cancelChangesModal'));
stayButton.addEventListener('click', () => closeModal('#cancelChangesModal'));
function closeModal(modalId) {
  $(modalId).modal('hide');
}
 //model
//  document.querySelectorAll('.eventTitle').forEach((title) => {
//   title.addEventListener('click', (e) => {
//     console.log(document.getElementById("exampleModal"));
//     document.getElementById("exampleModal").innerHTML =
//       `<div class="modal-dialog">
//                   <div class="modal-content">
//                     <div class="modal-header">
//                       <h5 class="modal-title" id="exampleModalLabel">Event</h5>
//                       <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//                         <span aria-hidden="true">&times;</span>
//                       </button>
//                     </div>
//                     <div class="modal-body" >
//                       <img src="${imgPath+dummyResponse.Event[e.target.id].imageId}" class="mx-auto d-block" alt="name" width="200px" height="auto">
//                       <br>
//                       <!-- <p>Schedule :${`${new Intl.DateTimeFormat("en", { day: "2-digit" }).format(new Date(dummyResponse.Event[e.target.id].dateTime))}, 
//                       ${new Intl.DateTimeFormat("en", { month: "short" }).format(new Date(dummyResponse.Event[e.target.id].dateTime))} 
//                       ${new Intl.DateTimeFormat("en", { year: "numeric" }).format(new Date(dummyResponse.Event[e.target.id].dateTime))}`}; 
//                       ${new Date(dummyResponse.Event[e.target.id].dateTime).toLocaleTimeString()}</p> -->
//                       <p> Title : ${dummyResponse.Event[e.target.id].title}</p>
//                       <p>Description : ${dummyResponse.Event[e.target.id].description}</p>
//                       <p>Location : ${dummyResponse.Event[e.target.id].location} </p>
//                     </div>
//                     <div class="modal-footer">
//                       <button type="button" class="btn btn-primary"
//                         onclick="location.href = 'Admin-EventPageUpdate.html'; ${localStorage.setItem('updateId', e.target.id)}">
//                         <i class="fas fa-edit" >
//                     </i>
//                         Edit</button>
//                     </div>
//                   </div>
//                 </div>`
//   }
//   )
// }
// )


//
// console.log(document.getElementById("titleModal"));
// document.getElementById("modal-body").innerHTML =
//   `
//                   <img src="${imgPath+dummyResponse.Event[e.target.id].imageId}" class="mx-auto d-block" alt="name" width="200px" height="auto">
//                   <br>
//                   <!-- <p>Schedule :${`${new Intl.DateTimeFormat("en", { day: "2-digit" }).format(new Date(dummyResponse.Event[e.target.id].dateTime))}, 
//                   ${new Intl.DateTimeFormat("en", { month: "short" }).format(new Date(dummyResponse.Event[e.target.id].dateTime))} 
//                   ${new Intl.DateTimeFormat("en", { year: "numeric" }).format(new Date(dummyResponse.Event[e.target.id].dateTime))}`}; 
//                   ${new Date(dummyResponse.Event[e.target.id].dateTime).toLocaleTimeString()}</p> -->
//                   <p> Title : ${dummyResponse.Event[e.target.id].title}</p>
//                   <p>Description : ${dummyResponse.Event[e.target.id].description}</p>
//                   <p>Location : ${dummyResponse.Event[e.target.id].location} </p>
//                 `
//                 console.log('target id: '+e.target.id);
//                 localStorage.setItem('updateId', e.target.id)
//                 // localStorage.setItem('UpdateId',e.target.id);
//                 $("#titleModal").modal()