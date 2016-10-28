//var map = L.map('mapid').setView([43.367297, -89.445567], 7);
// We'll append our markers to this global variable
var json_group = new L.FeatureGroup();
// This is the circle on the map that will be determine how many markers are around
var circle;
// Marker in the middle of the circle
var search_marker;
// Marker icon
var search_icon = L.AwesomeMarkers.icon({
    icon: 'icon-circle',
    color: 'red'
});

var RedIcon = L.Icon.Default.extend({
            options: {
            	    iconUrl: 'leaflet/images/marker-icon-red.png' 
            }
         });
var redIcon = new RedIcon();

// Convert miles to meters to set radius of circle
function milesToMeters(miles) {
    return miles * 1069.344;
};


	// This places marker, circle on map
function geocodePlaceMarkersOnMap(location) {
    // Center the map on the result
	
    //map.setView(new L.LatLng(location.lat(), location.lng()), 10);
	if ($('#radius-selected').val() == '5') {
		//alert($('#radius-selected').val());
		map.setView(new L.LatLng(location.lat(), location.lng()), 12);
	} else if ($('#radius-selected').val() == '10') {
		//alert($('#radius-selected').val());
		map.setView(new L.LatLng(location.lat(), location.lng()), 11);
	
		} else if ($('#radius-selected').val() == '25') {
		//alert($('#radius-selected').val());
		map.setView(new L.LatLng(location.lat(), location.lng()), 10);
	
		} else if ($('#radius-selected').val() == '50') {
		//alert($('#radius-selected').val());
		map.setView(new L.LatLng(location.lat(), location.lng()), 9);
	}
    // Remove circle if one is already on map
    if(circle) {
        map.removeLayer(circle);
    }
    //alert(location.lng());
    // Create circle around marker with our selected radius
    circle = L.circle([location.lat(), location.lng()], milesToMeters( $('#radius-selected').val() ), {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.1,
        clickable: false
    }).addTo(map);
    

    
	// Remove marker if one is already on map
    if (search_marker) {
        map.removeLayer(search_marker);
    }
        
    // Create marker
    search_marker = L.marker([location.lat(), location.lng()], {

        // Allow user to drag marker
        draggable: true,
        icon: redIcon
    });
	//alert("marker");
    // Reset map view on marker drag
    search_marker.on('dragend', function(event) {
        map.setView( event.target.getLatLng() ); 
        circle.setLatLng( event.target.getLatLng() );

        // This will determine how many markers are within the circle
        pointsInCircle( circle, milesToMeters( $('#radius-selected').val() ) );

        // Redraw: Leaflet function
        circle.redraw();

        // Clear out address in geocoder
        $('#geocoder-input').val('');
    });

    // This will determine how many markers are within the circle
    // Called when points are initially loaded
    pointsInCircle( circle, milesToMeters( $('#radius-selected').val() ) );

    // Add marker to the map
    search_marker.addTo(map);
	
// Close geocodePlaceMarkersOnMap
}
    // jQuery Geocodify
var maxY = 50.749935;
var minY = 40.217754;
var minX = -100.459961;
var maxX = -70.175781;
 
var search_marker;
var search_icon = L.AwesomeMarkers.icon({
    icon: 'icon-circle',
    color: 'green'
});
 
$('#geocoder').geocodify({
    onSelect: function (result) {
        // Extract the location from the geocoder result
        var location = result.geometry.location;
		//alert(location);
        // Call function and place markers, circle on map
        geocodePlaceMarkersOnMap(location);
    },
    initialText: 'Zip code, city, etc...',
    regionBias: 'US',
    // Lat, long information for Cedar Valley enter here
    viewportBias: new google.maps.LatLngBounds(
        new google.maps.LatLng(40.217754, -85.459961),
        new google.maps.LatLng(50.749935, -100.175781)
    ),
    width: 300,
    height: 26,
    fontSize: '14px',
    filterResults: function (results) {
        var filteredResults = [];
        $.each(results, function (i, val) {
            var location = val.geometry.location;
            if (location.lat() > minY && location.lat() < maxY) {
                if (location.lng() > minX && location.lng() < maxX) {
                    filteredResults.push(val);
                }
            }
        });
		//alert(filteredResults);
        return filteredResults;
    }
});
// We'll append our markers to this global variable
var json_group = new L.FeatureGroup();
// This is the circle on the map that will be determine how many markers are around
var circle;
// Marker in the middle of the circle
var search_marker;
// Marker icon
var search_icon = L.AwesomeMarkers.icon({
    icon: 'icon-circle',
    color: 'red'
});
 
 
// Convert miles to meters to set radius of circle
function milesToMeters(miles) {
    return miles * 1069.344;
};

		var map = L.map('mapid').setView([44.614902, -89.721037], 7);
		// Add our markers in our JSON file on the map
		map.addLayer(json_group);
		var hospURL = "https://sec.gis.wi.gov/arcgis/rest/services/DHS_GIS/Health_Care_Facilites/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&f=pjson"
		$.ajax({
			dataType: "json",
			url: hospURL,
			success: function(data) {
			//$(data.features).each(function(key, data) {
			//district_boundary.addData(data);
			//alert(data.features.length);
			for ( var i=0; i < data.features.length; ++i ) 
			{
			//alert(data.features[i].attributes.LAT);
			//L.marker([51.927913,4.521303], {icon: L.AwesomeMarkers.icon({icon: 'h-square', prefix: 'fa', markerColor: 'blue', iconColor: 'white'}) }).addTo(map);
			   var layer_marker = L.marker( [data.features[i].attributes.LAT, data.features[i].attributes.LON],{icon: L.AwesomeMarkers.icon({icon: 'h-square', prefix: 'fa', markerColor: 'blue', iconColor: 'white'}) }).bindPopup("<b>" + data.features[i].attributes.FACILITY_NAME + "</b><br/>" + data.features[i].attributes.ADDRESS + "</br>" + data.features[i].attributes.CITY + "," + data.features[i].attributes.STATE + "&nbsp;&nbsp;" + data.features[i].attributes.ZIP)
				  //.addTo( map );
				  json_group.addLayer(layer_marker);
			}
		//});
			}
		});

		//.error(function() {});
		L.tileLayer.provider('OpenStreetMap.BlackAndWhite', {
			maxZoom: 18,
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
				'Imagery © <a href="http://mapbox.com">Mapbox</a>',
			id: 'mapbox.streets'
		}).addTo(map);
//var legend = L.control({position: 'topright'});

//legend.onAdd = function (map) {

   //var div = L.DomUtil.create('div', 'info legend');
    //    grades = [0, 10, 20, 50, 100, 200, 500, 1000],
    //    labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    //for (var i = 0; i < grades.length; i++) {
        //div.innerHTML = '<Input type="text" value="Enter you address" id="address_input"></input><button id="find_me">Find me!</button>';
		//alert("div!");
            //'<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            //grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    //}

   // return div;
//};
//legend.addTo(map);
var markers = new L.FeatureGroup();
	$("#find_me").click(function() {
		$.ajax({
			dataType: "json",
			url: "http://www.mapquestapi.com/geocoding/v1/address?key=784Y0GRpzjR5nNkZhUDECBg7FrPnbbNe&inFormat=kvp&outFormat=json&location="+$("#address_input").val(),
			success: function(data) {
			//$(data.features).each(function(key, data) {
			//district_boundary.addData(data);
			markers.clearLayers();
			//for ( var i=0; i < data.features.length; ++i ) 
			//{
			//alert(data.features[i].attributes.LAT);
			    
			   var address_marker = L.marker( [data.results[0].locations[0].latLng.lat, data.results[0].locations[0].latLng.lng] ).addTo( map );
			   markers.addLayer(address_marker)
			   map.addLayer(markers)
			   map.setView([data.results[0].locations[0].latLng.lat, data.results[0].locations[0].latLng.lng], 5);
			}
		//});
			//}
		});

	});
	// Change circle radius when changed on page
function changeCircleRadius(e) {
//alert("radius change!");
    // Determine which geocode box is filled
    // And fire click event
 
    // This will determine how many markers are within the circle
    pointsInCircle(circle, milesToMeters( $('#radius-selected').val() ) )
 
    // Set radius of circle only if we already have one on the map
    if (circle) {
        circle.setRadius( milesToMeters( $('#radius-selected').val() ) );
    }

}
 
$('select').change(function() {
    changeCircleRadius();
});
// This figures out how many points are within out circle
function pointsInCircle(circle, meters_user_set ) {
    if (circle !== undefined) {
	//alert("Points in circle!");
        // Only run if we have an address entered
        // Lat, long of circle
        circle_lat_long = circle.getLatLng();
 
        // Singular, plural information about our JSON file
        // Which is getting put on the map
        var title_singular = 'hospital';
        var title_plural = 'hospitals';
 
        var selected_provider = $('#dropdown_select').val();
        var counter_points_in_circle = 0;
		var hospital_html = '';
		var myData = [];
        // Loop through each point in JSON file
        json_group.eachLayer(function (layer) {
 
            // Lat, long of current point
            layer_lat_long = layer.getLatLng();
 
            // Distance from our circle marker
            // To current point in meters
            distance_from_layer_circle = layer_lat_long.distanceTo(circle_lat_long);
			
            // See if meters is within raduis
            // The user has selected
            if (distance_from_layer_circle <= meters_user_set) {
                counter_points_in_circle += 1;
				hospital_html += layer._popup.getContent() + "</br><strong>" + (distance_from_layer_circle*0.000621371).toFixed(2) + " miles</strong></br></br>";
				//result_json_obj["address"] = layer._popup.getContent();
				//result_json_obj["distance"] = (distance_from_layer_circle*0.000621371).toFixed(2);
				//var json_result_obj+looper = new results_json(layer._popup.getContent(),(distance_from_layer_circle*0.000621371).toFixed(2));
				//arrayList.push(json_result_obj+looper);
				    var obj = { 
						html: layer._popup.getContent(),
						distance: (distance_from_layer_circle*0.000621371).toFixed(2),
						lat: layer_lat_long.lat,
						lon: layer_lat_long.lng,
					};
				myData.push(obj);
            }
			
        });
 
        // If we have just one result, we'll change the wording
        // So it reflects the category's singular form
        // I.E. facility not facilities
        if (counter_points_in_circle === 1) {
            $('#json_one_title').html( title_singular );
        // If not one, set to plural form of word
        } else {
            $('#json_one_title').html( title_plural );
        }
         //var json_sort = JSON.stringify(result_json_obj);
		 //json_sort.sort(function(a,b){return a-b});
		 myData_sort = myData.sort(function(a, b) {
			return parseFloat(a.distance) - parseFloat(b.distance);
		});
		var html_out = "";
		myDataJson = JSON.stringify(myData);
			for (var key in myData) 
			if (myDataJson.hasOwnProperty(key)) {
				{
					//alert(data.features[i].attributes.LAT);
					//alert(myData[key].html);
					google_link = "https://maps.google.com?saddr=" + circle_lat_long.lat +"," + circle_lat_long.lng + "&daddr=" + myData[key].lat + "," + myData[key].lon;
					html_out = html_out + myData[key].html + "</br><strong>" + myData[key].distance + " miles</strong></br><a href='" + google_link + "' target='_blank'>Directions</a></br></br>";
			   
				}
			}

		//alert(html_out);
        // Set number of results on main page
        $('#json_one_results').html( counter_points_in_circle );
		$('#hospital_results').html( html_out );
			
	if ($('#radius-selected').val() == '5') {
		//alert($('#radius-selected').val());
		map.setView(new L.LatLng(circle_lat_long.lat, circle_lat_long.lng), 12);
	} else if ($('#radius-selected').val() == '10') {
		//alert($('#radius-selected').val());
		map.setView(new L.LatLng(circle_lat_long.lat, circle_lat_long.lng), 11);
	
		} else if ($('#radius-selected').val() == '25') {
		//alert($('#radius-selected').val());
		map.setView(new L.LatLng(circle_lat_long.lat, circle_lat_long.lng), 10);
	
		} else if ($('#radius-selected').val() == '50') {
		//alert($('#radius-selected').val());
		map.setView(new L.LatLng(circle_lat_long.lat, circle_lat_long.lng), 9);
	}
    }
// Close pointsInCircle
};
	//$( "#find_me" ).click(function() {
//	MQ.geocode({
//	  map: map,
//	  icon: L.icon({
//		iconUrl: 'leaflet/images/marker-icon.png',
		//iconSize: [ 22, 28 ],
		//iconAnchor: [ 11, 28 ],
		//popupAnchor: [ 0, -22 ]
//	  })
//			}).search($("#address_input").val());
///	});
///	var circle = L.circle([43.367297, -89.445567], 40233.6, {
 //   color: 'red',
//    fillColor: '#f03',
//    fillOpacity: 0.5
//}).addTo(map);
		//L.marker([43.07182, -89.38165]).addTo(map)
		//	.bindPopup("<b>Hello from DHS!!!").openPopup();

		//L.circle([51.508, -0.11], 500, {
		//	color: 'red',
		//	fillColor: '#f03',
		//	fillOpacity: 0.5
		//}).addTo(map).bindPopup("I am a circle.");

		//L.polygon([
		//	[51.509, -0.08],
		//	[51.503, -0.06],
		//	[51.51, -0.047]
		//]).addTo(map).bindPopup("I am a polygon.");


		var popup = L.popup();

		//function onMapClick(e) {
		//	popup
		//		.setLatLng(e.latlng)
		//		.setContent("You clicked the map at " + e.latlng.toString())
		//		.openOn(map);
		//}

		//map.on('click', onMapClick);