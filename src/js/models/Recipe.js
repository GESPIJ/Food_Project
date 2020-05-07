import axios from 'axios';
export default class Recipe {
    constructor (id){
        this.id=id;
    };

    async getRecipe () {
        try {const result= await axios (`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
        this.recipe=result.data.recipe;
        this.readData();   
    } catch (e){
        alert(e);
    }};

    readData () {
        this.title=this.recipe.title;
        this.img= this.recipe.image_url;
        this.author=this.recipe.publisher;
        this.ingredients=this.recipe.ingredients;
        this.url= this.recipe.source_url;
        this.recipe_id= this.recipe.recipe_id;
        this.social_rank= this.recipe.social_rank;
        this.servings=4;
        this.time= parseInt((this.ingredients.length)*15/4);
    };

    sepIngredientes (){
         this.ingredients=this.ingredients.map((el)=>separarIngredientes(el));
    };
};

const separarIngredientes = (ingredientesJuntos)=>{
    // Ingredient string is separated into words for finding quantity, unit if exists and food.
    let ingredientesSeparados,ingredientes;
    //Everything inside parenthesis is deleted 
    ingredientesJuntos=ingredientesJuntos.replace(/ \([\s\S]*?\)/g, '');
    ingredientesSeparados=ingredientesJuntos.split(' ');
    //Find out the quantity
    ingredientes= {};
    let numeros,cantidad, unidadIndex;
    numeros=ingredientesSeparados.filter ((el)=>!isNaN(el[0]));
    numeros=numeros.map((el)=>el.replace('-','+'));
    cantidad= eval(numeros.join('+'))+''; 
    cantidad=cantidad.includes('.')? (+cantidad).toFixed(1): parseInt(+cantidad);
    ingredientes.cantidad = numeros.length>0? cantidad:1;
    unidadIndex = numeros.length;
    //Find the unit 
    let tablaUnidades, unidad, resultado;
    ingredientes.unidad='';
    unidad= ingredientesSeparados[unidadIndex]
    tablaUnidades = ['teasp', 'ounc', 'cup', 'g']
    tablaUnidades.forEach(el=>{
    if (unidad.startsWith(el)) ingredientes.unidad= el;
    });
    // Find the type of food
    let comidaIndex = ingredientes.unidad===''? unidadIndex : unidadIndex+1; 
    ingredientes.resto= ingredientesSeparados.slice(comidaIndex).join(' ');

    return ingredientes;
};
