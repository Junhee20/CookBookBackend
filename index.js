// import express from "express";
// const app = express();
// const bodyParser = require('body-parser')

// app.use(bodyParser.urlencoded({extended:true}))
// //handle the get request from the client
//  app.get("/",async (req,res)=>{
//     // const url = "https://bored-api.appbrewery.com/random/";
//     // const url = "https://www.google.com/";
//     // try{
//     //     // const response = await axios.get(url);
//     //     // const data = response.data
//     //     const response = await fetch(url);
//     //     const json = await response.json()
//     //     console.log(json);
//     //     res.render("index.ejs", {data:json})
//     // }
//     // catch(err){
//     //     console.log("Failed to make a request", err.message);
//     //     // res.render("index.ejs",{error: err.message})
//     // }
// }) 

// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`The server is up and running on port ${PORT}`);
// });

import express from 'express'
import bodyParser from 'body-parser'
import axios from 'axios'

const app = express();
app.use(bodyParser.urlencoded({extended:true}))
//handle the get request from the client
 app.get("/",async (req,res)=>{
    // const url = "https://bored-api.appbrewery.com/random/";
    const url = "https://randomuser.me/api/";
    try{
        // const response = await axios.get(url);
        // const data = response.data
        const response = await fetch(url);
        const json = await response.json()
        console.log(json);
        res.render("index.ejs", {data:json})
    }
    catch(err){
        console.log("Failed to make a request", err.message);
        // res.render("index.ejs",{error: err.message})
    }
}) 

app.post("/",(req,res)=>{
    const {type, participants} = req.body;
    console.log(type, participants)
})

app.post("/message", (req, res) => {
    res.json({ message: "Hello from server!" });
});

const PORT = 5000;
app.listen(PORT,()=>{
    console.log(`The server is up and listening on port ${PORT}`)
})