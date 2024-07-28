import Search from "./model/Search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/SearchView";
import Recipe from "./model/Recipe"
import { renderRecipe, clearRecipe, highlightSelectedRecipe } from './view/recipeView';
import List from "./model/List";
import * as listView from './view/listView';
import Like from './model/Like';
import * as likesView from './view/likesView';

/**
 * Web app төлөв
 * - Хайлтын query, үр дүн
 * - Тухайн үзүүлж байгаа жор
 * - Лайкласан жорууд
 * - Захиалж байгаа жорын найрлаганууд
 */
const state = {};
// Hailtiin controller
const controlSearch = async () => {
    // 1) Вэбээс хайлтын түлхүүр үгийг гаргаж авна.
    const query = searchView.getInput();

    if (query) {
        // 2) Шинээр хайлтын обьектийг үүсгэж өгнө.
        state.search = new Search(query);

        // 3) Хайлт хийхэд зориулж дэлгэцийг UI бэлтгэнэ.
        searchView.clearSearchQuery();
        searchView.clearSearchResult();  //delgtsnd garhs omno ustgacij baina.
        renderLoader(elements.searchResultDiv);

        // 4) Хайлтыг гүйцэтгэнэ
        await state.search.doSearch();

        // 5) Хайлтын үр дүнг дэлгэцэнд үзүүлнэ.
        clearLoader();
        if (state.search.result !== undefined) {
            searchView.renderRecipes(state.search.result, 1, 5);
        } else alert("Asuudal garlaa");
    }
};

elements.searchForm.addEventListener("submit", e => {
    e.preventDefault();
    controlSearch();
});

elements.pageButtons.addEventListener("click", e => {
    const btn = e.target.closest('.btn-inline')    //buyu bhgv ymig selectlhde gadnah diver n barij awjn tghde tuhain target dotor bga ymnas iim classtai hamgin oir bui elmentiig ogodhoo gdg ymiig zaajn. tgher ali ng buttonl garj irne gsn vgee.
    if (btn) {
        const gotopageNumber = btn.dataset.goto; //nogo zaaj ogsn utgaa awcjiin.
        if (gotopageNumber > 0) {
            searchView.clearSearchResult();
            searchView.renderRecipes(state.search.result, parseInt(gotopageNumber), 5);
        }
    }
})


// Joriin controller
//hash oorclogddg event maani window deer boldg bhnee.
const controlRecipe = async () => {
    // 1. Urlaas idg n salgaj awna.
    const id = window.location.hash.replace("#", "");  //location tuhain idg zaajidag. tvvn dotrs hashig n awhd idn gard irnee.
    //url deer id bga esehiig shalgana.
    if (id) {
        // 2. Joriin modeliig vvsgej ogno.
        state.recipe = new Recipe(id);  //buyu bvh tolowvvde state dotroo hadgalj ogjiin.

        // 3. UI delgetsiig beltgene.
        clearRecipe();
        renderLoader(elements.recipeDiv);  //ergelddeg sumaa nemew.
        highlightSelectedRecipe(id);

        // 4. Joroo tataj awcirna
        await state.recipe.getRecipe();  //jor tattal hvleene. theneer bicij bolno.

        // 5. Joriig gvitsetgeh hugatsaa bolon ortsiig tootsoolno
        clearLoader(); //ergelddgiig ustgaw.
        state.recipe.calcTime();
        state.recipe.calcHuniiToo();

        // 6. Joroo delgetsnd gargana.
        renderRecipe(state.recipe, state.likes.isLiked(id));
    }
}

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);  //buyu refresh hiihd svvld vzsenee bariad bjii gsn vg. gj hylbarclana.
['hashchange', 'load'].forEach(el => window.addEventListener(el, controlRecipe));
window.addEventListener('load', e => {
    //load byu  shiner app acaalgdhd likes modelig vvsgj ogoh heregtei.
    if (!state.likes) state.likes = new Like();
    //ehleh vyd like tsesiig gargah esehiig shiideh.
    likesView.toggleLikeMenu(state.likes.getNumberOfLikes());

    // laikuud baiwal tedgeeriig tsesend nemj haruulna.
    state.likes.likes.forEach(like => likesView.renderLike(like))
});


//Nairlaganii controller heregtei. 
const controlList = () => {
    // nairlagani modeliig vvsgene.
    state.list = new List();
    //omnn bsn nairlguudig tsewerlene.
    listView.clearItems();
    // ug model ruu odoo haragdaj bui jorni bvh nairlagiig awc hiine.
    state.recipe.ingredients.forEach(nairlaga => {
        //tuhain nairlagiig model ruu hiinee.
        const item = state.list.addItem(nairlaga);
        //tuhain nairlagiig delgetsnd haruulna
        listView.renderItem(item);
    });
}


// Like Controller
const controlLike = () => {
    // 1. Like iin modeliig vvsgene

    // 2. Odoo haragdaj bga jorin idg olj awah.
    const currenRecipeId = state.recipe.id;

    // 3. Ene joriig likelsan esehig shalgah
    if (state.likes.isLiked(currenRecipeId)) {
        // Likeltsan bol likiig n boliulna.
        state.likes.deleteLike(currenRecipeId);
        // likiin baigaa tsesnees ustgana.
        likesView.deleteLike(currenRecipeId);
        //likelsan baidliig boliulah
        likesView.toggleLikeButton(false);
    } else {
        // Laiklaagv bol likelna.
        const newLike = state.likes.addLike(currenRecipeId, state.recipe.title, state.recipe.publisher, state.recipe.image_url);
        // like tsesend ene likiig oruulah.
        likesView.renderLike(newLike);
        // laik towcnii likelsn baidliig likelsn bolgoh.
        likesView.toggleLikeButton(true);
    }

    likesView.toggleLikeMenu(state.likes.getNumberOfLikes());
}




//bhgv bga towciig gadnah diveer n bariad zowhn tern deer darhd hariu vildel vzvvly gdg sanaa target
elements.recipeDiv.addEventListener('click', e => {
    //matches iim classt ym baiwal gsn sana. tgd iim classt butoon bolon tvvn dotor bga bvgdngiin huwid gsn vg.
    if (e.target.matches('.recipe__btn, .recipe__btn *')) {
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        controlLike();
    }
})
elements.shoppingList.addEventListener('click', e => {
    //closest bidnii zaaj ogsn ymtai hamgiin oirin ymig olj ogdg
    // click hiisn li elmentiin data-item attribute shvvj gargaj awah.
    const id = e.target.closest('.shopping__item').dataset.itemid;
    //olson idtai ortsig modeloos ustgana
    state.list.deleteItem(id);
    //delgetsees iim idtai ortsiig olj ustgana.
    listView.deleteItem(id);
})