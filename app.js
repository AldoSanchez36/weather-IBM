const express = require('express');
const https = require("https");
const bodyPaser = require('body-parser');
const { request } = require('http');

const app = express();
const port = 3000;

app.use(bodyPaser.urlencoded({extended:true}));


app.get('/',function(req,res){
res.sendFile(__dirname +"/index.html");
});  

app.post("/",function(req,res){
    let latitud=req.body.latitud;
    let longitud=req.body.longitud;
    const url="https://api.weather.com/v3/wx/observations/current?geocode="+latitud+","+longitud+"&units=e&language=en-US&format=json&apiKey=49393204faea4c26b93204faeabc26d4";

    https.get(url,function(response){
        response.on("data",function(data){
        const weatherData = JSON.parse(data)
        const temp =  weatherData.temperature
        const weaterDescription = weatherData.cloudCoverPhrase

        const icon = weatherData.iconCode
        const imgURL = " https://doc.media.weather.com/products/icons/"+icon+".png"
        console.log(temp,weaterDescription);
        res.write("<h1>The weather is " + weaterDescription +"</h1>  ");
        res.write("<h2>The temperature in is " + temp + "F degrees </h2>");
        res.write("<img src="+imgURL+">");
        res.write("<input type='button' onclick='home()'>Home</input>")
        res.send();

        })
    })

})



// el servidor esta funcionando en el puerto
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

