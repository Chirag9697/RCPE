// import views from '../domain/Views';
import { views } from "../domain/Views";
import * as fromviewmodel from '../../views';

export const create=async(data)=>{
    const findviewer=await fromviewmodel.getone(data);
    if(findviewer){
        throw new Error("user has already viewed this recipe");
        return;
    }
    const addingviewers=await views.query().insert({...data});
    return  addingviewers;
}
