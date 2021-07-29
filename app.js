const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
//Static files which are to be used are provided in public
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/signin.html")
})

app.post("/",(req,res)=>{

    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    // console.log(firstName,lastName,email);


    var data = {
        members : [
        {
            email_address:email,
            status:"subscribed",
            merge_fields : {
                FNAME:firstName,
                LNAME:lastName
            }
            //data which is stored to be in mailchimp
        }
    ]
    };

    var jsonData = JSON.stringify(data);

    var options = {
        url : "https://us6.api.mailchimp.com/3.0/lists/e43269b7b6", method:"POST",
        headers :{
            "Authorization" : "sreekarkairik faa9fcb1bf879a2a8159ae51ab761de0-us6" 
        },
        //Authorizing our self

        body : jsonData
        // we comment it to get Error
    };
    request(options,function(error,response,body){
        if(error){
            res.sendFile(__dirname+"/failure.html");}
        else{
            if(response.statusCode===200)
            {
                res.sendFile(__dirname+"/success.html");
            }
            else
            {
                res.sendFile(__dirname+"/failure.html");
            }
        }
        
    });

});

//Recdiecting Failure to Home Page
app.post("/failure",function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000,()=>{
    console.log("Listening to Server ,port 3000");
});
//proceess.env.PORT -Heroku PORT
// faa9fcb1bf879a2a8159ae51ab761de0-us6
// e43269b7b6