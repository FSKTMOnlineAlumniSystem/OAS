import { dummyResponse, updateDummyData } from "../dummydata.js";

//get the signed in admin Id from localStorage
const currentAdminId = localStorage.getItem("SignedInAdminId");
//get the current admin object
const admin = dummyResponse.Admin.filter(function (admin) {
  return admin.adminId === currentAdminId;
})[0];

const wizardPicturePreview = document.querySelector("#wizardPicturePreview");
const img = document.querySelector("#wizard-picture");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const form = document.querySelector("form");
const saveButton = document.querySelector("#saveButton");
const cancelButton = document.querySelector("#cancelButton");
const closeCancelChangesModalButton = document.querySelector(
  "#closeCancelChangesModalButton"
);
const stayButton = document.querySelector("#stayButton");
const choosePictureDescription = document.querySelector(
  "#choosePictureDescription"
);


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
  e.preventDefault();
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

  if(!errorExist) {
    dummyResponse.Admin.forEach((ad) => {
      if (ad.adminId === currentAdminId) {
        if (img.value) {
          const imgLocalPathArr = img.value.split('\\');
          ad.imageId = imgLocalPathArr[imgLocalPathArr.length - 1];
        }
        ad.name = name.value;
        ad.email = email.value;
        updateDummyData(dummyResponse);
        saveButton.textContent='Saving...';
        setTimeout(()=>{
            location.href='Admin-MyProfilePage.html';
        },1000);
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
//Stay at the page
stayButton.addEventListener("click", () => closeModal("#cancelChangesModal"));
function closeModal(modalId) {
  $(modalId).modal("hide");
}

//load all the data when landing the page
function loadData() {
  wizardPicturePreview.src = imgPath + admin.imageId;
  name.value = admin.name;
  email.value = admin.email;
}

loadData();