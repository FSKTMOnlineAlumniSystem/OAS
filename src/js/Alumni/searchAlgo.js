import dummyResponse from "../dummydata.js";

document
  .getElementById("search-button")
  .addEventListener("click", function (e) {
    searching(e);
  });

function searching(e) {
  e.preventDefault();
  var searchQuery = document.getElementById("search");
  localStorage.setItem("searchQuery", JSON.stringify(searchQuery.value));
  var choose;
  console.log("searching : " + searchQuery.value);
  searchQuery = searchQuery.value.toLowerCase();
  var e = document.getElementById("exampleFormControlSelect1");
  var choose = e.options[e.selectedIndex].text;
  console.log(choose);

  if (choose == "Alumni") {
    location.href = "alumniPage.html";
    console.log("searching is in");
    const result = dummyResponse.Alumni.filter(function (Alumni) {
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
    console.log(result);
  } else if (choose == "Event") {
    console.log("searching is in");
    const result = dummyResponse.Event.filter(function (Event) {
      var match = false;
      if (Event.title.toLowerCase().includes(searchQuery) === true) {
        console.log("searching title");
        match = true;
        return match;
      }
      if (Event.description.toLowerCase().includes(searchQuery) === true) {
        console.log("searching des");
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
    const result = dummyResponse.Job.filter(function (Job) {
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
    console.log(result);
  }
}

export default result;
