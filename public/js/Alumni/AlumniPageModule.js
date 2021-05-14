const imgPath = "../../../Assets/imgs/";

function loadAlumniList(pageIndex, outputList) {
  const alumniList = document.getElementById("alumniList");
  alumniList.innerHTML = "";
  // we set page content limit to 10
  let alumniStartIndex = pageIndex * 10;
  let alumniEndIndex = alumniStartIndex + 10;

  var dataLength = outputList.length;
  var remainingLength = dataLength - alumniStartIndex;
  /*   This is pages button for button*/
  if (alumniEndIndex >= outputList.length) {
    document.getElementById("nextPage").innerHTML = `
      <li class="page-item disabled">
        <button id="nextPage"  onclick="nextPage()" class="page-link" tabindex="-1" aria-disabled="true">Next</button>
      </li>`;
    //This is the last page
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
    // This is the first page
  } else {
    document.getElementById("previousPage").innerHTML = `
      <li class="page-item" id="previousPage">
        <button onclick="previousPage()" class="page-link">Previous</button>
      </li>`;
  }
  // these are for the 1,2,3 pages
  if (remainingLength <= 10) {
    // when pages content <=10
    document.getElementsByClassName("pages")[0].innerHTML = `
      <li class="page-item disabled">
        <button class="btn btn-link page-link" tabindex="-1" aria-disabled="true">${
          pageIndex + 1
        }</button>
      </li>`;
  } else if (remainingLength <= 20) {
    // when pages content <=20
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
    // when pages content <=30
    document.getElementsByClassName("pages")[0].innerHTML = `
      <li class="page-item disabled">
        <button class="btn btn-link page-link page-link" tabindex="-1" aria-disabled="true ">${
          pageIndex + 1
        }</button>
      </li>
      <li class="page-item" >
        <button class="btn btn-link page-link" onclick="nextPage()">${
          pageIndex + 2
        }</button>
      </li>
      <li class="page-item" >
        <button class="btn btn-link page-link" onclick="nextPage();nextPage()">${
          pageIndex + 3
        }</button>
      </li>`;
  }
  alumniList.innerHTML += ` <hr></hr><br>`;
  for (
    let i = alumniStartIndex;
    i < alumniEndIndex && i < outputList.length;
    i++
  ) {
    var index = getindex(outputList[i].alumniId);
    function getindex(onClickAlumniID) {
      // this function get the index of alumni array using alumni ID
      return onClickAlumniID.split("-")[1] - 1;
    }
    alumniList.innerHTML += `
    <div onclick="clickProfile(${index})" class="media justify-content-center mb-2 w-75 p-3" style="background-color:#E9E5E5;">
      <div class="image m-auto col-2 p-3">
        <div style="aspect-ratio:1/1;overflow:hidden;">
          <img src=${imgPath}${outputList[i].imageId} class="w-100" alt=${outputList[i].name}>
        </div>
      </div>
      <div class="media-body mr-3 my-auto col-10">
        <h6 class="mt-0 mb-1">${outputList[i].name}</h6>
        <em class="mb-0">Bachelor of Computer Science (${outputList[i].department}), graduated ${outputList[i].graduated}</em>
        <small style="display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;">${outputList[i].biography}
        </small>
      </div>
    </div>`;
  }
}

export default loadAlumniList;
