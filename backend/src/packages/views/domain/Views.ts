import { Model } from "objection";
// import { role } from "../../roles/domain/role";
import { users } from "../../users";
import { fileupload } from "../../fileuploads/domain/fileupload";
import { favouriterecipies } from "../../favourite-recipies";
import { ingredients } from "../../ingredients/domain/ingredients";
import { likes } from "../../likes";
export class views extends Model {
    // nooflikes?:any
    ipaddress?:string
    recipeid?:number
    static get tableName() {
        return "views"
    }
}