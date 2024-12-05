import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { uri } from './atlas_uri.js'; // MongoDB Atlas URI
import { Recipe } from './models/recipes.js'; // Recipe model

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const main = async () => {
  try {
    await mongoose.connect(uri); // No additional options required
    console.log("Database connected: " + uri);
  } catch (err) {
    console.error("Error connecting to database:", err);
    process.exit(1); // Exit the process if the connection fails
  }
};

main();

// Routes
app.get("/api/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.send(JSON.stringify(recipes));
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch recipes.' });
  }
});

app.get("/api/recipesinfo/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await Recipe.findById(id);
    res.json(recipe);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

