import { elements } from "./base";

export const renderItem = item => {
    //ingel id shineer ogcj bga ghmv.
    const html = `
                <li class="shopping__item" data-itemid=${item.id}>
                    <div class="shopping__count">
                        <input type="number" value="500" step="100">
                        <p>g</p>
                    </div>
                    <p class="shopping__description">${item.item}</p>
                    <button class="shopping__delete btn-tiny">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-cross"></use>
                        </svg>
                    </button>
                </li>`;

    elements.shoppingList.insertAdjacentHTML("beforeend", html);
    //before after gdg cn ehnij tag daraagin tag ym bnaa.
};

export const clearItems = () => {
    elements.shoppingList.innerHTML = '';
}

export const deleteItem = id => {
    //attributaar n shvvh tohioldold.
    const item = document.querySelector(`[data-itemid=${id}]`);
    item.parentElement.removeChild(item);
}