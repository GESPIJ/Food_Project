
export default class Likes {
    constructor (){
        this.likedRecipes=[];
        this.likedIds = [];
    };

    addRecipe (id, title, img, author){
        const newRecipe = {
            id,
            title,
            img,
            author
        };
        this.likedRecipes.push(newRecipe);
        this.likedIds.push(id);
        this.persisData();
        return newRecipe;
    };

    deleteRecipe (id){
        const index=this.likedRecipes.findIndex ((el)=>el.id===id);
        this.likedIds.splice(index,1);
        this.persisData();
        return this.likedRecipes.splice(index,1);
    };

    persisData (){
        localStorage.setItem('likes', JSON.stringify(this.likedRecipes));
        localStorage.setItem('likesIds', JSON.stringify(this.likedIds));
    };

    isLiked (id) {
        if (this.likedIds) return this.likedIds.includes(id);
        return false;
    };

    readStorage (){
        let storage,likes,likesIds;
        if (JSON.parse(localStorage.getItem('likes'))){
            likes= JSON.parse(localStorage.getItem('likes'));
            likesIds= JSON.parse(localStorage.getItem('likesIds'));
            storage = [likes,likesIds];
        }
        if (storage){
            this.likedRecipes=likes;
            this.likedIds=likesIds;
        }
    };
};