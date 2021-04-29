import {dummyResponse, updateDummyData} from "../dummydata.js";

const imgPath = "/Assets/imgs/";
const wizardPicturePreview = document.querySelector('#wizardPicturePreview');
const img = document.querySelector('#wizard-picture');
const name = document.querySelector('#name');
const gender = document.querySelector('#gender');
const graduated = document.querySelector('#graduated');
const department = document.querySelector('#department');
const email = document.querySelector('#email');
const contactNumber = document.querySelector('#contactNumber');
const biography = document.querySelector('#biography');
const form = document.querySelector('form');
const cancelButton = document.querySelector('#cancelButton');
const closeCancelChangesModalButton = document.querySelector('#closeCancelChangesModalButton');
const stayButton = document.querySelector('#stayButton');
const choosePictureDescription = document.querySelector('#choosePictureDescription');
const icNumber = document.querySelector('#icNumber');

var i = localStorage.getItem("updateId")
console.log(i)
const currentAlumniId = dummyResponse.Alumni[i].alumniId;
console.log(currentAlumniId)
const alumni = dummyResponse.Alumni.filter(function (alumni) {
    return alumni.alumniId === currentAlumniId;
})[0];

console.log(alumni.imageId)
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

img.addEventListener('change', (e) => readURL(e));
function readURL(e) {
    let allowedExtensions =
        /(\.png|\.jpg|\.jpeg)$/i;
    if (e.target.files && e.target.files[0] && allowedExtensions.test(e.target.value)) {
        var reader = new FileReader();
        reader.onload = function (e) {
            wizardPicturePreview.src = e.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);
        choosePictureDescription.textContent = "Choose picture";
    }else{
        choosePictureDescription.textContent = "Please choose picture in .png, .jpg or .jpeg format";
    }
}

/*Form Validation for Edit My Profile (email, contactNumber, biography)*/
function isEmpty(obj) {
    return obj.value.length == 0;
}
const emailFormat = /[a-zA-Z0-9]+@[a-z0-9]+(\.[a-z]+)+/;
const phoneNumberFormat = /[0-9]+-[0-9]{7,}/;
const graduatedFormat = /[0-9]{4}/;
const icNumberFormat = /^\d{6}-\d{2}-\d{4}/;

form.addEventListener('submit', (e) => {
    let errorExist = false; //false if no error exists in email, contactNumber, biography

    if (isEmpty(email) || !email.value.match(emailFormat)) {
        setInValid(email);
        errorExist = true;
    } else {
        setValid(email);
    }

    if (isEmpty(contactNumber) || !contactNumber.value.match(phoneNumberFormat)) {
        setInValid(contactNumber);
        errorExist = true;
    } else {
        setValid(contactNumber);
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

    if (errorExist) e.preventDefault();
    else {
        dummyResponse.Alumni.forEach((al) => {
            if (al.alumniId === currentAlumniId) {
                if(img.value){
                    const imgLocalPathArr = img.value.split('\\');
                    al.imageId = imgLocalPathArr[imgLocalPathArr.length-1];
                }
                al.email = email.value;
                al.contactNumber = contactNumber.value;
                al.biography = biography.value;
                al.graduated = graduated.value;
                al.name = name.value;
                al.icNumber = icNumber.value;
                al.gender = gender.value;
                al.department = department.value;
                updateDummyData(dummyResponse);
            }
        });
        saveButton.textContent='Saving...';
        setTimeout(()=>{
            location.href='MyProfilePage.html';
        },1000);
    }
});




/*Check whether there is any changes that might be lost*/
cancelButton.addEventListener('click', () => {
    if (wizardPicturePreview.src.includes(imgPath+alumni.imageId) &&
        alumni.email == email.value &&
        alumni.contactNumber == contactNumber.value &&
        alumni.biography == biography.value &&
        alumni.name == name.value &&
        alumni.graduated == graduated.value &&
        alumni.department == department.value &&
        alumni.gender == gender.value &&
        alumni.icNumber == icNumber.value) 
        {
        location.href = "Admin-AlumniListPage.html";
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

function loadData() {
    wizardPicturePreview.src = imgPath + alumni.imageId;
    name.value = alumni.name;
    gender.value = alumni.gender;
    department.value = alumni.department;
    graduated.value = alumni.graduated;
    email.value = alumni.email;
    contactNumber.value = alumni.contactNumber;
    biography.value = alumni.biography;
    icNumber.value = alumni.icNumber;
}

loadData();