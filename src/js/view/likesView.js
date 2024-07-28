import { elements } from "./base";
//likelsn bol zvrhiig dvvrgesneer solih.
export const toggleLikeButton = isLiked => {
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    //buyu iim classt elment dotroos usig seletl gjin.
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`);
    //ingl dotorh attributiin oorcilcnoo.
};


export const toggleLikeMenu = numLikes => {
    elements.likesMenu.style.visibility = numLikes > 0 ? "visible" : "hidden";
}

export const renderLike = newLike => {
    const html = `<li>
                    <a class="likes__link" href="#${newLike.id}">
                        <figure class="likes__fig">
                            <img src="${newLike.img}" alt="Test">
                        </figure>
                        <div class="likes__data">
                            <h4 class="likes__name">${newLike.title}</h4>
                            <p class="likes__author">${newLike.publisher}</p>
                        </div>
                    </a>
                </li>`;

    elements.likesList.insertAdjacentHTML('beforeend', html);
}

export const deleteLike = id => {
    // a eer bolqv dawhardd bga ucir likes linkees haina.
    const li = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
    if (li) {
        li.parentElement.removeChild(li);
    }
}