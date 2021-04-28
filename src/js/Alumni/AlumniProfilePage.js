import { dummyResponse, updateDummyData } from "../dummydata.js";
const imgPath = "../../../Assets/imgs/";
let onClickAlumniID = JSON.parse(localStorage.getItem("alumniprofile"));

const alumniProfile = document.getElementById("main-body");
const loadAlumniProfile = (index) => {
  var i = index;
  alumniProfile.innerHTML = "";
  alumniProfile.innerHTML = `
    <div id="main-body" class="container my-5">
    <div>
        <a
          href="../../html/Alumni/AlumniPage.html"
          class="btn btn-link float-left back pt-1"
          ><i class="fas fa-chevron-left fa-2x"></i
        ></a>
    </div>
    <div class="row justify-content-between">
        <h2>Alumni Profile</h2>
    </div>
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
        <div class="col-sm-7 justify-content-center align-items-center">
        <div class="row mb-3">
            <div class="col-sm-4">Name:</div>
            <div id="name" class="col-sm-8">${dummyResponse.Alumni[i].name}</div>
        </div>
        <div class="row mb-3">
            <div class="col-sm-4">Gender:</div>
            <div id="gender" class="col-sm-8">${dummyResponse.Alumni[i].gender}</div>
        </div>
        <div class="row mb-3">
            <div class="col-sm-4">Graduated:</div>
            <div id="graduated" class="col-sm-8">${dummyResponse.Alumni[i].graduated}</div>
        </div>
        <div class="row mb-3">
            <div class="col-sm-4">Department:</div>
            <div id="department" class="col-sm-8">${dummyResponse.Alumni[i].department}</div>
        </div>
        <div class="row mb-3">
            <div class="col-sm-4">E-mail:</div>
            <div id="email" class="col-sm-8">${dummyResponse.Alumni[i].email}</div>
        </div>
        <div class="row mb-3">
            <div class="col-sm-4">Contact Number:</div>
            <div id="contactNumber" class="col-sm-8">${dummyResponse.Alumni[i].contactNumber}</div>
        </div>
        </div>
    </div>

    <div class="row mt-5">
        <h4>Biography</h4>
        <div class="col-12 rounded bg-grey p-5 mb-2">
        <div id="biography" class="profile__biography_valueContainer_value">
        ${dummyResponse.Alumni[i].biography}
        </div>
        </div>
    </div>
    </div>`;
};
console.log(onClickAlumniID);
loadAlumniProfile(onClickAlumniID);
// localStorage.removeItem("alumniprofile");
// var index = getindex(onClickAlumniID);
// function getindex(onClickAlumniID) {
//   return onClickAlumniID.split("-")[1];
// }
