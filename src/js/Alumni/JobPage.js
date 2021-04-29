import { dummyResponse, updateDummyData } from "../dummydata.js";
import loadJobList from "./JobPageModule.js";

let pageIndex = 0;
var outputList = dummyResponse.Job;
console.log(outputList[0].imageId)

window.nextPage = function () {
  pageIndex++;
  loadJobList(pageIndex, outputList);
};

window.previousPage = function () {
  pageIndex--;
  loadJobList(pageIndex, outputList);
};

loadJobList(pageIndex, outputList);







