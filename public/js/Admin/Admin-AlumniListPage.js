let alumniArray=alumni_array
let pageIndex = 0;
const reload = (alumniArray,pageIndex) => {

  let alumniStartIndex = pageIndex * 10;
  let alumniEndIndex = alumniStartIndex + 10;

  var dataLength = alumniArray.length;
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



// add alumni list
const tbody = document.getElementsByTagName('tbody')[0];
tbody.innerHTML = "";
 var alumni=alumniArray;
  for (
    let i = alumniStartIndex;i < alumniEndIndex && i < alumniArray.length;i++) {
  let tr = document.createElement('tr');
  let td = document.createElement('td');
  let div = document.createElement('div');
  div.setAttribute('class', 'custom-control custom-checkbox text-center');

  let input = document.createElement('input');
  input.setAttribute('type', 'checkbox');
  input.setAttribute('class', 'custom-control-input');
  input.setAttribute('id', 'id-' + alumni[i].alumniId);

  let label = document.createElement('label');
  label.setAttribute('class', 'custom-control-label');
  label.setAttribute('for', 'id-' + alumni[i].alumniId);

  div.appendChild(input);
  div.appendChild(label);
  td.appendChild(div);
  tr.appendChild(td);

  // avatar column
  td = document.createElement('td');
  td.innerHTML = `<div style="aspect-ratio:1/1; height:100px; margin-left:10px;margin-right:auto;overflow:hidden">
    <img class='table__td--height' src=${alumni[i].imageId}>
  </div>`
  td.setAttribute('width', '140px')
  tr.appendChild(td);

  // name column
  td = document.createElement('td');
  td.innerHTML = `<p id=${i} class="alumniName">${alumni[i].name}</p>`
  td.setAttribute('class', 'eventTitle');
  tr.appendChild(td);

  // department column
  td = document.createElement('td');
  let span = document.createElement('span');
  span.innerHTML = alumni[i].department;
  td.appendChild(span);
  tr.appendChild(td);

  // status column
  td = document.createElement('td');
  div = document.createElement('div');
  div.setAttribute('class', 'text-black rounded p-1');

  if (alumni[i].approvedBy === "") {
    div.classList.add('bg-danger')
    div.innerText = 'Pending Approval';
  } else {
    div.classList.add('bg-success')
    div.innerText = 'Approved';
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
  a.innerHTML = `<a href="#" role="button" id="${i}" value="Delete Row" onclick="deleteByJquery(this)" >
  <i class="far fa-trash-alt fa-3x pl-2 text-danger" aria-hidden="true" style="font-size: 35px">
  </i></a>`;
  td.appendChild(a);
  tr.appendChild(td);
  tbody.appendChild(tr);
}
// )
;

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
      $("#accStatus").text("Pending Approval");
    } else {
      $("#accStatus").text("Approved");
    }
    if (alumniArray[e.target.id].approvedBy !== "") {
      document.getElementById("approve").disabled = true;
    }else{
      document.getElementById("approve").disabled = false;
    }
    $('#exampleModal').modal("show");
  }
  )
})
checkbox();
if(alumniArray.length==0){
  document.getElementById("nextPage").innerHTML ='';
document.getElementById("previousPage").innerHTML = '';
document.getElementsByClassName("pages")[0].innerHTML = '';
}
}
const checkbox = () => {
  $(document).ready(function () {
  $('.custom-control-input').on("change", function () {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    var count=0;
    var i;
    for (i = 1; i < checkboxes.length; i++) {
      if(checkboxes[i].checked){
        count++
      }
    }
    if(count==checkboxes.length-1){
      checkboxes[0].checked = true;
    }else if(count !=checkboxes.length-1){
      checkboxes[0].checked = false;
    }
  });
});
}
reload(alumniArray,pageIndex);


window.approve = function(){
  $('#exampleModal').modal("show");
  var $name = document.getElementById("input1").value;
var $status = $('#status').find("option:selected").val();
var $department = $('#department').find("option:selected").val();

if($('#department').find("option:selected").val()=="All"){
  $department="";
}
$.ajax({
  type: "POST",
  url: '/admin/approveAlumni',
  data: {alumniId: localStorage.getItem("alumniId")},
  success:  function(data)
  { 
    $('#exampleModal').modal("hide");
    $.ajax({
      type: "POST",
      url: '/admin/searchAlumniName',
      data: {name: $name, department:$department, status:$status},
      success:  function(data)
      { 
        var outputList = JSON.parse(data);
        alumniArray = outputList;
        reload(outputList,pageIndex);
        checkbox();
        if(alumniArray.length==0){
          document.getElementById("pagination")=``;
        }
      }
    })
  }
});
}

var searchBar=document.getElementById('searchBar');
searchBar.addEventListener('click',(e)=>{
  e.preventDefault();
  var $name = document.getElementById("input1").value;
  var $status = $('#status').find("option:selected").val();
  var $department = $('#department').find("option:selected").val();
 
  if($('#department').find("option:selected").val()=="All"){
    $department="";
  }
  $.ajax({
    type: "POST",
    url: '/admin/searchAlumniName',
    data: {name: $name, department:$department, status:$status},
    success:  function(data)
    { 
      if(data.length== 2){
        insertSearchNoResult( document.getElementById("searchNotFound"));
      }else{
        document.getElementById("searchNotFound").innerHTML=``
      }
      var outputList = JSON.parse(data);
      alumniArray = outputList;
      pageIndex=0;
      reload(outputList,pageIndex);
      checkbox();
    }
});

  e.preventDefault();
})



window.getAlumniId = function(){
  return localStorage.getItem("alumniId");
}

//select all check box
window.toggle = function (source) {
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i] != source)
      checkboxes[i].checked = source.checked;
  }
}


window.deleteByJquery= function (o){
  event.preventDefault();
  $('#deleteModal').modal("show");
  event.preventDefault();
  var findId = o.id.split(" ");
  var $deleteAlumniId=alumniArray[findId].alumniId;
  localStorage.setItem('alumniId', $deleteAlumniId);
}
  var deleteButton=document.getElementById('deleteButton');
  deleteButton.addEventListener('click',()=>{
  event.preventDefault();
  var $name = document.getElementById("input1").value;
  var $status = $('#status').find("option:selected").val();
  var $department = $('#department').find("option:selected").val();
  
  if($('#department').find("option:selected").val()=="All"){
    $department="";
  }
$.ajax({
                    type: "POST",
                    url: '/admin/deleteAlumni',
                    data: {deleteAlumniId: localStorage.getItem('alumniId')},
                    success:  function(data)
                    { 
                      $.ajax({
                        type: "POST",
                        url: '/admin/searchAlumniName',
                        data: {name: $name, department:$department, status:$status},
                        success:  function(data)
                        { 
                          var outputList = JSON.parse(data);
                          alumniArray = outputList;
                          reload(outputList,pageIndex);
                          checkbox();
                        }
                      })
                    }
        });
})



var searchBar=document.getElementById('searchBar');
$("#status,#department").on("change", function () {
  var $name = document.getElementById("input1").value;
  var $status = $('#status').find("option:selected").val();
  var $department = $('#department').find("option:selected").val();
  
  if($('#department').find("option:selected").val()=="All"){
    $department="";
  }
  $.ajax({
    type: "POST",
    url: '/admin/searchAlumniName',
    data: {name: $name, department:$department, status:$status},
    success:  function(data)
    { 
      if(data.length== 2){
        insertSearchNoResult( document.getElementById("searchNotFound"));
      }else{
        document.getElementById("searchNotFound").innerHTML=``
      }
      var outputList = JSON.parse(data);
      alumniArray = outputList;
      pageIndex=0;
      reload(outputList,pageIndex);
      checkbox();
    }
});
})

//clearAll
$("#clearAll").on("click", function (e) {
  $('#department option').prop('selected', function () {
    e.preventDefault();
    return this.defaultSelected;
  });
  $('#status option').prop('selected', function () {
    e.preventDefault();
    return this.defaultSelected;
  });
  
  var $name = document.getElementById("input1").value;
  var $status = $('#status').find("option:selected").val();
  var $department = $('#department').find("option:selected").val();
  
  if($('#department').find("option:selected").val()=="All"){
    $department="";
  }
  $.ajax({
    type: "POST",
    url: '/admin/searchAlumniName',
    data: {name: $name, department:$department, status:$status},
    success:  function(data)
    { 
      var outputList = JSON.parse(data);
      alumniArray = outputList;
      pageIndex=0;
      document.getElementById("searchNotFound").innerHTML=``
      reload(outputList,pageIndex);
      checkbox();
    }
  // e.preventDefault();
})
});

window.deleteCheckedRow = function(){
  event.preventDefault();
    $('#deleteModal').modal("show");
  var $alumniId = [];
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  if(document.querySelectorAll(':checked').length-2 !== 0){
    for (var i = checkboxes.length-1; i > 0; i--) {
      if(checkboxes[i].checked){
        var alumniId= alumniArray[i-1].alumniId;
      $alumniId.push(alumniId);
      }
  }
    $alumniId=$alumniId.toString();
    localStorage.setItem('alumniId',$alumniId)
}
var deleteButton=document.getElementById('deleteButton');
    deleteButton.addEventListener('click',()=>{
    var $name = document.getElementById("input1").value;
  var $status = $('#status').find("option:selected").val();
  var $department = $('#department').find("option:selected").val();
  
  if($('#department').find("option:selected").val()=="All"){
    $department="";
  }
    $.ajax({
      type: "POST",
      url: '/admin/deleteMultipleAlumni',
      data: {listOfDeleteAlumniId: localStorage.getItem("alumniId")},
      success:  function(data)
      { 
        checkboxes[0].checked = false;
        $.ajax({
          type: "POST",
          url: '/admin/searchAlumniName',
          data: {name: $name, department:$department, status:$status},
          success:  function(data)
          { 
            var outputList = JSON.parse(data);
            alumniArray = outputList;
            reload(outputList,pageIndex);
            checkbox();
          }
        })
      }
    });
  })
}

reload(alumniArray,pageIndex);

window.nextPage = function () {
  pageIndex++;
  reload(alumniArray,pageIndex);
  window.scrollTo(0, 0);
};
window.previousPage = function () {
  pageIndex--;
  reload(alumniArray,pageIndex);
  window.scrollTo(0, 0);
};
