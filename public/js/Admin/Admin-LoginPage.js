
const form_1 = document.getElementById('signIN');
const staticEmail = document.getElementById('staticEmail');
const inputPassword = document.getElementById('inputPassword');


const form_2 = document.getElementById('forgot');
const sendEmail = document.getElementById('sendEmail');


const emailFormat = /[a-zA-Z0-9]+@[a-z0-9]+(\.[a-z]+)+/;


//form validation for Forgot modal
form_2.addEventListener('submit', (evt) => {

    let errorExist = false;
    const sendEmailValue = sendEmail.value.trim();

    if (isEmpty(sendEmailValue) || !sendEmail.value.match(emailFormat)) {
        setErrorFor(sendEmail);
        errorExist = true;
    } else {
        setSuccessFor(sendEmail);
    }

    if (errorExist) {
        evt.preventDefault();
    }else{
        document.querySelector('#forgotPassword-button').innerHTML = `<span class="spinner-border spinner-border-sm mr-2"></span>Submitting`;
    }

});

//form validation for sign in
form_1.addEventListener('submit', (ev) => {

    let errorExist = false;
    let getEmail = false;

    const staticEmailValue = staticEmail.value.trim();
    const inputPasswordValue = inputPassword.value.trim();

    if (isEmpty(staticEmailValue) || !staticEmail.value.match(emailFormat)) {
        setErrorFor(staticEmail);
        errorExist = true;
    }

    if (errorExist) {
        ev.preventDefault();
    } 
});



function setErrorFor(input)
{

    if (input.classList.contains("is-valid")) {
        input.classList.replace("is-valid", "is-invalid");
    } else {
        input.classList.add("is-invalid");
    }

}

function setSuccessFor(input)
{

    if (input.classList.contains("is-invalid")) {
        input.classList.replace("is-invalid", "is-valid");
    } else {
        input.classList.add("is-valid");
    }

}

function isEmpty(obj)
{
    return obj.length == 0;

}

