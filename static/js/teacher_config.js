window.onload = function() {
}

function add() {
  console.log("clicked");
  var newclass = document.getElementById("newclass").value;
  var classes = document.getElementById("classes");
  classes.options[classes.options.length] = new Option(newclass, newclass);
}
