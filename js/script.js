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
    replaceIngredient()

})


// Spoonacular API starter
// API call works
// variable will be used to store user input later on.

function replaceIngredient() {
    // Add replace ingredient text input field.
    var userIngredient = $('#userIngredient').val().trim()
    var apiKey = 'fdea7c2ea8d1434eb3207d8b48260907'
    var ingredientURL = `https://api.spoonacular.com/food/ingredients/substitutes?apiKey=${apiKey}&ingredientName=${userIngredient}`
    var results = $(`#new-ingredients`)
    var ingredient = $(`#ingredient-name`)

    // Reset display before adding new results
    results.html('')
    ingredient.html('')


    $.ajax({
        
        url: ingredientURL,
        method: 'GET'
    }).then(function (response) {
        console.log(response.message)
        ingredient.html(`Substitutes for: ${userIngredient}`)
        for (var i = 0; i < response.substitutes.length; i++){
            results.append(`<li>${response.substitutes[i]}</li>`)
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
        // Grab response with JSON, due to the response being returned as a string
        recipeList = JSON.parse(response)
        for (var i = 0; i < recipeList.results.length; i++) {

            // Assign results to variables
            var title = (recipeList.results[i].title.trim())
            var ingredients = (recipeList.results[i].ingredients)
            var url = recipeList.results[i].href
            var image = recipeList.results[i].thumbnail

            // Change the html of the recipe cards on the home page
            $(`#recipe${i+1}-title`).html(title)
            $(`#recipe${i+1}-ingredients`).html(ingredients)
            $(`#recipe${i+1}-title`).attr('href', url)
            $(`#recipe${i+1}-image`).attr('src', image)
        };
    })
}

    
