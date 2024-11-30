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

// import express from 'express'
// import bodyParser from 'body-parser'
// import axios from 'axios'

// const app = express();
// app.use(bodyParser.urlencoded({extended:true}))
// //handle the get request from the client
//  app.get("/",async (req,res)=>{
//     // const url = "https://bored-api.appbrewery.com/random/";
//     const url = "https://randomuser.me/api/";
//     try{
//         // const response = await axios.get(url);
//         // const data = response.data
//         const response = await fetch(url);
//         const json = await response.json()
//         console.log(json);
//         res.render("index.ejs", {data:json})
//     }
//     catch(err){
//         console.log("Failed to make a request", err.message);
//         // res.render("index.ejs",{error: err.message})
//     }
// }) 

// app.post("/",(req,res)=>{
//     const {type, participants} = req.body;
//     console.log(type, participants)
// })

// app.post("/message", (req, res) => {
//     res.json({ message: "Hello from server!" });
// });

// const PORT = 5000;
// app.listen(PORT,()=>{
//     console.log(`The server is up and listening on port ${PORT}`)
// })

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

// Enable CORS for all origins (you can restrict it to specific origins if needed)
app.use(cors());

// Middleware to parse incoming JSON data
app.use(bodyParser.json());

// Array to store form data temporarily (you can replace this with a database later)
let contactFormData = [];

// POST endpoint to search for recipes (you can add real functionality later)
app.post('/api/searchRecipe', (req, res) => {
    const { keyword, numberOfRecipes } = req.body;
  
    // Example logic: Search for recipes (this is just a placeholder)
    if (!keyword) {
      return res.status(400).json({ error: 'Keyword is required to search' });
    }
  
    // Assuming you fetch or search for recipes based on the keyword
    const dummyRecipes = [
      { name: 'Spaghetti', ingredients: 'Pasta, Tomato, Cheese' },
      { name: 'Tacos', ingredients: 'Tortilla, Meat, Lettuce' },
      // Add more dummy recipes here
    ];
  
    // Filter recipes based on keyword (just a simple filter for now)
    const filteredRecipes = dummyRecipes.filter(recipe =>
      recipe.name.toLowerCase().includes(keyword.toLowerCase())
    );
  
    // Send filtered recipes in the response
    res.json({ recipes: filteredRecipes.slice(0, numberOfRecipes) });
  });

// POST endpoint to receive the contact form data
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Store the form data in the array
  contactFormData.push({ name, email, subject, message });

  // Respond with the stored data to show it on the frontend
  res.status(200).json({
    success: 'Message sent successfully!',
    data: { name, email, subject, message },
  });
});

// GET endpoint to fetch stored form data (for demonstration)
app.get('/api/contact', (req, res) => {
  res.json(contactFormData);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});