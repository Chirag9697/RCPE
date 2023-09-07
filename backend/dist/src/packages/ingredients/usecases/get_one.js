"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_one = void 0;
// import {recipies} from '../domain/recipies';
const ingredients_1 = require("../domain/ingredients");
const get_one = async (id) => {
    console.log("id", id);
    const query = await ingredients_1.ingredients.query().first().findById(id);
    console.log(query);
    if (!query) {
        throw new Error("not able to get ingredients");
        return;
    }
    return query;
};
exports.get_one = get_one;
//# sourceMappingURL=get_one.js.map