import { dummyResponse, updateDummyData } from '../dummydata.js';
import loadJobList from "./MyJobPageModule.js"


let pageIndex = 0;
var outputList = dummyResponse.Job;
let count=0;
const alumniID = localStorage.getItem('SignedInAlumniId');


for(let i=0; i<outputList.length; i++){
  if(outputList[i].alumniId == alumniID){
      count++;
  }
}    


window.nextPage = function () {
    pageIndex++;
    loadJobList(pageIndex, outputList, count);
  };
  
  window.previousPage = function () {
    pageIndex--;
    loadJobList(pageIndex,outputList,count);
  };


  loadJobList(pageIndex, outputList,count);
