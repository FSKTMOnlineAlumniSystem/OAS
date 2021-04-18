import dummyResponse from '../dummydata.js';

const currentAlumniId = "AL-1";
const alumni = dummyResponse.Alumni.filter(function (alumni) {
    return alumni.alumniId === currentAlumniId;
})[0];

const name = document.querySelector('#name');
const gender = document.querySelector('#gender');
const graduated = document.querySelector('#graduated');
const department = document.querySelector('#department');
const email = document.querySelector('#email');
const contactNumber = document.querySelector('#contactNumber');
const biography = document.querySelector('#biography');

const oldPassword = document.getElementById('oldPassword');
const newPassword = document.getElementById('newPassword');
const confirmNewPassword = document.getElementById('confirmNewPassword');

const deleteAccountInput = document.querySelector('#deleteAccountInput');
const deleteAccountButton = document.querySelector('#deleteAccountButton');

function verifyPasswordAndConfirmPassword(e) {
    let errorExist = false;
    if (oldPassword.value!==alumni.password) {
        setInValid(oldPassword);
        errorExist = true;
    } else {
        setValid(oldPassword);
    }

    if (!verifyPasswordCriteria(newPassword)) {
        setInValid(newPassword)
        errorExist = true;
    } else{
        setValid(newPassword);       
    }

    if (!verifyPasswordCriteria(confirmNewPassword) || confirmNewPassword.value!==newPassword.value) {
        setInValid(confirmNewPassword)
        errorExist = true;
    } else{
        setValid(confirmNewPassword);
    }

    if(errorExist){
        e.preventDefault();
    }else{
        /*CHANGE PASSWORD*/

    }
}

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

function verifyPasswordCriteria(password) {
    //valid password length range from 5 to 20
    if (password.value.length < 5 || password.value.length > 20) {
        return false;
    }
    return true;
}

function deleteAccount(e) {
    if (deleteAccountInput.value === 'DELETE') {
        /* SUCCESS DELETE ACCOUNT */
        window.location.href = '/src/html/Alumni/homePage.html';
    } else {
        e.preventDefault();
        if (!deleteAccountInput.classList.contains('is-invalid')) {
            deleteAccountInput.classList.add('is-invalid');
        }
    }
}

function loadData() {
    const alumni = dummyResponse.Alumni.filter(function (alumni) {
        return alumni.alumniId === currentAlumniId;
    })[0];
    name.textContent = alumni.name;
    gender.textContent = alumni.gender;
    graduated.textContent = alumni.graduated;
    department.textContent = alumni.department;
    email.textContent = alumni.email;
    contactNumber.textContent = alumni.contactNumber;
    biography.textContent = alumni.biography;
}

loadData();
changePasswordButton.addEventListener('click', (e) => verifyPasswordAndConfirmPassword(e));
deleteAccountButton.addEventListener('click', (e) => deleteAccount(e));
