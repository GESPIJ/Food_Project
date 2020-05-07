import {elements} from './base';
import * as likesView from './searchView';
export const renderLikedRecipe = (recipe)=>{
const codigo= `
<li>
    <a class="likes__link" href="#${recipe.id}" data-id=likes-${recipe.id}>
        <figure class="likes__fig">
            <img src="${recipe.img}" alt="${likesView.short_title(recipe.title)}">
        </figure>
        <div class="likes__data">
             <h4 class="likes__name">${likesView.short_title(recipe.title)}</h4>
            <p class="likes__author">${recipe.author}</p>
         </div>
    </a>
</li>`;
elements.likesList.insertAdjacentHTML('beforeend', codigo);
};
 
export const toggleLikeBtn = (isLiked)=>{
    const codigo= isLiked? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href',`img/icons.svg#${codigo}`);
};

export const deleteRecipe = (id)=>{
    let parent=document.querySelector(`[data-id=likes-${id}]`).parentElement;
    //let el = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
    parent.parentElement.removeChild(parent);
    //console.log(a);
};

