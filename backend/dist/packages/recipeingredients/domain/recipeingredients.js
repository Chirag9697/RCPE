"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipeingredients = void 0;
const ingredients_1 = require("../../ingredients");
const recipies_1 = require("../../recipies");
const objection_1 = require("objection");
class recipeingredients extends objection_1.Model {
    // id?:String
    // userid?:String
    static get tableName() {
        return 'recipeingredients';
    }
}
exports.recipeingredients = recipeingredients;
recipeingredients.relationMappings = {
    ingredientingredienteiperelation: {
        relation: objection_1.Model.HasOneRelation,
        modelClass: ingredients_1.ingredients,
        join: {
            from: "recipeingredients.id",
            to: "ingredients.id"
        }
    },
    ingredientreciperelation: {
        relation: objection_1.Model.ManyToManyRelation,
        modelClass: recipies_1.recipies,
        join: {
            from: "ingredients.id",
            through: {
                from: "recipeingredients.ingredientid",
                to: "recipeingredients.recipeid"
            },
            to: "recipies.id"
        }
    },
};
//# sourceMappingURL=recipeingredients.js.map