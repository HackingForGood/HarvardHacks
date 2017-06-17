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
      if (className !== "") {
      db.ref('classes/' + className).set({
        className: className,
        teacher: uid,
      })
    }
    };

    function removeClass (className) {
      // '/user-posts/' + uid + '/' + newPostKey
      if (className !== "") {
      db.ref('classes/' + className).remove();
    }
    };


    function addStudent (studentName, studentEmail, currentName) {
    //   if ((studentEmail !== "") && (studentName !== "")) {
    //     if ((db.ref(‘students/’ + studentEmail)) !== "") {
    //   db.ref(‘students/’ + studentName).set({
    //     name: studentName,
    //     email: studentEmail,
    //   });
    // };
      db.ref("classes/" + currentName + "/students").set({
        name: studentName,
        email: studentEmail,
        time: 0,
    });

    };

    // function removeClass (className) {
    //   // '/user-posts/' + uid + '/' + newPostKey
    //   if (className !== "") {
    //   db.ref('classes/' + className).remove();
    //   }
    // };
    //
    // $(".removeClass").val().change(function() {
    //     var cName = $(".removeClass").val()
    //     console.log('HERE, removing: ' + cName);
    //     removeClass(cName);
    // })


    // function addStudent (studentName, studentEmail, className) {
    //   // '/user-posts/' + uid + '/' + newPostKey
    //   if ((studentEmail != undefined) && (studentName != undefined)) {
    //   db.ref('students/' + studentName).set({
    //     name: studentName,
    //     email: studentEmail,
    //   })
    // }
    // };

    $( ".removeClass" ).click(function() {
        console.log("remove clicked");
        console.log($(this).siblings("select").find(":selected"));
        var className = $( this ).siblings( "select").find(":selected").text();
        console.log('CLASSNAME + '+ className);
        removeClass(className)
      });


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
          var className = $("#classes").find(":selected").val();
          addStudent (studentName, studentEmail, className)
        });
      writeTeacherData("hailey", "hjames");
      console.log("ran");

      var classesRef = firebase.database().ref('classes/');
      classesRef.on('value', function(snapshot) {
        console.log(snapshot.val());
        $("#classes").find('option').remove().end();
        for (var key in snapshot.val()) {
        console.log(snapshot.val()[key].className);
            $("#classes").append($("<option></option>")
                          .attr("value",key)
                          .text(key));

      }
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



  // $( ".addClass" ).click(function() {
  //     console.log("add clicked");
  //     var newClass = $( this ).siblings("input").val();
  //     console.log(newoption);
  //     $( this ).siblings( "select").append($("<option></option>")
  //                   .attr("value",newoption)
  //                   .text(newoption)); ;
  //   });
