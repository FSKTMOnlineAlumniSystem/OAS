import dummyResponse from "../dummydata.js";


const form_1 = document.getElementById('signIN');
const staticEmail = document.getElementById('staticEmail');
const inputPassword = document.getElementById('inputPassword');

const emailFormat = /[a-zA-Z0-9]+@[a-z0-9]+(\.[a-z]+)+/;


form_1.addEventListener('submit', (ev) => {

    let errorExist = false;

    const staticEmailValue = staticEmail.value.trim();
    const inputPasswordValue = inputPassword.value.trim();

    console.log(staticEmailValue);
    console.log(inputPasswordValue);


    if (isEmpty(staticEmailValue) || !staticEmail.value.match(emailFormat)) {
        setErrorFor(staticEmail);
        errorExist = true;
    } else {
        console.log("elseemail");

        for (let i = 0; i < dummyResponse.Alumni.length; i++) {
            console.log("dumm");
            if (staticEmailValue == dummyResponse.Alumni[i].email) {
                console.log("foundemail");
                setSuccessFor(staticEmail);
                errorExist = false;

                if (isEmpty(inputPasswordValue)) {
                    console.log("empty");
                    setErrorFor(inputPassword);
                    errorExist = true;
                } else {

                    console.log("dummy");
                    if (inputPasswordValue == dummyResponse.Alumni[i].password) {
                        localStorage.setItem('SignedInAdminiId',dummyResponse.Alumni[i].alumniId);
                        console.log("foundpass");
                        setSuccessFor(inputPassword);
                        errorExist = false;

                    }else{
                        console.log("elsepass");
                         errorExist = true;
                    }

                   

                }
                break;
            }

        }
        

    }


    console.log(errorExist);
    if (errorExist) {
        ev.preventDefault();
    }
    else {
        location.replace("../../html/Admin/admin-homePage.html");
        ev.preventDefault();
    }



});



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