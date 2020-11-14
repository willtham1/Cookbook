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

$('#replace-button').on('click', function(event){
    event.preventDefault()
    replaceIngredient()

})
// Favorite button will be on each recipe, clicking it will add it to the favorite recipes local storage.
$('.favorite-button').on('click', function(event){
    event.preventDefault()
    storeFavorite(this.parent())
})


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
        ingredient.html(`Substitutes for: ${userIngredient}`)

        if(response.substitutes){
            for (var i = 0; i < response.substitutes.length; i++){
                results.append(`<li>${response.substitutes[i]}</li>`)
            }
        } else {
            results.append(`<li>${response.message}</li>`)
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
        displayCard()
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
            if(image){
                $(`#recipe${i+1}-image`).attr('src', image)
            } else {
                $(`#recipe${i+1}-image`).attr('src', 'http://img.recipepuppy.com/9.jpg')                
            }
        };
    })
}

$(`.save-button`).on('click', function(event){
    event.preventDefault()
    var savedRecipe = $(this).siblings()[0].href
    console.log($(this).siblings()[0].href)
    storeFavorite(savedRecipe)
})


function storeFavorite(favorite) {
    var favList = JSON.parse(localStorage.getItem("Favorite Recipes") || "[]")
    favList.push({favorite})
    localStorage.setItem('Favorite Recipes', JSON.stringify(favList))
}    

function displayCard (){
    var recipeCards = document.querySelector('.recipe-card')
    if(window.getComputedStyle(recipeCards).display === "none"){
        $(`.recipe-card`).toggle()
    } else {
        return
    }

}