
console.log('connecting');
let alumniArray=alumni_array
console.log(alumniArray);

// const imgPath = "/public/Assets/imgs/";
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

var i = localStorage.getItem("updateId")
const currentAlumniId = alumniArray[i].alumniId;
const alumni = alumniArray.filter(function (alumni) {
    return alumni.alumniId === currentAlumniId;
})[0];

document.getElementById('name').value=alumniArray[i].name
document.getElementById('gender').value=alumniArray[i].gender
document.getElementById('icNumber').value=alumniArray[i].icNumber
document.getElementById('graduated').value=alumniArray[i].graduated
document.getElementById('department').value=alumniArray[i].department
document.getElementById('email').value=alumniArray[i].email
document.getElementById('biography').value=alumniArray[i].biography
wizardPicturePreview.src = alumniArray[i].imageId;

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

// img.addEventListener('change', (e) => {
//     let allowedExtensions =
//         /(\.png|\.jpg|\.jpeg)$/i;
//     if (e.target.files && e.target.files[0] && allowedExtensions.test(e.target.value)) {
//         var reader = new FileReader();
//         reader.onload = function (e) {
//             wizardPicturePreview.src = e.target.result;
//         }
//         reader.readAsDataURL(e.target.files[0]);
//         choosePictureDescription.textContent = "Choose picture";
//     } else {
//         choosePictureDescription.textContent = "Please choose picture in .png, .jpg or .jpeg format";
//     }
// }
// )
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

/*Form Validation for Edit My Profile (email, contactNumber, biography)*/
function isEmpty(obj) {
    return obj.value.length == 0;
}
const emailFormat = /[a-zA-Z0-9]+@[a-z0-9]+(\.[a-z]+)+/;
// const phoneNumberFormat = /[0-9]+-[0-9]{7,}/;
const graduatedFormat = /[0-9]{4}/;
const icNumberFormat = /^\d{6}-\d{2}-\d{4}/;

form.addEventListener('submit', (e) => {
// window.checkvalidation = function(){
let errorExist = false; //false if no error exists in alumni details
    if (isEmpty(email) || !email.value.match(emailFormat)) {
        setInValid(email);
        errorExist = true;
    } else {
        setValid(email);
    }

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
    // else {
    //     alumniArray.forEach((al) => {
    //         return true;
    //         if (al.alumniId === currentAlumniId) {
    //             if (img.value) {
    //                 const imgLocalPathArr = img.value.split('\\');
    //                 al.imageId = imgLocalPathArr[imgLocalPathArr.length - 1];
    //             }
    //             al.email = email.value;
    //             al.contactNumber = contactNumber.value;
    //             al.biography = biography.value;
    //             al.graduated = graduated.value;
    //             al.name = name.value;
    //             al.icNumber = icNumber.value;
    //             al.gender = gender.value;
    //             al.department = department.value;
    //             // updateDummyData(dummyResponse);
    //         }
    //     });
        // saveButton.textContent = 'Saving...';
        // setTimeout(() => {
        //     location = 'alumniList';
        // }, 1000);
    }
)
/*Check whether there is any changes that might be lost*/
cancelButton.addEventListener('click', () => {
    if (
        wizardPicturePreview.src.includes(alumni.imageId) &&
        alumni.email == email.value &&
        // alumni.contactNumber == contactNumber.value &&
        alumni.biography == biography.value &&
        alumni.name == name.value &&
        alumni.graduated == graduated.value &&
        alumni.department == department.value &&
        alumni.gender == gender.value &&
        alumni.icNumber == icNumber.value) {
        location.href = "/alumniList";
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
