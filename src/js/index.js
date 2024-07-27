import Search from "./model/Search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/SearchView";

/**
 * Web app төлөв
 * - Хайлтын query, үр дүн
 * - Тухайн үзүүлж байгаа жор
 * - Лайкласан жорууд
 * - Захиалж байгаа жорын найрлаганууд
 */
const state = {};

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