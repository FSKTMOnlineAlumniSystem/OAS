import { dummyResponse, updateDummyData } from "../dummydata.js";

const wizardPicturePreview = document.querySelector("#wizardPicturePreview");
const img = document.querySelector("#wizard-picture");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const form = document.querySelector("form");
const cancelButton = document.querySelector("#cancelButton");
const closeCancelChangesModalButton = document.querySelector(
  "#closeCancelChangesModalButton"
);
const stayButton = document.querySelector("#stayButton");
const choosePictureDescription = document.querySelector(
  "#choosePictureDescription"
);

const currentAdminId = localStorage.getItem("SignedInAdminId");
const admin = dummyResponse.Admin.filter(function (admin) {
  return admin.adminId === currentAdminId;
})[0];

function setInValid(el) {
  if (el.classList.contains("is-valid")) {
    el.classList.replace("is-valid", "is-invalid");
  } else {
    el.classList.add("is-invalid");
  }
}
function setValid(el) {
  if (el.classList.contains("is-invalid")) {
    el.classList.replace("is-invalid", "is-valid");
  } else {
    el.classList.add("is-valid");
  }
}

/*Check the file extension of the image & Update preview*/
img.addEventListener("change", (e) => readURL(e));
function readURL(e) {
  let allowedExtensions = /(\.png|\.jpg|\.jpeg)$/i;
  if (
    e.target.files &&
    e.target.files[0] &&
    allowedExtensions.test(e.target.value)
  ) {
    var reader = new FileReader();
    reader.onload = function (e) {
      wizardPicturePreview.src = e.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
    choosePictureDescription.textContent = "Choose picture";
  } else {
    choosePictureDescription.textContent =
      "Please choose picture in .png, .jpg or .jpeg format";
  }
}

/*Form Validation for Admin Edit My Profile (email, contactNumber, biography)*/
function isEmpty(obj) {
  return obj.value.length == 0;
}
const emailFormat = /[a-zA-Z0-9]+@[a-z0-9]+(\.[a-z]+)+/;

form.addEventListener("submit", (e) => {
  let errorExist = false; //false if no error exists in name, email
  if (name.value.length < 5) {
    setInValid(name);
    errorExist = true;
  } else {
    setValid(name);
  }

  if (isEmpty(email) || !email.value.match(emailFormat)) {
    setInValid(email);
    errorExist = true;
  } else {
    setValid(email);
  }

  if (errorExist) e.preventDefault();
  else {
    dummyResponse.Admin.forEach((ad) => {
      if (ad.adminId === currentAdminId) {
        if (img.value) {
          const imgLocalPathArr = img.value.split('\\');
          ad.imageId = imgLocalPathArr[imgLocalPathArr.length - 1];
        }
        ad.name = name.value;
        ad.email = email.value;
        updateDummyData(dummyResponse);
      }
    });
  }
});

/*Check whether there is any changes that might be lost*/
cancelButton.addEventListener("click", () => {
  if (
    !img.value &&
    admin.name == name.value &&
    admin.email == email.value
  ) {
    location.href = "Admin-MyProfilePage.html";
  } else {
    /*POP UP MODAL ask if cancel will lose changes */
    $("#cancelChangesModal").modal("show");
  }
});

/*Close Modal */
closeCancelChangesModalButton.addEventListener("click", () =>
  closeModal("#cancelChangesModal")
);
stayButton.addEventListener("click", () => closeModal("#cancelChangesModal"));
function closeModal(modalId) {
  $(modalId).modal("hide");
}

function loadData() {
  wizardPicturePreview.src = imgPath + admin.imageId;
  name.value = admin.name;
  email.value = admin.email;
}

loadData();
