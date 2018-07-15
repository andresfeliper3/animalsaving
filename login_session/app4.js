function logout() {
	firebase.auth().signOut().then(function() {
  // Sign-out successful.
	alert("Cerró sesión");
	location.assign("../index.html")
}).catch(function(error) {
  // An error happened.
  var errorCode = error.code;
});
}
function wola() {
	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
	    // User is signed in.
	    var displayName = user.displayName;
	    var email = user.email;
	    var emailVerified = user.emailVerified;
	    var photoURL = user.photoURL;
	    var isAnonymous = user.isAnonymous;
	    var uid = user.uid;
	    var providerData = user.providerData;
	    // ...
			document.getElementsByTag.innerHTML = displayName;
	  } else {
	    // User is signed out.
	    // ...
	  }
	});
}
