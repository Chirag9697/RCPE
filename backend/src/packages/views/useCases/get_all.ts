// import views from '../domain/Views';
import { views } from "../domain/Views";
export const getall=async(recipeid)=>{
    const viewers=await views.query().where('recipeid','=',`${recipeid}`);
    return  viewers;
}
