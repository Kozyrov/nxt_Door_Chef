$(document).ready(function(){
    $(document).ajaxError(function (event, jqXHR, settings, error) {
        alert("Sorry, We couldn't find what you were looking for. Please, double check your search and try again.")
        // $('#ajaxErrorModal').modal("show");
    });
    $('#checkout').hide();
    $('#chefProfile').hide();
    initMap();
    $('#icon-search').click(doSearch);
    $('.searchAll').click(getAllChefs);
    $('div').on('click', '.food_item', function(){
        menuModal(this);
    });
    $( ".foodInput" ).keydown(function(event) {
        enterKeySearch(event.which);
    });
});
var map, infoWindow, chefs = [], currentLocation, theChef;
/**
 * Creates a map using Irvine as the default location.
 */
function initMap(){
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 33.6305423, lng: -117.7432015},
        zoom: 13
    });
    getChefsFromDataBase();
    // if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(function(position) {
    //         var pos = {
    //             lat: 33.6349741,
    //             lng: -117.7403854
    //         };
    //         map = new google.maps.Map(document.getElementById('map'), {
    //             center: {lat: pos.lat, lng: pos.lng},
    //             zoom: 13
    //         });
    //         infoWindow = new google.maps.InfoWindow;
    //         infoWindow.setPosition(pos);
    //         infoWindow.setContent('Your Location.');
    //         infoWindow.open(map);
    //         map.setCenter(pos);
    //         reverseGeocoding(position);
    //     }, function() {
    //         // handleLocationError(true, infoWindow, map.getCenter());
    //         console.log('Something went wrong');
    //     });
    // } else {
    //     // handleLocationError(false, infoWindow, map.getCenter());
    //     alert('Allow location access');
    // }

}
/**
 * This function gets the name of a city given the latitude and longitude.
 */
function reverseGeocoding(position){
    $.ajax({
        dataType: "json",
        url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude,
        method: 'get',
        success: function(response){
            data = response;
            currentLocation = data.results[0].address_components[3].long_name;
            getChefsFromDataBase();
        }
    });
}
/**
 * This function makes a call to our database requesting chefs based on location by city.
 */
function getChefsFromDataBase(){
    $.ajax({
        dataType: "json",
        url: 'https://api.nxtdoorchef.com/api/chef/city/Irvine' /*+ data.results[0].address_components[3].long_name*/,
        method: 'get',
        success: function(response){
            data = response;
            getMenu();
            populateChefs();
        }
    });
}
/**
 * This function will use the chef profile id and use it to retrieve their menu from the database.
 */
function getMenu(){
    data.data.forEach(function(item){
        $.ajax({
            dataType: "json",
            url: 'https://api.nxtdoorchef.com/api/menu/id/' + item.id,
            method: 'get',
            success: function(response){
                menu = response;
                chefs.push({chef: item, menu: menu});
            }
        });
    });
}
/**
 * This function will populate the map with chefs in the users current city.
 * It takes usese data returned from out database api call.
 */
function populateChefs(){
    var locations = [];
    var markers = [];
    data.data.forEach(function(item){
        locations.push({title: item.alias, location: {lat: item.lat, lng: item.lng}});
    });
    var largeInfowindow = new google.maps.InfoWindow();
    var bounds = new google.maps.LatLngBounds();
    for(var i = 0; i < locations.length; i++){
        var position = locations[i].location;
        var title = locations[i].title;
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            id: i,
            icon: "assets/fork_n_knife_orange.png"
        });
        markers.push(marker);
        bounds.extend(marker.position);
        marker.addListener("click", function(){
            populateInfoWindow(this, largeInfowindow);
            $('.theChefBox').empty();
            displayChef(this);
            displayChefMobile(this);
        });
    }
    map.fitBounds(bounds);
    var listener = google.maps.event.addListener(map, "idle", function() {
        $('#whole-navbar').css('opacity', 1);
        $('#landingPage').css('opacity', 1);
        $('body').css('background-image', 'none');
        if (map.getZoom() > 13){
            map.setZoom(13);
            google.maps.event.removeListener(listener);
        }
    });
    setTimeout(displayFood, 700);
}
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
function displayChef(marker){
    $('.theChefBox').val();
    console.log(marker);
    for(var i = 0; i < chefs.length; i++){
        if(chefs[i].chef.alias === marker.title){
            theChef = chefs[i];
            break;
        }
    }
    var jumbotron = $('<div>', {
        class: 'jumbotron'
    });
    var theChefKitchen = $('<h2>',{
        text: theChef.chef.alias
    });
    var theChefBio = $('<p>', {
        text: theChef.chef.bio
    });
    var theChefName = $('<h3>',{
        text: 'Chef ' + theChef.chef.firstName + ' ' + theChef.chef.lastName
    });
    var theChefPicture = $('<img>',{
        src: theChef.chef.portrait,
        class: 'the_chef_picture'
    });
    var icon = $('<button>', {
        class: 'fullMenuButton btn',
        text: 'Chef Menu'
    }).click(showChef);
    jumbotron.append(theChefKitchen, theChefName, theChefPicture, theChefBio, icon);
    $('.theChefBox').append(jumbotron);
    //$('.mobileChefProfile').append(jumbotron);
    displayFood(theChef);
}


function displayChefMobile(marker){
    $('.mobileChefProfile').empty();
    console.log(marker);
    for(var i = 0; i < chefs.length; i++){
        if(chefs[i].chef.alias === marker.title){
            theChef = chefs[i];
            break;
        }
    }
    var jumbotron = $('<div>', {
        class: 'jumbotron'
    });
    var theChefKitchen = $('<h2>',{
        text: theChef.chef.alias
    });
    var theChefBio = $('<p>', {
        text: theChef.chef.bio
    });
    var theChefName = $('<h3>',{
        text: 'Chef ' + theChef.chef.firstName + ' ' + theChef.chef.lastName
    });
    var theChefPicture = $('<img>',{
        src: theChef.chef.portrait,
        class: 'the_chef_picture'
    });
    var icon = $('<button>', {
        class: 'fullMenuButton btn',
        text: 'Chef Menu'
    }).click(showChef);
    jumbotron.append(theChefKitchen, theChefName, theChefPicture, theChefBio, icon);
    $('.mobileChefProfile').append(jumbotron);
}

function displayStory(){
    for(var i = 0; i < 2; i++){
        var jumbotron = $('<div>', {
            class: 'jumbotron'
        });
        var slogan = $('<h2>',{
            text: 'A Taste of Home'
        });
        var story = $('<p>', {
            text: "Looking for a ride, open up Uber. Need a vacation rental, hop on Airbnb. Hungry...there's a nxtDoorChef for that!"
        });
        var firstPara = $('<p>', {
            text: "Simply enter the type of food you'd like to eat in the search bar, see who's cooking around you, pick the food that's gonna satisfy your craving, and order."
        });
        var secondPara = $('<p>', {
            text: "So don't wait.  Take a trip to your city's largest neighborhood eatery today."
        });
        var thirdPara = $('<p>', {
            text: "And the best part is...it's just right next door!"
        });
        jumbotron.append(slogan, story, firstPara, secondPara, thirdPara);
        if(i === 0){
            $('.theChefBox').append(jumbotron);
        }else{
            $('.mobileChefProfile').append(jumbotron);
        }
    }
}

/**
 * This function makes a call to our database requesting chefs based on location by city.
 * Same as getChefsFromDataBase but it uses the input value rather than users current location.
 * @param location
 */
function getChefByCityInput(location){
    $.ajax({
        dataType: "json",
        url: 'https://api.nxtdoorchef.com/api/chef/city/' + location,
        method: 'get',
        success: function(response){
            data = response;
            getMenu();
            populateChefs();
        }
    });
}
/**
 * This function makes a call to our database requesting chefs based on location by city.
 * Same as getChefsFromDataBase but it uses the input value rather than users current location.
 * @param location
 */
function getAllChefs(){
    $('.theChefBox').empty();
    $('.mobileChefProfile').empty();
    resetMapAndData();
    displayStory();
    $.ajax({
        dataType: "json",
        url: 'https://api.nxtdoorchef.com/api/chef',
        method: 'get',
        success: function(response){
            data = response;
            getMenu();
            populateChefs();
        }
    });
}
/**
 * This function makes a call to our database requesting menus based on location by food type.
 * @param location
 * @param foodtype
 */
function searchMenuByFood(food){
    $.ajax({
        dataType: "json",
        url: 'https:api.nxtdoorchef.com/api/menu/search/' + food,
        method: 'get',
        success: function(response){
            data = response;
            console.log(data);
            getMenu();
            populateChefs();
        }
    });
}

function resetMapAndData(){
    chefs = [];
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13
    });
}
/**
 * Queries the database based on the input fields.
 */
function doSearch(){
    var food = $('.foodInput').val();
    if(food !== ""){
        resetMapAndData();
        searchMenuByFood(food);
        $('.foodInput').val('');
    }else{
        $('.foodInput').attr('placeholder','Please enter a type of cuisine');
        return;
    }
}

function enterKeySearch(key){
    if(key == 13) {
        doSearch();
    }
}
