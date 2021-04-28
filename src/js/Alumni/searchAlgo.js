import { dummyResponse, updateDummyData } from "../dummydata.js";
// import loadAlumniList from "./alumniPage.js";
// import loadJobList from "./JobPage.js";
import loadAlumniList from "./alumniPageModule.js";
import { loadEventList } from "./EventPageModule.js";
// console.log(loadEventList);

let result = null;
document
  .getElementById("search-button")
  .addEventListener("click", function (e) {
    // e.preventDefault();
    console.log("click");
    result = searching(e);
    console.log(result);
    console.log(localStorage.getItem("choose"));
    const chooseVariable = JSON.parse(localStorage.getItem("choose"));
    if (result.length != 0) {
      switch (chooseVariable) {
        case "Alumni":
          loadAlumniList(0, result);
          break;
        case "Event":
          // code block
          loadEventList(
            result,
            document.getElementById("event-page-section"),
            true
          );
          break;
        case "Jobs":
          // code block
          break;
        default:
          console.log("there is no match");
        // code block
      }
    }
  });

function searching(e) {
  console.log("start searching");
  e.preventDefault();
  var searchQuery = document.getElementById("search");
  localStorage.setItem("searchQuery", JSON.stringify(searchQuery.value));
  var choose;
  console.log("searching : " + searchQuery.value);
  searchQuery = searchQuery.value.toLowerCase();
  var e = document.getElementById("exampleFormControlSelect1");
  var choose = e.options[e.selectedIndex].text;
  localStorage.setItem("choose", JSON.stringify(choose));

  if (choose == "Alumni") {
    console.log("searching is in");
    result = dummyResponse.Alumni.filter(function (Alumni) {
      var match = false;
      if (Alumni.name.toLowerCase().includes(searchQuery) === true) {
        console.log("searching name");
        match = true;
        return match;
      }
      if (Alumni.email.toLowerCase().includes(searchQuery) === true) {
        console.log("searching email");
        match = true;
        return match;
      }
      if (Alumni.department.toLowerCase().includes(searchQuery) === true) {
        console.log("searching department");
        match = true;
        return match;
      }
      if (Alumni.graduated.toLowerCase().includes(searchQuery) === true) {
        console.log("searching graduated");
        match = true;
        return match;
      }
    });
  } else if (choose == "Event") {
    result = dummyResponse.Event.filter(function (Event) {
      var match = false;
      if (Event.title.toLowerCase().includes(searchQuery) === true) {
        console.log("searching title");
        match = true;
        return match;
      }
      if (Event.description.toLowerCase().includes(searchQuery) === true) {
        console.log("searching description");
        match = true;
        return match;
      }
      if (Event.location.toLowerCase().includes(searchQuery) === true) {
        console.log("searching location");
        match = true;
        return match;
      }
      return match;
    });
    console.log(result);
  } else if (choose == "Jobs") {
    console.log("searching is in");
    result = dummyResponse.Job.filter(function (Job) {
      var match = false;
      if (Job.title.toLowerCase().includes(searchQuery) === true) {
        console.log("searching title");
        match = true;
        return match;
      }
      if (Job.description.toLowerCase().includes(searchQuery) === true) {
        console.log("searching des");
        match = true;
        return match;
      }
      if (Job.location.toLowerCase().includes(searchQuery) === true) {
        console.log("searching location");
        match = true;
        return match;
      }
      if (Job.company.toLowerCase().includes(searchQuery) === true) {
        console.log("searching company");
        match = true;
        return match;
      }
      return match;
    });
  }
  // console.log(result);
  if (result.length == 0) {
    switch (localStorage.getItem("choose")) {
      case "Alumni":
        console.log("load alumni");
        loadAlumniList(0, dummyResponse.Alumni);
        break;
      case "Event":
        loadEventList(0, dummyResponse.Event);
        break;
      case "Jobs":
        // loadJobList(0);
        break;
      default:
      // code block
    }
    alert("Sorry, we cannot match any result for your search");
  }
  return result;
}
