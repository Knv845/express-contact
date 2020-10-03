const express = require("express");
const bodyparser = require("body-parser");
const https = require("https");
const { url } = require("inspector");
const { request } = require("http");


const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html")
})

app.post("/",function(req, res){
const fname = req.body.n1;
const lname = req.body.n2;
const email = req.body.n3;

const data = {
     members:[
         {
             "email_address": email,
             "status":"subscribed",
             "merge_fields":{
                 "FName": fname,
                 "LNAME": lname,
             }
         }
     ]   
};

const jsondata = JSON.stringify(data);

const url ="https://us2.api.mailchimp.com/3.0/lists/d1517d865f";

 const options = {
     method: "POST",
     auth: "knv1:0cdfcd306f211e8e480e311b9b61c273-us2"
 }

 const request = https.request(url, options, function(response){

    if(response.statusCode === 200){
        res.sendFile(__dirname+ "/sucess.html")
    }else{
        res.sendFile(__dirname+ "/failure.html")
    }

    response.on("data",function(data){
        console.log(JSON.parse(data));
    })
});

request.write(jsondata);
request.end();

});

app.post("/failure", function(req, res){
    res.redirect("/")
})




app.listen(process.env.PORT ||3000, function(){
    console.log("server is running on port 3000");
})





