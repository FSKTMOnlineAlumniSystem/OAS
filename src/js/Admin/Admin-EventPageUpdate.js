console.log('testing')
sessionStorage.setItem('event', 'update')
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
           document.getElementById("prevImage").src=e.target.result;
           document.getElementById("wizardPicturePreview").src=e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
    }
}