import { dummyResponse, updateDummyData } from '../dummydata.js';

//get the current signed in alumni id from localStorage
const currentAlumniId = localStorage.getItem('SignedInAlumniId');
//get the current alumni object
const alumni = dummyResponse.Alumni.filter(function (alumni) {
    return alumni.alumniId === currentAlumniId;
})[0];

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
const saveButton = document.querySelector('#saveButton');
const cancelButton = document.querySelector('#cancelButton');
const closeCancelChangesModalButton = document.querySelector('#closeCancelChangesModalButton');
const stayButton = document.querySelector('#stayButton');
const choosePictureDescription = document.querySelector('#choosePictureDescription');


/*Check the file extension of the image & Update preview*/
img.addEventListener('change', (e) => readURL(e));
function readURL(e) {
    let allowedExtensions =
        /(\.png|\.jpg|\.jpeg)$/i;
    if (e.target.files && e.target.files[0] && allowedExtensions.test(e.target.value)) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("wizardPicturePreview").src = e.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);
        choosePictureDescription.textContent = "Choose picture";
    } else {
        choosePictureDescription.textContent = "Please choose picture in .png, .jpg or .jpeg format";
    }
}

/*Form Validation for Edit My Profile (email, contactNumber, biography)*/
function isEmpty(obj) {
    return obj.value.length == 0;
}
const emailFormat = /[a-zA-Z0-9]+@[a-z0-9]+(\.[a-z]+)+/;
const phoneNumberFormat = /[0-9]+-[0-9]{7,}/;

form.addEventListener('submit', (e) => {
    e.preventDefault();
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

    if (isEmpty(biography)) {
        setInValid(biography);
        errorExist = true;
    } else {
        setValid(biography);
    }

    if (!errorExist){
        dummyResponse.Alumni.forEach((al) => {
            if (al.alumniId === currentAlumniId) {
                if(img.value){
                    const imgLocalPathArr = img.value.split('\\');
                    al.imageId = imgLocalPathArr[imgLocalPathArr.length-1];
                }
                al.email = email.value;
                al.contactNumber = contactNumber.value;
                al.biography = biography.value;
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
    if (!img.value &&
        alumni.email == email.value &&
        alumni.contactNumber == contactNumber.value &&
        alumni.biography == biography.value) {
        location.href = "MyProfilePage.html";
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

//load all the data when landing the page
function loadData() {
    wizardPicturePreview.src = imgPath + alumni.imageId;
    name.textContent = alumni.name;
    gender.textContent = alumni.gender;
    graduated.textContent = alumni.graduated;
    department.textContent = alumni.department;
    email.value = alumni.email;
    contactNumber.value = alumni.contactNumber;
    biography.value = alumni.biography;
}

loadData();