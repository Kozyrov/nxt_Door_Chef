
function getChefFoodOptions (){
    var chefFoodOptions = {
        url: src = '/C4.17_food_on_demand/chef_profile/package.json',
        success: handleMealSuccess,
        error: handleError,
        dataType: 'json',
        method: 'get',
        crossdomain: true
    };

    function handleMealSuccess(foodOptions){
        console.log('success displaying meals for this chef', foodOptions);
        var foodImage = foodOptions[i].food_image;
        var foodDetail = foodOptions[i].food_detail;
        var foodCost = foodOptions[i].food_cost;
    }

    function handleError(){
        console.log('Error displaying meals for this chef');
    }

    $.ajax(chefFoodOptions);
}

function displayFoodOption (foodImage, foodDetail, foodCost) {
    getChefFoodOptions();


}

