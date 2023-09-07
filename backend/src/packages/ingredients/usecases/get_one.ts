// import {recipies} from '../domain/recipies';
import { ingredients } from "../domain/ingredients";
export const get_one=async(id)=>{
    console.log("id",id);
    const query=await ingredients.query().first().findById(id);
    console.log(query);
   if(!query){
    throw new Error("not able to get ingredients");
    return;
   }
   return query;
}

