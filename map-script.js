/**
 * Created by Cristi on 24-Oct-15.
 */
(function () {
    var x = document.getElementById("coordinates");
    var latitude, longitude;
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }
    function showPosition(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        x.innerHTML = "Latitude: " + latitude +
            "<br>Longitude: " + longitude;
        initMap();
    }
    function initMap() {
        console.log("Display map");
        // Create a map object and specify the DOM element for display.
        var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: latitude, lng: longitude},
            scrollwheel: false,
            zoom: 12
        });
    }
    getLocation();
})();