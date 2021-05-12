import { dummyResponse, updateDummyData } from "../dummydata.js";
import loadMyJobList from "./MyJobPageModule.js";

let pageIndex = 0;
var outputList = dummyResponse.Job;
let count = 0;
const alumniID = localStorage.getItem("SignedInAlumniId");

//ONLY DISPLAY THE USER'S JOBS ADVERTISEMENT 
for (let i = 0; i < outputList.length; i++) {
  if (outputList[i].alumniId == alumniID) {
    count++;
  }
}

//CLICK NEXT PAGE
window.nextPage = function () {
  pageIndex++;
  loadMyJobList(pageIndex, outputList, count);
};

//CLICK PREVIOUS PAGE
window.previousPage = function () {
  pageIndex--;
  loadMyJobList(pageIndex, outputList, count);
};

//CALL FUNCTION IN ORER TO DISPLAY MYJOBLIST
loadMyJobList(pageIndex, outputList, count);
