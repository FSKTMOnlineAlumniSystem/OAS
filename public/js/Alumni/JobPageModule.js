

function loadJobList(pageIndex, outputList) {
  const jobList = document.getElementById("jobList");
  jobList.innerHTML = "";
  let jobStartIndex = pageIndex * 9;
  let jobEndIndex = jobStartIndex + 9;
  var dataLength = outputList.length;
  var remainingLength = dataLength - jobStartIndex;

  /*   create  button*/
  if(outputList.length === 0){
    document.getElementById(
      "no_result"
    ).innerHTML = `<h2>Sorry, there is no result.</h3>`;
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
  // ../src/Domain/Job/JobDetailsPage.php?id=${outputList[i].jobId}
  //id=${outputList[i].jobId}
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
                <small class="text-muted">Posted : ${getFormattedDate(outputList[i].postedDateTime)} </small>
              </div>
           
            </div>
          </a>
        </div>`;
       
  }
  // ${getReadableTime(eventArray[i].dateTime)}
 
  // ../src/Job/JobDetailsPage.php?id=${outputList[i].jobId}\

  //CLICK TO LINK TO JOBDETAILSPAGE
  // $("#jobList").on("click", ".card ", function () {
  //   var jobName = $(this).attr("data-name");
  //   // var myJobList = [];
  //   for (let i = 0; i < outputList.length; i++) {
  //     if (outputList[i].jobId == jobName) {
  //       // myJobList.push(outputList[i]);
  //       // localStorage.setItem("JobList", JSON.stringify(myJobList));
  //       // document.location.href = '<?php echo $../Job/JobDetailsPage.php ?>';
  //       window.open('../Job/JobDetailsPage.php?id=$outputList[i].jobId');
  //       // console.log('as');
  //       break;
  //     }
  //   }
  // });
}

//Search
$('#search-button').click(function(){
  var search = document.getElementById("search_item").value;
  if (search == "") {
    alert("Name must be filled out");
  }
  console.log("pls"+search);
  $.ajax({
    url: 'searchAllJob',
    type: 'post',
    // contentType: "application/json",
    // dataType : 'html',
    data: {search: search},
    // dataType:"json",
    success: function(resp){
     console.log("success");
    //  console.log(search);
    // console.log(resp);
    let page = 0;
    var jobtList =JSON.parse(resp);
 
     loadJobList(page,jobtList);
    
     //  var jobsearch = JSON.parse(resp);
    //   console.log(jobsearch);
    },
    
    // dataType : "json"
     
  });

});


export default loadJobList;
