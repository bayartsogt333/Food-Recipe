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


export const getInput = () => elements.searchInput.value;
export const renderRecipes = recipes => {
    recipes.forEach(renderRecipe)  //gel bolo oilgmjt neg elment orj irel ter n damjih ucir 
}
export const clearSearchQuery = () => {
    elements.searchInput.value = '';
}
export const clearSearchResult = () => {
    elements.searchResultList.innerHTML = '';
} //buyu dotrn bga bvh ul itemvvdg daraad hoosn ym biccine.