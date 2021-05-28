const wizardPicturePreview = document.querySelector("#wizardPicturePreview");
const img = document.querySelector("#wizard-picture");
const profilePicture = document.querySelector('#profilePicture');
const username = document.querySelector("#name");
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
  console.log('f')
  let allowedExtensions = /(\.png|\.jpg|\.jpeg)$/i;
  if (e.target.files && e.target.files[0] && e.target.files[0].size > 1000000) {
    // To handle the file size
    choosePictureDescription.textContent = "Image size must be smaller than 1MB";
  } else if (
    e.target.files &&
    e.target.files[0] &&
    allowedExtensions.test(e.target.value)
  ) {
    profilePicture.files = e.target.files;
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
  if (username.value.length < 5) {
    setInValid(username);
    errorExist = true;
  } else {
    setValid(username);
  }

  if (isEmpty(email) || !email.value.match(emailFormat)) {
    setInValid(email);
    errorExist = true;
  } else {
    setValid(email);
  }

  if (!errorExist) {
    saveButton.textContent = 'Saving...';
    setTimeout(() => {}, 1000);
  }else{
    e.preventDefault();
  }
});

/*Check whether there is any changes that might be lost*/
cancelButton.addEventListener("click", () => {
  if (
    !profilePicture.value &&
    adminName == username.value &&
    adminEmail == email.value
  ) {
    location.href = "/adminprofile";
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

