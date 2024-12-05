import mongoose from 'mongoose';

// 1. Create a schema
// This recipeSchema lays down the foundation for every new recipe that will be added to our database.
// Performing Validations while defining the schema
const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please check the entry, no title specified."]
    },
    price: {
        type: Number,
        required: [true, "Please check the entry, no price specified."]
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, "The rating is required, please specify a value between 1 - 5."]
    },
    image: {
        type: String,
        required: [true, "Please provide an image URL."]
    },
    like: {
        type: Boolean,
        default: false
    }
});

// 2. Compiling our schema into a Model.
// Use the schema to create a mongoose model - specify two parameters:
// first is the name of the collection that complies with this particular schema
// If you have a collection of recipes, you use the word Recipe in singular form
// and Mongoose will convert this string to a plural form to create your collection.
// A model is a class with which we construct documents.

export const Recipe = mongoose.model("Recipe", recipeSchema);