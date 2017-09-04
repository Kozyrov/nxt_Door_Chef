var reviews;
var hours;
var operationHours;

function showChef(){
    getHours();
    getReviews();
    $('#landingPage').hide();
    $('#chefProfile').show();
    $('.right-nav').hide();
    createMenu();
    createMobileMenu();
    setTimeout(createChefStory, 300);
    createLocation();
    createPics();
    $('.backToHome').show();
}

function getHours(){
    $.ajax({
        dataType: "json",
        url: 'https://api.nxtdoorchef.com/api/hours/chef/' + theChef.chef.id,
        method: 'get',
        success: function(response){
            hours = response;
            displayHours();
        }
    });
}

function getReviews(){
    $.ajax({
        dataType: "json",
        url: 'https://api.nxtdoorchef.com/api/reviews/retrieve/' + theChef.chef.id,
        method: 'get',
        success: function(response){
            reviews = response;
            createReviews();
        }
    });
}

function displayHours(){
    var sunday = null;
    var monday = null;
    var tuesday = null;
    var wednesday = null;
    var thursday = null;
    var friday = null;
    var saturday = null;
    hours.data.forEach(function(item){
        switch (item.day){
            case 0:
                sunday = $(`<li>Sunday: ${item.open} - ${item.close - 1200} pm</li>`);
                break;
            case 1:
                monday = $(`<li>Monday: ${item.open} - ${item.close - 1200} pm</li>`);
                break;
            case 2:
                tuesday = $(`<li>Tuesday: ${item.open} - ${item.close - 1200} pm</li>`);
                break;
            case 3:
                wednesday = $(`<li>Wednesday: ${item.open} - ${item.close - 1200} pm</li>`);
                break;
            case 4:
                thursday = $(`<li>Thursday: ${item.open} - ${item.close - 1200} pm</li>`);
                break;
            case 5:
                friday = $(`<li>Friday: ${item.open} - ${item.close - 1200} pm</li>`);
                break;
            case 6:
                saturday = $(`<li>Saturday: ${item.open} - ${item.close - 1200} pm</li>`);
                break;
        }
    });
    operationHours = $('<ul>',{
        class: 'hours'
    }).append(sunday, monday, tuesday, wednesday, thursday, friday, saturday);
}

function createMenu(){
    $('#chefProfileMenu').append($('<h1 style="padding-top: 40px;">Menu</h1>'));
    var container = $('<div class="list-group">');
    theChef.menu.data.forEach(function(item){
        var icon = $(`<button class="buyButton btn btn-info pull-right" data-name="${item.item_name}">Buy</button>`).click(orderItem);
        var groupContainer = $(`<a class="list-group-item"></a>`);
        var heading = $(`<h4 class="list-group-item-heading">${item.item_name} | $${item.price}</h4>`).append(icon);
        var description = $(`<p class="list-group-item-text">${item.description}</p>`);
        groupContainer.append(heading, description);
        container.append(groupContainer);
        $('#chefProfileMenu').append(container);
    });
}

function createMobileMenu(){
    $('#mobileChefMenu').val();
    //$('#mobileChefMenu').append($('<h1 style="padding-top: 40px;">Menu</h1>'));
    var container = $('<div class="list-group">');
    theChef.menu.data.forEach(function(item){
        var icon = $(`<button class="buyButton btn btn-info pull-right" data-name="${item.item_name}">Buy</button>`).click(orderItem);
        var groupContainer = $(`<a class="list-group-item"></a>`);
        var heading = $(`<h4 class="list-group-item-heading">${item.item_name} | $${item.price}</h4>`).append(icon);
        var description = $(`<p class="list-group-item-text">${item.description}</p>`);
        groupContainer.append(heading, description);
        container.append(groupContainer);
        $('#mobileChefMenu').append(container);
    });
}

function createChefStory(){
    var chef = $('<h1 style="padding-top: 40px;">The Chef</h1>');
    // var table = $('<table class="table table-bordered table-striped"><tr><th><span class="glyphicon glyphicon-home"></span></th><th><span class="glyphicon glyphicon-user"></span></th><th><span class="glyphicon glyphicon-cutlery"></span></th></tr></table>');
    var table = $('<table class="table table-bordered table-striped"><tr><th>Chef Name</th><th>Kitchen Name</th><th>Food Type</th></tr></table>');
    var tableData = $(`<tr></tr>`);
    var tableRestaurant = $(`<td>${theChef.chef.alias}</td>`);
    var tableName = $(`<td>${theChef.chef.firstName} ${theChef.chef.lastName}</td>`);
    var tableFoodType = $(`<td>${theChef.chef.foodType}</td>`);
    tableData.append(tableName, tableRestaurant, tableFoodType);
    table.append(tableData);

    var chefStory = $('<h4>', {
        text: 'Story'
    });
    var chefBio = $('<p>', {
        text: theChef.chef.bio
    });
    var chefHours = $('<h4>', {
        text: 'Hours'
    });
    $('#chefProfileChef').append(chef, table, chefStory, chefBio, chefHours, operationHours);
}

/**
 * Dynamically creates the location section of the chef profile page which includes a map.
 */
function createLocation(){
    var location = $('<h1 style="padding-top: 40px;">Location</h1>');
    var chefAddress = $('<a>', {
        text: theChef.chef.address,
        href: "https://www.google.com/maps/dir/Current+Location/" + theChef.chef.address,
        target: "_blank"

    });
    var chefMap = $('<div>', {
        id: 'mapTwo'
    });
    $('#chefProfileLocation').append(location, chefAddress, chefMap);
    map = new google.maps.Map(document.getElementById('mapTwo'), {
        zoom: 13
    });
    data = {
        data: [theChef.chef]
    };
    populateChefs();
}
/**
 * Dynamically creates a bootstrap carousel for the pictures on the chef profile page.
 */
function createPics(){
    var food = theChef.menu.data;
    $('#chefProfilePics').append($('<div id="chefCarousel" class="carousel"></div>'));
    $('#chefCarousel').append($('<ol class="carousel-indicators"></ol>'));
    $('#chefCarousel').append($('<div class="carousel-inner" role="listbox"></div>'));

    var leftControl = $('<a class="left carousel-control" href="#chefCarousel" role="button" data-slide="prev"></a>');
    var leftArrow = $('<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>');
    var previous = $('<span class="sr-only">Previous</span>');
    leftControl.append(leftArrow, previous);
    $('#chefCarousel').append(leftControl);

    var rightControl = $('<a class="right carousel-control" href="#chefCarousel" role="button" data-slide="next"></a>');
    var rightArrow = $('<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>');
    var next = $('<span class="sr-only">Next</span>');
    rightControl.append(rightArrow, next);
    $('#chefCarousel').append(rightControl);

    for(var i = 0; i < food.length; i++){
        $('<div class="item buyButton" data-name="'+food[i].item_name+'" ><img src="'+food[i].photo+'"></div>').click(createModal).appendTo('.carousel-inner');
        // $('<div class="item"><img id="menuCarousel" src="'+food[i].photo+'"></div>').appendTo('.carousel-inner');
        $('<li data-target="#chefCarousel" data-slide-to="'+i+'"></li>').appendTo('.carousel-indicators');
        if(i === 0){
            $('.item').addClass('active');
            $('li').addClass('active');
        }
    }
}

function orderItem(){
    var element = $(this).attr('data-name');
    var menu = theChef.menu.data;
    lastPage = 'profilePage';
    $('#chefProfile').hide();
    for(var i = 0; i < menu.length; i++){
        if(menu[i].item_name === element){
            current_meal = menu[i];
            current_chef = theChef.chef;
            placeOrder();
        }
    }
}

function createModal(){
    var element = $(this).attr('data-name');
    var menu = theChef.menu.data;
    for(var i = 0; i < menu.length; i++){
        if(menu[i].item_name === element){
            current_meal = menu[i];
            current_chef = theChef.chef;
        }
    }
    $('.modal-title').text(current_meal.item_name);
    var meal_div = $('<div>',{
        class: 'meal-modal col-xs-10'
    });

    var meal_img = $('<img>',{
        src: current_meal.photo,
        height: '175px',
        width: '275px',
        class: 'col-xs-8'
    });
    var meal_description = $('<h4>',{
        text: 'Description'
    });
    var meal_description_info = $('<p>',{
        text: current_meal.description
    });
    var meal_cost = $('<h4>',{
        text: 'Cost'
    });
    var meal_cost_info = $('<p>',{
        text: '$ ' + current_meal.price
    });

    $(meal_div).append(meal_img, meal_description, meal_description_info, meal_cost, meal_cost_info);
    $('.menu-modal').empty().append(meal_div);
    $('#chefModal').modal('show');
}

function chefModalOrder(){
    lastPage = 'profilePage';
    $('#chefProfile').hide();
    placeOrder();
}


function createReviews(){
    var reviewsHeader = $('<h1>', {
        text: 'Reviews'
    });
    var reviewsContainer = $('<div>', {
        class: 'reviewsContainer'
    });
    $('#chefProfileReview').append(reviewsHeader,reviewsContainer);
    reviews.data.forEach(function(item){
        var theReview = $('<div>');
        var reviewer = $('<h4>',{
            text: item.user_name
        });
        var dateLong = item.createdAt.substring(0,10);
        var year = dateLong.substring(2,4);
        var date = $('<h5>',{
            text: `${dateLong.substring(5,10)}-${year}`
        });
        var description = $('<p>',{
            text: item.body
        });
        theReview.append(reviewer, date, description);
        reviewsContainer.append(theReview);
    });
}

$(window).scroll(function(){
    var nav = $('#chefProfileMenu');
    var width = $('#chefProfileMenu').parent().width();
    var isPositionFixed = (nav.css('position') === 'fixed');
    if ($(this).scrollTop() > 430 && !isPositionFixed){
        $('#chefProfileMenu').css({'position': 'fixed', 'top': '0px', 'width': width});
    }
    if ($(this).scrollTop() < 430 && isPositionFixed){
        $('#chefProfileMenu').css({'position': 'static', 'top': '0px'});
    }
});

function backToHome(){
    $('.backToHome').hide();
    $('.right-nav').show();
}
