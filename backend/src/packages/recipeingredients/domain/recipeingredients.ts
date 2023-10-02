import { ingredients } from "../../ingredients";
import { recipies } from "../../recipies";
import { users } from "../../users";
import { Model } from "objection";

export class recipeingredients extends Model{
    recipeid?:String
    ingredientid?:number
    quantity?:String
    // id?:String
    // userid?:String
    
    static get tableName(){
        return 'recipeingredients'
    }
    static relationMappings={
        ingredientingredienteiperelation:{
            relation:Model.HasOneRelation,
            modelClass:ingredients,
            join:{
                from:"recipeingredients.ingredientid",
                to:"ingredients.id"
            }
        },
        ingredientreciperelation:{
            relation:Model.ManyToManyRelation,
            modelClass:recipies,
            join:{
                from:"ingredients.id",
                through:{
                    from:"recipeingredients.ingredientid",
                    to:"recipeingredients.recipeid"
                },
                to:"recipies.id"

            }
        },
      
    }
}