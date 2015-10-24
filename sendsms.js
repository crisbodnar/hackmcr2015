function sendsms(number, message) {
message = "hell";
key = '6575b7a0c97c835c2125b5a59d4ad50da6f665d5';
$.ajax({
		url:  'https://api.clockworksms.com/http/send.aspx',
        data  : 'key='+ key + "&to=" + number + "&content="+ message,
        success: function(data) {
        	console.log(number);
          console.log(data);
        }
        //https://api.clockworksms.com/http/send.aspx?key=KEY&to=441234567890&content=Hello+World
      });
}

$( "#sms-button" ).click(function() {
    sendsms(document.getElementById("number-input").value)
});