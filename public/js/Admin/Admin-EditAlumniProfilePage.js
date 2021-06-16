let alumniArray=alumni_array
const wizardPicturePreview = document.querySelector('#wizardPicturePreview');
const img = document.querySelector('#wizard-picture');
const name = document.querySelector('#name');
const gender = document.querySelector('#gender');
const graduated = document.querySelector('#graduated');
const department = document.querySelector('#department');
const email = document.querySelector('#email');
const biography = document.querySelector('#biography');
const form = document.querySelector('form');
const cancelButton = document.querySelector('#cancelButton');
const closeCancelChangesModalButton = document.querySelector('#closeCancelChangesModalButton');
const stayButton = document.querySelector('#stayButton');
const choosePictureDescription = document.querySelector('#choosePictureDescription');
const icNumber = document.querySelector('#icNumber');


const currentAlumniId = localStorage.getItem("alumniId");
const alumni = alumniArray.filter(function (alumni) {
    return alumni.alumniId === currentAlumniId;
})[0];
document.getElementById('name').value=alumni.name
document.getElementById('gender').value=alumni.gender
document.getElementById('icNumber').value=alumni.icNumber
document.getElementById('graduated').value=alumni.graduated
document.getElementById('department').value=alumni.department
document.getElementById('email').innerHTML=`<p>${alumni.email}</p>`;
document.getElementById('biography').value=alumni.biography
wizardPicturePreview.src = alumni.imageId;

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

img.addEventListener("change", (e) => readURL(e));
function readURL(e) {
  let allowedExtensions = /(\.png|\.jpg|\.jpeg)$/i;
  if (e.target.files && e.target.files[0] && e.target.files[0].size > 10000000) {
    // To handle the file size
    choosePictureDescription.textContent = "Image size must be smaller than 10MB";
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

//Form Validation for Edit My Profile (email, contactNumber, biography)/
function isEmpty(obj) {
    return obj.value.length == 0;
}

const graduatedFormat = /[0-9]{4}/;
const icNumberFormat = /^\d{6}-\d{2}-\d{4}/;

form.addEventListener('submit', (e) => {
let errorExist = false; //false if no error exists in alumni details

    if (isEmpty(icNumber) || !icNumber.value.match(icNumberFormat)) {
        setInValid(icNumber);
        errorExist = true;
    } else {
        setValid(icNumber);
    }

    if (isEmpty(biography)) {
        setInValid(biography);
        errorExist = true;
    } else {
        setValid(biography);
    }

    if (isEmpty(name)) {
        setInValid(name);
        errorExist = true;
    } else {
        setValid(name);
    }

    if (isEmpty(graduated) || !graduated.value.match(graduatedFormat)) {
        setInValid(graduated);
        errorExist = true;
    } else {
        setValid(graduated);
    }

    if (errorExist) {
        e.preventDefault();
        return false;
    }    
    }
)
//Check whether there is any changes that might be lost/
cancelButton.addEventListener('click', () => {
    if (
        wizardPicturePreview.src.includes(alumni.imageId) &&
        alumni.biography.replace(/[^a-zA-Z]/g, "") == biography.value.replace(/[^a-zA-Z]/g, "") &&
        alumni.name == name.value &&
        alumni.graduated == graduated.value &&
        alumni.department == department.value &&
        alumni.gender == gender.value &&
        alumni.icNumber == icNumber.value) {
        location.href = "/admin/alumnilist";
    } else {
        /*POP UP MODAL ask if cancel will lose changes */
        $('#cancelChangesModal').modal('show');
    }
});

/*Close Modal */
closeCancelChangesModalButton.addEventListener('click', () => closeModal('#cancelChangesModal'));
stayButton.addEventListener('click', () => closeModal('#cancelChangesModal'));
function closeModal(modalId) {
    $(modalId).modal('hide');
}