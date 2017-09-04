$(document).ready(function(){
    // $('#food_listing').on('load', getFoodData());
    $('div').on('click', '.food_item', function(){
        menuModal(this);
    });
});


function displayFood(selected_chef = null) {

    $('.results_heading').empty();
    var food_listing_div = $('<div>').attr('id', 'food_listing');

    if(selected_chef==null) {

        var listing_header = $('<h3>').text("What's Cookin' Near You:");
        for (var i = 0; i < chefs.length; i++) {
            // available_meals = chefs[i].menu.data[0];
            available_meals = chefs;
            for (var e = 0; e < chefs[i].menu.data.length; e++) {
                var dish_card = $('<div>').addClass('food_item');
                var dish_caption = $('<div>').addClass('food_caption');
                var dish_photo = $('<img>').attr("src", chefs[i].menu.data[e].photo);
                var dish_name = $('<h4>').addClass('food_name').text(chefs[i].menu.data[e].item_name);


                dish_caption.append(dish_name);
                dish_card.append(dish_photo, dish_caption);
                dish_card.attr('id', chefs[i].menu.data[e].id);
                $(food_listing_div).append(dish_card);
            }
        }
        $('.results_heading').append(listing_header, food_listing_div);

    }else{

        var listing_header = $('<h3>').text('Chef ' + selected_chef.chef.firstName + ' is currently cooking:');

        //console.log('this is the chosen one:', selected_chef);
        for (var e = 0; e < selected_chef.menu.data.length; e++) {
            var dish_card = $('<div>').addClass('food_item col-sm-3');
            var dish_caption = $('<div>').addClass('food_caption');
            var dish_photo = $('<img>').attr("src", selected_chef.menu.data[e].photo);
            var dish_name = $('<h4>').addClass('food_name').text(selected_chef.menu.data[e].item_name);

            dish_caption.append(dish_name);
            dish_card.append(dish_photo, dish_caption);
            dish_card.attr('id', selected_chef.menu.data[e].id);
            $(food_listing_div).append(dish_card);
        }
        $('.results_heading').append(listing_header, food_listing_div);
    }
}



