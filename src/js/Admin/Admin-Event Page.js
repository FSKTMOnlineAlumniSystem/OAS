console.log("testing");
const dummyResponse = {
  event: [
    {
      eventId: "E-1",
      adminId: "AD-1",
      title: "CP Workshop",
      dateTime: "2021-04-04T15:53:53+00:00",
      description: "Learn more about CP",
      imageId: "E-1.png",
      location: "FSKTM, MM2",
    },
    {
      eventId: "E-2",
      adminId: "AD-1",
      title: "Database Admin Career",
      dateTime: "2021-04-03T15:53:53+00:00",
      description: "Learn more about DB",
      imageId: "E-2.png",
      location: "FSKTM, MM3",
    },
    {
      eventId: "E-3",
      adminId: "AD-2",
      title: "Ashrae Run",
      dateTime: "2021-04-02T15:53:53+00:00",
      description: "Learn more about Running from bug",
      imageId: "E-3.png",
      location: "FSKTM, MM4",
    },
    {
      eventId: "E-4",
      adminId: "AD-3",
      title: "Boom Boom Bootstrap",
      dateTime: "2021-04-01T15:53:53+00:00",
      description: "Learn more about Bootstrap",
      imageId: "E-4.png",
      location: "FSKTM, MM5",
    },
    {
      eventId: "E-5",
      adminId: "AD-4",
      title: "React to React",
      dateTime: "2021-03-09T15:53:53+00:00",
      description: "Learn more about React",
      imageId: "E-5.png",
      location: "FSKTM, MM6",
    },
    {
      eventId: "E-6",
      adminId: "AD-4",
      title: "Macrohard workshop",
      dateTime: "2021-03-08T15:53:53+00:00",
      description: "Learn more about Macrohard",
      imageId: "E-6.png",
      location: "FSKTM, MM7",
    },
  ],
};

let pageIndex = 0;

const loadEventList = (pageIndex) => {
  document.getElementById("pageIndex").innerHTML =
    pageIndex + 1 + "/" + Math.ceil(dummyResponse.event.length / 10);
  document.getElementById("event").innerHTML = "";
  let eventStartIndex = pageIndex * 10;
  let eventEndIndex = eventStartIndex + 10;
  console.log(pageIndex);
  // console.log('eventEndIndex'+eventEndIndex)
  // console.log('length'+dummyResponse.event.length)
  if (eventEndIndex >= dummyResponse.event.length) {
    document.getElementById("btn nextPage-btn btn-sm").disabled = true;
    console.log("last page");
  } else {
    document.getElementById("btn nextPage-btn btn-sm").disabled = false;
  }
  if (pageIndex == 0) {
    document.getElementById(
      "btn previousPage-btn btn-light btn-sm"
    ).disabled = true;
    console.log("last page");
  } else {
    document.getElementById(
      "btn previousPage-btn btn-light btn-sm"
    ).disabled = false;
  }

  document.getElementById(
    "event"
  ).innerHTML += `<table class="table table-striped table-sm something">
    <thead style= "background-color:rgb(134, 75, 189);font-weight: 200; color:#ffffff">
        <tr>
            <th><div class="custom-control custom-checkbox mr-sm-2 ml-2">
                <input type="checkbox" class="custom-control-input" id="CheckAllBoxes">
                <label class="custom-control-label" for="CheckAllBoxes"></label>
            </div></th>
            <th>Schedule</th>
            <th>Title</th>
            <th style="width: 25%">Description</th>
            <th>Location</th>
            <th>Action</th>
        </tr>
    </thead> 
  <tbody>`;

  // <td style="font-weight: 400; font-size: 18px">4, April 2021
  //  <div style="font-weight: 200; font-size: 14px">8:00pm - 10:00pm</div>
  // </td>

  for (
    let i = eventStartIndex;
    i < eventEndIndex && i < dummyResponse.event.length;
    i++
  ) {
    document.getElementById("event").innerHTML += `<tr>
        <td><div class="custom-control custom-checkbox mr-sm-2 ml-2">
            <input type="checkbox" class="custom-control-input" id="Boxes1">
            <label class="custom-control-label" for="Boxes1"></label>
        </div></td>
        <td style="font-weight: 400; font-size: 18px">${dummyResponse.event.dateTime}</td>
        <td style="font-weight: 400; font-size: 18px">>${dummyResponse.event.title}</td>
        <td style="font-weight: 400; font-size: 14px; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">${dummyResponse.event.description}</td>
        <td style="font-weight: 200; font-size: 18px">${dummyResponse.event.location}</td>
        <td>
            <div class="btn-group" role="group" aria-label="Third group">
                <a href="#" role="button"><i class="fa fa-pencil fa-3x pr-2" aria-hidden="true" style="color: rgb(0, 0, 0); font-size: 35px">
                </i></a>
                <a href="#" role="button"><i class="fa fa-trash fa-3x pl-2" aria-hidden="true" style="color: rgb(255, 49, 49); font-size: 35px">
                </i></a>
            </div>
        </td>
    </tr>`;
  }
  document.getElementById("event").innerHTML += "</tbody> </table>";
};

/* <span class="d-block">
${dummyResponse.event[i].alumniName}
</span></div> */
const nextPage = () => {
  pageIndex++;
  loadEventList(pageIndex);
};

const previousPage = () => {
  pageIndex--;
  loadEventList(pageIndex);
};

loadEventList(pageIndex);
