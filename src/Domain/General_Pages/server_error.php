<style>
  @keyframes example {
    from {
      transform: translateX(0px);
    }

    to {
      transform: translateX(-10px);
    }
  }

  .btn-animation {
    animation-name: example;
    animation-duration: 1s;
    animation-direction: alternate;
    animation-iteration-count: infinite;
  }
</style>

<div class="row m-0 px-5 pt-3 pb-5 justify-content-center text-center">
    <img class="col-12 col-md-4 card-img-150" src="/Assets/imgs/server_error.svg" alt="404 Not Found">
    <h4 class="col-12">Oops! It seems like we are having some server issues.</h4>
    <p class="col-12">Click the button below to refresh the page</p>
    <button onClick="window.location.reload();" class="btn btn-primary btn-animation px-3" type="button"><i class="fas fa-redo mr-2"></i>Refresh page</button>
</div>