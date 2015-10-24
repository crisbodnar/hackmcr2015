/**
 * Created by Cristi on 24-Oct-15.
 */
// (function () {
    var x = document.getElementById("coordinates");
    var latitude, longitude;
    var ourGoogle;
    // getLocation();
    function getLocation() {
        ourGoogle = google;
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
        console.log("Works here!");
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
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(latitude, longitude),
            map: map,
            title: 'You are here!!!'
        });
    }

    /////////////////////////////////
    ///* Here is the Direction Service

    var directionsDisplay;
    var directionsService;
    var directionsMap;

    var z = document.getElementById("coordinates");
    function getDirectionsLocation() {
        ourGoogle = google;
        directionsService = new ourGoogle.maps.DirectionsService();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showDirectionsPosition);
        } else {
            z.innerHTML = "Geolocation is not supported by this browser.";
        }
    }
    function showDirectionsPosition(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        z.innerHTML = "Latitude: " + latitude +
            "<br>Longitude: " + longitude;
        console.log("Works here!");
        initDirections();
    }

    function initDirections() {
        directionsDisplay = new google.maps.DirectionsRenderer();
        var start = new google.maps.LatLng(latitude, longitude);
        var mapOptions = {
            zoom:7,
            center: start
        }
        directionsMap = new google.maps.Map(document.getElementById("directionsmap"), mapOptions);
        directionsDisplay.setMap(directionsMap);
        calcRoute();
    }

    function calcRoute() {
        var _start = new google.maps.LatLng(latitude, longitude);
        var _end = "Manchester, uk";
        var request = {
            origin:_start,
            destination:_end,
            travelMode: google.maps.TravelMode.DRIVING
        };
        directionsService.route(request, function(result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(result);
            }
        });
    }

    //getDirectionsLocation();
// })();
