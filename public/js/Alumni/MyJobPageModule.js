
function loadMyJobList(pageIndex, outputList, count) {
  const jobList = document.getElementById("jobList");
  jobList.innerHTML = "";
  let jobStartIndex = pageIndex * 9;
  let jobEndIndex = jobStartIndex + 9;
  var dataLength = count;
  var remainingLength = dataLength - jobStartIndex;

  /*   create button*/
  if (count > 0) {
    if (jobEndIndex >= count) {
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
          <button onclick="previousPage()" class="page-link">Previous</button>
        </li>`;
    }
    // js for 1,2,3
    if (remainingLength <= 10) {
      document.getElementsByClassName("pages")[0].innerHTML = `
        <li class="page-item disabled">
          <button class="btn btn-link page-link" tabindex="-1" aria-disabled="true">${
            pageIndex + 1
          }</button>
        </li>`;
    } else if (remainingLength <= 20) {
      document.getElementsByClassName("pages")[0].innerHTML = `
        <li class="page-item disabled">
          <button class="btn btn-link page-link" tabindex="-1" aria-disabled="true">${
            pageIndex + 1
          }</button>
        </li>
        <li class="page-item" >
          <button class="btn btn-link page-link" onclick="nextPage()">${
            pageIndex + 2
          }</button>
        </li>`;
    } else {
      document.getElementsByClassName("pages")[0].innerHTML = `
        <li class="page-item disabled">
          <button class="btn btn-link page-link page-link" tabindex="-1" aria-disabled="true ">${
            pageIndex + 1
          }</button>
        </li>
        <li class="page-item" >
          <button class="btn btn-link page-link" onclick="nextPage()">${
            pageIndex + 2
          }</button >
        </li>
        <li class="page-item" >
          <button class="btn btn-link page-link" onclick="nextPage();nextPage()">${
            pageIndex + 3
          }</button>
        </li>`;
    }
  } else if (count===-1){
    insertSearchNoResult(document.getElementById("no_result"));
    document.getElementById("nextPage").innerHTML = "";
    document.getElementsByClassName("pages")[0].innerHTML = "";
    document.getElementById("previousPage").innerHTML = "";
    return;
    
  }else {
    document.getElementById(
      "top"
    ).innerHTML = `<h3>Empty list! Please add new job addvertisement!!</h3>`;
    document.getElementById("nextPage").innerHTML = "";
    document.getElementsByClassName("pages")[0].innerHTML = "";
    document.getElementById("previousPage").innerHTML = "";
    return;
  }

  //LOAD THE JOBLIST BASED ON DUMMYDATA
  document.getElementById("top").innerHTML="";
  document.getElementById("no_result").innerHTML="";
  for (let i = jobStartIndex; i < outputList.length; i++) {
        document.getElementById("jobList").innerHTML += `
          <div class="col mb-4">
          <a href="myjobdetails?myjobid=${outputList[i].jobId}">
            <div class="card h-100" data-name=${outputList[i].jobId}> 
             
                <div class="w-100">
                  <img class="w-100" src="${outputList[i].imageId}" class="card-img-top" alt="jobPhoto">
                </div>
                <div class="card-body">
                  <h5 class="card-title">${outputList[i].company} - ${outputList[i].title}</h5>
                  <p class="card-text">
                    <div class="row cards">
                      <div class="col-1"><span><i class="fas fa-map-marked-alt fa-lg"></i></span></div>
                      <div class="col-7">${outputList[i].location}</div>
                    </div>
                    <div class="row cards">
                      <div class="col-1"><span><i class="fas fa-sack-dollar fa-lg"></i></span></div>
                      <div class="col-7">RM ${outputList[i].salary}</div>
                    </div>
                  </p>
                </div>
              </a>
              <div class="card-footer mt-auto">
              <small class="text-muted">Last updated : ${getDifference(outputList[i].postedDateTime)} </small>
                <button type="button" class="clickButton close" id=${outputList[i].jobId} role="button" aria-pressed="true"><i class="far fa-trash-alt"></i></button>  
              </div>
            </div>
          </div>`;
      }
  

  const deleteButton = document.querySelector("#deleteButton");
  const closeDeleteModalButton = document.querySelector("#closeDeleteModalButton");
  const clickButton = document.querySelectorAll(".clickButton");
  var deleteID;


  //CLICKING THE TRASH ICON
  $(document).ready(function(){
    jQuery.noConflict();
  clickButton.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
     
      deleteID = e.currentTarget.id;

      $.ajax({
        url: 'test.php',
        type: 'post',
        data: {modal: 1},
        success: function(response){ 
          // Display Modal
          console.log("sucess");
          console.log(response);
          jQuery(`#deleteModal`).modal("show");
        },
        error: function(){
          console.log('fail');
          $(`#deleteModal`).modal("show");
        }
      });
     
    });

  });
});

//jQuery.parseJSON(response.data);
// // AJAX request
// $.ajax({
//   url: 'ajaxfile.php',
//   type: 'post',
//   data: {userid: userid},
//   success: function(response){ 
//     // Add response in Modal body
//     $('.modal-body').html(response);

//     // Display Modal
//     $('#empModal').modal('show'); 
//   }
// });



$('#deleteButton').click(function(){
  var searchDelete = document.getElementById("search_item").value;
  jQuery.noConflict();
  $.ajax({
    url: 'deleteJobController.php',
    type: 'post',
    data: {searchdeleted : searchDelete, deleteID: deleteID},
    success: function(resp){
      let page = 0;
      var outputLists = JSON.parse(resp);
      loadMyJobList(page,outputLists,outputLists.length);
    },
     
  });

closeModal("#deleteModal");
});



//Search
$('#search-button').click(function(){
  var search = document.getElementById("search_item").value;
  if (search == "") {
    alert("Name must be filled out");
  }

  $.ajax({
    url: 'searchJob',
    type: 'post',
    data: {search: search},
    success: function(resp){
    let page = 0;
 
    outputList =JSON.parse(resp);
     if(outputList.length===0){
      loadMyJobList(page,outputList,-1);
    }else{
     loadMyJobList(page,outputList,outputList.length);
    }
    },
     
  });

});
   

  //CLOSE THE MODAL
  function closeModal(modalId) {
    jQuery(modalId).modal("hide");
  }

  //CLICK ON THE CLOSE BUTTON OF THE CONFIRMATION MODAL
  if (closeDeleteModalButton) {
    closeDeleteModalButton.addEventListener("click", () =>
      closeModal("#deleteModal")
    );
  }

}

export default loadMyJobList;
