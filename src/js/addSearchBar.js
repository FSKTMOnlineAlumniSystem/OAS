const searchBarSection = document.createElement('div');
searchBarSection.setAttribute('class', 'searchBarBG');
searchBarSection.innerHTML = `<form class="search-form">
<div class="containerSB">
  <div class="row no-gutters" style="white-space: nowrap">
    <div class="col-lg-2 col-md-2 col-sm-2 p-0"></div>

    <div class="col-lg-2 col-md-2 col-sm-12 p-0">
      <select class="form-controlSearch" id="exampleFormControlSelect1">
        <option selected>Event</option>
        <option>Alumni</option>
        <option>Jobs</option>
      </select>
    </div>
    <div class="col-lg-6 col-md-5 col-sm-12 p-0">
      <div
        class="input-group"
        style="position: unset; top: 0; width: 100%; left: 0"
      >
        <input
          type="text"
          placeholder="Search..."
          class="form-control"
          id="search"
          name="search"
          style="
            border-radius: 0px 0px 0px 0px;
            border-left-color: #eaeaea;
          "
        />
        <div class="input-group-append">
          <button type="submit" class="btn btn-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="20"
              viewBox="0 0 24 28"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-search"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
</form>`;

// insert
document.body.insertBefore(searchBarSection, document.getElementById('main-body'));