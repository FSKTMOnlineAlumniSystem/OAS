

function openSignUp(){
    document.getElementById('signUP').style.display='block';
}

function closeSignUp(){
    window.onclick = function(event) {
        if (event.target == popUp) {
          popUp.style.display = "none";
        }
      }
}

function openSignIn(){
    document.getElementById('signIN').style.display='block';
    window.onclick = function(event) {
        if (event.target == popUp) {
          popUp.style.display = "none";
        }
      }
}

function search(){
    document.getElementById('search');
}

function searchBar(){
     
}

function viewMore(){

}

var password = document.getElementById('inputPassword');

function verifyPasswordCriteria(password){
  //valid password length range from 5 to 20
  if(password.length<5 || password.length>20){
      return false;
  }
  return true;
}
