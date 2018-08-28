var username;
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    var pet_city = document.getElementById('pet_city');
    var firebaseHeadingRef = firebase.database().ref().child("users").child(user.uid).child("City");
    firebaseHeadingRef.on('value',function(data) {
      pet_city.value = data.val();
    });
    var usernameRef = firebase.database().ref("users/"+user.uid+"/Username");
    usernameRef.on('value',function(data) {
      username = data.val();
    });
  } else {

  }
});

function submit() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var submitBtn = document.getElementById('submitBtn');
      var petRace = document.getElementById('pet_race').value.toLowerCase();
      var petName = document.getElementById('pet_name').value;
      var petCity = document.getElementById('pet_city').value;
      var petKind = document.getElementById('pet_kind').value;
      var petMainText = document.getElementById('pet_maintext').value;
      var petAge = document.getElementById('pet_age').value;
      var pet_sex = document.getElementsByTagName('pet_sex');
      var pide = document.getElementById('pide');
      var database = firebase.database();
      var ref = database.ref("pets");

  /*    for(var i=0;i<pet_sex.length;i++) {
        if(pet_sex[i].checked) {
          petSex = pet_sex[i].value;
          alert(petSex);
          break;
        }
      }*/
      console.log(petAge)
      var petSex = document.querySelector('input[name="pet_sex"]:checked').value;
      var data = {
        Race:petRace,
        Name:petName,
        City:petCity,
        Animal: petKind,
        Description:petMainText,
        Sex:petSex,
        Age:petAge,
        Owner: user.uid,
        OwnerEmail: user.email,
        OwnerNick:username
      }
      console.log(username)
      var data2 = {
        Race:petRace,
        Name:petName,
        City:petCity,
        Animal: petKind,
        Description:petMainText,
        Sex:petSex,
        Age:petAge
      }
      alert("Subido");
      var key = ref.push(data).key;
      var ref2 = database.ref("users/"+user.uid+"/pets").child(key);
      ref2.set(data2);
      var refDate = database.ref("pets/"+key+"/Date");
      var currentDate = new Date();
      var c_year = currentDate.getFullYear();
      var c_month = currentDate.getMonth();
      var c_day = currentDate.getDate();
      var c_hour = currentDate.getHours();
      var c_minute = currentDate.getMinutes();
      var dataDay = {
        Year:c_year,
        Month:c_month,
        Day:c_day,
        Minute:c_minute,
        Hour:c_hour
      }
      refDate.set(dataDay);
    } else {
      // No user is signed in.

    }

    //Archivos
    var storage = firebase.storage();
    var storageRef = storage.ref();
  });
}
