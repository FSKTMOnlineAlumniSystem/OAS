import { dummyResponse, updateDummyData } from "../dummydata.js";
import loadJobList from "./JobPageModule.js";

let pageIndex = 0;
var outputList = dummyResponse.Job;

//click next page
window.nextPage = function () {
  pageIndex++;
  loadJobList(pageIndex, outputList);
};

//click previous page
window.previousPage = function () {
  pageIndex--;
  loadJobList(pageIndex, outputList);
};

//call the function in JobPageModule.js
loadJobList(pageIndex, outputList);







