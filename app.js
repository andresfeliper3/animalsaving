$(document).ready(function(){
    $('#login-option').click(function(){
        $('#myModal').show();

    });
});

//Verificación de login
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    location.assign("login_session/index.html");
  } else {
    // No user is signed in.


  }
});

//Función del login
function login() {
  var userEmail = document.getElementById('login_email').value;
  var userPassword = document.getElementById('login_password').value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    alert("Esto es un error " +errorMessage);
  });
}

function logout() {
	firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
  var errorCode = error.code;
});
}

function resetPassword() {
  var auth = firebase.auth();
var emailAddress = document.getElementById("reset_email").value;

auth.sendPasswordResetEmail(emailAddress).then(function() {
  // Email sent.
  alert("Correo enviado")
}).catch(function(error) {
  // An error happened.
  alert("Ha habido un error");
});
}

function signIn() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var confirm_password = document.getElementById("c_password").value;
  var firstname = document.getElementById("firstname").value;
  var lastname = document.getElementById("lastname").value;
  var username = document.getElementById("username").value;
  var phone_number = document.getElementById("mobile").value;
  var database = firebase.database();
  var ref = database.ref("users");

  if(password.length>=8) {
    if (password == confirm_password) {
      firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {


        var user_info = {
          Firstname:firstname,
          Lastname: lastname,
          Email:email,
          Username:username,
          Phone:phone_number,
          Password:password
        }
        var user = firebase.auth().currentUser;
        user.sendEmailVerification().then(function() {
          // Email sent.
          alert("Correo enviado");
        }).catch(function(error) {
          // An error happened.
        //  alert("Error en el envío");
        });
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // User is signed in.
          ref.child(user.uid).set(user_info);
          location.assign("profile/index.html");
          } else {
            // No user is signed in.
          }
        });



      }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });



    } else {
    alert("Las contraseñas no son iguales");
    }
  } else {
    alert("La contraseña debe tener al menos 8 caracteres");
  }
}
