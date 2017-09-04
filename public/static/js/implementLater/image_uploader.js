const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
//default option for uploading
app.use(fileUpload());

app.post('/fileUpload', function (req, res) {
    console.log('****************handler for your upload******************************');
    console.log(req.files.fileUpload);
    if(!req.files){
        return res.status(400).send("Files could not be uploaded");
    }
    let uploaded_file = req.files.fileUpload.name;
    console.log(uploaded_file);
    req.files.fileUpload.mv("./uploads/" + uploaded_file, function(err) {
        if(err){
            return res.status(500).send(err);
        }else{
            res.send(`${uploaded_file} was uploaded successfully`);
        }
    });
});
app.listen(3000, function () {
    console.log('uploader receiver listening on port 3000!')
});
