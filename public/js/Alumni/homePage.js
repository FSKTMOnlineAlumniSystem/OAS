
localStorage.setItem('currentPage', "homePage");
document.getElementById('event').innerHTML = "";

//event card
for (let i = 0; i < event_array.length; i++) {

    var d = new Date(event_array[i].dateTime);

    let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
    let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
    let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);

    const card_event = document.createElement('div');
    card_event.setAttribute('class', 'swiper-slide pl-1 pr-1 h-100');
    console.log(event_array[i].imageId);
    card_event.innerHTML = `
                <div class="card h-100" id="${event_array[i].eventId}">
                <a style="text-decoration:none; color:black;" href="eventdetails?eventId=${event_array[i].eventId}">
                        <div class="w-100 bg-dark d-flex" style="aspect-ratio:1/1;overflow:hidden;">
                            <img  class="card-img-top w-100 m-auto" src="${event_array[i].imageId}" alt="Card image cap">
                        </div>
            
                    <div class="card-body" >
                        <h5 class="card-title text-left">${event_array[i].title}</h5>
                        <div class="card-text">
                            <div class="row">
                                <div class="col-2 d-flex flex-column">
                                <i class="far fa-calendar-alt" style="color: rgb(218, 58, 47);"></i>
                                 </div>
                                <div class="col-10 d-flex flex-column">
                                    <span>${`${da}, ${mo} ${ye}`}</span>
                                </div>                    
                            </div>
                                <div class="row">
                                    <div class="col-2 d-flex flex-column">
                                    <i class="far fa-clock" style="color: rgb(118, 172, 250);"></i>
                                    </div>
                                    <div class="col-10 d-flex flex-column">
                                        <span>${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                </div>
                            <div class="row">
                                <div class="col-2 d-flex flex-column">
                                        <i class="fas fa-map-marked-alt" 
                                        style="color: rgb(167, 0, 0);"></i>
                                </div>
                                <div class="col-10 d-flex flex-column">
                                    <span>${event_array[i].location}</span>
                                </div>
                            </div>
                        </div>                
                     </div>
                </a>
                </div>
          
                `;
    // <a href="eventdetails?eventId=${event_array[i].eventId}" target="_self" class="nostyle">
    //     <div class="card h-100" id="${event_array[i].eventId}">
    //         <div style="aspect-ratio:1/1;" class="d-flex align-items-center custom-dark-gray">
    //             <img src="${event_array[i].imageId}" class="card-img-top image__fixed-height m-auto w-100" alt="eventPhoto">
    //             </div>
    //             <div class="card-body d-flex flex-column justify-content-between event-card-body">
    //                 <div class="cards pb-2">
    //                     <h5 class="card-title mb-0 font-weight-bold text-left">${event_array[i].title}</h5>
    //                 </div>
    //                 <div class="">
    //                     <div class="row cards">
    //                         <span class="card-title col-12"><?= upcomingOrPast($event['dateTime']); ?></span>
    //                     </div>
    //                     <div class="row cards">
    //                         <div class="col-2"><i class="far fa-calendar-alt" style="color: rgb(218, 58, 47);"></i>
    //                         </div>
    //                         <div class="col-10" data-datetime="date">${`${da}, ${mo} ${ye}`}</div>
    //                     </div>
    //                     <div class="row cards">
    //                         <div class="col-2"><i class="far fa-clock text-primary"></i></div>
    //                         <div class="col-10" data-datetime="time">${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
    //                     </div>
    //                     <div class="row cards">
    //                         <div class="col-2"><i class="fas fa-map-marked-alt text-danger"></i></div>
    //                         <div class="col-10">${event_array[i].location}</div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //             </a>

        const E = document.getElementById('event');

    const evtHandler = evt => {

            localStorage.setItem('eventId', event_array[i].eventId);
        location.href = "eventdetails?eventId=".event_array[i].eventId;

    };

        card_event.querySelector('#' + event_array[i].eventId).addEventListener('click', evtHandler);

        E.appendChild(card_event);
}



        //alumni card
        document.getElementById('alumni').innerHTML = "";
        for (let i = 0; i < alumni_array.length; i++) {
    const card_alumni = document.createElement('div');
        card_alumni.setAttribute('class', 'swiper-slide pl-1 pr-1');
        card_alumni.innerHTML = `

        <div class="card h-100" id="${alumni_array[i].alumniId}">
            <a style="text-decoration:none; color:black;" href="alumni/profile?id=${alumni_array[i].alumniId}">
                <div class="w-100 bg-dark" style="aspect-ratio:1/1;overflow:hidden;">
                    <img class="card-img-top w-100" src="${alumni_array[i].imageId}" alt="Card image cap"
                        width="100%">
                                </div>
                    <div class="card-body">
                        <div class="row d-flex justify-content-center m-0">
                            <b><h5 class="card-title-title">
                                ${alumni_array[i].name}</h5><b>
                                    </div>
                                <p class="card-text mb-1"><i class="fas fa-book-user text-secondary  mr-2"></i><span>Biography</span><br>
                                    <p class="card-text mb-0" style="display: -webkit-box;
                                        -webkit-line-clamp: 3;
                                        -webkit-box-orient: vertical;
                                        overflow: hidden;
                                        text-overflow: ellipsis;">${alumni_array[i].biography}</p>
                                    </p>
                                </div>
                                </a>
                        </div> `


                        const A = document.getElementById('alumni');

                        A.appendChild(card_alumni);
}



                        //job
                        document.getElementById('job_row_1').innerHTML = "";

                        for (let i = 0; i < 2; i++) {

    const card_job = document.createElement('div');
                        card_job.setAttribute('class', 'col');

                        card_job.innerHTML = `

                        <div id="${job_array[i].imageId}" class="h-100">
                            <a class="d-contents" href="jobdetails?jobid=${job_array[i].jobId}">
                                <img src="${job_array[i].imageId}" alt="..."
                                    width="100%" class="job_image" > 
        </a>`

                                const J = document.getElementById('job_row_1');

                                J.appendChild(card_job);
}

                                document.getElementById('job_row_2').innerHTML = "";


                                for (let i = 2; i < 4; i++) {

    const card_job_1 = document.createElement('div');
                                card_job_1.setAttribute('class', 'col');

                                card_job_1.innerHTML = `

                                <div id="${job_array[i].imageId}" class="h-100">
                                    <a class="d-contents" href="jobdetails?jobid=${job_array[i].jobId}">
                                        <img src="${job_array[i].imageId}" alt="..."
                                            width="100%" class="job_image" >
        </a> `


                                        const J_1 = document.getElementById('job_row_2');

                                        J_1.appendChild(card_job_1);
}



                                        import Swiper from 'https://unpkg.com/swiper/swiper-bundle.esm.browser.min.js'
                                        var slidesPerView = 3;
                                        var spaceBetween = 80;

                                        if (window.innerWidth < 1000 || screen.width < 1000) {
                                            slidesPerView = 2;
                                        spaceBetween = 30;
}
                                        if (window.innerWidth < 600 || screen.width < 600) {
                                            slidesPerView = 1;
                                        spaceBetween = 10;
}

                                        var swiper = new Swiper('.swiper-container', {
                                            slidesPerView: slidesPerView,
                                        spaceBetween: spaceBetween,
                                        slidesPerGroup: slidesPerView,
                                        loop: true,
                                        loopFillGroupWithBlank: true,
                                        pagination: {
                                            el: '.swiper-pagination',
                                        clickable: true,
    },
                                        navigation: {
                                            nextEl: '.swiper-button-next',
                                        prevEl: '.swiper-button-prev',
    },
});




                                        var EventView = document.getElementById('viewMoreEvents');

                                        EventView.onclick = function () {

                                            location.href = "/event";

}

                                        var JobView = document.getElementById('viewMoreJob');

                                        JobView.onclick = function () {

                                            location.href = "job";

}

                                        var AlumniView = document.getElementById('viewMoreAlumni');

                                        AlumniView.onclick = function () {

                                            location.href = "/alumni";

}





                                        var TxtType = function (el, toRotate, period) {

                                            this.toRotate = toRotate;
                                        this.el = el;
                                        this.loopNum = 0;
                                        this.period = parseInt(period, 8) || 2000;
                                        this.txt = '';
                                        this.tick();
                                        this.isDeleting = false;

};

                                        TxtType.prototype.tick = function () {

    var i = this.loopNum % this.toRotate.length;
                                        var fullTxt = this.toRotate[i];

                                        if (this.isDeleting) {
                                            this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
                                            this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

                                        this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

                                        var that = this;
                                        var delta = 200 - Math.random() * 100;

                                        if (this.isDeleting) {delta /= 4; }

                                        if (!this.isDeleting && this.txt === fullTxt) {
                                            delta = this.period;
                                        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
                                            this.isDeleting = false;
                                        this.loopNum++;
                                        delta = 500;
    }

                                        setTimeout(function () {

                                            that.tick();
    }, delta);

};

                                        window.onload = function () {

    var elements = document.getElementsByClassName('typewrite');

                                        for (var i = 0; i < elements.length; i++) {

        var toRotate = elements[i].getAttribute('data-type');
                                        var period = elements[i].getAttribute('data-period');

                                        if (toRotate) {
                                            new TxtType(elements[i], JSON.parse(toRotate), period);
        }

    }

                                        // INJECT CSS
                                        var css = document.createElement("style");
    css.innerHTML = ".typewrite > .wrap {border - right: 0.08em solid #fff}";
                                        document.body.appendChild(css);

};




