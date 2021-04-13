var newPassword = document.getElementById('NewPassword');
var confirmNewPassword = document.getElementById('ConfirmNewPassword');

function verifyPasswordAndConfirmPassword() {
    if (confirmNewPassword.value <5 || newPassword.value !== confirmNewPassword.value) {
        confirmNewPassword.classList.add("is-invalid");
        console.log(newPassword.value)
        console.log(confirmNewPassword.value)
    } else {
        confirmNewPassword.classList.replace("is-invalid","is-valid");
    }
}

function verifyPasswordCriteria(password){
    //valid password length range from 5 to 20
    if(password.length<5 || password.length>20){
        return false;
    }
    return true;
}

confirmNewPassword.addEventListener('keyup',verifyPasswordAndConfirmPassword());
