
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


//Cargar información
 function loadingData() {
	 var name_title = document.getElementById('name-title');
	 var lastname_title = document.getElementById('lastname-title');
	 var username_title = document.getElementById('username-title');

	 //Información general
	 var name = document.getElementById('name');
	 var lastname = document.getElementById('lastname');
	 var birthdate = document.getElementById('birthdate');
	 var country = document.getElementById('country');
	 var city = document.getElementById('city');
	 var email = document.getElementById('email');
	 var phone = document.getElementById('phone');
	 var sex = document.getElementById('sex');
	 firebase.auth().onAuthStateChanged(function(user) {
	   if (user) {
			 var database = firebase.database();
			 var firstnameRef = database.ref('users/'+user.uid).child("Firstname"); //Nombre
			 firstnameRef.on('value',function(data) {
	       name_title.innerHTML = data.val();
				 name.innerHTML = data.val();
			 });
			 var lastnameRef = database.ref('users/'+user.uid).child("Lastname"); //Apellido
			 lastnameRef.on('value',function(data) {
	       lastname_title.innerHTML = data.val();
				 lastname.innerHTML = data.val();
			 });
			 var usernameRef = database.ref('users/'+user.uid).child("Username"); //Username
			 usernameRef.on('value',function(data) {
	       username_title.innerHTML = data.val();
			 });
			 var birthdateRef = database.ref('users/'+user.uid).child("Birthdate"); //Birhtdate
			 birthdateRef.on('value',function(data) {
	       birthdate.innerHTML = data.val();
			 });
			 var countryRef = database.ref('users/'+user.uid).child("Country"); //Birhtdate
			 countryRef.on('value',function(data) {
	       country.innerHTML = data.val();
			 });
			 var cityRef = database.ref('users/'+user.uid).child("City"); //Birhtdate
			 cityRef.on('value',function(data) {
	       city.innerHTML = data.val();
			 });
			 var emailRef = database.ref('users/'+user.uid).child("Email"); //Birhtdate
			 emailRef.on('value',function(data) {
	       email.innerHTML = data.val();
			 });
			 var phoneRef = database.ref('users/'+user.uid).child("Phone"); //Birhtdate
			 phoneRef.on('value',function(data) {
	       phone.innerHTML = data.val();
			 });
			 var sexRef = database.ref('users/'+user.uid).child("Sex"); //Birhtdate
			 sexRef.on('value',function(data) {
	       sex.innerHTML = data.val();
			 });

			 //Mascotas
			 var petsRef = database.ref('users/'+user.uid+'/pets');
 			 petsRef.on("value", function(data) {

 				 var keys = Object.keys(data.val());
 				 var values = Object.values(data.val());

 				 for(var i=0;i<keys.length;i++) {
 					 var name_retrieve = values[i].Name;

					 //Div principal
					 var div_pets = document.getElementById("pets");
					 var post = document.createElement("DIV");
					 post.classList.add("post-results");
					 div_pets.appendChild(post);
					 //Div nombre mascota
					 var par_div = document.createElement("DIV");
					 par_div.classList.add("post-small");
					 var par = document.createElement("p");
					 var par_p = document.createTextNode(name_retrieve);
					 post.appendChild(par_div);
					 par_div.appendChild(par);
					 par.appendChild(par_p);
				}
			});
		 } else {
			 //Nothing
		 }
 	});
}
 loadingData();

	 var muro = document.getElementById('muro');
	 var informacion = document.getElementById('informacion');
	 var mascotas = document.getElementById('mascotas');
	 var publish = document.getElementById('publish');
	 var info = document.getElementById('info');
	 var pets = document.getElementById('pets');

function toInfo() {
	muro.classList.remove("active");
	mascotas.classList.remove("active");
	informacion.classList.add("active");
	publish.style.display = "none";
	info.style.display = "block";
	pets.style.display = "none";
}
function toWall() {
	muro.classList.add("active");
	mascotas.classList.remove("active");
	informacion.classList.remove("active");
	publish.style.display = "block";
	info.style.display = "none";
	pets.style.display = "none";
}
function toPets() {
	muro.classList.remove("active");
	mascotas.classList.add("active");
	informacion.classList.remove("active");
	publish.style.display = "none";
	info.style.display = "none";
	pets.style.display = "block";
}
//Hacer publicaciones
var database = firebase.database();
var infoPost = document.getElementById('info_post');
var mykey;
function post() { //Publicaciones
	var postVal = infoPost.value;
	var userId = firebase.auth().currentUser.uid;
	var ref = database.ref('users/'+userId+'/posts');

	var data = {
		Type:"Own",
		On:userId,
		Message:postVal,
		Owner:userId
	}
	mykey = ref.push(data).key; //Subir
	var myref=database.ref('users/'+userId+'/posts/'+mykey+'/Key');
	myref.set(mykey);
	location.reload();
}
function showPost () {
	//Mostrar publicación

	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			userId = user.uid;

			var ref = database.ref('users/'+userId+'/posts');
			ref.on("value", function(data) {
				console.log(data.val());
				var keys = Object.keys(data.val());
				var values = Object.values(data.val());
				console.log(values);
				console.log(keys);

				for(var i=keys.length-1;i>=0;i--) {
					var  message = values[i].Message;
					var owner = values[i].Owner;
					var specialKey = values[i].Key;

					//Nombre del Owner
					var ownername;
					var ownerRef = database.ref('users/'+owner).child("Username");
					ownerRef.on('value',function(data) {
						ownername = data.val();
					});
					//Div principal
					var adding = document.getElementById("adding");
					var post = document.createElement("DIV");
					post.classList.add("posts");
					adding.appendChild(post);
					//Owner
					var username_post = document.createElement("p");
					username_post.classList.add("user-name-post")
					var username_p = document.createTextNode(ownername+":");
					post.appendChild(username_post);
					username_post.appendChild(username_p);
					//Div mensaje
					var par_div = document.createElement("DIV");
					par_div.classList.add("post-message");
					var par = document.createElement("p");
					var par_p = document.createTextNode(message);
					post.appendChild(par_div);
					par_div.appendChild(par);
					par.appendChild(par_p);
					//Div invisible key
					var key_div = document.createElement("DIV");
					key_div.classList.add("hidden-key");
					key = document.createElement("p");
					key.innerHTML = specialKey;
					post.appendChild(key_div);
				 key_div.appendChild(key);
					//key.appendChild(key_p);
					//Close button
					console.log(specialKey)
					var button = document.createElement("button");
					button.classList.add("close");
					button.type = "button";
					button.innerHTML = "&times;";
					post.appendChild(button);

				 post.addEventListener("dblclick",function() {
					  var a = this.childNodes;
						var b = a[2].innerHTML;
						var c = b.substr(3,20);
						var removeRef = database.ref('users/'+userId+'/posts/'+c);
						removeRef.remove();
						location.reload();
					});

				}
			});
		} else {
			//Nothing
		}
	});
}
showPost();
