var pageNumber
var recipeList


// Display the previous page of results
$('#previous-button').on('click', function(event){
    event.preventDefault()
    console.log('test')
    if(pageNumber >1){
        pageNumber--
        generateRecipes()
    } else {
        console.log('error')
    } 
})

// Display the next page of results
$('#next-button').on('click', function(event){
    event.preventDefault()
    console.log('Next')
    pageNumber++
    generateRecipes()

})


// Recipe puppy API
$('#search-button').on('click', function(event){
    event.preventDefault()
    // Start on page one of results when search is clicked
    pageNumber = 1
    console.log(userInput)    
    generateRecipes()
    
})

// Add replace button
$('#replace-button').on('click', function(event){
    event.preventDefault()

})


// Spoonacular API starter
// API call works
// variable will be used to store user input later on.

function replaceIngredient() {
    // Add replace ingredient text input field.
    var userIngredient = $('#userIngredient').val().trim()
    var apiKey = 'fdea7c2ea8d1434eb3207d8b48260907'
    var ingredientURL = `https://api.spoonacular.com/food/ingredients/substitutes?apiKey=${apiKey}&ingredientName=${userIngredient}`
    
    $.ajax({
        
        url: ingredientURL,
        method: 'GET'
    }).then(function (response) {
        console.log(response.message)
        for (var i = 0; i < response.substitutes.length; i++){
            console.log(response.substitutes[i])
        }
    })
}

function generateRecipes() {
    var userInput = $('#userInput').val().trim()
    // Remove erroneous text from user string    
    userInput = userInput.replace(/ +/g, "")
    var recipeURL = `https://cors-anywhere.herokuapp.com/recipepuppy.com/api/?p=${pageNumber}&i=${userInput}`;
    console.log(recipeURL)
    $.ajax({
        url: recipeURL,
        method: "GET",
    }).then(function (response) {
        console.log(JSON.parse(response));
        // recipe1-title
        // recipe1-ingredients
        // Grab response with JSON, due to the response being returned as a string
        recipeList = JSON.parse(response)
        for (var i = 0; i < recipeList.results.length; i++) {
            title = (recipeList.results[i].title.trim())
            ingredients = (recipeList.results[i].ingredients)
            url = recipeList.results[i].href

            $(`#recipe${i+1}-title`).html(title)
            $(`#recipe${i+1}-ingredients`).html(ingredients)
            $(`#recipe${i+1}-title`).attr('href', recipeList.results[i].href)
            $(`#recipe${i+1}-image`).attr('src', recipeList.results[i].thumbnail)

            // console.log('-------------------------')
            // console.log('Recipe name: ' + recipeList.results[i].title.trim())
            // console.log('Ingredient list: ' + recipeList.results[i].ingredients)
            // console.log('Thumbnail: ' + recipeList.results[i].thumbnail)
            // console.log('Link: ' + recipeList.results[i].href)
            // console.log('-------------------------')
        };
    })
}

    
