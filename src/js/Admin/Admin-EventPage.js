import dummyResponse from "../dummydata.js";
console.log("link js");
// model
// $('#myModal').on('shown.bs.modal', function () {
//   $('#myInput').trigger('focus')
// })

//eventList
let pageIndex = 0;
const loadEventList = (pageIndex) => {
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
        <button class="page-item" tabindex="-1" aria-disabled="true">${
          pageIndex + 1
        }</button>
        </li>`;
  } else if (remainingLength <= 20) {
    console.log("<=20");
    document.getElementsByClassName("pages")[0].innerHTML = `
        <li class="page-item disabled">
        <button class="page-item" tabindex="-1" aria-disabled="true">${
          pageIndex + 1
        }</button>
        </li>
        <li class="page-item" ><button onclick="nextPage()">${
          pageIndex + 2
        }</button></li>`;
  } else {
    console.log("<=30");
    document.getElementsByClassName("pages")[0].innerHTML = `
        <li class="page-item disabled">
        <button class="page-item" tabindex="-1" aria-disabled="true">${
          pageIndex + 1
        }</button>
        </li>
        <li class="page-item" ><button onclick="nextPage()">${
          pageIndex + 2
        }</button></li>
        <li class="page-item" ><button onclick="nextPage();nextPage()">${
          pageIndex + 3
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
    var d = new Date(dummyResponse.Event[i].dateTime);
    // console.log(dummyResponse.Event[i].dateTime)
    let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
    let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
    let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
    // console.log(`${da}, ${mo} ${ye}`);
    // d.toLocaleDateString('en-GB')
    
    
    var newRowContent = `<tr class="rowss">
                <td>
                    <div class="custom-control custom-checkbox mr-sm-2 ml-2">
                        <input type="checkbox" class="custom-control-input" id="Boxes1">
                        <label class="custom-control-label" for="Boxes1"></label>
                    </div>
                </td>
                 <td style="font-weight: 400; font-size: 18px">${`${da}, ${mo} ${ye}`}
                 <div style="font-weight: 200; font-size: 14px">${d.toLocaleTimeString()}</div>
               
                 <td style="font-weight: 400; font-size: 18px" class="eventTitle">
                 <a href="Admin-EventPageUpdate.html" data-toggle="modal" data-target="#exampleModal">
                ${
                  dummyResponse.Event[i].title
                }
              </a>
        
              <!-- Modal -->
              <div class="modal fade p-5" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Event</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body" >
                      <img src="/Assets/imgs/E-1.jpg" class="mx-auto d-block" alt="name" width="200px" height="auto">
                      <br>
                      <p>Schedule :${`${da}, ${mo} ${ye}`}; ${d.toLocaleTimeString()}</p>
                      <p> Title : ${dummyResponse.Event[i].title}</p>
                      <p>Description : ${dummyResponse.Event[i].description}</p>
                      <p>Location : ${dummyResponse.Event[i].location} </p>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-success"
                        onclick="location.href = 'Admin-EventPageUpdate.html';">Edit</button>
                    </div>
                  </div>
                </div>
              </div>
              </td>

                <td style="font-weight: 400; font-size: 14px; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">${
                  dummyResponse.Event[i].description
                }</td>
                <td style="font-weight: 200; font-size: 18px">${
                  dummyResponse.Event[i].location
                }</td>
                <td>
                  <div class="btn-group" role="group" aria-label="Third group">
                    <a href="Admin-EventPageUpdate.html" cnclick="onload(i)"role="button"><i class="fa fa-pencil fa-3x pr-2" aria-hidden="true" style="color: rgb(0, 0, 0); font-size: 35px">
                    </i></a>
                      <a href="#" role="button" value="Delete Row" onclick="DeleteRowFunction(this)"><i class="fa fa-trash fa-3x pl-2" aria-hidden="true" style="color: rgb(255, 49, 49); font-size: 35px">
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

window.nextPage = function () {
  pageIndex++;
  loadEventList(pageIndex);
};
window.previousPage = function () {
  pageIndex--;
  loadEventList(pageIndex);
};
loadEventList(pageIndex);
 
window.onload= function(i){
  console.log("function is running")
  // localStorage.setItem("eventID",dummyResponse.Event[i].eventId)
  // console.log("event id"+ dummyResponse.Event[i].eventId)
  console.log(i)
  // console.log(dummyResponse.Event[i].eventId)
 }


 window.DeleteRowFunction = function(o) {
  var p=o.parentNode.parentNode.parentNode;
      p.parentNode.removeChild(p);
 }
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