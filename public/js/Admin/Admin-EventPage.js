// import { dummyResponse, updateDummyData } from "../dummydata.js";
const imgPath = "/Assets/imgs/";
console.log('connect');
var eventArray;
eventArray=event_array;
let pageIndex = 0;

const loadEventList = (pageIndex,eventArray) => {
if(eventArray.length==0){
  var table = document.getElementsByClassName(
    "table table-striped table-sm something"
  )[0];
  for (var i = table.rows.length - 1; i > 0; i--) {
    table.deleteRow(i);
  }
  document.getElementById("nextPage").innerHTML ='';
  document.getElementById("previousPage").innerHTML = '';
  document.getElementsByClassName("pages")[0].innerHTML = '';
  insertSearchNoResult(document.getElementById("no_result"));
  // document.getElementById('forSearch').innerHTML=`
  // <div class="row m-0 p-0 justify-content-center">
  //       <div class="text-center">
  //       <p>Search not Found hehehe</p>
  //         <img class="card-img-150 mb-3" src="/Assets/imgs/searchNotFound.png" alt="Search Not Found" style="width:500px;height:500px;">
  //       </div>
  //       `;
}
else{
  document.getElementById('no_result').innerHTML='';

  // console.log(eventArray);
  let eventStartIndex = pageIndex * 10;
  let eventEndIndex = eventStartIndex + 10;

  var dataLength = eventArray.length
  var remainingLength = dataLength - eventStartIndex;
  /*   js for button*/
  if (eventEndIndex >= eventArray.length) {
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
    i < eventEndIndex && i < eventArray.length;
    i++
  ) 
  {
  console.log('hihihihi')
    var newRowContent = `<tr class="rowss">
                
               <td>
                    <div class="custom-control custom-checkbox text-center">
                      <input type="checkbox" class="custom-control-input" id="check ${i}">
                      <label class="custom-control-label" for="check ${i}"></label>
                    </div>
                  </td>
                 <td style="font-weight: 400; font-size: 18px">${getReadableDate(eventArray[i].dateTime)}
                 <div style="font-weight: 200; font-size: 14px">${getReadableTime(eventArray[i].dateTime)}</div>
               
                 <td style="font-weight: 400; font-size: 18px" class="eventTitle">
                 <a class="eventTitle" id=${i} data-toggle="modal" data-target="#titleModal">
                ${eventArray[i].title
      } 
              </a>
        
              <!-- Modal -->

              </td>

                <td style="font-weight: 400; font-size: 14px; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">${eventArray[i].description
      }</td>
                <td style="font-weight: 200; font-size: 18px">${eventArray[i].location
      }</td>
                <td>
                  <div class="btn-group" role="group" aria-label="Third group">
                   
                  <a href="/admin/update/event?eventId=${eventArray[i].eventId}" class="updateButton" onclick="updateEvent(this)" id="update ${i}" >
                  <!--?title=${eventArray[i].title} onclick="updateEvent(this)" id="update ${i}"-->
                    <i class="fas fa-edit pr-3" aria-hidden="true">
                    </i></a>
                    
                    <a href="/admin/invite/alumni?eventId=${eventArray[i].eventId}" class="inviteButton">
                  <i class="fas fa-user-plus pr-2" aria-hidden="true"></i>
                </a>

    <!--onclick="DeleteRowFunction(this)"  onclick="deleteByJquery(this)-->

                      <button type="submit" class="deleteRowButton d-flex justify-content-center align-items-center" 
                      name="deleteButton" id="row ${i}" value="${eventArray[i].eventId}">
                      <i class="far fa-trash-alt" aria-hidden="true">
                       </i></button>

                  </div>
                </td>
            </tr>`;
{


  //another method
// 
    var tableRef = document
      .getElementsByClassName("table table-striped table-sm something")[0]
      .getElementsByTagName("tbody")[0];
    var newRow = tableRef.insertRow(tableRef.rows.length);

    newRow.innerHTML = newRowContent;
  }


/* <button type="button" class="clickButton close" id=${outputList[i].jobId} role="button" aria-pressed="true"><i class="far fa-trash-alt"></i></button>   */}
//trash model
  //CLICKING THE TRASH ICON
  const closeDeleteModalButton = document.querySelector("#closeDeleteModalButton");
  const clickButton = document.querySelectorAll(".deleteRowButton");
  var findId;
  var $eventToDelete;

  $(document).ready(function(){
    jQuery.noConflict();
  clickButton.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      findId='';
      var o = e.currentTarget.id;
      findId=o.split(" ")[1];
      $eventToDelete=eventArray[findId].eventId;
      localStorage.setItem('eventToDelete',$eventToDelete)
      $.ajax({
        url: '/admin/delete/event',
        type: 'post',
        data: {modal: 1},
        success: function(response){ 
          // Display Modal
          jQuery(`#deleteModal`).modal("show");
        },
        error: function(){
          jQuery(`#deleteModal`).modal("show");
        }
      });
     
    });

  });
});
  //CLICK ON THE CLOSE BUTTON OF THE CONFIRMATION MODAL
  if (closeDeleteModalButton) {
    closeDeleteModalButton.addEventListener("click", () =>
      closeModal("#deleteModal")
    );
  }
  var $eventId=[];
  // var checkboxes=[];
//delete multiple row
window.DeleteCheckedRow = function () {
  $eventId=[];
  checkboxes='';
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  for (var i = checkboxes.length - 1; i > 0; i--) {
    if (checkboxes[i].checked) {
      console.log(pageIndex*10+i + "  , ");
      console.log('p'+pageIndex);
      $eventId.push(eventArray[pageIndex*10+i-1].eventId);
    }
  }
  $eventId=$eventId.toString();
  localStorage.setItem('eventToDelete',$eventId);

      $.ajax({
        url: '/admin/delete/event',
        type: 'post',
        data: {modal: 1},
        success: function(response){ 
          // Display Modal
          jQuery(`#deleteCheckedModal`).modal("show");
        },
        error: function(){
          jQuery(`#deleteCheckedModal`).modal("show");
        }
      });
    }     


//trash model

// modal
  var clickedAlumniIndex;
  document.querySelectorAll('.eventTitle').forEach((title) => {
    title.addEventListener('click', (e) => {
      console.log(e.target.id);
      clickedAlumniIndex = e.target.id;
      console.log(eventArray[clickedAlumniIndex])
      var check=eventArray[clickedAlumniIndex].imageId==null;
      console.log(check);
      
      if(check){
        document.querySelector('#imageTitle').src="/Assets/imgs/default_events.jpg";
      }else{
        document.querySelector('#imageTitle').src = eventArray[clickedAlumniIndex].imageId;
      }
      document.querySelector('#title').textContent = eventArray[clickedAlumniIndex].title;
      document.querySelector('#description').textContent = eventArray[clickedAlumniIndex].description;
      document.querySelector('#location').textContent = eventArray[clickedAlumniIndex].location;
      let editbutton = document.querySelector('#editButton');
      editbutton.onclick = function() {location.href='/admin/update/event?eventId='+eventArray[clickedAlumniIndex].eventId};    
      localStorage.setItem('updateId', clickedAlumniIndex);
    });
  })
}//else
};



$('#deleteButton').click(function(){
// var $eventToDelete=eventArray[findId].eventId;
var search = document.getElementById("input1").value;
// console.log($eventToDelete);
var $eventToDelete=localStorage.getItem('eventToDelete');

$.ajax({
  url:"/admin/delete/event",    //the page containing php script
  data: { 
    deleteEvent: $eventToDelete,
    search: search
  },
  type: 'POST',    //request type,
  dataType: 'json',
  success: function(resp){
    console.log('resp');
      console.log(resp);
    // var outputList = JSON.parse(resp);
    // console.log('resp after parse');

    // console.log(resp);
  // eventArray.splice(findId, 1)
    eventArray=resp;
    loadEventList(pageIndex,eventArray);
  },
  error: function(request, status, error){  
    alert(error);
    }
  });
  closeModal("#deleteModal");
});


$('#deleteCheckedButton').click(function(){
  // window.DeleteCheckedRow = function () {
    // var $eventId=[];
      // console.log('delete checked row');
      var checkboxes = document.querySelectorAll('input[type="checkbox"]');
      var search = document.getElementById("input1").value;
      var $eventId=localStorage.getItem('eventToDelete');
  
      // for (var i = checkboxes.length - 1; i > 0; i--) {
      //   if (checkboxes[i].checked) {
      //     $eventId.push(eventArray[i-1].eventId);
      //   }
      // }
      // $eventId=$eventId.toString();
      // console.log($eventId);
      $.ajax({
        url:"/admin/delete/event",    //the page containing php script
        data: { 
          checkbox: "checked",
          deleteEvent: $eventId,
          search: search
        },
        type: 'POST',    //request type,
        // dataType: "json",
        success: function(resp){
          // console.log('resp');
          // console.log(resp);
          var outputList = JSON.parse(resp);
          eventArray=outputList;
          // eventArray=resp;
          console.log(eventArray);
          loadEventList(pageIndex,eventArray);
        },
        error: function(request, status, error){  
        alert(error);
        }
        });
        console.log(checkboxes);
         checkboxes[0].checked = false;
         closeModal("#deleteCheckedModal");
    });

window.toggle = function (source) {
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i] != source && $(checkboxes[i]).is(':visible'))
      checkboxes[i].checked = source.checked;
  }
}


window.check = function (source, i) {
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes[i].checked = source.checked;
};

window.nextPage = function () {
  pageIndex++;
  console.log(eventArray);
  loadEventList(pageIndex,eventArray);
};
window.previousPage = function () {
  console.log(eventArray);
  pageIndex--;
  loadEventList(pageIndex,eventArray);
};
loadEventList(pageIndex,eventArray);



window.updateEvent = function (o) {
  var eventId = o.id.split(" ")[1]
  localStorage.setItem("updateId", eventId)
  location.href = "Admin-UpdateEventPage.html"
};

// window.deleteByJquery= function (o){
//   var findId = o.id.split(" ")[1]
//   var $eventToDelete=eventArray[findId].eventId;
//   console.log($eventToDelete);
//   document.cookie = "deleteEvent="+$eventToDelete;
//   location.reload();
//   location.reload();
//   location.reload();
// };

/*
window.deleteByJquery= function (o){
  var findId = o.id.split(" ")[1]
  var $eventToDelete=eventArray[findId].eventId;
  var search = document.getElementById("input1").value;
  // console.log($eventToDelete);
  $.ajax({
    url:"/admin/delete/event",    //the page containing php script
    data: { 
      deleteEvent: $eventToDelete,
      search: search
    },
    type: 'POST',    //request type,
    // dataType: 'json',
    success: function(resp){
      // console.log('resp');
        // console.log(resp);
      var outputList = JSON.parse(resp);
      eventArray=outputList;
      loadEventList(pageIndex,outputList);
    },
    error: function(request, status, error){  
      alert(error);
      }
    });
};
*/
/*
window.DeleteCheckedRow = function () {
  var $eventId=[];
    // console.log('delete checked row');
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    var search = document.getElementById("input1").value;
    for (var i = checkboxes.length - 1; i > 0; i--) {
      if (checkboxes[i].checked) {
        $eventId.push(eventArray[i-1].eventId);
      }
    }
    $eventId=$eventId.toString();
    // console.log($eventId);
    $.ajax({
      url:"/admin/delete/event",    //the page containing php script
      data: { 
        checkbox: "checked",
        deleteEvent: $eventId,
        search: search
      },
      type: 'POST',    //request type,
      // dataType: "json",
      success: function(resp){
        // console.log('resp');
        // console.log(resp);
        var outputList = JSON.parse(resp);
        eventArray=outputList;
        loadEventList(pageIndex,outputList);
      },
      error: function(request, status, error){  
      alert(error);
      }
      });
       checkboxes[0].checked = false;
  };
*/
// filter

const searchButton = document.getElementById('searchBar');
var searchInput = document.getElementById('input1');

const handleMyJobSearch = evt =>{
// $('#searchBar').click(function(){
  var search = document.getElementById("input1").value;
  // if (search == "") {
  //   alert("Hi, type something to search!"); // He Lin: suggest change to "Hi, type something to search!" as within the EventPage.js
  //   // and add a return here so below code will not run
  //   return;
  // }
var outputList;
  $.ajax({
    url: '/admin/search/event',
    type: 'post',
    data: {search: search},
    success: function(resp){
    let pageIndex = 0;
    // console.log(resp);
    outputList =JSON.parse(resp);
    eventArray=outputList;
    loadEventList(pageIndex,outputList);
    //  if(outputList.length===0){
    //   loadMyJobList(page,outputList,-1);
    // }else{
    //  loadMyJobList(page,outputList,outputList.length);
    // }
    },
     
  });
}
// });

searchButton.addEventListener('click',handleMyJobSearch);
searchInput.addEventListener('keypress', (evt)=>{
  if(evt.key === 'Enter'){
    handleMyJobSearch(evt);
  }
});
/*
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
});
*/
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

/*Close Modal */
closeCancelChangesModalButton.addEventListener('click', () => closeModal('#cancelChangesModal'));
// stayButton.addEventListener('click', () => closeModal('#cancelChangesModal'));
window.closeModal = function (modalId) {
  // $(modalId).modal('hide');
}
// delete row
/*
// <?php echo DeleteRowPhp(${eventArray[i].eventId});?>
window.deleteByJquery= function (o){
  var findId = o.id.split(" ")[1]
  var $eventToDelete=eventArray[findId].eventId;
  console.log($eventToDelete);
  //cookies
  // $_COOKIE['deleteEvent'] = $eventToDelete;
  

  document.cookie = "deleteEvent="+$eventToDelete;
  // alert(document.cookie);
 location.reload();
 location.reload();

  // $(document).ready(function () {
  //   createCookie("delete", $(window).height(), "10");
  // });
  
  // function createCookie(name, value, days) {
  //   var expires;
  //   if (days) {
  //     var date = new Date();
  //     date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  //     expires = "; expires=" + date.toGMTString();
  //   }
  //   else {
  //     expires = "";
  //   }
  //   document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
  // }

    // var data = {
    //     fn: "filename",
    //     deleteEvent: String($eventToDelete)
    // };

    // $.post("/adminEvent", data);

/*
// cookies delete checked row
/*
var $eventId=[];
window.DeleteCheckedRow = function () {
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  for (var i = checkboxes.length - 1; i > 0; i--) {
    if (checkboxes[i].checked) {
      // eventArray.splice(i - 1, 1)
      $eventId.push(eventArray[i-1].eventId);
    }
  }
  document.cookie="deleteEvent="+ $eventId;
  document.cookie="checkbox="+'checked';

  checkboxes[0].checked = false;
  // updateDummyData(dummyResponse)
  // loadEventList(pageIndex)
  location.reload();
  location.reload();
  location.reload();

};
*/
/*
  try {
  $.ajax({
    url:"./adminEvent",    //the page containing php script
    data: { deleteEvent: $eventToDelete},
    type: 'POST',    //request type,
    dataType: 'json',
    success: function(output) {
      alert(output);
  },
error: function(request, status, error){
alert(error);
}
});
} catch (Exception ) {
  console.log('exception');
}
*/


// $(document).ready(function(){
//   $.get("http://localhost/adminEvent", 
//   {
//     deleteEvent: $eventToDelete
//   });

// })
  // $.post( "Admin-EventPage.php", { deleteEvent: eventArray[findId].eventId});

// };*/

// window.DeleteRowFunction = function (o) {
//   var findId = o.id.split(" ")[1]
//   eventArray.splice(findId, 1)
//   updateDummyData(dummyResponse)
//   loadEventList(pageIndex)
// };