window.onload = function() {
}

function add() {
  console.log("clicked");
  var newclass = document.getElementById("newclass").value;
  var classes = document.getElementById("classes");
  classes.options[classes.options.length] = new Option(newclass, newclass);
}

$( ".remove" ).click(function() {
    console.log("remove clicked");
    console.log($(this).siblings("select").find(":selected"));
    $( this ).siblings( "select").find(":selected").remove();
  });
