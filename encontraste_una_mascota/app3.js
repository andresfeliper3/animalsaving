$(document).ready(function()
{

  var show_data = function(objeto){
    for (var nombre in objeto) {




          $("#contenido").append(nombre + ": "+ objeto[nombre]+ "<br/>" );

    }
    $("#contenido").append("<br/><br/><br/>");


  }

    $("form").submit(function(event)
  {
    console.log("asd");
    $.ajax({
        url: "http://couchdb.contraslash.com/animal_savings_collares/_all_docs?include_docs=true",
        type: "GET",
        success: function (sreg, status, jqXHR) {
            var obj_json = JSON.parse(sreg);
            console.log(obj_json);
            for(var i=0; i<obj_json.rows.length ; i++)
            {
              $.ajax({
                  url: "http://couchdb.contraslash.com/animal_savings_collares/"+obj_json.rows[i].id,
                  type: "GET",
                  success: function (sreg, status, jqXHR) {
                    show_data(JSON.parse(sreg));
                  }
                });
            }

        },
        error: function (jqXHR, status) {
            alert(JSON.stringify(jqXHR));
        }
    });
  })
});
