// import {Recipe} from '../domain/recipe';
import { recipeingredients } from "../domain/recipeingredients";
import { ingredients } from "../../ingredients";
import * as fromingredientmodel from '../../ingredients';
import { compose } from "objection";
export const get_all=async(recipeid)=>{
    const allrecipeingredients=await recipeingredients.query().where('recipeid','=',recipeid);
    // console.log(all);
    const modifiedrecipeingredients=[];
    console.log("allrecipeing",allrecipeingredients);
    for(var i=0;i<allrecipeingredients.length;i++){
            
            const ingred=await fromingredientmodel.get_one(allrecipeingredients[i].ingredientid);
            modifiedrecipeingredients.push({...allrecipeingredients[i],ingredientname:ingred.ingredientname});

            console.log("ingred",ingred);
            
    }
    return modifiedrecipeingredients;
}
