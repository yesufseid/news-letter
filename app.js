const express=require("express");
const bodyparser=require("body-parser");
const request=require("request")
const https=require("https");
const { error } = require("console");
const app=express();
app.use(express.static('public'))
app.use(bodyparser.urlencoded({extended:true}));
app.get("/",function(req,res){
   res.sendFile(__dirname+"/public/sign-up.html")
});
app.post("/",function(req,res){
    
    var fristname=req.body.fristname
    var lastname=req.body.lastname
    var email=req.body.email
    const data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:fristname,
                    LNAME:lastname
                }
            }
        ]
    }
var jsondata=JSON.stringify(data);
const url="https://us18.api.mailchimp.com/3.0/lists/7808da96c9";
const options={
    method:"POST",
    auth:"seid:96aed94707eb449ef9cfb6458f2227f7-us18"
}
app.post("/faluir",function(req,res){
    res.redirect("/")
})
app.post("/succsses",function(req,res){
    res.redirect("/")
})



const request=https.request(url,options,function(response){
   
if (error === 0){
    res.sendFile(__dirname+"/public/succsses.html")
} else {
    res.sendFile(__dirname+"/public/faluir.html")
}

  response.on("data",function(data){
    var error=JSON.parse(data ).error_count
    console.log(JSON.parse(data ));
    console.log(error);
//    console.log(response.statusCode);
   })
})

request.write(jsondata);
request.end()






})



//api key
//765a8901311c93f695f8b253da5bc2b7-us21
//list id
//c7a7da62c2

















app.listen(process.env.PORT || 3000,function(){
    console.log("the server is working in port 30000");
});