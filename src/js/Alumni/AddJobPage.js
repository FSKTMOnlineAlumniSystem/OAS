/*  ==========================================
    SHOW UPLOADED IMAGE
* ========================================== */
var input = document.getElementById( 'upload' );
function readURL(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        console.log(e);
        document.getElementById('imageResult').setAttribute('src', e.target.result)
      };
      reader.readAsDataURL(input.files[0]);
  }
}

input.addEventListener( 'change', (event)=>readURL(input));

