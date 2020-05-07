import axios from 'axios';
import {clearLoader} from '../views/base'
export default class Search {
    constructor (query){
        this.query=query;
        console.log('Creada la clase search para busquedas Greg señor');
        //this.getResult();
    };

    async getResult (){
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
            this.results=res.data.recipes;
            } catch (e){
                alert (e);
                clearLoader();
            }
    };
};
