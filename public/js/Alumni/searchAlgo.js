import { dummyResponse, updateDummyData } from "../dummydata.js";
import loadMyJobList from "./MyJobPageModule.js";
import loadJobList from "./JobPageModule.js";
import loadAlumniList from "./alumniPageModule.js";
import { loadEventList } from "./EventPageModule.js";

var url = location.href;
// var url = geturl(location.href);
// function geturl(link) {
//   console.log(link.split("/")[6].split("?")[0]);
//   return link.split("/")[6].split("?")[0];
// }
function getindex(onClickAlumniID) {
  return onClickAlumniID.split("-")[1];
}

let result = null;
document
  .getElementById("search-button")
  .addEventListener("click", function (e) {
    result = searching(e);
    if (result.length != 0) {
      // Output the search result
      switch (url) {
        case "AlumniPage.php":
          loadAlumniList(0, result);
          break;
        case "EventPage.php":
          loadEventList(
            result,
            document.getElementById("event-page-section"),
            true
          );
          break;
        case "JobPage.php":
          loadJobList(0, result);
          break;
        case "MyJobPage.php":
          loadMyJobList(0, result, 0);
          break;
      }
    }
  });

function searching(e) {
  e.preventDefault();
  var searchQuery = document.getElementById("search");
  localStorage.setItem("searchQuery", JSON.stringify(searchQuery.value));
  // we can know user searching by getting the searchQuery.value
  searchQuery = searchQuery.value.toLowerCase();

  if (url.includes("AlumniPage.php")) {
    result = dummyResponse.Alumni.filter(function (Alumni) {
      var match = false;
      if (Alumni.name.toLowerCase().includes(searchQuery) === true) {
        // filtering using name
        match = true;
        return match;
      }
      if (Alumni.email.toLowerCase().includes(searchQuery) === true) {
        // filtering using email
        match = true;
        return match;
      }
      if (Alumni.department.toLowerCase().includes(searchQuery) === true) {
        // filtering using department
        match = true;
        return match;
      }
      if (Alumni.graduated.toLowerCase().includes(searchQuery) === true) {
        // filtering using years of graduated
        match = true;
        return match;
      }
    });
  } else if (url.includes("EventPage.php")) {
    result = dummyResponse.Event.filter(function (Event) {
      var match = false;
      if (Event.title.toLowerCase().includes(searchQuery) === true) {
        // filtering using title
        match = true;
        return match;
      }
      if (Event.description.toLowerCase().includes(searchQuery) === true) {
        // filtering using description
        match = true;
        return match;
      }
      if (Event.location.toLowerCase().includes(searchQuery) === true) {
        // filtering using location
        match = true;
        return match;
      }
      return match;
    });
  } else if (url.includes("MyJobPage.php")) {
    result = dummyResponse.Job.filter(function (Job) {
      var match = false;
      if (localStorage.getItem("SignedInAlumniId") == Job.alumniId) {
        if (Job.title.toLowerCase().includes(searchQuery) === true) {
          // filtering using title
          match = true;
          return match;
        }
        if (Job.description.toLowerCase().includes(searchQuery) === true) {
          // filtering using description
          match = true;
          return match;
        }
        if (Job.location.toLowerCase().includes(searchQuery) === true) {
          // filtering using location
          match = true;
          return match;
        }
        if (Job.company.toLowerCase().includes(searchQuery) === true) {
          // filtering using company
          match = true;
          return match;
        }
      }
      return match;
    });
  } else if (url.includes("JobPage.php")) {
    result = dummyResponse.Job.filter(function (Job) {
      var match = false;
      if (Job.title.toLowerCase().includes(searchQuery) === true) {
        // filtering using title
        match = true;
        return match;
      }
      if (Job.description.toLowerCase().includes(searchQuery) === true) {
        // filtering using description
        match = true;
        return match;
      }
      if (Job.location.toLowerCase().includes(searchQuery) === true) {
        // filtering using location
        match = true;
        return match;
      }
      if (Job.company.toLowerCase().includes(searchQuery) === true) {
        // filtering using company
        match = true;
        return match;
      }
      return match;
    });
  }
  if (result.length == 0) {
    switch (url) {
      case "AlumniPage.php":
        loadAlumniList(0, dummyResponse.Alumni);
        break;
      case "EventPage.php":
        loadEventList(result, dummyResponse.Event, true);
        break;
      case "JobPage.php":
        loadJobList(0, dummyResponse.Job);
        break;
      case "MyJobPage.php":
        var index = getindex(localStorage.getItem("SignedInAlumniId"));
        loadMyJobList(0, dummyResponse.Job, index);
        break;
    }
    alert("Sorry, we cannot match any result for your search");
  }
  return result;
}
