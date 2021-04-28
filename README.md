# core
This is the main repo for the alumni system. So treat the repo carefully :kissing:  
Make sure you know how to revert changes made to reverse any destructive changes to the repo.   

## TO-DO :hugs:
- [ ] Add below code into the head tag of html
```
<!-- bootstrap -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
    integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous" />
  <!-- font -->
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;600&display=swap" rel="stylesheet" />
  <!-- icon - fontawesome -->
  <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
    integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />
  <!-- custom css files -->
  <link rel="stylesheet" type="text/css" href="../../css/Alumni/index.css" />
  <link rel="stylesheet" type="text/css" href="../../css/Alumni/SearchBar.css" />
``` 
- [ ] Add below script before the close tag of body tag
```
  <!-- general js files -->
  <script type="text/javascript" src="/src/js/utility.js"></script>
  <script type="module" src="/src/js/addHeader.js"></script>
  <script type="text/javascript" src="/src/js/addNavFooter.js"></script>
  <script type="text/javascript" src="/src/js/addSearchBar.js"></script>
  <script type="module" src="/src/js/Alumni/searchAlgo.js"></script>
  <!-- custom js files -->
  <script type="module" src="/src/js/Alumni/EventPage.js"></script>
  <!-- bootstrap javascript files -->
  <script src="/libs/bootstrap/js/bootstrap.bundle.js"></script>
  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
    integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
    crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js"
    integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut"
    crossorigin="anonymous"></script>
```
### Crosscheck before Thursday testing
- [ ] Yong Ming
- [ ] He Lin
- [ ] Nicole
- [ ] Wei Hao
- [ ] Xin Joe
- [ ] Yan Wen
- [ ] Rachel

## Requirements :snowflake:
The system should provide the following functions: 

Alumni: 
* **Register** a new user account and user login to access the system 
* **Manage** user profile (view, update user details, delete a user account) 
* **View event** organised by the faculty. 
* **Add** a new job advertisement, can **update and delete** the job advertisement), **view** the list of advertisement posted by all the alumni 
* **Search alumni** and view the alumni profile 

Faculty Administrator: 
* **Manage Alumni account** (can view the list of alumni, update alumni information, approve a new alumni account and delete an account). 
* Create a new event to **invite alumni** to join, can **update and delete** the event.