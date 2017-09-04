##Payment Processing Page

###Required Data
- User/customer data
    - At minimum customer info must include:
        - id (unique identifier)
        - balance (remaining tokens/dollars)
        - email (not required but allows receipt to be sent to customer through API)
    - Chef Info Needed
        - id (unique identifier to store order in system)
        - balance (existing chef balance)
    - Order Info
        - id (also used to store order in system)
        - total (amount to send to Payment API to charge customer)
        
        
###Functions
- ajaxCall
  - To be called on click of the order/checkout button on the Checkout Page
    - Parameters taken in
        - customer_info
            - to be used on a successful API response
            - customer email needed for receipt
        - order_info
            -u sed in the ajax call to send amount
    - Function returns
        - Success
            - payment went through and the order process can be completed
        - Failure
            - need to alert checkout page
- updateChefBalance
    - if successful API charge add money to chef account   
- updateCustomerBalance
    - if successful API charge take money from user account    
- updateCheckoutPage
    - send API response to checkout page
    