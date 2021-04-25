import { dummyResponse, updateDummyData } from "../dummydata.js";

const form_2 = document.getElementById('forgot');
const sendEmail = document.getElementById('sendEmail');


const form_1 = document.getElementById('signIN');
const staticEmail = document.getElementById('staticEmail');
const inputPassword = document.getElementById('inputPassword');


const form = document.getElementById('signUP');
const FirstName = document.getElementById('FirstNameID');
const LastName = document.getElementById('LastNameID');
const Email = document.getElementById('Email');
const IC = document.getElementById('IC');
const password = document.getElementById('Password');
const Department = document.getElementById('Department');
const Batch = document.getElementById('Batch');
const Gender = document.getElementById('Gender');



const emailFormat = /[a-zA-Z0-9]+@[a-z0-9]+(\.[a-z]+)+/;

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
    }

});


form_1.addEventListener('submit', (ev) => {

    let errorExist = false;
    let getEmail = false;

    const staticEmailValue = staticEmail.value.trim();
    const inputPasswordValue = inputPassword.value.trim();

    if (isEmpty(staticEmailValue) || !staticEmail.value.match(emailFormat)) {
        setErrorFor(staticEmail);
        errorExist = true;
    } else {
        console.log("elseemail");

        for (let i = 0; i < dummyResponse.Alumni.length; i++) {

            if (staticEmailValue == dummyResponse.Alumni[i].email) {
                getEmail = true;

                setSuccessFor(staticEmail);
                errorExist = false;

                if (isEmpty(inputPasswordValue)) {

                    setErrorFor(inputPassword);
                    errorExist = true;
                } else {
                    console.log("dummy");
                    if (inputPasswordValue == dummyResponse.Alumni[i].password) {

                        //To save who is logged in
                        localStorage.setItem('SignedInAlumniId', dummyResponse.Alumni[i].alumniId);
                        if (!localStorage.getItem('dummyResponse')) {
                            updateDummyData(dummyResponse);
                        }

                        setSuccessFor(inputPassword);
                        errorExist = false;

                    } else {
                        
                        setErrorFor(inputPassword);
                        errorExist = true;
                    }
                }
                break;
            }

        }

        if (!getEmail) {
            errorExist = true;
            setErrorFor(staticEmail);
            setErrorFor(inputPassword);
        }

    }

    if (errorExist) {
        ev.preventDefault();
    }
    else {
        location.replace("../../html/Alumni/homePage.html");
        ev.preventDefault();
    }


});



form.addEventListener('submit', (e) => {

    let errorExist = false;

    const FirstNameValue = FirstNameID.value.trim();
    const emailValue = Email.value.trim();
    const LastNameValue = LastNameID.value.trim();
    const ICValue = IC.value.trim();
    const passwordValue = Password.value.trim();
    const DepartmentValue = Department.value.trim();
    const BatchValue = Batch.value.trim();
    const GenderValue = Gender.value.trim();




    if (DepartmentValue == 0) {

        setErrorFor(Department);
        errorExist = true;

    } else {

        setSuccessFor(Department);
    }

    if (BatchValue == 0) {

        setErrorFor(Batch);
        errorExist = true;

    } else {

        setSuccessFor(Batch);

    }

    if (GenderValue == 0) {

        setErrorFor(Gender);
        errorExist = true;
    } else {

        setSuccessFor(Gender);
    }

    if (isEmpty(FirstNameValue)) {
        setErrorFor(FirstName);
        errorExist = true;
    } else {
        setSuccessFor(FirstName);
    }

    if (isEmpty(LastNameValue)) {
        setErrorFor(LastName);
        errorExist = true;
    } else {
        setSuccessFor(LastName);
    }


    if (isEmpty(emailValue) || !Email.value.match(emailFormat)) {
        setErrorFor(Email);
        errorExist = true;
    } else {
        setSuccessFor(Email);
    }


    if (isEmpty(ICValue) || (ICValue.length == 11)) {
        setErrorFor(IC);
        errorExist = true;
    } else {
        setSuccessFor(IC);
    }


    if (isEmpty(passwordValue) || checkLength(passwordValue)) {
        setErrorFor(Password);
        errorExist = true;
    } else {
        setSuccessFor(Password);
    }


    if (errorExist) {
        e.preventDefault();
    }


});



function checkLength(passwordValue) {

    if (Password.value.length < 6) {
        return true;
    } else if (Password.value.length > 20) {
        return true;
    } else {
        return false;
    }

}

function setErrorFor(input) {
    if (input.classList.contains("is-valid")) {
        input.classList.replace("is-valid", "is-invalid");
    } else {
        input.classList.add("is-invalid");
    }
}


    function setSuccessFor(input) {
        if (input.classList.contains("is-invalid")) {
            input.classList.replace("is-invalid", "is-valid");
        } else {
            input.classList.add("is-valid");
        }
    }

    function isEmpty(obj) {
        return obj.length == 0;
    }
