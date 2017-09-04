$(document).ready(function(){
    $('.submit').click(makeCall);
});
var data = null;
var markers = [];
var locations = [
    // {title: 'Irvine Spectrum', location: {lat: 33.6509, lng: -117.7441}},
    // {title: 'Burnt Crumbs', location: {lat: 33.6461, lng: -117.7436}},
    // {title: 'Sabrosada', location: {lat: 33.6177, lng: -117.7058}},
    // {title: 'Halal Guys', location: {lat: 33.6812, lng: -117.8865}},
    // {title: 'Puzzle Workshop Escape Room', location: {lat: 33.6880, lng: -117.8582}}
];

function makeCall(){
    var encodedAddress = $('.input').val();
    $.ajax({
        dataType: "json",
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        method: 'get',
        success: function(response){
            data = response;
            locations.push({title: data.results[0].formatted_address, location: {lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng}});
            initMap();
        }
    });

    $('.input').val('');
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 34.052235, lng: -118.243683},
        maxZoom: 13
    });
    google.maps.event.trigger(map,'resize');

    var largeInfowindow = new google.maps.InfoWindow();
    var bounds = new google.maps.LatLngBounds();
    for(var i = 0; i < locations.length; i++){
        var position = locations[i].location;
        var title = locations[i].title;
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            id: i
        });
        markers.push(marker);
        bounds.extend(marker.position);
        marker.addListener("click", function(){
            populateInfoWindow(this, largeInfowindow);
        });
    }
    map.fitBounds(bounds);
    function populateInfoWindow(marker, infowindow){
        if(infowindow.marker != marker){
            infowindow.marker = marker;
            infowindow.setContent('<div>' + marker.title + '</div>');
            infowindow.open(map, marker);
            infowindow.addListener('closeclick', function(){
                infowindow.setMarker(null);
            });
        }
    }
}

