
// $('.close').click(function(){
//     var $target = $(this).parents('li');
//     $target.hide('slow', function(){ $target.remove(); });
//   });
// $(document).ready(function(){
//     $('.close').click(function(){
//             var $target = $(this).parents('card-text');
//             $target.hide('slow', function(){ $target.remove(); });
//           });
// });


$("button").click(function () {
    $(this).parents(".card").remove();
});

// $("button").click(function () {
//     $(this).closest('div[class="col-md-4 col-xs-4"]').slideUp("slow", function(){
//       $(this).remove();
//     });
//   });