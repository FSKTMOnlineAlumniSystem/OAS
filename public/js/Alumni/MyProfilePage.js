import  { dummyResponse, updateDummyData } from '../dummydata.js';

//get the current signed in alumni id from localStorage
const currentAlumniId = localStorage.getItem('SignedInAlumniId');
//get the current alumni object
const alumni = dummyResponse.Alumni.filter(function (alumni) {
    return alumni.alumniId === currentAlumniId;
})[0];

const profilePicture = document.querySelector('#profilePicture');
const name = document.querySelector('#name');
const gender = document.querySelector('#gender');
const graduated = document.querySelector('#graduated');
const department = document.querySelector('#department');
const email = document.querySelector('#email');
const biography = document.querySelector('#biography');

const oldPassword = document.getElementById('oldPassword');
const newPassword = document.getElementById('newPassword');
const confirmNewPassword = document.getElementById('confirmNewPassword');
const changePasswordButton = document.querySelector('#changePasswordButton');

const deleteAccountInput = document.querySelector('#deleteAccountInput');
const deleteAccountButton = document.querySelector('#deleteAccountButton');

//Validation for change password
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
        dummyResponse.Alumni.forEach((al)=>{
            if(al.alumniId===currentAlumniId){
                al.password = newPassword.value;
                updateDummyData(dummyResponse);
                changePasswordButton.textContent='Updating...';
                setTimeout(function(){
                    location.reload();
                },1000);
                return;
            }
        });
    }
}


function verifyPasswordCriteria(password) {
    //valid password length range from 5 to 20
    if (password.value.length < 5 || password.value.length > 20) {
        return false;
    }
    return true;
}

//Delete user account from the data
function deleteAccount(e) {
    if (deleteAccountInput.value === 'DELETE') {
        /* SUCCESS DELETE ACCOUNT */
        dummyResponse.Alumni.forEach((al,index)=>{
            if(al.alumniId===currentAlumniId){
                dummyResponse.Alumni.splice(index,1);
                deleteAccountButton.textContent='Deleting...';
                updateDummyData(dummyResponse);
                setTimeout(function(){
                    window.location.href = '/src/html/Alumni/LoginPage.html';
                },1000);
            }
        });
    } else {
        e.preventDefault();
        if (!deleteAccountInput.classList.contains('is-invalid')) {
            deleteAccountInput.classList.add('is-invalid');
        }
    }
}

//load all the data when landing the page
// function loadData() {
//     profilePicture.src = ALUMNI_IMG_PATH + alumni.imageId;
//     name.textContent = alumniName;
//     gender.textContent = alumni.gender;
//     graduated.textContent = alumni.graduated;
//     department.textContent = alumni.department;
//     email.textContent = alumni.email;
//     biography.textContent = alumni.biography;
// }

// loadData();
changePasswordButton.addEventListener('click', (e) => verifyPasswordAndConfirmPassword(e));
deleteAccountButton.addEventListener('click', (e) => deleteAccount(e));
