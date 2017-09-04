$(document).ready(function() {

});

/**
 * postMealClicked - Event Handler when user clicks the cancel button, calls clearPostMealForm function.
 */
function postMealClicked() {
    postMealData();
}

/**
 * cancelClicked - Event Handler when user clicks the cancel button, calls clearPostMealForm function.
 */
function cancelClicked() {
    clearPostMealForm();
}

/**
 * clearPostMealForm - Clears Post Meal Form.
 */
function clearPostMealForm() {
    $('#dish').val('');
    $('#description').val('');
    $('#cost').val('100 Tokens');
}

/**
 * jQuery ajax call to post to database.
 */
function postMealData(){
    $.ajax({
        url: "localhost:3000/register/menu",
        method: 'post',
        dataType: 'json',
        data: {
            "menu_item_number":
            "item_name": $('#dish').val(),
            "description": $('#description').val(),
            "price": $('#cost').val(),
            "chef_id":
        },

        success: function(results) {
            console.log('success');
        }

        error: function(results) {
            console.log('failure');
        }
    }
    clearPostMealForm();
}