// import {recipies} from '../domain/recipies';
import { ingredients } from "../domain/ingredients";
import * as fromingredients from "../../ingredients";
export const get_all=async()=>{
    const query=(await ingredients.query());

    console.log("all ingredients",query);
   if(!query){
    throw new Error("not able to get ingredients");
    return;
   }
   const newresult=[];
//    for(var i=0;i<query.length;i++){
        // const ingred=await fromingredients.get_one(query[i].id);
//    }
   return query;
}

