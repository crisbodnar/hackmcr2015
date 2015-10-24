function sendsms(number) {

$.ajax({
		key = '441234567890'
        url= 'https://api.clockworksms.com/http/send.aspx';
        data = 'key='+ key + '&to=' + number + '&content='+ message;

        //https://api.clockworksms.com/http/send.aspx?key=KEY&to=441234567890&content=Hello+World
      });
}

$( "#sms-button" ).click(function() {
    sendsms(document.getElementById("number-input"))
});