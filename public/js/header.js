const closeNotification = (eventId) => {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("txtHint").innerHTML = this.responseText;
    }
  };
  xmlhttp.open("POST", "EventController.php");
  xmlhttp.send(eventId);
}
// $('#deleteButton').click(function(){
//   $.ajax({
//     url: 'deleteJobController.php',
//     type: 'post',
//     data: {ajax : 1, deleteID: deleteID},
//     success: function(resp){
//       let page = 0;
//       var outputList = JSON.parse(resp);

//       loadMyJobList(page,outputList,outputList.length);
//     },
//   });
// closeModal("#deleteModal")
// });
// add event listener to all close button in the panel
const closeBtnArr = Array.from(document.querySelectorAll('[data-close-btn-id]'));
closeBtnArr.forEach((btn,index) => {
  btn.addEventListener('click', (evt) => {
    
    const eventId = btn.dataset.closeBtnId;
    var formData = new FormData();
    formData.append('ajax', 'hello');
    formData.append('eventId', eventId);
    fetch('EventController', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      // mode: 'cors', // no-cors, *cors, same-origin
      // headers: {
      //   'Content-Type': 'application/json'
      // },
      body: formData // body data type must match "Content-Type" header
    })
      .then(res => 
        { console.log('jsonify the response');
          return res.json();})
      .then(data => {
        console.log(data);
      })
    evt.stopPropagation();
    const div = btn.closest('[data-notification-href]');
    document.getElementById('dropdown-menu').removeChild(div);
  });
});
// add event listener to notification
const notificationDivArr = Array.from(document.querySelectorAll('[data-notification-href]'));
notificationDivArr.forEach(div => {
  div.addEventListener('click', (evt) => {
    window.location.href = div.dataset.notificationHref;
  });
});