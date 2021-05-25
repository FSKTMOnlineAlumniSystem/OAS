// import { dummyResponse, updateDummyData } from "../dummydata.js";

//PASS IN THE FUNCTION
function loadMyJobList(pageIndex, outputList, count) {
  // const alumniID = localStorage.getItem("SignedInAlumniId");
  const jobList = document.getElementById("jobList");
  jobList.innerHTML = "";
  let jobStartIndex = pageIndex * 9;
  let jobEndIndex = jobStartIndex + 9;
  var dataLength = count;
  var remainingLength = dataLength - jobStartIndex;

  /*   create button*/
  if (count != 0) {
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
  } else {
    document.getElementById(
      "top"
    ).innerHTML = `<h3>Empty list! Please add new job addvertisement!!</h3>`;
    document.getElementById("nextPage").innerHTML = "";
    document.getElementsByClassName("pages")[0].innerHTML = "";
    document.getElementById("previousPage").innerHTML = "";
    return;
  }

  //LOAD THE JOBLIST BASED ON DUMMYDATA
  for (let i = jobStartIndex; i < outputList.length; i++) {
        document.getElementById("jobList").innerHTML += `
          <div class="col mb-4">
            <div class="card h-100" data-name=${outputList[i].jobId}> 
              <a href="myjobdetails?myjobid=${outputList[i].jobId}">
                <div class="w-100">
                  <img class="w-100" src="../../../Assets/imgs/${outputList[i].imageId}" class="card-img-top" alt="jobPhoto">
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

//var dataToPost = { country: 2, amount: 4.02 };
//data: JSON.stringify(dataToPost),

$('#deleteButton').click(function(){
  $.ajax({
    url: 'myjob',
    type: 'post',
    data: {ajax : 1, deleteID: deleteID},
    success: function(){
       window.location.reload();
      //  console.log($outputList);
      // loadMyJobList(0,myJob_array,0);
    }
     
  });

closeModal("#deleteModal")


});


   


    // for (let i = 0; i < outputList.length; i++) {
    //   if (outputList[i].jobId == deleteID) {
    //     outputList.splice(i, 1);
    //     count--;
    //     dummyResponse.Job = outputList;
    //     updateDummyData(dummyResponse);
    //     closeModal(`#deleteModal`);
    //     loadMyJobList(pageIndex, outputList, count);
    //   }
    // }
    // console.log("close");
    // console.log(deleteID);
  // });

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
