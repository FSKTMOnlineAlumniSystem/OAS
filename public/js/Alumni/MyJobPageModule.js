
var pageIndex = 0;
var outputList;
var deleteID;
outputList = myJob_array;
console.log("connect");

const loadMyJobList = (pageIndex, outputList)=>{
  const jobList = document.getElementById("jobList");
  jobList.innerHTML = "";
  let jobStartIndex = pageIndex * 9;
  let jobEndIndex = jobStartIndex + 9;
  var dataLength = outputList.length;
  var remainingLength = dataLength - jobStartIndex;
 
  console.log(outputList);
  /*   create button*/
 if(outputList.length === 0){
    document.getElementById("no_result").innerHTML="";
    document.getElementById(
      "top"
    ).innerHTML = `<h3>Empty list! Please add new job addvertisement!!</h3>`;
    document.getElementById("nextPage").innerHTML = "";
    document.getElementsByClassName("pages")[0].innerHTML = "";
    document.getElementById("previousPage").innerHTML = "";
    return;
  }else {

  document.getElementById("no_result").innerHTML="";
    if (jobEndIndex >= outputList.length) {
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
    if (remainingLength <= 9) {
      document.getElementsByClassName("pages")[0].innerHTML = `
        <li class="page-item disabled">
          <button class="btn btn-link page-link" tabindex="-1" aria-disabled="true">${
            pageIndex + 1
          }</button>
        </li>`;
    } else if (remainingLength <= 18) {
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


  //LOAD THE JOBLIST BASED ON DUMMYDATA 
  document.getElementById("top").innerHTML="";
  document.getElementById("no_result").innerHTML="";
  console.log(outputList.length, "asas");
  for (let i = jobStartIndex; i < jobEndIndex && i < outputList.length; i++) {
        document.getElementById("jobList").innerHTML += `
          <div class="col-12 col-sm-6 col-md-4  mb-4">
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
    }


  const closeDeleteModalButton = document.querySelector("#closeDeleteModalButton");
  const clickButton = document.querySelectorAll(".clickButton");
 


  //CLICKING THE TRASH ICON
  $(document).ready(function(){
    jQuery.noConflict();
  clickButton.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
     
      deleteID = e.currentTarget.id;

      $.ajax({
        url: 'deleteJobController.php',
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

}


$('#deleteButton').click(function(){
  var searchDelete = document.getElementById("search_item").value;
  jQuery.noConflict();
  $.ajax({
    url: 'deleteJobController.php',
    type: 'post',
    data: {searchdeleted : searchDelete, deleteID: deleteID},
    success: function(resp){
      pageIndex = 0;
     outputList = JSON.parse(resp);
      loadMyJobList(pageIndex,outputList);
    },
     
  });

closeModal("#deleteModal");
});


const searchButton = document.getElementById('search-button');
var searchInput = document.getElementById('search_item');

//Search
const handleMyJobSearch = evt =>{
  var search = document.getElementById("search_item").value;
  var jobList;
  $.ajax({
    url: 'searchJob',
    type: 'post',
    data: {search: search},
    success: function(resp){
    pageIndex = 0;
 
    jobList =JSON.parse(resp);
    outputList = jobList;
     if(outputList.length===0){
       console.log("search");
      document.getElementById("top").innerHTML="";
      insertSearchNoResult(document.getElementById("no_result"));
      document.getElementById("nextPage").innerHTML = "";
      document.getElementsByClassName("pages")[0].innerHTML = "";
      document.getElementById("previousPage").innerHTML = "";
      document.getElementById("jobList").innerHTML = "";
      return;
    }else{
      console.log(jobList.length);
     loadMyJobList(pageIndex,jobList);
    }
    },
     
  });

}


searchButton.addEventListener('click',handleMyJobSearch);
searchInput.addEventListener('keypress', (evt)=>{
  if(evt.key === 'Enter'){
    handleMyJobSearch(evt);
  }
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



window.nextPage = function () {
  pageIndex++;
  console.log(outputList + "hihi");
  loadMyJobList(pageIndex, outputList);
};

//CLICK PREVIOUS PAGE
window.previousPage = function () {
  pageIndex--;
  loadMyJobList(pageIndex, outputList);
};

loadMyJobList(pageIndex,outputList);
