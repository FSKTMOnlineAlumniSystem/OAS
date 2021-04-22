import dummyResponse from "../dummydata.js";
console.log("link js");
let pageIndex = 0;
const loadAlumniList = (pageIndex) => {
  let alumniStartIndex = pageIndex * 10;
  let alumniEndIndex = alumniStartIndex + 10;

  var dataLength = dummyResponse.Alumni.length;
  var remainingLength = dataLength - alumniStartIndex;
  /*   js for button*/
  if (alumniEndIndex >= dummyResponse.Alumni.length) {
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
            <button class="btn btn-link page-item" style="text-decoration: none" tabindex="-1" aria-disabled="true">${
              pageIndex + 1
            }</button>
            </li>`;
  } else if (remainingLength <= 20) {
    console.log("<=20");
    document.getElementsByClassName("pages")[0].innerHTML = `
            <li class="page-item disabled">
            <button class="btn btn-link page-item" style="text-decoration: none" tabindex="-1" aria-disabled="true">${
              pageIndex + 1
            }</button>
            </li>
            <li class="page-item" ><button class="btn btn-link" style="text-decoration: none" onclick="nextPage()">${
              pageIndex + 2
            }</button></li>`;
  } else {
    console.log("<=30");
    document.getElementsByClassName("pages")[0].innerHTML = `
            <li class="page-item disabled">
            <button class="btn btn-link page-item" style="text-decoration: none" tabindex="-1" aria-disabled="true">${
              pageIndex + 1
            }</button>
            </li>
            <li class="page-item" ><button class="btn btn-link" style="text-decoration: none" onclick="nextPage()">${
              pageIndex + 2
            }</button ></li>
            <li class="page-item" ><button class="btn btn-link" style="text-decoration: none" onclick="nextPage();nextPage()">${
              pageIndex + 3
            }</button></li>`;
  }

  for (
    let i = alumniStartIndex;
    i < alumniEndIndex && i < dummyResponse.Alumni.length;
    i++
  ) {
    document.getElementById(
      "alumniList"
    ).innerHTML += `<div class="media justify-content-center mb-2 w-75" style="background-color:#E9E5E5;">
        <div class="image ml-5 mt-2">
        <img src=${dummyResponse.Alumni[i].imageId} class="mr-3" alt=${dummyResponse.Alumni[i].name} height=auto width="80">
        </div>
        <div class="media-body mr-3">
        <h6 class="mt-0">${dummyResponse.Alumni[i].name}</h6>
        <p>${dummyResponse.Alumni[i].department}</p>
        <p style="display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;">${dummyResponse.Alumni[i].biography}</p>
        </div></div>
        </div>`;
  }
};

window.nextPage = function () {
  pageIndex++;
  loadAlumniList(pageIndex);
};

window.previousPage = function () {
  pageIndex--;
  loadAlumniList(pageIndex);
};

loadAlumniList(pageIndex);
