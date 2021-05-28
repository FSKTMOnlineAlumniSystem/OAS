import { dummyResponse, updateDummyData } from "../dummydata.js";
const imgPath = "/uploads/alumni/";
let onClickAlumniID = JSON.parse(localStorage.getItem("alumniprofile"));
document.cookie =
  "clickedID=" +
  onClickAlumniID +
  "; expires=" +
  new Date(9999, 0, 1).toUTCString();
// <div class="row mb-3">
//     <div class="col-sm-4">E-mail:</div>
//     <div id="email" class="col-sm-8">${dummyResponse.Alumni[i].email}</div>
// </div>

function emailNeeded(pub) {
  var output = ``;
  console.log("hi");
  console.log(dummyResponse.Alumni[0].isEmailPublic);
  if (pub == 1) {
    output = `<div class="row mb-3">
        <div class="col-sm-4">E-mail:</div>
        <div id="email" class="col-sm-8">${dummyResponse.Alumni[i].email}</div>
        </div>`;
  }
  return output;
}

const alumniProfile = document.getElementById("main-body");
const loadAlumniProfile = (index) => {
  var i = index;
  alumniProfile.innerHTML = "";
  alumniProfile.innerHTML = `
    <div class="col-12 col-md-10 col-lg-8">
        <div class="row align-items-center">
        <div class="col-12">
            <a href="/src/Domain/Alumni/AlumniPage.php" class="btn btn-link back">
            <i class="fas fa-chevron-left fa-2x"></i>
            </a>
            <h3 class="d-inline">Alumni Profile</h3>
        </div>
        </div>
        <hr
        style="
            height: 3px;
            border-width: 0;
            color: rgb(0, 0, 0);
            background-color: black;
        "
        />
        <div class="row mt-3 mb-3 align-items-center">
            <div class="col-sm-5 d-flex align-items-center justify-content-center">
                <div class="w-50 position-relative">
                    <div
                    class="rounded-circle overflow-hidden border"
                    style="aspect-ratio: 1/1"
                    >
                        <img
                            id="profilePicture"
                            src="${imgPath}${dummyResponse.Alumni[i].imageId}"
                            alt="Profile Picture"
                            class="img-fluid"
                        />
                    </div>
                </div>
            </div>
            <div class="col-sm-7 justify-content-center align-items-center pt-3">
                <div class="row mb-3">
                    <div class="col-sm-4">Name:</div>
                    <div id="name" class="col-sm-8">${
                      dummyResponse.Alumni[i].name
                    }</div>
                </div>
                <div class="row mb-3">
                    <div class="col-sm-4">Gender:</div>
                    <div id="gender" class="col-sm-8">${
                      dummyResponse.Alumni[i].gender
                    }</div>
                </div>
                <div class="row mb-3">
                    <div class="col-sm-4">Graduated:</div>
                    <div id="graduated" class="col-sm-8">${
                      dummyResponse.Alumni[i].graduated
                    }</div>
                </div>
                <div class="row mb-3">
                    <div class="col-sm-4">Department:</div>
                    <div id="department" class="col-sm-8">${
                      dummyResponse.Alumni[i].department
                    }</div>
                </div>
                ${emailNeeded(dummyResponse.Alumni[i].isEmailPublic)}
            </div>
        </div>
        <div class="container">
            <div class="row mt-5">
                <h4>Biography</h4>
                <div class="col-12 rounded bg-grey p-5 mb-2">
                    <div id="biography" class="profile__biography_valueContainer_value">
                        ${dummyResponse.Alumni[i].biography}
                    </div>
                </div>
            </div>
        </div>
    </div>`;
};
loadAlumniProfile(onClickAlumniID);
