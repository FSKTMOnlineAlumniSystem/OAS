import { dummyResponse, updateDummyData } from "../dummydata.js";
import loadAlumniList from "./AlumniPageModule.js";

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
  document.cookie =
    "clickedID=" +
    profileClicked +
    "; expires=" +
    new Date(9999, 0, 1).toUTCString();
  location.href = "/profile";
};

loadAlumniList(pageIndex, outputList);
