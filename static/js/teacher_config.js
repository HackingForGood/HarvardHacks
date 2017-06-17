window.onload = function() {
}


$( ".remove" ).click(function() {
    console.log("remove clicked");
    console.log($(this).siblings("select").find(":selected"));
    $( this ).siblings( "select").find(":selected").remove();
  });

  $( ".add" ).click(function() {
      console.log("add clicked");
      var newoption = $( this ).siblings("input").val();
      console.log(newoption);
      $( this ).siblings( "select").append($("<option></option>")
                    .attr("value",newoption)
                    .text(newoption)); ;
    });
