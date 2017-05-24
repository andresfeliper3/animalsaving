$(document).ready(function() {

$.ajaxSetup({
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    });
    /**
      Tomado de http://stackoverflow.com/questions/1184624/convert-form-data-to-javascript-object-with-jquery
    */
    function objectifyForm(formArray) {
      var returnArray = {};
      for (var i = 0; i < formArray.length; i++)
      {
        returnArray[formArray[i]['name']] = formArray[i]['value'];
      }
      return returnArray;
}

    $(document).ready(function() {
        $('form').submit(function(e) {
            var send = JSON.stringify(objectifyForm($(this).serializeArray()));
            console.log(send);
            $.ajax({
                url: "http://couchdb.contraslash.com/animal_savings_collares/",
                type: "POST",
                data: send,
                success: function (sreg, status, jqXHR) {
                    alert(JSON.stringify(sreg));
                },
                error: function (jqXHR, status) {
                    alert(JSON.stringify(jqXHR));
                }
            });
            return false;
        });
    });
  });
