window.onload = function() {
}


$( ".removeTeachers" ).click(function() {
    console.log("remove clicked");
    console.log($(this).siblings("select").find(":selected"));
    $( this ).siblings( "select").find(":selected").remove();
  });

$( ".removeStudents" ).click(function() {
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

var db = firebase.database();

function writeTeacherData(teacherId, username, email) {
  db.ref('users/' + teacherId).set({
    username: username,
    email: email,
  });
}

writeTeacherData(1234, "hailey", "hjames");
console.log("ran");
