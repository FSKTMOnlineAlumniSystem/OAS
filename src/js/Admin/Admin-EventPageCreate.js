console.log('testing')
sessionStorage.setItem('event', 'create')
window.readURL = function (input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
           document.getElementById("prevImage").src=e.target.result;
           document.getElementById("wizardPicturePreview").src=e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
    }
}


import dummyResponse from "../dummydata.js";
window.add_element_to_array = function() {
    console.log("add element")
    var table = document.getElementsByClassName(
      "table table-striped table-sm something"
    )[0];
  // var title = document.getElementById("title").value;
  // var date = document.getElementById("date").value;
  // var stime = document.getElementById("startTime").value;
  // var etime = document.getElementById("endTime").value;
  // var description = document.getElementById("description").value;
  // var location = document.getElementById("location").value;
  // var image = document.getElementById("prevImage").value;
  // var endIndex = dummyResponse.EventTry.length;
  // var d = new Date(dummyResponse.Event[i].dateTime);
  // let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  // let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
  // let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
  sessionStorage.setItem('title', document.getElementById("title").value)
  sessionStorage.setItem('date', document.getElementById("date").value)
  sessionStorage.setItem('stime', document.getElementById("startTime").value)
  sessionStorage.setItem('etime', document.getElementById("endTime").value)
  sessionStorage.setItem('description', document.getElementById("description").value)
  sessionStorage.setItem('location', document.getElementById("location").value)
  sessionStorage.setItem('prevImage', document.getElementById("prevImage").value)
addRow();
  // var newRowContent = `<tr class="rowss">
              
  //            <td>
  //                 <div class="custom-control custom-checkbox text-center">
  //                   <input type="checkbox" class="custom-control-input" id="Boxes1">
  //                   <label class="custom-control-label" for="Boxes1"></label>
  //                 </div>
  //               </td>
  //              <td style="font-weight: 400; font-size: 18px">${date}
  //              <div style="font-weight: 200; font-size: 14px">${stime}</div>
             
  //              <td style="font-weight: 400; font-size: 18px" class="eventTitle">
  //              <a href="Admin-EventPageUpdate.html" data-toggle="modal" data-target="#exampleModal">
  //             ${title}
  //           </a>
      
  //           <!-- Modal -->
  //           <div class="modal fade p-5" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  //             <div class="modal-dialog">
  //               <div class="modal-content">
  //                 <div class="modal-header">
  //                   <h5 class="modal-title" id="exampleModalLabel">Event</h5>
  //                   <button type="button" class="close" data-dismiss="modal" aria-label="Close">
  //                     <span aria-hidden="true">&times;</span>
  //                   </button>
  //                 </div>
  //                 <div class="modal-body" >
  //                   <img src="/Assets/imgs/E-1.jpg" class="mx-auto d-block" alt="name" width="200px" height="auto">
  //                   <br>
  //                   <p>Schedule :${date}; ${stime}</p>
  //                   <p> Title : ${title}</p>
  //                   <p>Description : ${description}</p>
  //                   <p>Location : ${location} </p>
  //                 </div>
  //                 <div class="modal-footer">
  //                   <button type="button" class="btn btn-success"
  //                     onclick="location.href = 'Admin-EventPageUpdate.html';">Edit</button>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //           </td>

  //             <td style="font-weight: 400; font-size: 14px; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">${
  //               description
  //             }</td>
  //             <td style="font-weight: 200; font-size: 18px">${
  //               location
  //             }</td>
  //             <td>
  //               <div class="btn-group" role="group" aria-label="Third group">
  //                 <a href="Admin-EventPageUpdate.html" cnclick="onload(i)"role="button"><i class="fa fa-pencil fa-3x pr-2" aria-hidden="true" style="color: rgb(0, 0, 0); font-size: 35px">
  //                 </i></a>
  //                   <a href="#" role="button" value="Delete Row" onclick="DeleteRowFunction(this)"><i class="fa fa-trash fa-3x pl-2" aria-hidden="true" style="color: rgb(255, 49, 49); font-size: 35px">
  //                   </i></a>
  //               </div>
  //             </td>
  //         </tr>`;
  
  
  //         var tableRef = document
  //   .getElementsByClassName("table table-striped table-sm something")[0]
  //   .getElementsByTagName("tbody")[0];
  // var newRow = tableRef.insertRow(tableRef.rows.length);
  // // table.insertRow(newRow)
  // // console.log(newRow)
  // newRow.innerHTML = newRowContent;

//    dummyResponse.EventTry[endIndex] =  {
//         "eventId": "E-3",
//         "adminId": "AD-3",
//         "title": title,
//         "date":date,
//         "startTime": stime,
//         "endTime":etime,
//         "description": description,
//         "imageId": image,
//         "location": location
//       }
//   alert("Element  Added at index " + endIndex);
}

