/**
 * Created by Cristi on 24-Oct-15.
 */
    var latitude, longitude;
    var ourGoogle;
	var ourMarker;
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
        directionsDisplay = new google.maps.DirectionsRenderer({ polylineOptions: { strokeColor: "#138b00", thickness: 50 } });
        directionsDisplayDangerous = new google.maps.DirectionsRenderer({ polylineOptions: { strokeColor: "#d8001d" } });
        directionsDisplayFastest = new google.maps.DirectionsRenderer();

        // Create a map object and specify the DOM element for display.
		var styles = [
			{
				"featureType": "all",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#ffffff"
					}
				]
			},
			{
				"featureType": "all",
				"elementType": "labels.text.stroke",
				"stylers": [
					{
						"color": "#000000"
					},
					{
						"lightness": 13
					}
				]
			},
			{
				"featureType": "administrative",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"color": "#000000"
					}
				]
			},
			{
				"featureType": "administrative",
				"elementType": "geometry.stroke",
				"stylers": [
					{
						"color": "#144b53"
					},
					{
						"lightness": 14
					},
					{
						"weight": 1.4
					}
				]
			},
			{
				"featureType": "landscape",
				"elementType": "all",
				"stylers": [
					{
						"color": "#08304b"
					}
				]
			},
			{
				"featureType": "poi",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#0c4152"
					},
					{
						"lightness": 5
					}
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"color": "#999999"
					}
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "geometry.stroke",
				"stylers": [
					{
						"color": "#A0A0A0"
					},
					{
						"lightness": 25
					}
				]
			},
			{
				"featureType": "road.arterial",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"color": "#999999"
					}
				]
			},
			{
				"featureType": "road.arterial",
				"elementType": "geometry.stroke",
				"stylers": [
					{
						"color": "#959595"
					},
					{
						"lightness": 16
					}
				]
			},
			{
				"featureType": "road.local",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#111111"
					}
				]
			},
			{
				"featureType": "transit",
				"elementType": "all",
				"stylers": [
					{
						"color": "#146474"
					}
				]
			},
			{
				"featureType": "water",
				"elementType": "all",
				"stylers": [
					{
						"color": "#021019"
					}
				]
			}
		]
		var styledMap = new google.maps.StyledMapType(styles,
			{name: "Styled Map"});
		var mapOptions = {
			zoom: 12,
			center: {lat: latitude, lng: longitude},
			mapTypeControlOptions: {
				mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
			}
		};
        var map = new google.maps.Map(document.getElementById('map'),
			mapOptions);
		map.mapTypes.set('map_style', styledMap);
		map.setMapTypeId('map_style');
        google.maps.event.trigger(map, 'resize');
        directionsDisplay.setMap(map);
        directionsDisplayFastest.setMap(map);
        directionsDisplayDangerous.setMap(map);
		var image = 'MapMarkerIcon.png';
        ourMarker = new google.maps.Marker({
            position: new google.maps.LatLng(latitude, longitude),
            map: map,
			animation: google.maps.Animation.DROP,
			icon: image,
            title: 'You are here!!!'
        });
		ourMarker.addListener('click', toggleBounce);
    }
	function toggleBounce() {
		if (ourMarker.getAnimation() !== null) {
			ourMarker.setAnimation(null);
		} else {
			ourMarker.setAnimation(google.maps.Animation.BOUNCE);
		}
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
                getSafestRoute(arrayOfRoutes, (Route['dataMonths']?Route['dataMonths']:1), function(ways){
                  console.log(ways);
                  directionsDisplay.setDirections(result);
                  directionsDisplay.setOptions({routeIndex:ways.safest});
                  directionsDisplayDangerous.setDirections(result);
                  directionsDisplayDangerous.setOptions({routeIndex:ways.dangerous});
                  var travelTimes = [];
                  for (var i = 0; i < routes.length; i++){
                    travelTimes[i] = routes[i].legs[0].duration.value;
                  }
                  approximateTime = formatTime((travelTimes[0] + travelTimes[1] + travelTimes[2])/3);
                  directionsDisplayFastest.setDirections(result);
                  directionsDisplayFastest.setOptions({routeIndex:min(travelTimes)});
                  crimesPerRoad.safest = Math.round(crimesNumbers[ways.safest]);
                  crimesPerRoad.dangerous = Math.round(crimesNumbers[ways.dangerous]);
                  crimesPerRoad.fastest = Math.round(crimesNumbers[min(travelTimes)]);
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
