import { dummyResponse, updateDummyData } from "../dummydata.js";
import loadJobList from "./JobPageModule.js";

let pageIndex = 0;
var outputList = dummyResponse.Job;


window.nextPage = function () {
  pageIndex++;
  loadJobList(pageIndex, outputList);
};

window.previousPage = function () {
  pageIndex--;
  loadJobList(pageIndex, outputList);
};

loadJobList(pageIndex, outputList);



// for (let i = 1; i <= Math.ceil(outputList.length / 9); i++) {
//   console.log("start");
//   document.getElementById("pageIndex").innerHTML +=
//     `<li class="page-item"><button class="page-link">` + i + `</button></li>`;
//   console.log("page2 " + i);
// }
// document.getElementById("pageIndex").innerHTML += `<li class="page-item">
// <button class="page-link" id="nextPage">Next</button></li>`;




