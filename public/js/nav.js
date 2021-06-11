// scroll to bottom when user click 'Contact Us'
const footer = document.getElementById('contactUs');
const contactUsNavItem = document.querySelector('#contact-us-nav-item');
if(contactUsNavItem){
  contactUsNavItem.addEventListener('click', function(event){
    footer.scrollIntoView({behavior: "smooth"});
  });
}