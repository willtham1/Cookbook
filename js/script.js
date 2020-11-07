
// Recipe puppy API starter
// variable will be used to store user input later on.
// var userInput = $('#userInput').val().trim()
var recipeURL = `https://cors-anywhere.herokuapp.com/recipepuppy.com/api/?pg=1&i=mushroom,tomato,steak,corn`;
      $.ajax({
        url: recipeURL,
        method: "GET",
      }).then(function (response) {
        console.log(JSON.parse(response));

        // Grab response with JSON, due to the response being returned as a string
        var recipeList = JSON.parse(response)
        for (var i = 0; i < recipeList.results.length; i++){
            console.log('-------------------------')
            console.log('Recipe name: ' + recipeList.results[i].title.trim())
            console.log('Ingredient list: ' + recipeList.results[i].ingredients)
            console.log('Thumbnail: ' + recipeList.results[i].thumbnail)
            console.log('Link: ' + recipeList.results[i].href)
            console.log('-------------------------')
        
        }
      });




// Spoonacular API starter
// API call works
// variable will be used to store user input later on.
// var ingredientURL = $('#ingredient').val().trim()
var ingredientURL = `https://api.spoonacular.com/food/ingredients/substitutes?apiKey=fdea7c2ea8d1434eb3207d8b48260907&ingredientName=butter`

$.ajax({

    url: ingredientURL,
    method: 'GET'
}).then(function (response) {
console.log(response.message)
    for (var i = 0; i < response.substitutes.length; i++){
        console.log(response.substitutes[i])

    }


})