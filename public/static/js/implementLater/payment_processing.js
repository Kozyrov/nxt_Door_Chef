// //Using Stripe as example Payment Processor through comments for ease of reference
// //take in credit card number and customer token and send those to back-end
// var customer_info = {
//     id: 'x8x7xhx7df9',
//     balance: 5000, //tokens
//     email: 'customer@hungry.com'
// };
//
// var order_info = {
//     id: 123565,
//     total: 1500 //tokens
// };
//
// var chef_info = {
//     id: 'dfsfsd23y7whudf',
//     balance: 4000
// };
//
// console.log(order_info.total);
//
// function ajaxCall(customer_info, order_info) {
//     console.log('call initiated');
//     $.ajax({
//         method: 'get',
//         dataType: 'json',
//         data: {
//             'amount': order_info.total,
//         },
//         url: 'static_API_return.json',
//         success: function (response) {
//             console.log(response);
//             stripe_response = response;
//             // updateChefBalance(chef_info.id, response.amount);
//             // updateCustomerBalance(customer_info.id, response.amount);
//             updateCheckoutPage('success');
//         },
//         error: function (response) {
//             updateCheckoutPage('fail');
//         }
//     })
// }
//
// function updateChefBalance(chef_id, order_total){
//     $('#chef_id').balance += order_total;
// }
//
// function updateCustomerBalance(customer_id, order_total){
//     $('#customer_id').balance -= order_total;
// }
//
//
// function updateCheckoutPage(message){
//     console.log(message);
//     switch(message){
//         case 'success':
//             console.log('Order Complete');
//             break;
//         case 'fail':
//             console.log('Order Failed');
//             break;
//         default:
//             console.log('Order failed to process please try again')
//     }
// }
//
// //may not need conversion function since Stripe takes in dollar amount in cents ($1 = 100)
// //If we keep same conversion no math needed
// // function convertToDollars(tokens){
// //     return tokens/100;
// // }
// //
// // function convertToTokens(dollars){
// //     return dollars*100;
// // }
//
//
//
//
//
//
