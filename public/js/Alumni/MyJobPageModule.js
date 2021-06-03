// import { dummyResponse, updateDummyData } from "../dummydata.js";

//PASS IN THE FUNCTION
// var image = image_array;
// console.log(image);

// function test(){
//     const searchBarSection = document.createElement("div");
// searchBarSection.setAttribute("class", "searchBarBG");
// searchBarSection.innerHTML = `<form class="search-form" action="myjob">
// <div class="containerSB">
//   <div class="row no-gutters" style="white-space: nowrap">
//     <div class="col-lg-3 col-md-3 col-sm-12 p-0"></div>
//     <div class="col-lg-6 col-md-6 col-sm-12 p-0 input-group">
//       <input type="search" placeholder="Search..." class="form-control" id="search_item" name="search"/>
//       <div class="input-group-append">
//         <button type="submit" id="search-button" name="search_submit" class="btn btn-secondary">
//           <i class="fas fa-search"></i>
//         </button>
//       </div>
//     </div>
//   </div>
// </div>
// </form>`;
// document.body.insertBefore(
//   searchBarSection,
//   document.getElementById("main-body")
// );
// }

function loadMyJobList(pageIndex, outputList, count) {

  // const alumniID = localStorage.getItem("SignedInAlumniId");
//   const searchBarSection = document.createElement("div");
// searchBarSection.setAttribute("class", "searchBarBG");
// searchBarSection.innerHTML = `<form class="search-form" action="myjob">
// <div class="containerSB">
//   <div class="row no-gutters" style="white-space: nowrap">
//     <div class="col-lg-3 col-md-3 col-sm-12 p-0"></div>
//     <div class="col-lg-6 col-md-6 col-sm-12 p-0 input-group">
//       <input type="search" placeholder="Search..." class="form-control" id="search_item" name="search"/>
//       <div class="input-group-append">
//         <button type="submit" id="search-button" name="search_submit" class="btn btn-secondary">
//           <i class="fas fa-search"></i>
//         </button>
//       </div>
//     </div>
//   </div>
// </div>
// </form>`;
// document.body.insertBefore(
//   searchBarSection,
//   document.getElementById("main-body")
// );
  
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
    document.getElementById(
      "no_result"
    ).innerHTML = `<h2>Sorry, there is no result.</h3>`;
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
  // var search = document.getElementById("search_item").value;
  // var search = document.forms['search-form']["search"].value;
  // if (search == "") {
  //   alert("Name must be filled out");
  // }
  // console.log(search);

  //CLICKING THE TRASH ICON
  clickButton.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      deleteID = e.currentTarget.id;
      $(`#deleteModal`).modal("show");
    });
  });

  //CLICK ON THE "DELETE" BUTTON IN CONFIMARTION MODAL
  // deleteButton.addEventListener("click", function (e) {
    // $(document).on("click",".delete-btn",function(){  
      // $('.delete').click(function(){



$('#deleteButton').click(function(){
  $.ajax({
    url: 'deleteJobController.php',
    type: 'post',
    // contentType: "application/json",
    // dataType : 'JSON',
    data: {ajax : 1, deleteID: deleteID},
    success: function(resp){
      //  window.location.reload();
      let page = 0;
      var outputList = JSON.parse(resp);
      console.log(outputList);
      // console.log(resp);
      // console.log(JSON.parse(resp));
      // console.log(counts)
      // var check = false;
     
      loadMyJobList(page,outputList,outputList.length);
      // $('#jobList').html(resp);
    },
    // dataType : "json"
     
  });

closeModal("#deleteModal")
});



//Search
$('#search-button').click(function(){
  var search = document.getElementById("search_item").value;
  if (search == "") {
    alert("Name must be filled out");
  }
  console.log("pls"+search);
  $.ajax({
    url: 'searchJob',
    type: 'post',
    // contentType: "application/json",
    // dataType : 'html',
    data: {search: search},
    // dataType:"json",
    success: function(resp){
     console.log("success");
    //  console.log(search);
    let page = 0;
    outputList =JSON.parse(resp);
    //  console.log(JSON.parse(outputList));
    // console.log(resp);
     console.log(outputList.length);
     if(outputList.length===0){
      loadMyJobList(page,outputList,-1);
    }else{
     loadMyJobList(page,outputList,outputList.length);
    }
     //  var jobsearch = JSON.parse(resp);
    //   console.log(jobsearch);
    },
    
    // dataType : "json"
     
  });

});
   

  //CLOSE THE MODAL
  function closeModal(modalId) {
    $(modalId).modal("hide");
  }

  //CLICK ON THE CLOSE BUTTON OF THE CONFIRMATION MODAL
  if (closeDeleteModalButton) {
    closeDeleteModalButton.addEventListener("click", () =>
      closeModal("#deleteModal")
    );
  }

  //CLICK ON THE CARDS WHICH WILL LINK TO MYJOBDETAILS PAGE
  // $("#jobList").on("click", ".card ", function () {
  //   var jobName = $(this).attr("data-name");
  //   var myJobList = [];
  //   for (let i = 0; i < outputList.length; i++) {
  //     if (outputList[i].jobId == jobName) {
  //       myJobList.push(outputList[i]);
  //       localStorage.setItem("MyJobList", JSON.stringify(myJobList));
  //       break;
  //     }
  //   }
  // });
}

export default loadMyJobList;
