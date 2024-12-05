import mongoose from 'mongoose';

// 1. Create a schema
// This recipeSchema defines the fields and validations for each recipe document
const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please check the entry, no title specified."]
  },
  image: {
    type: String,
    required: [true, "Please provide an image URL."]
  },
  ingredients: {
    type: String,
    required: [true, "Ingredients are required."]
  },
  instructions: {
    type: String,
    required: [true, "Instructions are required."]
  },
  rating: {
    type: Number,
    required: [true, "The rating is required, please specify a value between 1 - 5."],
    min: 1,
    max: 5
  }
});

// 2. Compiling our schema into a Model
// Creating a model using the recipeSchema and exporting it as Recipe
export const Recipe = mongoose.model("Recipe", recipeSchema);
