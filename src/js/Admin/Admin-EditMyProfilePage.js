import dummyResponse from '../dummydata.js';

const imgPath = "/Assets/imgs/";
const wizardPicturePreview = document.querySelector('#wizardPicturePreview');
const img = document.querySelector('#wizard-picture');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const form = document.querySelector('form');

const currentAdminId = "AD-1";
const admin = dummyResponse.Admin.filter(function (admin) {
    return admin.adminId === currentAdminId;
})[0];

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

img.addEventListener('change',(e)=>readURL(e));
function readURL(e) {
    if (e.target.files && e.target.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            wizardPicturePreview.src = e.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);
    }
}

/*Form Validation for Admin Edit My Profile (email, contactNumber, biography)*/
function isEmpty(obj) {
    return obj.value.length == 0;
}
const emailFormat = /[a-zA-Z0-9]+@[a-z0-9]+(\.[a-z]+)+/;

form.addEventListener('submit', (e) => {
    let errorExist = false; //false if no error exists in name, email
    if(name.value.length<5){
        setInValid(name);
        errorExist = true;
    }else{
        setValid(name);
    }

    if (isEmpty(email) || !email.value.match(emailFormat)) {
        setInValid(email);
        errorExist = true;
    }else{
        setValid(email);
    }

    if (errorExist) e.preventDefault();
    else {
        admin.name = name.value;
        admin.email = email.value;
    }
})

/*Check whether there is any changes that might be lost*/
cancelButton.addEventListener('click', () => {
    if (wizardPicturePreview.src.includes(imgPath+admin.imageId) &&
    admin.name == name.value &&
        admin.email == email.value) {
        location.href = "Admin-MyProfilePage.html";
    } else {
        /*POP UP MODAL ask if cancel will lose changes */
        $('#cancelChangesModal').modal('show');
    }
});

/*Close Modal */
closeCancelChangesModalButton.addEventListener('click', () => closeModal('#cancelChangesModal'));
stayButton.addEventListener('click', () => closeModal('#cancelChangesModal'));
function closeModal(modalId) {
    $(modalId).modal('hide');
}

function loadData() {
    wizardPicturePreview.src = imgPath+admin.imageId;
    name.value = admin.name;
    email.value = admin.email;
}

loadData();