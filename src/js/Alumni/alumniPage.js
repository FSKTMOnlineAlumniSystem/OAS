console.log('testing')
const dummyData = {
    alumniList: [
        {
            imgPath: "../../../Assets/imgs/DrTey.jpg",
            alumniName: "Dr XXX",
            description1: "Bachelor of Computer Science (Hons), graduated 2010",
            description2: "XXX is currently working at HTM Niseko, Hokkaido in Japan, building and expanding systems as a full stack lead developer."
        
        },
        {
            imgPath: "/Assets/imgs/tey.jpg",
            alumniName: "Dr Teh",
            description1: "Bachelor of Computer Science (Hons), graduated 2010",
            description2: "XXX is currently working at HTM Niseko, Hokkaido in Japan, building and expanding systems as a full stack lead developer."
        },
        {
            imgPath: "tey.jpg",
            alumniName: "Dr XXX",
            description1: "Bachelor of Computer Science (Hons), graduated 2010",
            description2: "XXX is currently working at HTM Niseko, Hokkaido in Japan, building and expanding systems as a full stack lead developer."
        },
        {
            imgPath: "tey.jpg",
            alumniName: "Dr Teh",
            description1: "Bachelor of Computer Science (Hons), graduated 2010",
            description2: "XXX is currently working at HTM Niseko, Hokkaido in Japan, building and expanding systems as a full stack lead developer."
        },
        {
            imgPath: "tey.jpg",
            alumniName: "Dr XXX",
            description1: "Bachelor of Computer Science (Hons), graduated 2010",
            description2: "XXX is currently working at HTM Niseko, Hokkaido in Japan, building and expanding systems as a full stack lead developer."
        },
        {
            imgPath: "tey.jpg",
            alumniName: "Dr Teh",
            description1: "Bachelor of Computer Science (Hons), graduated 2010",
            description2: "XXX is currently working at HTM Niseko, Hokkaido in Japan, building and expanding systems as a full stack lead developer."
        },
        {
            imgPath: "tey.jpg",
            alumniName: "Dr XXX",
            description1: "Bachelor of Computer Science (Hons), graduated 2010",
            description2: "XXX is currently working at HTM Niseko, Hokkaido in Japan, building and expanding systems as a full stack lead developer."
        },
        {
            imgPath: "tey.jpg",
            alumniName: "Dr Teh",
            description1: "Bachelor of Computer Science (Hons), graduated 2010",
            description2: "XXX is currently working at HTM Niseko, Hokkaido in Japan, building and expanding systems as a full stack lead developer."
        },
        {
            imgPath: "tey.jpg",
            alumniName: "Dr XXX",
            description1: "Bachelor of Computer Science (Hons), graduated 2010",
            description2: "XXX is currently working at HTM Niseko, Hokkaido in Japan, building and expanding systems as a full stack lead developer."
        },
        {
            imgPath: "tey.jpg",
            alumniName: "Dr Teh",
            description1: "Bachelor of Computer Science (Hons), graduated 2010",
            description2: "XXX is currently working at HTM Niseko, Hokkaido in Japan, building and expanding systems as a full stack lead developer."
        },
        {
            imgPath: "tey.jpg",
            alumniName: "Dr Ang1",
            description1: "Bachelor of Computer Science (Hons), graduated 2000",
            description2: "ANG1 is currently working at UM"
        },
        {
            imgPath: "tey.jpg",
            alumniName: "Dr Ang2",
            description1: "Bachelor of Computer Science (Hons), graduated 2000",
            description2: "ANG2 is currently working at UKM"
        },
    ]
}

let pageIndex = 0;

const loadAlumniList = (pageIndex) => {
    document.getElementById('pageIndex').innerHTML = pageIndex+1+"/"+Math.ceil(dummyData.alumniList.length/10);
    document.getElementById('alumniList').innerHTML = "";
    let alumniStartIndex = pageIndex * 10;
    let alumniEndIndex = alumniStartIndex + 10;
    console.log(pageIndex)
    // console.log('alumniEndIndex'+alumniEndIndex)
    // console.log('length'+dummyData.alumniList.length)
    if(alumniEndIndex>=dummyData.alumniList.length){
        document.getElementById('btn nextPage-btn btn-sm').disabled = true;
        console.log('last page')
    }
    else{
        document.getElementById('btn nextPage-btn btn-sm').disabled = false;
    }
    if(pageIndex==0){
        document.getElementById('btn previousPage-btn btn-light btn-sm').disabled = true;
        console.log('last page')
    }
    else{
        document.getElementById('btn previousPage-btn btn-light btn-sm').disabled = false;
    }
    for (let i = alumniStartIndex; i < alumniEndIndex && i < dummyData.alumniList.length; i++) {
        document.getElementById('alumniList').innerHTML += 
        `<div class="media justify-content-center mb-2 w-75" style="background-color:#E9E5E5;">
        <div class="image ml-5 mt-2">
        <img src=${dummyData.alumniList[i].imgPath} class="mr-3" alt=${dummyData.alumniList[i].alumniName} height=auto width="80">
        </div>
        <div class="media-body mr-3">
        <h6 class="mt-0">${dummyData.alumniList[i].alumniName}</h6>
        <p>${dummyData.alumniList[i].description1}</p>
        <p style="display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;">${dummyData.alumniList[i].description2}</p>
        </div></div>
        </div>`;
    }
}

/* <span class="d-block">
${dummyData.alumniList[i].alumniName}
</span></div> */
const nextPage = () => {
    pageIndex++;
    loadAlumniList(pageIndex);
}

const previousPage = () => {
    pageIndex--;
    loadAlumniList(pageIndex);
}

loadAlumniList(pageIndex);


