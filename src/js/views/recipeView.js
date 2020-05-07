import {elements} from './base';
import {Fraction} from 'fractional';
export const clearRecipes= ()=>{
    elements.recipeInfo.innerHTML='';
};
import likes from '../models/likes';
import * as likesView from './likesView';

export const renderRecipe = (recipe, isLiked)=>{
    console.log(recipe);
    console.log(recipe.title);
    console.log(recipe.img);
    let string = `
    <figure class="recipe__fig">
                <img src="${recipe.img}" alt="Tomato" class="recipe__img">
                <h1 class="recipe__title">
                    <span>${recipe.title}</span>
                </h1>
            </figure>
            <div class="recipe__details">
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-stopwatch"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
                    <span class="recipe__info-text"> minutes</span>
                </div>
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-man"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
                    <span class="recipe__info-text"> servings</span>

                    <div class="recipe__info-buttons">
                        <button class="btn-tiny btn-decrease">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-minus"></use>
                            </svg>
                        </button>
                        <button class="btn-tiny btn-increase">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-plus"></use>
                            </svg>
                        </button>
                    </div>

                </div>
                <button class="recipe__love">
                    <svg class="header__likes">
                        <use href="img/icons.svg#${isLiked? 'icon-heart' : 'icon-heart-outlined'}"></use>
                    </svg>
                </button>
            </div>



            <div class="recipe__ingredients">
                <ul class="recipe__ingredient-list">
                    
                </ul>

                <button class="btn-small recipe__btn">
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-shopping-cart"></use>
                    </svg>
                    <span>Add to shopping list</span>
                </button>
            </div>

            <div class="recipe__directions">
                <h2 class="heading-2">How to cook it</h2>
                <p class="recipe__directions-text">
                    This recipe was carefully designed and tested by
                    <span class="recipe__by">The Pioneer Woman</span>. Please check out directions at their website.
                </p>
                <a class="btn-small recipe__btn" href="http://thepioneerwoman.com/cooking/pasta-with-tomato-cream-sauce/" target="_blank">
                    <span>Directions</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-right"></use>
                    </svg>

                </a>
            </div>
    `;
        var linea= recipe.ingredients.reduce((acm,el)=>{
            let codigo= `
            <li class="recipe__item">
                        <svg class="recipe__icon">
                            <use href="img/icons.svg#icon-check"></use>
                        </svg>
                        <div class="recipe__count">${convertirFraccion(el.cantidad)}</div>
                        <div class="recipe__ingredient">
                            <span class="recipe__unit">${el.unidad}</span>
                            ${el.resto}
                        </div>
                    </li>`;
            return acm+=codigo;
        }, '');
        elements.recipeInfo.insertAdjacentHTML('beforeend', string);
        document.querySelector('.recipe__ingredient-list').insertAdjacentHTML('afterbegin',linea);};


        const convertirFraccion =(num)=>{
            num+='';
            if (num.includes('.')) {
                let [entero,decimal]= num.split('.');
                decimal= +`0.${decimal}`;
                let fract=new Fraction(decimal);
                if (entero>0) return `${entero} ${fract.numerator}/${fract.denominator}`;
                else return `${fract.numerator}/${fract.denominator}`;
                } else return +num;
    };

        