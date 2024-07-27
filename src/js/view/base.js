//classud n yronhiido viewte holboot ucir end hadgalaw.
export const elements = {
    searchResultDiv: document.querySelector('.results'),
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResultList: document.querySelector('.results__list'),
    pageButtons: document.querySelector('.results__pages')
}
export const elementStrings = {
    loader: 'loader'
}


export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw" </use>
            </svg>
        </div>`;
    parent.insertAdjacentHTML("afterbegin", loader);
}
//ergej baigaa iconooo oruulj irewee.

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) {
        loader.parentElement.removeChild(loader);
    }
}
//ergeldej bga iconoo  ustgaj ogowoo.