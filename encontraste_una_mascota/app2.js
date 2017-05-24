
$(document).ready(function()
{
  var login_success = false;
  var buscar = function(objeto, codigo){

    if (objeto.hasOwnProperty("Valor"))
    {
      console.log(objeto["Valor"], codigo, objeto["Valor"]== codigo);
        return objeto["Valor"]== codigo;
    }
      return false;
  }
    var show_data = function(objeto){

      $("#contenido").empty();
      $("#contenido").append("Nombre completo del dueño" + ": "+ objeto["Nombre"]+ "<br/>" + "Teléfono" + ": " + objeto["Numero"] +"<br/>" + "Email" + ": " + objeto["Email"]);
      $("#contenido").append("<br/>" + "Nombre de la mascota" + ": " + objeto["Nmascota"]+"<br/>"+ "Mascota" + ": " + objeto["Mascota"]+"<br/>" + "Raza" + ": " + objeto["Raza"] + "<br/>");
    }

  $("form").submit(function(event)
  {
    var codigo = $("#codigo").val();
    console.log(codigo);
    event.preventDefault();
    $.ajax({
        url: "http://couchdb.contraslash.com/animal_savings_collares/_all_docs?include_docs=true",
        type: "GET",
        success: function (sreg, status, jqXHR) {
          console.log(sreg);
            var obj_json = JSON.parse(sreg);
            //var obj_json = sreg;
            // console.log(obj_json);

            for(var i=0; i<obj_json.rows.length ; i++)
            {
              console.log(obj_json.rows[i].doc);
              if(buscar(obj_json.rows[i].doc, codigo))
              {
                show_data(obj_json.rows[i].doc);
              }
              else
              {
                console.log("Failure")
              }

            }
            // if(!login_success)
            // {
            //     alert("Login Fallido");
            // }


        },
        error: function (jqXHR, status) {
            alert(JSON.stringify(jqXHR));
        }
    });
  })
});
