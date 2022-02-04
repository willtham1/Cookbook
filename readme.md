# [Cookbook - Recipe Search and Ingredient Substitution](https://willtham1.github.io/first.project/)

Welcome to our recipe searching app! This app was created through the collaboration of 3 developers. Their github links are available on the contributors tab on the side bar.

The goals of this app are as follows:

    Allow a user to search for recipes, based on a few ingredients
    Allow a user to search for replacement ingredients to ingredients they do not want to use
    Allow a user to save their favorite recipes for reference later

My primary task for this app was to work on the Javascript logic behind the scenes, in order to make the app display the appropriate results.

In order to accomplish these task, our app uses the RecipePuppy API to find new recipes, and the Spoonacular Recipe Substitute API in order to find replacement items. The favorite recipes are saved via localstorage.

## Getting Started

When the page is first loaded the user will be shown the home page for our app, on this page the user can search for recipes using a list of ingredients.

The ingredients need to be entered in with a comma(,) separating them in order to generate a list of recipes. If nothing is entered, a default list of recipes will be shown. There are also previous and next page buttons to generate another set of results using the same search parameters. 

![Homepage](/assets/homepage.jpg)

Each recipe will display the name of the recipe, a list of ingredients needed, an image of the recipe (if there is one available), and a button that will allow the user to save the to their favorites list.

![Recipe Results](/assets/reciperesults.jpg)

If the user saves chooses to save a recipe they will be asked if they want to save the recipe to their favorites. If no is clicked they will be returned to their search results, however if yes is clicked, the recipe will be saved before being returned to the search results

![Save Recipe](/assets/saverecipe.jpg)

On smaller windows our app will have a dropdown menu for the rest of the pages that are included, and on larger windows the navbar will show links to all of the pages directly.

![Navbar](/assets/navbar.jpg)

<strong>Home</strong> will return the user to the recipe search homepage.

<strong>Substitute Ingredients</strong> will bring the user to our subtitute ingredients function

<strong>Favorites</strong> will bring the user to their list of saved recipes.

<strong>Sign Up / Log In</strong> will bring the user to our Sign Up and Log In pages, however these pages currently <strong>do not</strong> have any functionality and planned to be added at a later date.

## Substitute Ingredients

On the substitute ingredients page, the user will be able to enter an ingredient and receive a list of substitutes that are available for that ingredient.

In the example below we entered butter as an ingredient, and are given a list of options that we can use to subtitute for butter.
![Substitute Ingredients](/assets/subingred.jpg)



## Favorites Page

Finally, the favorites page will show a list of the recipes that the user has decided to save. On this page the user will be shown their saved recipes by name and with a weblink to the saved recipe. They are also given the option to clear their favorites and are asked for an answer before their favorites are deleted.
![Favorites Page](/assets/favoritespage.jpg)


## Future Development

Here are some planned improvements for the app as it currently stands:

    Fix display of images on live website - The recipe images will not display on the live site due to a security issue. May need to change API's or use a different method.
    Change favorites to show more than just a recipe name
    Add functionality to user login and sign up pages
    
