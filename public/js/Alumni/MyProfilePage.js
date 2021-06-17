const oldPassword = document.getElementById('oldPassword');
const newPassword = document.getElementById('newPassword');
const confirmNewPassword = document.getElementById('confirmNewPassword');
const changePasswordModal = document.querySelector('#changePasswordModal');

const deleteAccountInput = document.querySelector('#deleteAccountInput');
const deleteAccountForm = document.querySelector('#deleteAccountForm');

const privacySwitch = document.querySelector('#privacySwitch');

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
    if (verifyPasswordCriteria(deleteAccountInput)) {
        deleteAccountButton.innerHTML = `<span class="spinner-border spinner-border-sm mr-2"></span>Deleting...`;
    } else {
        e.preventDefault();
        setInValid(deleteAccountInput);
    }
}
changePasswordModal.addEventListener('submit', (e) => verifyPasswordAndConfirmPassword(e));
deleteAccountForm.addEventListener('submit', (e) => deleteAccount(e));
privacySwitch.addEventListener('change', () => {
    $('#changePrivacyForm').submit();
})
