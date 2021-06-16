const imgPath = "/Assets/imgs/";
var eventArray;
eventArray=event_array;
var pageIndex = 0;

const loadEventList = (pageIndex,eventArray) => {
  uncheckTop();
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
}
else{
  document.getElementById('no_result').innerHTML='';
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
  for (var i = table.rows.length - 1; i > 0; i--) {
    table.deleteRow(i);
  }

  for (
    let i = eventStartIndex;
    i < eventEndIndex && i < eventArray.length;
    i++
  ) 
  {
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
    var tableRef = document
      .getElementsByClassName("table table-striped table-sm something")[0]
      .getElementsByTagName("tbody")[0];
    var newRow = tableRef.insertRow(tableRef.rows.length);

    newRow.innerHTML = newRowContent;
  }
}
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
window.DeleteCheckedRow = function () {
  $eventId=[];
  checkboxes='';
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  for (var i = checkboxes.length - 1; i > 0; i--) {
    if (checkboxes[i].checked) {
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

    $(document).ready(function () {
      $('.custom-control-input').on("change", function () {
          var checkboxes = document.querySelectorAll('input[type="checkbox"]');
          var allChecked=true;
    for (var i = 1 ; i < checkboxes.length ; i++) {
      if(!checkboxes[i].checked){
        allChecked=false;
      }
    }
    if(allChecked==true){
      checkboxes[0].checked = true; 
    }else{
      checkboxes[0].checked = false;
    }
      });
  });
//trash model

// modal
  var clickedAlumniIndex;
  document.querySelectorAll('.eventTitle').forEach((title) => {
    title.addEventListener('click', (e) => {
      clickedAlumniIndex = e.target.id;
      var check=eventArray[clickedAlumniIndex].imageId==null;
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
var search = document.getElementById("input1").value;
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
    uncheckTop();
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
      var checkboxes = document.querySelectorAll('input[type="checkbox"]');
      var search = document.getElementById("input1").value;
      var $eventId=localStorage.getItem('eventToDelete');
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
          var outputList = JSON.parse(resp);
          eventArray=outputList;
          loadEventList(pageIndex,eventArray);
        },
        error: function(request, status, error){  
        alert(error);
        }
        });
         checkboxes[0].checked = false;
         closeModal("#deleteCheckedModal");
    });
$(document).ready(function () {
  $("#status,#department").on("change", function () {
    var status = $('#status').find("option:selected").val();
    var department = $('#department').find("option:selected").val();
    SearchData(status, department)
  });
});

window.toggle = function (source) {
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  for (var i = 0; i < checkboxes.length; i++) {
    if ($(checkboxes[i]).is(":visible") && (checkboxes[i] != source ));
      checkboxes[i].checked = source.checked;
  }
};

window.uncheckTop= function(){
  var topcheckboxes = document.getElementById('CheckAllBoxes');
  topcheckboxes.checked=false;
}
window.check = function (source, i) {
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes[i].checked = source.checked;
};

window.nextPage = function () {
  pageIndex++;
  loadEventList(pageIndex,eventArray);
  window.scrollTo(0, 0);
};
window.previousPage = function () {
  pageIndex--;
  loadEventList(pageIndex,eventArray);
  window.scrollTo(0, 0);
};
loadEventList(pageIndex,eventArray);

window.updateEvent = function (o) {
  var eventId = o.id.split(" ")[1]
  localStorage.setItem("updateId", eventId)
  location.href = "Admin-UpdateEventPage.html"
};
// filter
const searchButton = document.getElementById('searchBar');
var searchInput = document.getElementById('input1');
const handleMyJobSearch = evt =>{
  var search = document.getElementById("input1").value;
var outputList;
  $.ajax({
    url: '/admin/search/event',
    type: 'post',
    data: {search: search},
    success: function(resp){
    uncheckTop();
    pageIndex = 0;
    outputList =JSON.parse(resp);
    eventArray=outputList;
    loadEventList(pageIndex,outputList);
    },
  });
}

searchButton.addEventListener('click',handleMyJobSearch);
searchInput.addEventListener('keypress', (evt)=>{
  if(evt.key === 'Enter'){
    handleMyJobSearch(evt);
  }
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
window.closeModal = function (modalId) {
  // $(modalId).modal('hide');
}
