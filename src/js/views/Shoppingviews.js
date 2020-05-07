import {elements} from './base';
export const renderItem = (item)=>{

let codigo = `<li class="shopping__item" data-id=lista-${item.id} class="button-inc-shopping">
                    <div class="shopping__count">
                        <input type="number" value="${item.cantidad}" step="${item.cantidad}">
                        <p>${item.unidad}</p>
                    </div>
                    <p class="shopping__description">${item.resto}</p>
                    <button class="shopping__delete btn-tiny">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-cross"></use>
                        </svg>
                    </button>
                </li>`;

elements.Shopping.insertAdjacentHTML('beforeend', codigo);



};

export const deleteItem = id => {
    const item = document.querySelector(`[data-id=lista-${id}]`);
    if (item) item.parentElement.removeChild(item);
};
