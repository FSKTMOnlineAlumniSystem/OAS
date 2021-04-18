import dummyResponse from '../dummydata.js';

const img = document.querySelector('#wizard-picture');
const name = document.querySelector('#name');
const gender = document.querySelector('#gender');
const graduated = document.querySelector('#graduated');
const department = document.querySelector('#department');
const email = document.querySelector('#email');
const contactNumber = document.querySelector('#contactNumber');
const biography = document.querySelector('#biography');
const form = document.querySelector('form');

const currentAlumniId = "AL-1";
const alumni = dummyResponse.Alumni.filter(function (alumni) {
    return alumni.alumniId === currentAlumniId;
})[0];

function setInValid(el){
    if(el.classList.contains("is-valid")){
        el.classList.replace("is-valid","is-invalid");
    }else {
        el.classList.add("is-invalid");
    }
}
function setValid(el){
    if(el.classList.contains("is-invalid")) {
        el.classList.replace("is-invalid", "is-valid");
    }else{
        el.classList.add("is-valid");       
    }
}

img.addEventListener('change',(e)=>readURL(e));
function readURL(e) {
    if (e.target.files && e.target.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("wizardPicturePreview").src = e.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);
    }
}

/*Form Validation for Edit My Profile (email, contactNumber, biography)*/
function isEmpty(obj) {
    return obj.value.length == 0;
}
const emailFormat = "[a-zA-Z0-9]+@[a-z0-9]+(.[a-z]){1,}";
const phoneNumberFormat = "[0-9]+-[0-9]{7,}";

form.addEventListener('submit', (e) => {
    let errorExist = false; //false if no error exists in email, contactNumber, biography

    if (isEmpty(email) || !email.value.match(emailFormat)) {
        setInValid(email);
        errorExist = true;
    }else{
        setValid(email);
    }

    if (isEmpty(contactNumber) || !contactNumber.value.match(phoneNumberFormat)) {
        setInValid(contactNumber);
        errorExist = true;
    }else{
        setValid(contactNumber);
    }

    if (isEmpty(biography)) {
        setInValid(biography);
        errorExist = true;
    }else{
        setValid(biography);
    }

    if (errorExist) e.preventDefault();
    else {
        alumni.email = email.value;
        alumni.contactNumber = contactNumber.value;
        alumni.biography = biography.value;
    }
})

function loadData() {
    name.textContent = alumni.name;
    gender.textContent = alumni.gender;
    graduated.textContent = alumni.graduated;
    department.textContent = alumni.department;
    email.textContent = alumni.email;
    contactNumber.textContent = alumni.contactNumber;
    biography.textContent = alumni.biography;
}

loadData();