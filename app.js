$(document).ready(function() {
 $('#btc').click(function(){
   var agregar =$('input[name=cantidad]').val();
    $('#seccion1').empty();
    for (var i=0; i< agregar; i++)
    {
      $("#seccion1").append("<div class='form-group row'> <label for='example-text-input' class='col-2 col-form-label'><b>Nombre de la mascota</b></label><div class='col-10'><input class='form-control' name='nombredemascota1-collar1' type='text' id='example-text-input' maxlength='20'/></div><label class='aparte'>Tamaño de la mascota:</label><input class='campo' name='tamaño1' type='radio' value='Pequeño'/> Pequeño <br ><input class='campo' name='tamaño1' type='radio' value='Mediano'/> Mediano<br ><input class='campo' name='tamaño1' type='radio' value='Grande'/> Grande  <br ></div>")
    }

  });
  $('#collar1').change(function() {
      if ($(this).is(':checked')) {
     $('#seccion1').fadeIn('fast');
  }  else {
    $('#seccion1').fadeOut('fast');
      //$('#sec-1').fadeOut('fast');
    }
  });
      $('#añadirmas1').click(function() {
      $('#resto1').fadeIn();
  });
/*collar2*/
      $('#btc2').click(function(){
      var agregar2 =$('input[name=cantidad2]').val();
      $('#seccion2').empty();
      for (var i=0; i< agregar2; i++)
      {
        $("#seccion2").append("<div class='form-group row'><label>Nombre de la mascota</label><div class= 'col-10'><input class='form-control' type='text' id='example-text-input' maxlength='20'></div><br ><label class='aparte'>Tamaño de la mascota:</label><input class='campo' name='2tamaño1' type='radio' value='Pequeño'/> Pequeño <br ><input class='campo' name='2tamaño1' type='radio' value='Mediano'/> Mediano<br ><input class='campo' name='2tamaño1' type='radio' value='Grande'/> Grande<br ><br ><div>")
      }

    });
    $('#collar2').change(
      function() {

      if ($(this).is(':checked')) {
        $('#seccion2').fadeIn('checked');
      }
      else {
        $('#seccion2').fadeOut('fast');
      }
    });
        $('#añadirmas2').click(function() {
        $('#resto2').fadeIn();
      });

/*collar3*/
          $('#collar3').change(
            function() {

            if ($(this).is(':checked')) {
              $('#seccion3').fadeIn('checked');
            }
            else {
              $('#seccion3').fadeOut('fast');
            }
          });
              $('#añadirmas3').click(function() {
              $('#resto3').fadeIn();
            });
/* Revisar
            document.querySelector('.pull-right').scrollIntoView({
            behavior: 'smooth'
            top: 2500,
            left: 0,

          });
          */


});
