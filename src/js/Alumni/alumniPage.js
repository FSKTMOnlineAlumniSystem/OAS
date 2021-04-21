console.log('testing')
const dummyData = {
    alumniList: [
        {
            imgPath: "/Assets/imgs/tey.jpg",
            alumniName: "Dr XXX",
            description1: "Bachelor of Computer Science (Hons), graduated 2010",
            description2: "XXX is currently working at HTM Niseko, Hokkaido in Japan, building and expanding systems as a full stack lead developer."
        },
        {
            imgPath: "/Assets/imgs/drAng.png",
            alumniName: "Dr Teh",
            description1: "Bachelor of Computer Science (Hons), graduated 2010",
            description2: "XXX is currently working at HTM Niseko, Hokkaido in Japan, building and expanding systems as a full stack lead developer."
        },
        {
            imgPath: "/Assets/imgs/tey.jpg",
            alumniName: "Dr XXX",
            description1: "Bachelor of Computer Science (Hons), graduated 2010",
            description2: "XXX is currently working at HTM Niseko, Hokkaido in Japan, building and expanding systems as a full stack lead developer."
        },
        {
            imgPath: "/Assets/imgs/drOw.png",
            alumniName: "Dr Teh",
            description1: "Bachelor of Computer Science (Hons), graduated 2010",
            description2: "XXX is currently working at HTM Niseko, Hokkaido in Japan, building and expanding systems as a full stack lead developer."
        },
        {
            imgPath: "/Assets/imgs/tey.jpg",
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
            imgPath: "/Assets/imgs/tey.jpg",
            alumniName: "Dr Teh",
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
            imgPath: "/Assets/imgs/tey.jpg",
            alumniName: "Dr Teh",
            description1: "Bachelor of Computer Science (Hons), graduated 2010",
            description2: "XXX is currently working at HTM Niseko, Hokkaido in Japan, building and expanding systems as a full stack lead developer."
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
        `<div class="media justify-content-center mb-2 w-75 p-3" style="background-color:#E9E5E5;">
        <div class="image m-auto col-2 p-3">
        <div style="aspect-ratio:1/1;overflow:hidden;">
        <img src=${dummyData.alumniList[i].imgPath} class="w-100" alt=${dummyData.alumniList[i].alumniName}>
        </div>
        </div>
        <div class="media-body mr-3 my-auto col-10">
        <h6 class="mt-0 mb-1">${dummyData.alumniList[i].alumniName}</h6>
        <em class="mb-0">${dummyData.alumniList[i].description1}</em>
        <small style="display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;">${dummyData.alumniList[i].description2}</small>
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


