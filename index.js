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

// GET route to fetch all recipes
app.get("/api/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.send(JSON.stringify(recipes));
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch recipes.' });
  }
});

// GET route to fetch a specific recipe by ID
app.get("/api/recipes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: `Error: ${err.message}` });
  }
});

// DELETE route to handle recipe deletion by ID
app.delete("/api/recipes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(id);
    if (!deletedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json({ message: "Recipe deleted successfully", deletedRecipe });
  } catch (err) {
    res.status(500).json({ message: `Error deleting recipe: ${err.message}` });
  }
});

// POST route to handle adding a new recipe
app.post("/api/recipes", async (req, res) => {
  const { title, image, ingredients, instructions, rating } = req.body;

  if (!title || !image || !ingredients || !instructions || !rating) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newRecipe = new Recipe({
    title,
    image,
    ingredients,
    instructions,
    rating,
  });

  try {
    const savedRecipe = await newRecipe.save();
    res.status(201).json({ message: "Recipe added successfully", savedRecipe });
  } catch (err) {
    res.status(500).json({ message: `Error adding recipe: ${err.message}` });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
