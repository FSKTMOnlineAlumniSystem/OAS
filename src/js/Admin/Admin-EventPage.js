import {dummyResponse, updateDummyData} from "../dummydata.js";
const imgPath = "/Assets/imgs/";
console.log("link js");
// model
// $('#myModal').on('shown.bs.modal', function () {
//   $('#myInput').trigger('focus')
// })
//eventList
let pageIndex = '0';
var loaded='0';
const loadEventList = (pageIndex) => {
  console.log(dummyResponse)
  // document.getElementById('pageIndex').innerHTML = pageIndex + 1 + "/" + Math.ceil(dummyResponse.Event.length / 10);
  console.log("the length" + dummyResponse.Event.length);
  // document.getElementById('eventList').innerHTML = "";
  let eventStartIndex = pageIndex * 10;
  let eventEndIndex = eventStartIndex + 10;
  console.log("page index" + pageIndex);
  console.log("StartIndex" + eventStartIndex);
  console.log("EndIndex" + eventEndIndex);

  var dataLength = dummyResponse.Event.length;
  var remainingLength = dataLength - eventStartIndex;
  /*   js for button*/
  if (eventEndIndex >= dummyResponse.Event.length) {
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
        <button class="page-link" tabindex="-1" aria-disabled="true">${pageIndex + 1
      }</button>
        </li>`;
  } else if (remainingLength <= 20) {
    console.log("<=20");
    document.getElementsByClassName("pages")[0].innerHTML = `
        <li class="page-item disabled">
        <button class="page-link" tabindex="-1" aria-disabled="true">${pageIndex + 1
      }</button>
        </li>
        <li class="page-link" ><button onclick="nextPage()">${pageIndex + 2
      }</button></li>`;
  } else {
    console.log("<=30");
    document.getElementsByClassName("pages")[0].innerHTML = `
        <li class="page-item disabled">
        <button class="page-link" tabindex="-1" aria-disabled="true">${pageIndex + 1
      }</button>
        </li>
        <li class="page-link" ><button onclick="nextPage()">${pageIndex + 2
      }</button></li>
        <li class="page-link" ><button onclick="nextPage();nextPage()">${pageIndex + 3
      }</button></li>`;
  }

  // }
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
    // console.log("previous time" + dummyResponse.Event[i].dateTime)
    // var d = new Date(dummyResponse.Event[i].dateTime);
    // let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
    // let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
    // let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
    
    // d.toLocaleDateString('en-GB')


    // var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    //     if (checkboxes[i] != source)
    //         checkboxes[i].checked = source.checked;

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
                 <a class="eventTitle" id=${i} href="Admin-EventPageUpdate.html" data-toggle="modal" data-target="#exampleModal">
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
                    <a href="Admin-EventPageUpdate.html" role="button" onclick="updateEvent(this)" id="update ${i}">
                    <i class="fas fa-edit fa-3x pr-2" aria-hidden="true" style="color: rgb(0, 0, 0); font-size: 28px">
                    </i></a>
                      <a href="#" role="button" value="Delete Row" onclick="DeleteRowFunction(this)" id="row ${i}"><i class="far fa-trash-alt fa-2x pl-2" aria-hidden="true" style="color: rgb(255, 49, 49); font-size: 28px">
                       </i></a>
                  </div>
                </td>
            </tr>`;


    var tableRef = document
      .getElementsByClassName("table table-striped table-sm something")[0]
      .getElementsByTagName("tbody")[0];
    var newRow = tableRef.insertRow(tableRef.rows.length);
    // table.insertRow(newRow)
    // console.log(newRow)
    newRow.innerHTML = newRowContent;
  }
};

window.toggle = function (source) {
  console.log("checkbox")
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i] != source)
      checkboxes[i].checked = source.checked;
  }
}


window.check = function (source, i) {
  console.log("check row")
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes[i].checked = source.checked;
  console.log(i)
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








window.onload = function (i) {
  console.log("function is running")
  // localStorage.setItem("eventID",dummyResponse.Event[i].eventId)
  // console.log("event id"+ dummyResponse.Event[i].eventId)
  console.log(i)
  // console.log(dummyResponse.Event[i].eventId)
}


window.updateEvent = function (o) {
  var eventId = o.id.split(" ")[1]
  localStorage.setItem("updateId", eventId)
  console.log("update event")
}

window.DeleteRowFunction = function (o) {
  console.log(o)
  console.log(o.id)
  var findId = o.id.split(" ")[1]
  console.log("the id is:" + findId)
  dummyResponse.Event.splice(findId, 1)
  console.log(dummyResponse.Event)
  updateDummyData(dummyResponse)
  // var p = o.parentNode.parentNode.parentNode;
  // console.log(p)
  // p.parentNode.removeChild(p);
  loadEventList(pageIndex)
  // location.reload();
}
window.DeleteCheckedRow = function () {
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  for (var i = checkboxes.length-1; i >= 0; i--) {
    if(checkboxes[i].checked){
      dummyResponse.Event.splice(i-1, 1)
    }
  }
  updateDummyData(dummyResponse)
  loadEventList(pageIndex)
  // location.reload();
}
// window.addRow = function () {
//   console.log('add row')
//   var table = document.getElementsByClassName(
//     "table table-striped table-sm something"
//   )[0];
// }

document.querySelectorAll('.eventTitle').forEach((title) => {
  title.addEventListener('click', (e) => {
    console.log(document.getElementById("exampleModal"));
    document.getElementById("exampleModal").innerHTML =
      `<div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Event</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body" >
                      <img src="${imgPath+dummyResponse.Event[e.target.id].imageId}" class="mx-auto d-block" alt="name" width="200px" height="auto">
                      <br>
                      <!-- <p>Schedule :${`${new Intl.DateTimeFormat("en", { day: "2-digit" }).format(new Date(dummyResponse.Event[e.target.id].dateTime))}, 
                      ${new Intl.DateTimeFormat("en", { month: "short" }).format(new Date(dummyResponse.Event[e.target.id].dateTime))} 
                      ${new Intl.DateTimeFormat("en", { year: "numeric" }).format(new Date(dummyResponse.Event[e.target.id].dateTime))}`}; 
                      ${new Date(dummyResponse.Event[e.target.id].dateTime).toLocaleTimeString()}</p> -->
                      <p> Title : ${dummyResponse.Event[e.target.id].title}</p>
                      <p>Description : ${dummyResponse.Event[e.target.id].description}</p>
                      <p>Location : ${dummyResponse.Event[e.target.id].location} </p>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-success"
                        onclick="location.href = 'Admin-EventPageUpdate.html'; ${localStorage.setItem('updateId', e.target.id)}">Edit</button>
                    </div>
                  </div>
                </div>`
  }
  )
}
)

 //model
//  document.getElementById("schedule").innerHTML =

// `Schedule :${`${new Intl.DateTimeFormat("en", { day: "2-digit" }).format(new Date(dummyResponse.Event[e.target.id].dateTime))}, 
// ${new Intl.DateTimeFormat("en", { month: "short" }).format(new Date(dummyResponse.Event[e.target.id].dateTime))} 
// ${new Intl.DateTimeFormat("en", { year: "numeric" }).format(new Date(dummyResponse.Event[e.target.id].dateTime))}`}; 
// ${new Date(dummyResponse.Event[e.target.id].dateTime).toLocaleTimeString()}`;
// document.getElementById("title").innerHTML =
// `Title : ${dummyResponse.Event[e.target.id].title}`;
// document.getElementById("description").innerHTML =
// `Description : ${dummyResponse.Event[e.target.id].description}`;
// document.getElementById("location").innerHTML =
// `Location : ${dummyResponse.Event[e.target.id].location}`;
 //model
//  <div class="modal fade p-5" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//  <div class="modal-dialog">
//    <div class="modal-content">
//      <div class="modal-header">
//        <h5 class="modal-title" id="exampleModalLabel">Event</h5>
//        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//          <span aria-hidden="true">&times;</span>
//        </button>
//      </div>
//      <div class="modal-body" >
//        <img src="/Assets/imgs/E-1.jpg" class="mx-auto d-block" alt="name" width="200px" height="auto">
//        <br>
//        <p>Schedule :${`${da}, ${mo} ${ye}`}; ${d.toLocaleTimeString()}</p>
//        <p> Title : ${dummyResponse.Event[i].title}</p>
//        <p>Description : ${dummyResponse.Event[i].description}</p>
//        <p>Location : ${dummyResponse.Event[i].location} </p>
//      </div>
//      <div class="modal-footer">
//        <button type="button" class="btn btn-success"
//          onclick="location.href = 'Admin-EventPageUpdate.html';">Edit</button>
//      </div>
//    </div>
//  </div>
// </div>

//  $('button.fa fa-trash fa-3x pl-2').on('click', function (e) {
//   e.preventDefault();
//   var id = $(this).closest('tr').data('id');
//   $('#myModal').data('id', id).modal('show');
// });

// $('#btn btn-primary').click(function () {
//   var id = $('#myModal').data('id');
//   $('[data-id=' + id + ']').remove();
//   $('#myModal').modal('hide');
// });


//model 
/*        var newRowContent = `<tr class="rowss">
            <td>
                <div class="custom-control custom-checkbox mr-sm-2 ml-2">
                    <input type="checkbox" class="custom-control-input" id="Boxes1">
                    <label class="custom-control-label" for="Boxes1"></label>
                </div>
            </td>
             <td style="font-weight: 400; font-size: 18px">${`${da}, ${mo} ${ye}`}
             <div style="font-weight: 200; font-size: 14px">${d.toLocaleTimeString()}</div>
            </td>
            <td style="font-weight: 400; font-size: 18px">${
              dummyResponse.Event[i].title
            }</td>
            <td style="font-weight: 400; font-size: 14px; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">${
              dummyResponse.Event[i].description
            }</td>
            <td style="font-weight: 200; font-size: 18px">${
              dummyResponse.Event[i].location
            }</td>
            <td>
            <div class="btn-group" role="group" aria-label="Third group">
            <a href="#" role="button"><i class="fa fa-pencil fa-3x pr-2" aria-hidden="true"
                style="color: rgb(0, 0, 0); font-size: 35px">
              </i></a>

              <a href="#" role="button" data-toggle="modal" data-target="#exampleModal"><i
              class="fa fa-trash fa-3x pl-2" aria-hidden="true"
              style="color: rgb(255, 49, 49); font-size: 35px">
            </i></a>

                    <!-- Modal -->
                  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">Delete Event</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          Are you sure you want to delete event?
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
                          <button type="button" class="btn btn-primary" <!--value="Delete Row" onclick="DeleteRowFunction(this)"-->>Yes</button>
                        </div>
                      </div>
                    </div>
                  </div>

              </div>
            </td>
        </tr>`;
        */