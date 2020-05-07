import {elements} from './base';
export const getInput = ()=> elements.searchInput.value;
export const renderRecipes = (recipes)=>{
    recipes.forEach(element => {
        renderRecipe(element);  
    })};
export const clear_input = ()=>{
    elements.searchInput.value='';
};
export const clear_Html = ()=>{
    elements.resultList.innerHTML='';
    elements.buttonpage.innerHTML='';
};

export const pageselector = (recipe, numPerPage=10,page=1)=> {
    const tamaño=recipe.length;
    const start= numPerPage*(page-1);
    const end = numPerPage*(page);
    let recipesPagActual = recipe.slice(start,end);
    return recipesPagActual;
};

export const addButton = (recipe,page=1,numPerPage)=>{
    const pages = Math.ceil(recipe.length/numPerPage);
    let button;
    if (page===1 && pages!==1){
        button=create_button('next',page);
    } else if (page<pages){
        button= create_button('prev',page)+create_button('next',page);
    } else if(page===pages && pages!==1){
        button =create_button('prev',page);
    };
    document.querySelector('.results__pages').insertAdjacentHTML('afterbegin',button);
};

export const short_title = (title,limit=20)=>{
    const newTitle= [];
    if (title.length > limit){
        title.split(' ').reduce((ac,el)=>{
            if (ac+el.length < limit){
                newTitle.push(el);
            }
            return ac+el.length;
        },0);
        return `${newTitle.join(' ')}...`;

    }
    return title;
};

const create_button = (type,page)=>
    `<button class="btn-inline results__btn--${type}" data-goto=${type==='prev'?page-1:page+1}>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type==='prev'?'left':'right'}"></use>
        </svg>
        <span>Page ${type==='prev'?page-1:page+1}</span>
    </button>`
;

const renderRecipe = (recipe)=>{


    const stringHTML= `<li>
                    <a target="_blank" class="results__link results__link--active" href="${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src=${recipe.image_url} alt=${recipe.title}>
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${short_title(recipe.title)}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>`;
    elements.resultList.insertAdjacentHTML('beforeend', stringHTML);
};