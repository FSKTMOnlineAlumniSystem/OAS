const wizardPicturePreview = document.querySelector('#wizardPicturePreview');
const img = document.querySelector('#wizard-picture');
const profilePicture = document.querySelector('#profilePicture');
const name = document.querySelector('#name');
const gender = document.querySelector('#gender');
const graduated = document.querySelector('#graduated');
const department = document.querySelector('#department');
const email = document.querySelector('#email');
const biography = document.querySelector('#biography');
const form = document.querySelector('form');
const saveButton = document.querySelector('#saveButton');
const cancelButton = document.querySelector('#cancelButton');
const closeCancelChangesModalButton = document.querySelector('#closeCancelChangesModalButton');
const stayButton = document.querySelector('#stayButton');
const choosePictureDescription = document.querySelector('#choosePictureDescription');


/*Check the file extension of the image & Update preview*/
img.addEventListener('change', (e) => readURL(e));
function readURL(e) {
    let allowedExtensions =
        /(\.png|\.jpg|\.jpeg)$/i;
    if (e.target.files && e.target.files[0] && e.target.files[0].size>1000000) {
        // To handle the file size
        choosePictureDescription.textContent = "Image size must be smaller than 1MB";
    }else if (e.target.files && e.target.files[0] && allowedExtensions.test(e.target.value)) {
        profilePicture.files = e.target.files;
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

/*Form Validation for Edit My Profile (email, biography)*/
function isEmpty(obj) {
    return obj.value.length == 0;
}
const emailFormat = /[a-zA-Z0-9]+@[a-z0-9]+(\.[a-z]+)+/;

form.addEventListener('submit', (e) => {
    // e.preventDefault();
    let errorExist = false; //false if no error exists in email, biography

    if (isEmpty(email) || !email.value.match(emailFormat)) {
        setInValid(email);
        errorExist = true;
    } else {
        setValid(email);
    }

    if (isEmpty(biography)) {
        setInValid(biography);
        errorExist = true;
    } else {
        setValid(biography);
    }

    if (!errorExist) {
        saveButton.textContent = 'Saving...';
        setTimeout(() => {
            // location.href='MyProfilePage.html';
        }, 1000);
    } else {
        e.preventDefault();
    }
});

/*Check whether there is any changes that might be lost*/
cancelButton.addEventListener('click', () => {
    if (!profilePicture.value &&
        alumniEmail == email.value &&
        alumniBiography == biography.value) {
        location.href = "/myprofile";
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
