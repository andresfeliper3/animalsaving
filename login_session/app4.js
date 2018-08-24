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

//Colocar primeros 10 datos
var database = firebase.database();
var recentRef = database.ref('pets/').limitToLast(10);
recentRef.on("value", function(data) {
   console.log(data.val());
	 var keys = Object.keys(data.val());
	 var values = Object.values(data.val());
	 console.log(values);
	 console.log(keys);
	 for(var i=0;i<keys.length;i++) {
		 var name_retrieve = values[i].Name;
		 var nickname_retrieve = values[i].OwnerNick;
		 var race_retrieve = values[i].Race;
		 var age_retrieve = values[i].Age;
		 var city_retrieve = values[i].City;
		 //Div principal
		 var div_results = document.getElementById("results");
		 var post = document.createElement("DIV");
		 post.classList.add("post-results");
		 div_results.appendChild(post);
		 //Div imagen
		 var img_div = document.createElement("DIV");
		 img_div.classList.add("post-small");
		 var img = document.createElement("p");
		 var img_p = document.createTextNode("No disponible");
		 post.appendChild(img_div);
		 img_div.appendChild(img);
		 img.appendChild(img_p);
		 //Div nombre
		 var name_div = document.createElement("DIV");
		 name_div.classList.add("post-small");
		 var name = document.createElement("p");
		 var name_p = document.createTextNode(name_retrieve);
		 post.appendChild(name_div);
		 name_div.appendChild(name);
		 name.appendChild(name_p);
		 //Div username
		var nickname_div = document.createElement("DIV");
		nickname_div.classList.add("post-small-far");
		var nickname = document.createElement("p");
		var nickname_p = document.createTextNode(nickname_retrieve);
		post.appendChild(nickname_div);
		nickname_div.appendChild(nickname);
		nickname.appendChild(nickname_p);
		//Div race
		var race_div = document.createElement("DIV");
		race_div.classList.add("post-small");
		var race = document.createElement("p");
		var race_p = document.createTextNode(race_retrieve);
		post.appendChild(race_div);
		race_div.appendChild(race);
		race.appendChild(race_p);
	 }
	 //Div age
	 var age_div = document.createElement("DIV");
	 age_div.classList.add("post-small-far");
	 var age = document.createElement("p");
	 var age_p = document.createTextNode(age_retrieve);
	 post.appendChild(age_div);
	 age_div.appendChild(age);
	 age.appendChild(age_p);
	 //Div city
	 var city_div = document.createElement("DIV");
	 city_div.classList.add("post-small");
	 var city = document.createElement("p");
	 var city_p = document.createTextNode(city_retrieve);
	 post.appendChild(city_div);
	 city_div.appendChild(city);
	 city.appendChild(city_p);
}, function (error) {
   console.log("Error: " + error.code);
});

//
$(document).ready(function()
{

	function getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
			results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


		$("#search_button").click(function()
			{
				var search_pet = $("#search_pet").val();
				var search_city = $("#search_city").val();
				var search_kind = $("#search_kind").val();
				var search_age = $("#search_age").val();
				var search_user = $("#search_user").val();
				window.location = "http://127.0.0.1:3000/login_session/index.html?id="+search_pet+"&param2="+search_city+"&param3="+search_kind+"&param4="+search_age+"&param5="+search_user;

				var pet = getParameterByName("id");
				var city = getParameterByName("param2");
				var kind = getParameterByName("param3");
				var age = getParameterByName("param4");
				var user = getParameterByName("param5");
				console.log(pet);

			});
});
