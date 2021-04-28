import { dummyResponse, updateDummyData } from "../dummydata.js";
import loadAlumniList from "./alumniPageModule.js";

let pageIndex = 0;
var outputList = dummyResponse.Alumni;

window.nextPage = function () {
  pageIndex++;
  loadAlumniList(pageIndex, outputList);
};

window.previousPage = function () {
  pageIndex--;
  loadAlumniList(pageIndex, outputList);
};

window.clickProfile = function (profileClicked) {
  localStorage.setItem("alumniprofile", JSON.stringify(profileClicked));
  location.href = "AlumniProfilePage.html";
};

loadAlumniList(pageIndex, outputList);
