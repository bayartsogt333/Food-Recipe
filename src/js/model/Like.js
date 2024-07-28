export default class Like {
    constructor() {
        this.readDataFromLocalStorage(); //buyu shud ehelhd local storagee shalgana.
        if (!this.likes)
            this.likes = [];
    }
    addLike(id, title, publisher, img) {
        let like = {
            id,
            title, //item: item gej bicjiihar ingcij bolno.
            publisher,
            img
        }
        //storage ruu hadgalna.
        this.likes.push(like);

        this.saveDataToLocalStorage();
        return like;
    }
    deleteLike(id) {
        //id gedeg idtai likiin indexig massiwas olno
        const index = this.likes.findIndex(el => el.id === id);
        //ug index deerh elmentiig massiwaas ustgana.
        this.likes.splice(index, 1);

        this.saveDataToLocalStorage(); //delete hiihd mon ylggv medeell oruulch bhnee. update gsn vg.
    }
    //ymar ng jorig liklsn gv boloh.
    isLiked(id) {
        //buyu tuhain ymn dotor bwl likelsn bna gsn vg.
        if (this.likes.findIndex(el => el.id === id) === -1)
            return false;
        return true;
    }
    //niit heden elm likelgdsin gdgg helne.
    getNumberOfLikes() {
        return this.likes.length;
    }

    saveDataToLocalStorage() {
        localStorage.setItem('likes', JSON.stringify(this.likes)); //hvsnegteer dawtalt hiijigd bvgdin neg string bolgj zalgd json bolgcdg bhne.
    }

    readDataFromLocalStorage() {
        this.likes = JSON.parse(localStorage.getItem('likes')); //string hvred irne tvvng javascript object bolgoj bna.
    }
}