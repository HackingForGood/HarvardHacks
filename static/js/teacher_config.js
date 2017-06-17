window.onload = function() {

}

var db = firebase.database();

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("signed in");
    var user = firebase.auth().currentUser;
    var uid = user.uid;
    // console.log(user);
    function addClass (className) {
      // '/user-posts/' + uid + '/' + newPostKey
      if (className != undefined) {
      db.ref('classes/' + className).set({
        className: className,
        teacher: uid,
      })
    }
    };

    function addStudent (studentName, studentEmail) {
      // '/user-posts/' + uid + '/' + newPostKey
      if ((studentEmail != undefined) && (studentName != undefined)) {
      db.ref('students/' + studentName).set({
        name: studentName,
        email: studentEmail,
      })
    }
    };

    function writeTeacherData(username, email) {
      db.ref('teachers/' + uid).set({
        uid: uid,
        username: username,
        email: email,
      });
    }
    $( ".addClass" ).click(function() {
        console.log("addClass clicked");
        var newClass = $( "#newClass" ).val();
        addClass (newClass)
        // $( this ).siblings( "select").append($("<option></option>")
        //               .attr("value",newoption)
        //               .text(newoption)); ;
      });
      $( ".addStudent" ).click(function() {
          console.log("addStudent clicked");
          var studentEmail = $( "#studentEmail" ).val();
          var studentName = $( "#studentName" ).val();
          addStudent (studentName, studentEmail)
        });
      writeTeacherData("hailey", "hjames");
      console.log("ran");

      var classesRef = firebase.database().ref('classes/');
      classesRef.on('value', function(snapshot) {
        console.log(snapshot.val());
        for (var key in snapshot.val()) {
        console.log(snapshot.val()[key].className);
            $("#classes").append($("<option></option>")
                          .attr("value",key)
                          .text(key));

      }
      // updateStarCount(postElement, snapshot.val());
      });
  } else {
    console.log("not signed in");
  }
});







// $( ".removeTeachers" ).click(function() {
//     console.log("remove clicked");
//     console.log($(this).siblings("select").find(":selected"));
//     $( this ).siblings( "select").find(":selected").remove();
//   });
//
// $( ".removeStudents" ).click(function() {
//     console.log("remove clicked");
//     console.log($(this).siblings("select").find(":selected"));
//     $( this ).siblings( "select").find(":selected").remove();
//   });



  // $( ".addClass" ).click(function() {
  //     console.log("add clicked");
  //     var newClass = $( this ).siblings("input").val();
  //     console.log(newoption);
  //     $( this ).siblings( "select").append($("<option></option>")
  //                   .attr("value",newoption)
  //                   .text(newoption)); ;
  //   });
