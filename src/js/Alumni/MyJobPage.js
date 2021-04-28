import { dummyResponse, updateDummyData } from '../dummydata.js';
import loadJobList from "./MyJobPageModule.js"
// import {array} from "./MyJobPageModule.js"

// let module = require('./MyJobPageModule.js');


// array.map(item => console.log(item +1))

// array.map(item => console.log(item +1));
// console.log(array);
// updateDummyData(dummyResponse)
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

 
  // window.deleteFunction = function(jobID){
  //   for(let i=0; i<dummyResponse.Job.length; i++){
  //       if(dummyResponse.Job[i].jobId == jobID){
  //           dummyResponse.Job.splice(i,1);
  //           updateDummyData(dummyResponse);
  //           location.href = "MyJobPage.html";
  //           loadJobList(pageIndex,outputList);
  //           break;
  //       }
  //   }
  // };
  
//  const index = localStorage.getItem('temp');
//  dummyResponse.Job.splice(index, 1);
//  updateDummyData(dummyResponse);
//  localStorage.removeItem('temp');



//   console.log(temp);
//   updateDummyData(temp);

  loadJobList(pageIndex, outputList);
