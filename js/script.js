var pageNumber
var recipeList

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

$('#next-button').on('click', function(event){
    event.preventDefault()
    console.log('Next')
    pageNumber++
    generateRecipes()

})


// Recipe puppy API
$('#search-button').on('click', function(event){
    event.preventDefault()
    // Start on page one of results
    pageNumber = 1
    // Remove erroneous text from user string    
    console.log(userInput)    
    generateRecipes()
    
})

// Add functionality to display the next page of results



// Spoonacular API starter
// API call works
// variable will be used to store user input later on.
// var ingredientURL = $('#ingredient').val().trim()
var ingredientURL = `https://api.spoonacular.com/food/ingredients/substitutes?apiKey=fdea7c2ea8d1434eb3207d8b48260907&ingredientName=flour`

$.ajax({
    
    url: ingredientURL,
    method: 'GET'
}).then(function (response) {
    console.log(response.message)
    for (var i = 0; i < response.substitutes.length; i++){
        console.log(response.substitutes[i])
        
    }
    
    
})

function generateRecipes() {
    var userInput = $('#userInput').val().trim()
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
            console.log('-------------------------')
            console.log('Recipe name: ' + recipeList.results[i].title.trim())
            console.log('Ingredient list: ' + recipeList.results[i].ingredients)
            console.log('Thumbnail: ' + recipeList.results[i].thumbnail)
            console.log('Link: ' + recipeList.results[i].href)
            console.log('-------------------------')
        };
    })
}

    
