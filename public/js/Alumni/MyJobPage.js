import loadMyJobList from "./MyJobPageModule.js";

let pageIndex = 0;
var outputList = myJob_array;


//CLICK NEXT PAGE
window.nextPage = function () {
  pageIndex++;
  loadMyJobList(pageIndex, outputList);
};

//CLICK PREVIOUS PAGE
window.previousPage = function () {
  pageIndex--;
  loadMyJobList(pageIndex, outputList);
};

//CALL FUNCTION IN ORER TO DISPLAY MYJOBLIST
loadMyJobList(pageIndex, outputList);
