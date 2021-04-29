import { dummyResponse, updateDummyData } from "../dummydata.js";



function loadJobList (pageIndex, outputList,count) {

    const alumniID = localStorage.getItem('SignedInAlumniId');
    const jobList = document.getElementById('jobList');
    jobList.innerHTML = "";
    let jobStartIndex = pageIndex * 9;
    let jobEndIndex = jobStartIndex + 9;
    var dataLength = count;
    var remainingLength = dataLength - jobStartIndex;

    /*   js for button*/
    if(count!=0){
    if (jobEndIndex >=count) {
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
                <button onclick="previousPage()" class="page-link">Previous</button>
              </li>`;
      }
      // js for 1,2,3
      if (remainingLength <= 10) {
        console.log("<=10");
        document.getElementsByClassName("pages")[0].innerHTML = `
                <li class="page-item disabled">
                <button class="btn btn-link page-link" tabindex="-1" aria-disabled="true">${
                  pageIndex + 1
                }</button>
                </li>`;
      } else if (remainingLength <= 20) {
        console.log("<=20");
        document.getElementsByClassName("pages")[0].innerHTML = `
                <li class="page-item disabled">
                <button class="btn btn-link page-link" tabindex="-1" aria-disabled="true">${
                  pageIndex + 1
                }</button>
                </li>
                <li class="page-item" ><button class="btn btn-link page-link" onclick="nextPage()">${
                  pageIndex + 2
                }</button></li>`;
      } else {
        console.log("<=30");
        document.getElementsByClassName("pages")[0].innerHTML = `
                <li class="page-item disabled">
                <button class="btn btn-link page-link page-link" tabindex="-1" aria-disabled="true ">${
                  pageIndex + 1
                }</button>
                </li>
                <li class="page-item" ><button class="btn btn-link page-link" onclick="nextPage()">${
                  pageIndex + 2
                }</button ></li>
                <li class="page-item" ><button class="btn btn-link page-link" onclick="nextPage();nextPage()">${
                  pageIndex + 3
                }</button></li>`;
      }
    }else{
      document.getElementById('top').innerHTML = 
      `<h3>Empty list! Please add new job addvertisement!!</h3>`;
      document.getElementById("nextPage").innerHTML = "";
      document.getElementsByClassName("pages")[0].innerHTML = "";
      document.getElementById("previousPage").innerHTML = "";
    }

    for (let i = jobStartIndex;  i < outputList.length ; i++) {

        if(outputList[i].alumniId == alumniID){
            if(outputList[i].imageId == null){
                document.getElementById('jobList').innerHTML +=
                `<div class="col mb-4">
                <div class="card h-100" data-name=${outputList[i].jobId}>
                <a href="../../html/Alumni/MyJobDetailsPage.html" >
                <div class="w-100">
                <img src="${outputList[i].imgaeUrl}" id="image" class="card-img-top">
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
                </div></a>
                <div class="card-footer mt-auto">
                <button type="button" class="clickButton close" role="button" aria-pressed="true" ><i class="far fa-trash-alt"></i></button>  
                </div></div><div>
                <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="deleteModalLabel">Confirmation</h5>
                <button id="closeDeleteModalButton" type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body">
                Are you sure you want to delete this job advertisement?
                </div>
                <div class="modal-footer">
                <button id="deleteButton" data-name=${outputList[i].jobId} type="button" class="btn btn-primary" data-dismiss="modal">Yes, delete it.</button>
                </div>
                </div>
                </div>
                </div>`;
    }
            else{
              console.log(outputList[i].jobId);
                document.getElementById('jobList').innerHTML +=
                `<div class="col mb-4">
                 <div class="card h-100" data-name=${outputList[i].jobId}> 
                 <a href="../../html/Alumni/MyJobDetailsPage.html">
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
                </div></a>
                <div class="card-footer mt-auto">
                <button type="button" class="clickButton close" role="button" aria-pressed="true"><i class="far fa-trash-alt"></i></button>  
                </div></div><div>
                
                <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="deleteModalLabel">Confirmation</h5>
                <button id="closeDeleteModalButton" type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body">
                Are you sure you want to delete this job advertisement?
                </div>
                <div class="modal-footer">
                <button id="deleteButton" data-name=${outputList[i].jobId} type="button" class="btn btn-primary" data-dismiss="modal">Yes, delete it.</button>
                </div>
                </div>
                </div>
                </div>`;      
            }
        }
    }


const deleteButton = document.getElementById("deleteButton");
const closeDeleteModalButton = document.querySelector('#closeDeleteButton');
const clickButton = document.querySelector('.clickButton');


clickButton.addEventListener("click", function(){
  // var name = e.target.dataset.name;
  //  name = e.getA;
  // console.log('first click'+ e.target.dataset.name)
  $('#deleteModal').modal('show');
});

   
if(closeDeleteModalButton){
closeDeleteModalButton.addEventListener('click', () => closeModal('#deleteModal'));
}

if(deleteButton){
deleteButton.addEventListener('click', function deleteButton(e){
  console.log('delete')
  console.log(e.target.dataset.name)
    for (let i = 0; i < outputList.length; i++) {
        if (outputList[i].jobId == e.target.dataset.name) {
            outputList.splice(i, 1);
            count--;
            dummyResponse.Job = outputList;
            updateDummyData(dummyResponse);
            closeModal('#deleteModal');
            console.log(count)
            loadJobList(pageIndex,outputList,count);
        }      
    }
});
}


function closeModal(modalId) {
    $(modalId).modal('hide');
}

  //CLICK
  $("#jobList").on("click", ".card ", function () {
    var jobName = $(this).attr("data-name");
    var myJobList = [];
    console.log(jobName);
    for (let i = 0; i < outputList.length; i++) {
      if (outputList[i].jobId == jobName) {
        console.log("click");
        myJobList.push(outputList[i]);
        localStorage.setItem("MyJobList", JSON.stringify(myJobList));
        break;
      }
    }
  });


};


export default loadJobList;