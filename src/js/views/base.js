export const elements = {
    searchInput : document.querySelector('.search__field'),
    searchButton: document.querySelector('.search'),
    resultList : document.querySelector('.results__list'),
    results : document.querySelector('.results'),
    buttonpage : document.querySelector('.results__pages'),
    recipeInfo: document.querySelector('.recipe'),
    Shopping: document.querySelector('.shopping__list'),
    likesList: document.querySelector('.likes__list'),
    likesButton: document.querySelector('.recipe__love')
};

export const elementStrings = {
    loader: 'loader'
};

export const renderLoader = parent=> {
    const loader = ` 
    <div class="${elementStrings.loader}">
        <svg>
            <use href="img/icons.svg#icon-cw"></use>
        </svg>
    </div>   
    `;
    parent.insertAdjacentHTML ('afterbegin',loader);
};

export const clearLoader = ()=> {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
};