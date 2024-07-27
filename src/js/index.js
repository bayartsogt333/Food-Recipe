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
            searchView.renderRecipes(state.search.result);
        } else alert("Asuudal garlaa");
    }
};

elements.searchForm.addEventListener("submit", e => {
    e.preventDefault();
    controlSearch();
});