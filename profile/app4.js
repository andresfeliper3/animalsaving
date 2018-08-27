
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

function date(date) {
	var currentDate = new Date(); //Fecha real
	var c_year = currentDate.getFullYear();
	var c_month = currentDate.getMonth();
	var c_day = currentDate.getDate();
	var date = date;
	var year = parseInt(date.charAt(0) + date.charAt(1) + date.charAt(2) + date.charAt(3)); //Fecha ingresada
	var month = parseInt(date.charAt(5) + date.charAt(6));
	var day = parseInt(date.charAt(8) + date.charAt(9));
	var difYears = c_year - year;
	var age, birthday=false;
	//Cálculo de edad
	if(c_month>month) {
		age = difYears;
	}
	else if(c_month==month) {
		if(c_day>day){
			age = difYears;
		} else if(c_day==day) {
			age = difYears;
			birthday = true;
		} else {
			age = difYears - 1;
		}
	} else {
		age = difYears - 1;
	}
	return age;
}
function update() {
	var firstname = document.getElementById('firstname').value;
	var lastname = document.getElementById('lastname').value;
	var country = document.getElementById('country').value;
	var city = document.getElementById('city').value;
	var birthdate = document.getElementById('birthdate').value;
	var personSex = document.querySelector('input[name="person_sex"]:checked').value;
	var age = date(birthdate);
	var database = firebase.database();

	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			// User is signed in.
		/*	var firebaseHeadingRef = firebase.database().ref().child("rules").child("users").child(user.uid).child("Password");
			firebaseHeadingRef.on('value',function(data) {
			  password  = data.val();
			});*/
		var ref = database.ref("users");
		ref.child(user.uid).child("Firstname").set(firstname);
		ref.child(user.uid).child("Lastname").set(lastname);
		ref.child(user.uid).child("Country").set(country);
		ref.child(user.uid).child("City").set(city);
		ref.child(user.uid).child("Birthdate").set(birthdate);
		ref.child(user.uid).child("Age").set(age);
		ref.child(user.uid).child("Sex").set(personSex);
		alert("Actualizado");
		} else {
			// No user is signed in.
		}
	});
}

//Cargar valores automáticamente al editor de la db
	var firstname = document.getElementById('firstname');
	var lastname = document.getElementById('lastname');
	var birthdate = document.getElementById('birthdate');
	var city = document.getElementById('city');
	var country = document.getElementById('country');
	var database = firebase.database();
	firebase.auth().onAuthStateChanged(function(user) {
		if(user){
				var firstnameRef = firebase.database().ref().child("users").child(user.uid).child("Firstname");
				var lastnameRef = firebase.database().ref().child("users").child(user.uid).child("Lastname");
				var cityRef =firebase.database().ref().child("users").child(user.uid).child("City");
				var birthdateRef = firebase.database().ref().child("users").child(user.uid).child("Birthdate");
				var countryRef = firebase.database().ref().child("users").child(user.uid).child("Country");
				firstnameRef.on('value',function(data) {
					firstname.value = data.val();
				});
				lastnameRef.on('value',function(data) {
					lastname.value = data.val();
				});
				cityRef.on('value',function(data) {
					city.value = data.val();
				});
				birthdateRef.on('value',function(data) {
					birthdate.value = data.val();
				});
			 	countryRef.on('value',function(data) {
					country.value = data.val();
				});
				//Contraseña
				passwordRef = firebase.database().ref().child("users").child(user.uid).child("Password");
				passwordRef.on('value',function(data) {
				 real_password = data.val();
				});
			}
	});

	function deleteAccount() {
		var delete_account = document.getElementById('delete_account').value;
		var delete_confirm = document.getElementById('delete_confirm').value;
		var delete_reason = document.getElementById('delete_reason').value;
		var delete_title = document.getElementById('delete_title');
		//Confirmar contraseñas con db
				if(delete_account == delete_confirm) {
					var choice = confirm("¿Seguro que quieres eliminar tu cuenta? \n Si la eliminas no podrás recuperar tus datos");
					if (choice==true) {
							if(delete_confirm == real_password) {
								var user = firebase.auth().currentUser;
								var database = firebase.database();
								var ref = database.ref("users").child(user.uid);
								ref.remove();
								user.delete().then(function() {
								  // User deleted.
									location.assign("../index.html");
								}).catch(function(error) {
								  // An error happened.
									alert("Vuelva a iniciar sesión");
								});
						} else {
							alert("Contraseña incorrecta");
						}
					}
						} else {
					alert("Las contraseñas no coinciden");
				}
}


	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			var uploader = document.getElementById('uploader');
			var profile_pic = document.getElementById('profile_pic');

			profile_pic.addEventListener('change', function(e) {
				//Get fieldset
				var file = e.target.files[0];
			});
				//Storage ref
				function profilePic() {
				var storage = firebase.storage();
				var storageRef = storage.ref('profilePics/' + file.name);
				//Upload fieldset
				var task = storageRef.put(file);
				//Update progress bar
				task.on('state_change', function progress(snapshot) {
						var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) *100;
						uploader.value = percentage;
					},
					function error (err) {

					},
					function complete() {
						var postKey = firebase.database.ref('Pics/').push.key;
						var downloadUrl = task.snapshot.downloadUrl;
						var updates = {};
						updates['Pics/'+postKey] = postData;
						firebase.database.ref('Pics/' + postKey)
					}
			);
			}
		} else {
			//Error
		}
	});
