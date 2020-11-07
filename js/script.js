
// Recipe puppy API starter
// var userInput = $('#userInput').val()
var recipeURL = `https://cors-anywhere.herokuapp.com/recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3`;
      $.ajax({
        url: recipeURL,
        method: "GET",
      }).then(function (response) {
        console.log(JSON.parse(response));

        // Grab response with JSON, due to the response being returned as a string
        var recipeList = JSON.parse(response)
        for (var i = 0; i < recipeList.results.length; i++){
            console.log('Recipe name: ' + recipeList.results[i].title)
            console.log('Ingredient list: ' + recipeList.results[i].ingredients)
        
        }
      });




// Spoonacular API starter
// API call works
var ingredientURL = $('#ingredient').val()
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