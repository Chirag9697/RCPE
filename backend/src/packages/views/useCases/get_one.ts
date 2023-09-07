// import views from '../domain/Views';
import { views } from "../domain/Views";
export const getone=async(data)=>{
    const viewer=await views.query().findOne({...data});
    return  viewer;
}
