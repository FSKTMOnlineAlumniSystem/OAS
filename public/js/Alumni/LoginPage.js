// import { dummyResponse, updateDummyData } from "../dummydata.js";

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
const img = document.querySelector('#wizard-picture');
const wizardPicturePreview = document.querySelector('#wizardPicturePreview');


/*Check the file extension of the image & Update preview*/

const icNumberFormat = /^\d{6}-\d{2}-\d{4}/;
const emailFormat = /[a-zA-Z0-9]+@[a-z0-9]+(\.[a-z]+)+/;

//form validation for forgot modal
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
    // else {
    //     localStorage.setItem('ForgotPassword', sendEmailValue);
    // }

});

//form validation for sign in
// form_1.addEventListener('submit', (ev) => {

//     let errorExist = false;
//     let getEmail = false;

//     const staticEmailValue = staticEmail.value.trim();
//     const inputPasswordValue = inputPassword.value.trim();

//     if (isEmpty(staticEmailValue) || !staticEmail.value.match(emailFormat)) {
//         setErrorFor(staticEmail);
//         errorExist = true;
//     } else {

        // for (let i = 0; i < dummyResponse.Alumni.length; i++) {

        //     if (staticEmailValue == dummyResponse.Alumni[i].email) {
        //         getEmail = true;

        //         setSuccessFor(staticEmail);
        //         errorExist = false;

        //         if (isEmpty(inputPasswordValue)) {

        //             setErrorFor(inputPassword);
        //             errorExist = true;
        //         } else {

        //             if (!dummyResponse.Alumni[i].approvedBy) {
        //                 setErrorFor(inputPassword);
        //                 errorExist = true;
        //             } else {

        //                 if (inputPasswordValue == dummyResponse.Alumni[i].password) {

        //                     //To save who is logged in

        //                     localStorage.setItem('SignedInAlumniId', dummyResponse.Alumni[i].alumniId);
        //                     if (!localStorage.getItem('dummyResponse')) {
        //                         updateDummyData(dummyResponse);

        //                     }

        //                     setSuccessFor(inputPassword);
        //                     errorExist = false;

        //                 } else {

        //                     setErrorFor(inputPassword);
        //                     errorExist = true;
        //                 }
        //             }

        //         }
        //         break;
        //     }

        // }


        // if (!getEmail) {
        //     errorExist = true;
        //     setErrorFor(staticEmail);
        //     setErrorFor(inputPassword);
        // }
    // }

    // if (errorExist) {
    //     ev.preventDefault();
    // }
    // else {
        // ev.preventDefault();
        // jumpHome();
//     }
// });


//go to homePage
function jumpHome() {

    location.replace("../../html/Alumni/homePage.html");

}


img.addEventListener('change', (e) => readURL(e));

function readURL(e) {

    let allowedExtensions =
        /(\.png|\.jpg|\.jpeg)$/i;

    if (e.target.files && e.target.files[0] && allowedExtensions.test(e.target.value)) {

        var reader = new FileReader();

        reader.onload = function (e) {
            wizardPicturePreview.src = e.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);
        choosePictureDescription.textContent = "Choose picture";

    } else {
        choosePictureDescription.textContent = "Please choose picture in .png, .jpg or .jpeg format";
    }

}

//form validation for sign up
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


    if (isEmpty(ICValue) || !IC.value.match(icNumberFormat)) {
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


    var imgValue = img.value;
    var imgid = imgValue.split("\\");
    var i = imgid.length - 1;
    var im = imgid[i];


    if (errorExist) {
        e.preventDefault();
    } else {
        // const obj = {
        //     "alumniId": "AL-" + dummyResponse.Alumni.length,
        //     "approvedBy": "",
        //     "email": emailValue,
        //     "password": passwordValue,
        //     "icNumber": ICValue,
        //     "gender": GenderValue,
        //     "name": FirstNameValue + LastNameValue,
        //     "department": DepartmentValue,
        //     "graduated": BatchValue,
        //     "imageId": im,
        //     "contactNumber": "03-79676347",
        // }

        // dummyResponse.Alumni.push(obj);
        // updateDummyData(dummyResponse);

        // e.preventDefault();
        // getWait();

    }
});

//pop up the wait for verification modal
function getWait() {

    $('#wait').modal('toggle');
    $('#signUP').modal('hide');

}

function checkLength(passwordValue) {

    if (Password.value.length < 5) {
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

function generatePassword() {
    var length = 8,
      charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }


  console.log(generatePassword());

