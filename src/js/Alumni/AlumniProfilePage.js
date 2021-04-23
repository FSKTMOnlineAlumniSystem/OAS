import dummyResponse from "../dummydata.js";
console.log("link js");
const loadAlumniProfile = (pageIndex) => {
  var content = `
    <div class="col">
        <div class="container-fluid">
        <div class="row mb-3 mx-auto">
            <p class="col-sm-4 font-weight-bold">Name:</p>
            <div class="col">
            <p id="info">Tey Kok Soon</p>
            </div>
        </div>

        <div class="row mb-3 mx-auto">
            <p class="col-sm-4 font-weight-bold">Gender:</p>
            <div class="col">
            <p id="info">Male</p>
            </div>
        </div>

        <div class="row mb-3 mx-auto">
            <p class="col-sm-4 font-weight-bold">Batch:</p>
            <div class="col">
            <p id="info">2014</p>
            </div>
        </div>

        <div class="row mb-3 mx-auto">
            <p class="col-sm-4 font-weight-bold">Email:</p>
            <div class="col">
            <a href="mailto:koksoon@um.edu.my">koksoon@um.edu.my</a>
            </div>
        </div>

        <div class="row mb-3 mx-auto">
            <p class="col-sm-4 font-weight-bold">Contact Number:</p>
            <div class="col">
            <p id="info">03-79676347</p>
            </div>
        </div>

        <div class="row mb-3 mx-auto">
            <p class="col-sm-4 font-weight-bold">Department:</p>
            <div class="col">
            <p id="info">Software Engineering</p>
            </div>
        </div>

        </div>
    </div>
    <div style="height: 100px">
    <div class="col-12">
      <div class="font-weight-bold">
        <div id="bio-title">Biography:</div>
        <div id="bio" class="rounded-lg p-3 text-justify">
            ${dummyResponse.Alumni[i].biography}
        </div>
      </div>
    </div>
    <br /><br />
  </div>`;
};
