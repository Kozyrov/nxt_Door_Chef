# Chef Next Door

#### Post Meal

Starting point of Post Meal form.  This form allows Chef to provide and submit details of meals they would like to make available to potential customers.


- HTML Structure
    - Basic form which includes input fields.  Designed using Bootstrap.

- JS Functionality
    - Form
        - Upon user entering values on form and on click of submit button
            - jQuery ajax call to post data to database.
            - Display confirmation of meal being posted.
            - Clear values inside the form elements.
            
        - On click of cancel button
            - Clear values within input fields.
            - Reset cost back to default value.
            