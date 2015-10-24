/**
 * Created by Cristi on 24-Oct-15.
 */
    var latitude, longitude;
    var ourGoogle;

    var directionsDisplay;//safest
    var directionsDisplayDangerous;
    var directionsDisplayFastest;
    var directionsService;
    var directionsMap;
    // getLocation();
    function getLocation() {
        directionsService = new google.maps.DirectionsService();
        ourGoogle = google;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
        }
    }
    function showPosition(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        //x.innerHTML = "Latitude: " + latitude +
        //  "<br>Longitude: " + longitude;
        console.log("Works here!");
        initMap();
    }
    function initMap() {
        console.log("Display map");
        directionsDisplay = new google.maps.DirectionsRenderer({ polylineOptions: { strokeColor: "#138b00" } });
        directionsDisplayDangerous = new google.maps.DirectionsRenderer({ polylineOptions: { strokeColor: "#d8001d" } });
        directionsDisplayFastest = new google.maps.DirectionsRenderer();
        
        // Create a map object and specify the DOM element for display.
        var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: latitude, lng: longitude},
            scrollwheel: false,
            zoom: 12
        });
        google.maps.event.trigger(map, 'resize');
        directionsDisplay.setMap(map);
        directionsDisplayFastest.setMap(map);
        directionsDisplayDangerous.setMap(map);
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(latitude, longitude),
            map: map,
            title: 'You are here!!!'
        });
    }

    function calcRoute(Route) {
        var _start = Route["startPoint"];
        var _end = Route["endPoint"];
        var request = {
            origin:_start,
            destination:_end,
            travelMode: google.maps.TravelMode.WALKING,
            provideRouteAlternatives: true
        };
        directionsService.route(request, function(result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                var routes = result.routes;
                var arrayOfRoutes = [];
                for(var i = 0; i < routes.length; i++){
                  var steps = routes[i].legs[0].steps;
                  var coordinates = [];
                  coordinates[0] = [steps[0].start_location.lat(),steps[0].start_location.lng()];
                  for (var j = 0; j < steps.length; j++){
                    coordinates[j+1] = [steps[j].end_location.lat(),steps[j].end_location.lng()]
                  }
                  var midpoints = functionToGetMidpoints(coordinates);
                  arrayOfRoutes[i] = midpoints;
                }
                getSafestRoute(arrayOfRoutes, Route['dataMonths'], function(ways){
                  console.log(ways);
                  directionsDisplay.setDirections(result);
                  directionsDisplay.setOptions({routeIndex:ways.safest});
                  directionsDisplayDangerous.setDirections(result);
                  directionsDisplayDangerous.setOptions({routeIndex:ways.dangerous});
                  var travelTimes = [];
                  for (var i = 0; i < routes.length; i++){
                    travelTimes[i] = routes[i].legs[0].duration.value;
                  }
                  directionsDisplayFastest.setDirections(result);
                  directionsDisplayFastest.setOptions({routeIndex:min(travelTimes)});
                })
            }
        });
    }


//Submit button event
$( "#submit-button" ).click(function() {
    var RouteArray = {};
    var currentLocation = document.getElementById("current-location-checkbox");
    if(currentLocation.checked)
        RouteArray['startPoint'] = new google.maps.LatLng(latitude, longitude);
    else
        RouteArray["startPoint"] = document.getElementById("start-location").value;
    RouteArray["endPoint"] = document.getElementById("end-location").value;
    RouteArray['dataMonths'] = document.getElementById('nrmonths').value;
    console.log(RouteArray["startPoint"]);
    calcRoute(RouteArray);
});

//Checkbox change event
$('#current-location-checkbox').change(function() {
    if($(this).is(":checked")) {
        $('#start-location').hide();
        $('#starting-text').hide();
    }
    else {
        $('#start-location').show();
        $('#starting-text').show();
    }
});

$( document ).ready(function() {
  getLocation();
});


