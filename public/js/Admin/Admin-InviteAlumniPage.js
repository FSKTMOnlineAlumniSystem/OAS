let alumniEventArray=alumniEvent_array
let alumniArray=alumni_array
localStorage.setItem("eventId",$inviteEventId)

var pageIndex = 0;
const loadAlumniList = (pageIndex,alumniEventArray,alumniArray) => {
uncheckTop();
const tbody = document.getElementsByTagName('tbody')[0];
tbody.innerHTML="";

//handle no result
  if(alumniArray.length==0){
    document.getElementById('invideAndDone').innerHTML=''; //button
    document.getElementById("nextPage").innerHTML ='';
    document.getElementById("previousPage").innerHTML = '';
    document.getElementsByClassName("pages")[0].innerHTML = '';
    insertSearchNoResult(document.getElementById("no_result"));
  }
  else{
    document.getElementById('no_result').innerHTML='';
    let alumniStartIndex = pageIndex * 10;
    let alumniEndIndex = alumniStartIndex + 10;
  
    var dataLength = alumniArray.length
    var remainingLength = dataLength - alumniStartIndex;
    /*   js for button*/
    if (alumniEndIndex >= alumniArray.length) {
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

    var alumni=alumniArray;
    for (
      let i = alumniStartIndex;
      i < alumniEndIndex && i < alumniArray.length;
      i++
    ) 
    {
  let tr = document.createElement('tr');
  let td = document.createElement('td');
  let div = document.createElement('div');
  div.setAttribute('class', 'custom-control custom-checkbox text-center');

  let input = document.createElement('input');
  input.setAttribute('type', 'checkbox');
  input.setAttribute('class', 'custom-control-input');
  input.setAttribute('id', 'id-'+alumni[i].alumniId);

  let label = document.createElement('label');
  label.setAttribute('class', 'custom-control-label');
  label.setAttribute('for', 'id-'+alumni[i].alumniId);
  let defineAlumni=alumni[i].alumniId;

  div.appendChild(input);
  div.appendChild(label);
  td.appendChild(div);
  tr.appendChild(td);
  
  var check=alumni[i].imageId==null||alumni[i].imageId== '/Assets/imgs/default_user.jpg'
  td = document.createElement('td');
  if(check){
    td.innerHTML = `<div style="aspect-ratio:1/1; height:100px; margin-left:10px;margin-right:auto;overflow:hidden">
    <img class='table__td--height' src="/Assets/imgs/default_user.png">
  </div>`
 
  }else{
  td.innerHTML = `<div style="aspect-ratio:1/1; height:100px; margin-left:10px;margin-right:auto;overflow:hidden">
    <img class='table__td--height' src=${alumni[i].imageId}>
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
  span.innerHTML = alumni[i].name;
  td.appendChild(span);
  tr.appendChild(td);

  // department column
  td = document.createElement('td');
  span = document.createElement('span');
  span.innerHTML = alumni[i].department;
  td.appendChild(span);
  tr.appendChild(td);

  // status column
  td = document.createElement('td');
  div = document.createElement('div');
  div.setAttribute('class', 'text-black rounded p-1');

  // check if this alumni invited in this event
  var foundAlumniEvent=false;
  for(var j=0; j<alumniEventArray.length; j++){
    if(alumniEventArray[j].eventId=== localStorage.getItem("eventId") && alumni[i].alumniId === alumniEventArray[j].alumniId){
      foundAlumniEvent=true;
    }
  }
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
  <button class="inviteNewAlumni" id=${i} onclick='inviteNewAlumni(this)'>
  <i class="fas fa-user-plus pl-2"  aria-hidden="true" >
  </i>
  </button>`
  tr.appendChild(td);
  tbody.appendChild(tr);
    };
document.getElementById('invideAndDone').innerHTML=`
            <button type="button" class="btn btn-info"  onclick='inviteCheckedAlumni()'>
              <i class="fas fa-user-plus"></i> Invite
            </button>
            <button type="button" class="btn btn-primary ml-2" onclick='backToPreviousPage()'>
              Done
            </button>
`
}//else
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
}

//checkboxes
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
}
window.uncheckTop= function(){
  var topcheckboxes = document.getElementById('CheckAllBoxes');
  topcheckboxes.checked=false;
}

window.DeleteRowFunction = function(o) {
  var p=o.parentNode.parentNode.parentNode;
      p.parentNode.removeChild(p);
      alumniArray.splice(o.target.id, 1)
      updateDummyData(dummyResponse)
 }
 
// search bar
const searchButton = document.getElementById('searchBar');
var searchInput = document.getElementById('input1');

const handleAlumniSearch = evt =>{
  event.preventDefault();
  var status = $('#status').find("option:selected").val();
  var department = $('#department').find("option:selected").val();
  var search = document.getElementById("input1").value;
  var eventId=localStorage.getItem('eventId');
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
    uncheckTop();
    pageIndex = 0;
    outputList =JSON.parse(resp);
    alumniArray=outputList;
    loadAlumniList(pageIndex,alumniEventArray,alumniArray);
    },     
  });
}

searchButton.addEventListener('click',handleAlumniSearch);
searchInput.addEventListener('keypress', (evt)=>{
  if(evt.key === 'Enter'){
    handleAlumniSearch(evt);
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
  var outputList;
  var eventId=localStorage.getItem('eventId');
  var search = document.getElementById("input1").value;
  $.ajax({
    url: '/admin/search/invite/alumni?eventId='+$inviteEventId,
    type: 'post',
    data: {
      status: status,
      department: department,
      eventId: eventId,
      search: search
    },
    success: function(resp){
    uncheckTop();
    pageIndex = 0;
    outputList =JSON.parse(resp);
    alumniArray=outputList;
    loadAlumniList(pageIndex,alumniEventArray,alumniArray);
    },     
  });
}

//clearAll
// document.getque
$("#clearAll").on("click", function (e) {
  e.preventDefault();
  SearchData("All", "All");
  $('#department option').prop('selected', function() {
      return this.defaultSelected;
  });
  $('#status option').prop('selected', function() {
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
    $.ajax({
      url:"/admin/invite/function",    //the page containing php script
      data: { alumniId: alumniId, 
              eventId: eventId,
              dateTime: dateTime,
            },
      type: 'POST',    //request type,
      success: function(resp){
        uncheckTop();
        var outputList = JSON.parse(resp);
        alumniEventArray=outputList;
        loadAlumniList(pageIndex,outputList,alumniArray);
      },
      error: function(request, status, error){  
        alert(error);
        }
      });
  }

// invite alumni that is checked
window.inviteCheckedAlumni = function () {
  var $alumniId=[];
  var $eventId=[];
  var $dateTime=[];
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  for (var i = checkboxes.length-1; i > 0; i--) {
    if(checkboxes[i].checked){
      var alumniId= alumniArray[pageIndex*10+i-1].alumniId;
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
      uncheckTop();
      var outputList = JSON.parse(resp);
      alumniEventArray=outputList;
      loadAlumniList(pageIndex,alumniEventArray,alumniArray);
    },
    error: function(request, status, error){  
      alert(error);
      }
    });

  checkboxes[0].checked = false;
};  

window.backToPreviousPage=function(){
    window.history.back();
}
loadAlumniList(pageIndex,alumniEventArray,alumniArray);

window.nextPage = function () {
  pageIndex++;
  loadAlumniList(pageIndex,alumniEventArray,alumniArray);
  window.scrollTo(0, 0);
};
window.previousPage = function () {
  pageIndex--;
  loadAlumniList(pageIndex,alumniEventArray,alumniArray);
  window.scrollTo(0, 0);
};
loadAlumniList(pageIndex,alumniEventArray,alumniArray);
