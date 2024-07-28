import uniqid from 'uniqid'

export default class List {
    constructor() {
        this.items = [];
    }
    addItem(item) {
        let newItem = {
            id: uniqid(),
            item //item: item gej bicjiihar ingcij bolno.
        }
        this.items.push(newItem);
        return newItem;
    }
    deleteItem(id) {
        //id gedeg idtai ortsin indexig massiwas olno
        const index = this.items.findIndex(el => el.id === id);
        //ug index deerh elmentiig massiwaas ustgana.
        this.items.splice(index, 1);
    }
}