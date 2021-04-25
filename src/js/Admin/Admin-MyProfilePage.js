import {dummyResponse,updateDummyData} from '../dummydata.js';

const currentAdminId = localStorage.getItem('SignedInAdminId');
const admin = dummyResponse.Admin.filter(function (admin) {
    return admin.adminId === currentAdminId;
})[0];

const profilePicture = document.querySelector('#profilePicture');
const name = document.querySelector('#name');
const email = document.querySelector('#email');

const oldPassword = document.getElementById('oldPassword');
const newPassword = document.getElementById('newPassword');
const confirmNewPassword = document.getElementById('confirmNewPassword');
const changePasswordButton = document.querySelector('#changePasswordButton');

function verifyPasswordAndConfirmPassword(e) {
    let errorExist = false;
    if (oldPassword.value!==admin.password) {
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
        dummyResponse.Admin.forEach((ad)=>{
            if(ad.adminId===currentAdminId){
                ad.password = newPassword.value;
                updateDummyData(dummyResponse);
                changePasswordButton.textContent='Updating...';
                setInterval(function(){
                    location.reload();
                },1000);
                return;
            }
        });
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

function loadData() {
    profilePicture.src = imgPath + admin.imageId;
    name.textContent = admin.name;
    email.textContent = admin.email;
}

loadData();
changePasswordButton.addEventListener('click', (e) => verifyPasswordAndConfirmPassword(e));

