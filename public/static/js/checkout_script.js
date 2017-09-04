var lastPage = 'landingPage';

//Confirmation modal and calls sendEmail function
$(document).ready(function() {
    $('#confirmButton').click(confirmationButton);
    $('#backButtonCheckout').click(previousPageFromCheckout);
    $('.backButton').click(backToLandingPage);
    $('.backToHome').hide();
});

//Gather order data from order object and send it via ajax network call to the backend, specifically to nodemailer module.
function sendEmailConfirmation(userName, userEmail) {
    $.ajax({
        dataType:'JSON',
        data: {
            email: userEmail,
            user: userName,
            purchase_photo: current_meal.photo,
            purchase_price: current_meal.price,
            purchase_name: current_meal.item_name,
            chef_address: current_chef.address,
            chef_name: current_chef.firstName + " " + current_chef.lastName
        },
        method: 'POST',
        url: "https://api.nxtdoorchef.com/api/email/confirmation",
        success: function(response){
            console.log('success');
        }
    });
}

function previousPageFromCheckout(){
    $('#orderOf_container').empty();
    $('#pickupInfo_container').empty();
    if(lastPage === 'landingPage'){
        $('#checkout').hide();
        $('#landingPage').show();
        $('.right-nav').show();
    }else{
        $('#checkout').hide();
        $('#chefProfile').show();
        $('.backToHome').show();
    }
}

function backToLandingPage(){
    lastPage = 'landingPage';
    $('#chefProfile').hide();
    $('#landingPage').show();
    clearChefProfile();
}

function clearChefProfile(){
    $('#chefProfilePics').empty();
    $('#chefProfileChef').empty();
    $('#chefProfileMenu').empty();
    $('#chefProfileLocation').empty();
    $('#chefProfileReview').empty();
}
function confirmationButton(){
    if (formValidation() === false) {
        alert("Please fill in all required fields");
    } else {
        $('#confirmModal').modal("show");
        userName = ($("#userFirstName").val() + " " + $("#userLastName").val());
        userEmail = $("#userEmail").val();
        sendEmailConfirmation(userName, userEmail)
    }
}
function formValidation(){
    let input_fields = [$("#userFirstName"),$("#userLastName"),$("#userEmail")];
    for (i=0;i<input_fields.length;i++){
        if(input_fields[i].val() === null || input_fields[i].val() === ""){
            let input_container = input_fields[i].closest("div");
            input_container.addClass("has-error has-feedback");
            return false;
        } else {
            let input_container = input_fields[i].closest("div");
            input_container.removeClass("has-error has-feedback");
        }
    }
}