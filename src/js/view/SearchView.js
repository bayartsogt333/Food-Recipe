import { elements } from "./base"

//private function
const renderRecipe = recipe => {
    console.log(recipe);
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="Test">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${recipe.title}</h4>
                    <p class="results__author">${recipe.punlisher}</p>
                </div>
            </a>
        </li>` //template stringiin temdg ashiglasan vyd shahaj mahaad baih shaardlagagvi.

    //ul rvvge nemne
    elements.searchResultList.insertAdjacentHTML("beforeend", markup);
}
//type n < > alin bolohiig zaanaa gsn vg.
const createButton = (page, type) => {
    if (type === "prev") { //data goto gdg utga tawij ogsnor arin utgand n handah bolomjtoi bdg.
        return `<button class="btn-inline results__btn--prev" data-goto=${page}>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-left"></use>
                    </svg>
                    <span>Хуудас ${page}</span>
                </button>`;
    } else {
        return `<button class="btn-inline results__btn--next" data-goto=${page}> 
                    <span>Хуудас ${page}</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-right"></use>
                    </svg>
                </button>`;
    }
};

const renderButtons = (currentPage, totalPages) => {
    let buttonHtml;

    if (currentPage === 1 && totalPages > 1) {
        // 1r huudsan deer baina 2r huudas gdg towciig gargah.
        buttonHtml = createButton(2, "next")
    } else if (currentPage === totalPages) {
        //hamgiin svvliin hudas deer bna omnoh rvv shiljvvlh towciig vzvlne.
        buttonHtml = createButton(currentPage - 1, "prev")
    } else if (currentPage < totalPages) {
        // omnoh bolon daraacin huudas lu shiljih towciig vzvvl.
        buttonHtml = createButton(currentPage - 1, "prev");
        buttonHtml += createButton(currentPage + 1, "next")
    }
    elements.pageButtons.insertAdjacentHTML("afterbegin", buttonHtml);
}

export const getInput = () => elements.searchInput.value;
export const renderRecipes = (recipes, currentPage = 1, resPerPage = 10) => {
    // Hailtiin vr dvng huudaslaj vzvvleh.
    const start = (currentPage - 1) * resPerPage; //huudas deer pizza edr maani hedes ehld haana duushi gl ted nariinl haruulna gsn vg.
    const end = currentPage * resPerPage;
    recipes.slice(start, end).forEach(renderRecipe)  //gel bolo oilgmjt neg elment orj irel ter n damjih ucir
    // Huudaslaltiin towchuudig gargaj ireh.
    renderButtons(currentPage, Math.ceil(recipes.length / resPerPage));
}


export const clearSearchQuery = () => {
    elements.searchInput.value = '';
}//labeliig oorclow.
export const clearSearchResult = () => {
    elements.searchResultList.innerHTML = '';
    elements.pageButtons.innerHTML = ''; //buyu huudas shiljih towciig ustgaw.
} //buyu dotrn bga bvh ul itemvvdg daraad hoosn ym biccine.