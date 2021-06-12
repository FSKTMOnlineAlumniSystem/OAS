


function loadJobList(pageIndex, outputList) {
  const jobList = document.getElementById("jobList");
  jobList.innerHTML = "";
  let jobStartIndex = pageIndex * 9;
  let jobEndIndex = jobStartIndex + 9;
  var dataLength = outputList.length;
  var remainingLength = dataLength - jobStartIndex;

  /*   create  button*/
  if(outputList.length === 0){
    insertSearchNoResult(document.getElementById("no_result"));
    document.getElementById("nextPage").innerHTML = "";
    document.getElementsByClassName("pages")[0].innerHTML = "";
    document.getElementById("previousPage").innerHTML = "";
    return;
  }

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

  document.getElementById("no_result").innerHTML="";
  for (let i = jobStartIndex; i < jobEndIndex && i < outputList.length; i++) {
      document.getElementById("jobList").innerHTML += `
        <div class="col mb-4">
          <a href="jobdetails?jobid=${outputList[i].jobId}">
            <div class="card h-100" data-name=${outputList[i].jobId}>
              <div class="w-100">
                  <img class="w-100" src="${outputList[i].imageId}" class="card-img-top" alt="jobPhoto">
              </div>
              <div class="card-body">
                <h5 class="card-title">${outputList[i].title}</h5>
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
                <small class="text-muted">Last updated : ${getDifference(outputList[i].postedDateTime)} </small>
              </div>
           
            </div>
          </a>
        </div>`;
       
       
  }
  
}

const searchButton = document.getElementById('search-button');
var searchInput = document.getElementById('search_item');
  
const handleJobSearch = evt =>{
  var search = document.getElementById("search_item").value;
  if (search == "") {
    alert("Hi, type something to search!");
  }
  console.log("pls"+search);
  $.ajax({
    url: 'searchAllJob',
    type: 'post',
    data: {search: search},
    success: function(resp){
     console.log("success");

    let page = 0;
    var jobtList =JSON.parse(resp);
 
     loadJobList(page,jobtList);
    },
     
  });
}


searchButton.addEventListener('click',handleJobSearch);
searchInput.addEventListener('keypress', (evt)=>{
  if(evt.key === 'Enter'){
    handleJobSearch(evt);
  }
});

export default loadJobList;
