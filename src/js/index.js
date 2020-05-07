import Search from './models/Search';
import {elements, renderLoader,clearLoader} from './views/base';
import * as Searchview from './views/searchView';
import Recipe from './models/Recipe';
import * as recipeView from './views/recipeView';
import * as ShoppingView from './views/Shoppingviews';
import List from './models/Shoppinglist';
import Likes from './models/likes';
import * as likesView from './views/likesView';

//console.log(search.results);
//console.log('hola');
//console.log(search);
//search.getResult();
//console.log(search.results);
// Global app controller
//Global State of the app
// Search object
//Current Recipe Object
//Shopping list object
//Liked recipes

const state = {
    likes: new Likes()
};

//Reestorage likes on page load

window.addEventListener('load', ()=>{

    state.likes= new Likes();
    state.likes.readStorage();

    state.likes.likedRecipes.forEach((el)=>{
        likesView.renderLikedRecipe(el);
    });
})

const controlSearch = async (query)=> {

    if (query) {
        Searchview.clear_input();
        Searchview.clear_Html();
        state.search = new Search(query);
        renderLoader(elements.results);
        await state.search.getResult();
        console.log(state.search.results);
        Searchview.renderRecipes(Searchview.pageselector(state.search.results,10,1));
        Searchview.addButton(state.search.results,1,10);
        clearLoader();
    }
};

elements.searchButton.addEventListener('submit', async e=> {
    const query=Searchview.getInput();
    e.preventDefault();
    await controlSearch(query);
    
});

elements.buttonpage.addEventListener('click', (e)=>{
    const btn=e.target.closest('.btn-inline');
    const nextPage=parseInt(btn.dataset.goto);
    Searchview.clear_Html();
    Searchview.renderRecipes(Searchview.pageselector(state.search.results,10,nextPage));
    Searchview.addButton(state.search.results,nextPage,10);
});

document.querySelector('.results').addEventListener('click',async (ev)=>{
    ev.preventDefault();
    const id= ev.target.closest('.results__link').getAttribute("href");
    state.recipe= new Recipe(id);
    renderLoader(elements.recipeInfo);
    await state.recipe.getRecipe();
    state.recipe.sepIngredientes();
    recipeView.clearRecipes();
    recipeView.renderRecipe(state.recipe, state.likes.isLiked(state.recipe.id));
    clearLoader();
});


document.querySelector('.recipe').addEventListener('click', (e)=>{
    let ingrediente, ing_separado;
    if (e.target.matches('.recipe__btn, .recipe__btn *')){
        if (!state.list) state.list = new List();
        state.recipe.ingredients.forEach((ing)=>{
            ingrediente=state.list.addItem(ing);
            ShoppingView.renderItem(ingrediente);
        });
        } else if (e.target.matches ('.btn-decrease, .btn-decrease *')){
            if (state.recipe.servings>1) state.recipe.servings-=1;
                document.querySelector('.recipe__info-data--people').textContent=state.recipe.servings;
                state.recipe.ingredients.forEach((el,ind)=>{
                    state.recipe.ingredients[ind].cantidad=(el.cantidad*state.recipe.servings)/(state.recipe.servings+1);
                });
                recipeView.clearRecipes();
                recipeView.renderRecipe(state.recipe);
                    
        } else if (e.target.matches ('.btn-increase, .btn-increase *')){
            state.recipe.servings+=1;
            document.querySelector('.recipe__info-data--people').textContent=state.recipe.servings;
            state.recipe.ingredients.forEach((el,ind)=>{
                state.recipe.ingredients[ind].cantidad=(el.cantidad*state.recipe.servings)/(state.recipe.servings-1);
            });
            recipeView.clearRecipes();
            recipeView.renderRecipe(state.recipe);

        } else if (e.target.matches('.recipe__love, .recipe__love *')){
            let recipe=state.recipe;
            let newLiked = {
                id:recipe.id,
                title:recipe.title,
                img:recipe.img,
                author:recipe.author
            }
            if (!state.likes) state.likes= new Likes();
            if (!state.likes.likedIds.includes(recipe.id)) {
                newLiked= state.likes.addRecipe(recipe.id, recipe.title, recipe.img, recipe.author);
                likesView.renderLikedRecipe(newLiked);
            } else {
                state.likes.deleteRecipe(recipe.id);
                likesView.deleteRecipe(recipe.id);
            }
            likesView.toggleLikeBtn(state.likes.likedIds.includes(recipe.id));
        };
     
});

document.querySelector('.shopping').addEventListener('click', (e)=>{
    const id = e.target.closest('.shopping__item').dataset.id.split('-')[1];

    if (e.target.matches('.shopping__delete, .shopping__delete *')){
        state.list.DelItem(id);
        ShoppingView.deleteItem(id);
    } else if (e.target.matches('.button-inc-shopping, button-inc-shopping *')){
        const val = parseFloat(e.target.value,10);
        state.list.Updatecount(id,val);
    }
});

    
    







