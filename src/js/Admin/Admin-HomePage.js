import {dummyResponse} from '../dummydata.js'

const approvedAlumni = document.querySelector('#approvedAlumni');
const unapprovedAlumni = document.querySelector('#unapprovedAlumni');
const numberOfEvents = document.querySelector('#numberOfEvents');

//load all the data when landing the page
function loadData(){
    approvedAlumni.textContent = 0;
    unapprovedAlumni.textContent = 0;
    numberOfEvents.textContent = 0;
    dummyResponse.Alumni.forEach((al)=>{
        if(al.approvedBy){
            approvedAlumni.textContent++;
        }else{
            unapprovedAlumni.textContent++;
        }
    })
    numberOfEvents.textContent = dummyResponse.Event.length;
}

loadData();