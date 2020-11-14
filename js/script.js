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

            // Display the image if there is one, otherwise display a placeholder
            if(image){
                $(`#recipe${i+1}-image`).attr('src', image)
            } else {
                $(`#recipe${i+1}-image`).attr('src', 'http://img.recipepuppy.com/9.jpg')                
            }
        };
    })
}


// When a save button is clicked, grab the name and url, call local storage function
$(`.save-button`).on('click', function(event){
    event.preventDefault()
    var savedRecipe = $(this).siblings()[0].href
    var recipeName = $(this).siblings()[0].textContent
    storeFavorite(savedRecipe, recipeName)
})

// Stores the recipe name and the URL into local storage.
function storeFavorite(recipeLink, recipeName) {
    var favList = JSON.parse(localStorage.getItem("Favorite Recipes") || "[]")
    favList.push({recipeName})
    localStorage.setItem('Favorite Recipes', JSON.stringify(favList))

    var favLinks = JSON.parse(localStorage.getItem("Favorite Links") || "[]")
    favLinks.push({recipeLink})
    localStorage.setItem('Favorite Links', JSON.stringify(favLinks))
}    


// Grabs the local storage information and shows the user their favorite recipe names with the link to the recipe.
function displayFavorite(){
    var favList = JSON.parse(localStorage.getItem("Favorite Recipes") ||"[]")
    var favLinks = JSON.parse(localStorage.getItem("Favorite Links") || "[]")
    console.log(favLinks)
    for(var i = 0; i< favList.length; i++){
            $(`.favDisplay`).append(`<a href= "${favLinks[i].recipeLink}">${favList[i].recipeName}</a><br>`)
    }
}


// Toggles the display for the recipe to be shown if it is currently hidden
function displayCard (){
    var recipeCards = document.querySelector('.recipe-card')
    if(window.getComputedStyle(recipeCards).display === "none"){
        $(`.recipe-card`).toggle()
    } else {
        return
    }

}
// Calls the favorite display
displayFavorite()