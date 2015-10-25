function sendsms(number,message) {
//message = "hell";
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
	var message = "I+am+going"+(document.getElementById("current-location-checkbox").checked?"":("+from+"+document.getElementById("start-location").value))
								+"+to+"+document.getElementById("end-location").value+".+See you soon, hopefully!+I+will+be+there+in+about+"+approximateTime
								+".+If+I+am+not,+I+am+probably+raped,+robed,+killed+or+who+knows+what+else";
	console.log(message);
  window.alert("An SMS has been sent to your mobile phone number!");

  sendsms(document.getElementById("number-input").value,message);
})
  $( "#sms-button2" ).click(function() {
    pickuplines = ["Did you fall from heaven? Because your face is pretty fucked up!", "If i give you a nickel would you tickle my pickle", "Are you from tenasee, because you are the only 10 i see"];
  var message = pickuplines[Math.floor(Math.random()*pickuplines.length)];
  console.log(message);
  window.alert("An SMS has been sent to your mobile phone number!");

  sendsms(document.getElementById("number-input2").value,message);
});
