
//Check Login Status

FB.getLoginStatus(function(response) {
    statusChangeCallback(response);




});


// The response object that's provided to your callback contains a number of fields:

{
    status: 'connected',
        authResponse: {
    accessToken: '...',
        expiresIn:'...',
        signedRequest:'...',
        userID:'...'
}
}




