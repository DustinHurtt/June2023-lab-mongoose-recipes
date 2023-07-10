const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

const newRecipe = {
  title: "New Recipe",
  cuisine: "Techie food"
}

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create(newRecipe)
  })
  .then((result) => {
    console.log(`This is the new recipe: ${result.title}`)
    return Recipe.insertMany(data)
  })
  .then((result) => {
    result.forEach((recipe) => {
      console.log(`The recipe's title is ${recipe.title}`)
    })
    return Recipe.findOneAndUpdate({
      title: 'Rigatoni alla Genovese'
    }, 
    {
      duration: 100
    },
    {new: true})
  })
  .then((result) => {
    console.log(`succesfully updated duration to: ${result.duration}`)
    return Recipe.deleteOne({
      title: 'Carrot Cake'
    })
  })
  .then((result) => {
    console.log("Deletion result:", result)
    mongoose.connection.close(() => {
      console.log('connection closed')
    })
  }) 
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
