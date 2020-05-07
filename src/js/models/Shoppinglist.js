import uniqid from 'uniqid';
export default class ShopList {
    constructor (){
        this.list=[];
    };

    addItem (item){
        const ite = {
            cantidad:item.cantidad,
            unidad:item.unidad,
            resto:item.resto,
            id: uniqid()
        };
        this.list.push(ite);
        return ite;
    };

    DelItem (id){
        const indice=this.list.findIndex((el)=> id===el.id);
        return this.list.splice(indice,1);
    };

    Updatecount (id,newCount) {
        this.list.find((el)=>el.id===id).cantidad=newCount;

    };
};