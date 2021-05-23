const profilePicture = document.querySelector('#profilePicture');
const name = document.querySelector('#name');
const email = document.querySelector('#email');

const oldPassword = document.getElementById('oldPassword');
const newPassword = document.getElementById('newPassword');
const confirmNewPassword = document.getElementById('confirmNewPassword');
const changePasswordForm = document.querySelector('#changePasswordForm');

//Validation for change password
function verifyPasswordAndConfirmPassword(e) {
    let errorExist = false;
    if (!verifyPasswordCriteria(oldPassword)) {
        setInValid(oldPassword);
        errorExist = true;
    } else {
        setValid(oldPassword);
    }

    if (!verifyPasswordCriteria(newPassword)) {
        setInValid(newPassword)
        errorExist = true;
    } else {
        setValid(newPassword);
    }

    if (!verifyPasswordCriteria(confirmNewPassword) || confirmNewPassword.value !== newPassword.value) {
        setInValid(confirmNewPassword)
        errorExist = true;
    } else {
        setValid(confirmNewPassword);
    }

    if (errorExist) {
        e.preventDefault();
    } else {
        /*CHANGE PASSWORD*/
        changePasswordButton.textContent = 'Updating...';
        setTimeout(function () {
        }, 1000);
    }
}

//validate the new password criteria
function verifyPasswordCriteria(password) {
    //valid password length range from 5 to 20
    if (password.value.length < 5 || password.value.length > 20) {
        return false;
    }
    return true;
}

//load all the data when landing the page
changePasswordForm.addEventListener('submit', (e) => verifyPasswordAndConfirmPassword(e));

