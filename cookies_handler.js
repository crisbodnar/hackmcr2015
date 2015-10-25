$( "#load-button" ).click(function() {
  document.getElementById("start-location").value = getCookie("start");
  document.getElementById("end-location").value = getCookie("end");
})

$( "#save-button" ).click(function() {
  console.log("test");
	// document.cookie = "p1="+(document.getElementById("").checked?
  //                   new google.maps.LatLng(latitude, longitude):document.getElementById("start-location").value)
  //                   +";p2="+document.getElementById("end-location").value;
  setCookie("start",
    (document.getElementById("current-location-checkbox").checked?new google.maps.LatLng(latitude, longitude):document.getElementById("start-location").value),
    365);
  setCookie("end",document.getElementById("end-location").value,365);
})

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}
